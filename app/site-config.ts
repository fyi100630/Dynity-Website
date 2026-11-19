import type { Metadata } from "next";

export const siteDescription = "Dynity 是一個獨立軟體開發團隊。我們把想用的東西做出來，第一個作品是結合專注計時與島嶼經營的《孤島求生》。";
export const githubUrl = "https://github.com/fyi100630/Dynity-Website";
export const siteUrl = process.env.SITE_URL ? new URL(process.env.SITE_URL.replace(/\/?$/, "/")) : undefined;

export function absoluteUrl(path: string) {
  return siteUrl ? new URL(path.replace(/^\//, ""), siteUrl).href : undefined;
}

export function pageMetadata(title: string, description: string, path: string, image?: string): Metadata {
  const url = absoluteUrl(path);
  const cover = image ?? absoluteUrl("/social.jpg");
  return {
    title,
    description,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      type: "website",
      locale: "zh_TW",
      siteName: "Dynity",
      title: path === "/" ? title : `${title} | Dynity`,
      description,
      url,
      images: cover ? [cover] : undefined,
    },
    twitter: { card: "summary_large_image" },
  };
}
