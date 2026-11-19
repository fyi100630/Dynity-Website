import { execFileSync } from "node:child_process";
import { cpSync, readdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const basePath = process.env.PAGES_BASE_PATH ?? "/Dynity-Website";
const siteUrl = process.env.SITE_URL || `https://fyi100630.github.io${basePath}/`;
const exportPaths = new Set([
  "404", "404.html", "_headers", "_next", "_not-found", "about", "contact", "icon.png",
  "index.html", "index.txt", "products", "robots.txt", "sitemap.xml", "social.jpg", "work",
]);
const isExport = (name) => exportPaths.has(name) || /^__next\..+\.txt$/.test(name);

execFileSync(process.execPath, [require.resolve("next/dist/bin/next"), "build"], {
  env: { ...process.env, PAGES_BASE_PATH: basePath, SITE_URL: siteUrl },
  stdio: "inherit",
});

const exported = readdirSync("out");
const unexpected = exported.filter((name) => !isExport(name));
if (unexpected.length) {
  throw new Error(`Review these new export paths before publishing: ${unexpected.join(", ")}`);
}
for (const name of readdirSync(".").filter(isExport)) {
  rmSync(name, { recursive: true, force: true });
}
for (const name of exported) {
  cpSync(join("out", name), name, { recursive: true });
}
