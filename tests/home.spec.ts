import AxeBuilder from "@axe-core/playwright";
import { devices, expect, test, type Page } from "@playwright/test";

const heroMark = "[data-hero-wordmark]";
const headerSlot = "[data-header-slot]";
const navMark = "[data-header-wordmark]";
const origin = "[data-artwork-origin]";
const artwork = "[data-artwork-traveler]";
const destination = "[data-artwork-destination]";
const desktop = { width: 1440, height: 900 };

async function scroll(page: Page, top: number) {
  await page.evaluate((y) => window.scrollTo(0, y), top);
}

async function distance(page: Page, from: string, to: string) {
  return page.evaluate(({ from, to }) => {
    const current = document.querySelector(from)!.getBoundingClientRect();
    const target = document.querySelector(to)!.getBoundingClientRect();
    return Math.max(
      Math.abs(current.x - target.x),
      Math.abs(current.y - target.y),
      Math.abs(current.width - target.width),
    );
  }, { from, to });
}

test("IslandSurvival fits on one line on the homepage and project page", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const [path, level] of [["/#featured", 2], ["/work/island-survival/", 1]] as const) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    const title = page.getByRole("heading", { name: "IslandSurvival", exact: true, level });

    for (const width of [1920, 2560, 1440, 1024, 761, 760, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      const { lines, fits } = await title.evaluate((heading) => {
        const text = document.createRange();
        text.selectNodeContents(heading);
        const rects = Array.from(text.getClientRects());
        const bounds = heading.getBoundingClientRect();
        return {
          lines: rects.length,
          fits: rects.every((rect) => rect.left >= bounds.left - 1 && rect.right <= bounds.right + 1),
        };
      });
      expect({ lines, fits }, `${path} at ${width}px`).toEqual({ lines: 1, fits: true });
    }
  }
});

test("the desktop wordmark lands in the header and retraces its path", async ({ page }) => {
  await page.setViewportSize(desktop);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator(heroMark)).toHaveCSS("opacity", "0");
  await expect.poll(() => distance(page, navMark, heroMark)).toBeLessThan(2);

  await scroll(page, 175);
  await expect.poll(() => distance(page, navMark, headerSlot)).toBeGreaterThan(80);
  await expect.poll(() => distance(page, navMark, heroMark)).toBeGreaterThan(80);
  await scroll(page, 475);
  await expect.poll(() => distance(page, navMark, headerSlot)).toBeLessThan(1.5);

  await scroll(page, 0);
  await expect.poll(() => distance(page, navMark, heroMark)).toBeLessThan(2);
  expect(errors).toEqual([]);
});

test("the featured artwork moves continuously to its work row and returns", async ({ page }) => {
  await page.setViewportSize(desktop);
  await page.goto("/");
  await expect(page.locator(destination)).toHaveCSS("visibility", "hidden");
  await expect.poll(() => distance(page, artwork, origin)).toBeLessThan(1);
  const { start, end } = await page.evaluate(({ origin, destination }) => {
    const from = document.querySelector(origin)!.getBoundingClientRect();
    const to = document.querySelector(destination)!.getBoundingClientRect();
    return { start: from.y - innerHeight * .23, end: to.y - innerHeight * .60 };
  }, { origin, destination });
  expect(end - start).toBeGreaterThan(200);

  await scroll(page, (start + end) / 2);
  await expect.poll(() => distance(page, artwork, origin)).toBeGreaterThan(40);
  await expect.poll(() => distance(page, artwork, destination)).toBeGreaterThan(40);
  const middle = await distance(page, artwork, origin);

  await scroll(page, end + 60);
  await expect.poll(() => distance(page, artwork, destination)).toBeLessThan(2);
  await scroll(page, (start + end) / 2);
  await expect.poll(async () => Math.abs(await distance(page, artwork, origin) - middle)).toBeLessThan(2);

  await scroll(page, 0);
  await expect.poll(() => distance(page, artwork, origin)).toBeLessThan(1);
});

test("anchors, resize and motion preferences preserve access to both scenes", async ({ page }) => {
  await page.setViewportSize(desktop);
  await page.goto("/");
  await page.getByRole("link", { name: "探索作品" }).click();
  await expect(page).toHaveURL(/#featured$/);
  await expect(page.getByRole("heading", { name: "IslandSurvival", level: 2 })).toBeInViewport();

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(destination)).toHaveCSS("visibility", "visible");
  await expect(page.locator(navMark)).toHaveCSS("transform", "none");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(destination)).toHaveCSS("visibility", "hidden");

  await page.setViewportSize({ width: 375, height: 812 });
  await expect(page.locator(destination)).toHaveCSS("visibility", "visible");
  await expect(page.locator(artwork)).toHaveCSS("transform", "none");
  await page.setViewportSize(desktop);
  await expect(page.locator(destination)).toHaveCSS("visibility", "hidden");
});

