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
  title: "Dynity | 軟體開發",
  description: "Dynity 是一個軟體開發團隊。第一個專案《孤島求生》是一款結合專注計時與島嶼經營的 Android App。",
};

export const viewport: Viewport = {
  themeColor: "#f8f8f3",
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant" className={display.variable}>
      <body>{children}</body>
    </html>
  );
}
