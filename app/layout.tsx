import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteFooter, SiteHeader } from "./site";
import { pageMetadata, siteDescription, siteUrl } from "./site-config";

const display = localFont({
  src: "../node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "200 800",
});

const body = localFont({
  src: "../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "100 900",
});

const traditionalChinese = localFont({
  src: "./assets/fonts/noto-sans-tc-subset.woff2",
  variable: "--font-tc",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: false,
});

const homeTitle = "Dynity｜獨立軟體開發團隊";

export const metadata: Metadata = {
  ...pageMetadata(homeTitle, siteDescription, "/"),
  title: { default: homeTitle, template: "%s | Dynity" },
  metadataBase: siteUrl,
};

export const viewport: Viewport = {
  themeColor: "#f7f6f2",
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant" className={`${display.variable} ${body.variable} ${traditionalChinese.variable}`}>
      <body>
        <SiteHeader />
        <main id="main" tabIndex={-1}>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