test.describe("Android-sized touch viewport", () => {
  const { viewport, deviceScaleFactor, isMobile, hasTouch, userAgent } = devices["Pixel 7"];
  test.use({ viewport, deviceScaleFactor, isMobile, hasTouch, userAgent });

  test("keeps navigation and project links usable in portrait and landscape", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(heroMark)).toHaveCSS("opacity", "1");
    await expect(page.locator(destination)).toHaveCSS("visibility", "visible");
    await page.getByRole("link", { name: "探索作品" }).tap();
    await expect(page).toHaveURL(/#featured$/);
    await expect(page.getByRole("link", { name: "前往產品網站" })).toHaveAttribute("href", "https://islandsurvival-intro.pages.dev/");
    await page.getByRole("link", { name: "作品介紹" }).tap();
    await expect(page).toHaveURL(/\/work\/island-survival\/$/);
    await page.setViewportSize({ width: 851, height: 393 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  });
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("exposes the hero and both static artwork placements", async ({ page }) => {
    await page.goto("/#featured");
    await expect(page.getByRole("heading", { name: "dynity.", level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "IslandSurvival", level: 2 })).toBeInViewport();
    await expect(page.locator(destination)).toHaveCSS("visibility", "visible");
    await page.getByRole("link", { name: "作品介紹" }).click();
    await expect(page).toHaveURL(/\/work\/island-survival\/$/);
  });

  test("links from the island story to the expanded content and opens questions by keyboard", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "看看島上還能做什麼" }).click();
    await expect(page).toHaveURL(/\/work\/island-survival\/#island-life$/);
    await expect(page.getByRole("heading", { name: "小島有自己的日常" })).toBeInViewport();
    await expect(page.locator("#how-it-works img")).toHaveCount(4);

    const answer = page.getByText(/訪客模式可以玩單人內容/);
    await expect(answer).toBeHidden();
    await page.locator("summary").filter({ hasText: "需要先登入嗎？" }).press("Enter");
    await expect(answer).toBeVisible();
  });
});

test("main navigation, product support, legal links and the old URL work", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "主要導覽" });
  await nav.getByRole("link", { name: "作品", exact: true }).click();
  await expect(page).toHaveURL(/\/work\/$/);
  await page.getByRole("link", { name: /IslandSurvival/ }).click();
  await expect(page).toHaveURL(/\/work\/island-survival\/$/);
  await expect(page.getByRole("heading", { name: "IslandSurvival", level: 1 })).toBeVisible();
  await expect(page.getByText(/Google Play 即將上架/)).toBeVisible();
  await nav.getByRole("link", { name: "團隊" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("我們是 Dynity");
  const members = page.getByRole("region", { name: "團隊成員" });
  await expect(members.getByRole("listitem")).toHaveText(["CC", "Eric"]);
  await expect(page.getByRole("heading", { name: "我們怎麼做作品" })).toBeVisible();
  await nav.getByRole("link", { name: "聯絡", exact: true }).click();
  await expect(page.getByRole("link", { name: "寄信給產品支援" })).toHaveAttribute("href", "mailto:cc20110630@gmail.com");
  await expect(page.getByRole("link", { name: "孤島求生隱私權政策" })).toHaveAttribute("href", "https://islandsurvival-privacy.pages.dev/");

  await page.goto("/products/island-survival/#support");
  await expect(page.getByRole("heading", { name: "產品支援", level: 2 })).toBeInViewport();
  await expect(page.getByRole("link", { name: "寄信給產品支援" })).toHaveAttribute("href", /^mailto:/);
});

test("returning from another page restores the home scroll position", async ({ page }) => {
  await page.setViewportSize(desktop);
  await page.goto("/");
  await expect(page.locator(destination)).toHaveCSS("visibility", "hidden");
  const offset = await page.locator("#work").evaluate((section) => Math.floor(section.getBoundingClientRect().top - 300));
  await scroll(page, offset);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(offset);
  const about = page.getByRole("navigation", { name: "主要導覽" }).getByRole("link", { name: "團隊" });
  const bounds = await about.boundingBox();
  expect(bounds).not.toBeNull();
  // Click the sticky link in place, without the test runner scrolling it into view.
  await page.mouse.click(bounds!.x + bounds!.width / 2, bounds!.y + bounds!.height / 2);
  await expect(page).toHaveURL(/\/about\/$/);
  await page.goBack();
  await expect(page.locator(destination)).toHaveCSS("visibility", "hidden");
  await page.waitForFunction((saved) => window.scrollY === saved, offset);
});

test("keyboard skip link reaches the main landmark", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "跳到主要內容" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
});

test("all layouts fit narrow viewports and pass automated WCAG checks", async ({ page }) => {
  const audit = async (path: string, width: number) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(overflow, `${path} at ${width}px`).toBe(0);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations, `${path} at ${width}px`).toEqual([]);
  };

  for (const width of [320, 375, 768, 1024, 1440]) await audit("/", width);
  for (const path of ["/work/", "/about/", "/work/island-survival/", "/contact/"]) await audit(path, 375);
});
