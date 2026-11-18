"use client";

import { useEffect, useRef } from "react";

const motionPreference = "(prefers-reduced-motion: no-preference)";

export function StoryMotion() {
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const story = marker.current?.closest<HTMLElement>("[data-story]");
    const origin = story?.querySelector<HTMLElement>("[data-story-origin]");
    const artwork = story?.querySelector<HTMLElement>("[data-story-artwork]");
    const destination = story?.querySelector<HTMLElement>("[data-story-destination]");
    const fallback = story?.querySelector<HTMLElement>("[data-story-fallback]");
    if (!origin || !artwork || !destination || !fallback) return;

    const preference = window.matchMedia(motionPreference);
    let stopped = false;
    let loading: Promise<void> | undefined;
    let revert: (() => void) | undefined;

    const enableMotion = () => {
      if (!preference.matches || loading) return;

      loading = Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
        .then(([{ gsap }, { ScrollTrigger }]) => {
          if (stopped) return;
          gsap.registerPlugin(ScrollTrigger);

          const media = gsap.matchMedia();
          revert = () => media.revert();
          media.add({
            motion: motionPreference,
            narrow: "(max-width: 720px)",
          }, (context) => {
            if (!context.conditions?.motion) return;
            const narrow = context.conditions.narrow;

            // Read the stationary slots on refresh, never the moving image.
            const measure = () => {
              const start = origin.getBoundingClientRect();
              const end = destination.getBoundingClientRect();
              return { x: end.left - start.left, y: end.top - start.top, scale: end.width / start.width };
            };
            let geometry = measure();

            gsap.set(fallback, { visibility: "hidden" });
            gsap.fromTo(artwork, { x: 0, y: 0, scale: 1 }, {
              x: () => geometry.x,
              y: () => geometry.y,
              scale: () => geometry.scale,
              transformOrigin: "0 0",
              ease: "none",
              scrollTrigger: {
                trigger: origin,
                endTrigger: destination,
                start: narrow ? "clamp(top 52%)" : "clamp(top 20%)",
                end: narrow ? "top 44%" : "top 31%",
                scrub: true,
                invalidateOnRefresh: true,
                onRefreshInit: () => { geometry = measure(); },
              },
            });
          });

          // Font swaps can change slot positions without a window resize.
          void document.fonts.ready.then(() => {
            if (!stopped) ScrollTrigger.refresh();
          });
        })
        .catch(() => {
          // Static artwork remains available if animation code cannot load.
          revert?.();
          loading = undefined;
        });
    };

    enableMotion();
    preference.addEventListener("change", enableMotion);

    return () => {
      stopped = true;
      preference.removeEventListener("change", enableMotion);
      revert?.();
    };
  }, []);

  return <span ref={marker} hidden />;
}
