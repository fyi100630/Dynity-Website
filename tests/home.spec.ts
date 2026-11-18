import { AxeBuilder } from "@axe-core/playwright";
import { devices, expect, test, type Page } from "@playwright/test";

const origin = "[data-story-origin]";
const artwork = "[data-story-artwork]";
const destination = "[data-story-destination]";
const fallback = "[data-story-fallback]";
const { viewport: mobileViewport, deviceScaleFactor, isMobile, hasTouch, userAgent } = devices["Pixel 7"];

async function scroll(page: Page, top: number) {
  await page.evaluate((y) => window.scrollTo(0, y), top);
}

async function frameDelta(page: Page, target: string) {
  return page.evaluate(({ artwork, target }) => {
    const current = document.querySelector(artwork)!.getBoundingClientRect();
    const expected = document.querySelector(target)!.getBoundingClientRect();
    return Math.max(
      Math.abs(current.x - expected.x),
      Math.abs(current.y - expected.y),
      Math.abs(current.width - expected.width),
    );
  }, { artwork, target });
}

for (const viewport of ["desktop", "mobile"] as const) {
  test.describe(viewport, () => {
    test.use(viewport === "mobile"
      ? { viewport: mobileViewport, deviceScaleFactor, isMobile, hasTouch, userAgent }
      : { viewport: { width: 1440, height: 900 } });

    test("shared artwork follows the scroll and returns to its origin", async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto("/");
      await expect(page.locator(fallback)).toHaveCSS("visibility", "hidden");
      await expect.poll(() => frameDelta(page, origin)).toBeLessThan(1);

      const { start, middle, end, gaps, viewportHeight } = await page.evaluate(({ origin, destination }) => {
        const from = document.querySelector(origin)!.getBoundingClientRect();
        const to = document.querySelector(destination)!.getBoundingClientRect();
        const narrow = matchMedia("(max-width: 720px)").matches;
        const start = Math.max(0, from.y - innerHeight * (narrow ? .52 : .2));
        const end = to.y - innerHeight * (narrow ? .44 : .31);
        return {
          start, middle: (start + end) / 2, end,
          gaps: document.documentElement.scrollWidth - innerWidth,
          viewportHeight: innerHeight,
        };
      }, { origin, destination });
      expect(gaps).toBe(0);
      expect(end - start).toBeGreaterThan(viewportHeight * .35);

      await scroll(page, middle);
      await expect.poll(() => frameDelta(page, origin)).toBeGreaterThan(40);
      await expect.poll(() => frameDelta(page, destination)).toBeGreaterThan(40);
      const forward = await frameDelta(page, origin);

      await scroll(page, end + 80);
      await expect.poll(() => frameDelta(page, destination)).toBeLessThan(1.5);

      await scroll(page, middle);
      await expect.poll(async () => Math.abs(await frameDelta(page, origin) - forward)).toBeLessThan(1.5);

      await scroll(page, 0);
      await expect.poll(() => frameDelta(page, origin)).toBeLessThan(1);
      expect(errors).toEqual([]);
    });
  });
}

test("anchors work and the artwork settles after crossing the layout breakpoint", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(fallback)).toHaveCSS("visibility", "hidden");
  await page.getByRole("link", { name: "探索作品" }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect.poll(() => frameDelta(page, destination)).toBeLessThan(1.5);

  await page.setViewportSize({ width: 375, height: 812 });
  await page.locator("#projects").evaluate((section) => section.scrollIntoView());
  await expect.poll(() => frameDelta(page, destination)).toBeLessThan(1.5);
  await scroll(page, 0);
  await expect.poll(() => frameDelta(page, origin)).toBeLessThan(1);
});

test("changing the motion preference restores both static images", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#projects");
  await expect(page.locator(fallback)).toBeVisible();
  await expect(page.locator(artwork)).toHaveCSS("transform", "none");

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(fallback)).toHaveCSS("visibility", "hidden");
  await expect.poll(() => frameDelta(page, destination)).toBeLessThan(1.5);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(fallback)).toBeVisible();
  await expect(page.locator(artwork)).toHaveCSS("transform", "none");
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("projects and both static artwork placements are available", async ({ page }) => {
    await page.goto("/#projects");
    await expect(page.getByRole("heading", { name: "Continuum" })).toBeVisible();
    await expect(page.locator(fallback)).toBeVisible();
    await expect(page.locator(artwork)).toHaveCSS("transform", "none");
  });
});

test("keyboard navigation and automated WCAG checks", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "跳到主要內容" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();

  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations, `Viewport width ${width}`).toEqual([]);
  }
});
