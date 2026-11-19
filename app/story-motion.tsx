"use client";

import { useEffect, useRef } from "react";

const desktopMotion = "(min-width: 901px) and (min-height: 680px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const cue = {
  logoArrival: "bottom 54%",
  colorArrival: "bottom 12%",
  artworkDeparture: "top 23%",
  artworkArrival: "top 60%",
  studioOpening: "top 89%",
  studioArrival: "top 50%",
};

export function StoryMotion() {
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const storageKey = "dynity:home-scroll";
    const entryId = () => {
      const state = history.state;
      if (typeof state?.dynityScrollId === "string") return state.dynityScrollId as string;

      const id = crypto.randomUUID();
      history.replaceState({ ...state, dynityScrollId: id }, "");
      return id;
    };

    const save = () => {
      try {
        const id = history.state?.dynityScrollId;
        if (typeof id === "string") sessionStorage.setItem(`${storageKey}:${id}`, String(window.scrollY));
      } catch {
        // Native history still works when session storage is unavailable.
      }
    };
    let frame = 0;

    try {
      const id = entryId();
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      const stored = sessionStorage.getItem(`${storageKey}:${id}`);
      if (navigation?.type === "back_forward" && stored !== null) {
        // Chrome can restore before the exported document reaches its full height.
        frame = requestAnimationFrame(() => window.scrollTo(0, Number(stored)));
      }
    } catch {
      // Keep the platform default when custom restoration is unavailable.
    }

    window.addEventListener("hashchange", entryId);
    window.addEventListener("pagehide", save);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", entryId);
      window.removeEventListener("pagehide", save);
    };
  }, []);

  useEffect(() => {
    const story = marker.current?.closest<HTMLElement>("[data-story]");
    const hero = story?.querySelector<HTMLElement>("[data-story-hero]");
    const heroWordmark = story?.querySelector<HTMLElement>("[data-hero-wordmark]");
    const heroCopy = story?.querySelectorAll<HTMLElement>("[data-hero-copy]");
    const headerSlot = document.querySelector<HTMLElement>("[data-header-slot]");
    const navWordmark = headerSlot?.querySelector<HTMLElement>("[data-header-wordmark]");
    const heroWash = story?.querySelector<HTMLElement>("[data-hero-wash]");
    const workWash = story?.querySelector<HTMLElement>("[data-work-wash]");
    const aboutWash = story?.querySelector<HTMLElement>("[data-about-wash]");
    const origin = story?.querySelector<HTMLElement>("[data-artwork-origin]");
    const artwork = origin?.querySelector<HTMLElement>("[data-artwork-traveler]");
    const destination = story?.querySelector<HTMLElement>("[data-artwork-destination]");
    if (!story || !hero || !heroWordmark || !heroCopy || !headerSlot || !navWordmark || !heroWash ||
        !origin || !artwork || !destination || !workWash || !aboutWash) return;

    const preference = window.matchMedia(desktopMotion);
    let disposed = false;
    let loading = false;
    let revert: (() => void) | undefined;

    const load = () => {
      if (!preference.matches || loading) return;
      loading = true;

      void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia();
        revert = () => media.revert();

        media.add(desktopMotion, () => {
          // Geometry comes from stationary slots on refresh. Scrubbing only writes transforms.
          const measureLogo = () => {
            const from = heroWordmark.getBoundingClientRect();
            const to = headerSlot.getBoundingClientRect();
            return { x: from.x - to.x, y: from.y + window.scrollY - to.y, scale: from.width / to.width };
          };
          const measureArtwork = () => {
            const from = origin.getBoundingClientRect();
            const to = destination.getBoundingClientRect();
            return { x: to.x - from.x, y: to.y - from.y, scale: to.width / from.width };
          };

          let logo = measureLogo();
          let frame = measureArtwork();
          gsap.set(heroWordmark, { opacity: 0 });
          gsap.set(destination, { visibility: "hidden" });

          const heroTimeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: hero,
              start: 0,
              end: cue.logoArrival,
              scrub: true,
              invalidateOnRefresh: true,
              onRefreshInit: () => { logo = measureLogo(); },
            },
          });

          heroTimeline.fromTo(navWordmark,
            { x: () => logo.x, y: () => logo.y, scale: () => logo.scale },
            { x: 0, y: 0, scale: 1, ease: "power2.inOut" },
          );
          heroTimeline.to(heroCopy, { y: -24 }, 0);

          gsap.fromTo(heroWash, { scaleY: 0 }, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: cue.colorArrival, scrub: true },
          });

          const artworkTimeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: origin,
              endTrigger: destination,
              start: cue.artworkDeparture,
              end: cue.artworkArrival,
              scrub: true,
              invalidateOnRefresh: true,
              onRefreshInit: () => { frame = measureArtwork(); },
            },
          });
          artworkTimeline
            .fromTo(artwork, { x: 0, y: 0, scale: 1 }, {
              x: () => frame.x,
              y: () => frame.y,
              scale: () => frame.scale,
            })
            .fromTo(workWash, { scaleY: 1 }, { scaleY: 0 }, 0);

          gsap.fromTo(aboutWash, { scaleX: .93 }, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: aboutWash, start: cue.studioOpening, end: cue.studioArrival, scrub: true },
          });

          void document.fonts.ready.then(() => {
            if (!disposed && preference.matches) ScrollTrigger.refresh();
          });
        });
      }).catch(() => {
        // The static document remains complete if the motion module cannot load.
        revert?.();
        loading = false;
      });
    };

    load();
    preference.addEventListener("change", load);
    return () => {
      disposed = true;
      preference.removeEventListener("change", load);
      revert?.();
    };
  }, []);

  return <span ref={marker} hidden />;
}
