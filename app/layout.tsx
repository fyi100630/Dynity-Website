import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const display = localFont({
  src: "../node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "200 800",
});

export const metadata: Metadata = {
  title: "Dynity — Ideas in Motion",
  description: "Dynity 的數位設計與互動實驗。探索我們如何用動態、介面與材質表達想法。",
};

export const viewport: Viewport = {
  themeColor: "#101411",
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant" className={display.variable}>
      <body>{children}</body>
    </html>
  );
}
