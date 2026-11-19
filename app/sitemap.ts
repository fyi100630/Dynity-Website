import type { MetadataRoute } from "next";
import { absoluteUrl } from "./site-config";
import { projects, projectPath } from "./projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/work/", ...projects.map(projectPath), "/about/", "/contact/"];
  return paths.flatMap((path) => {
    const url = absoluteUrl(path);
    return url ? [{ url }] : [];
  });
}
