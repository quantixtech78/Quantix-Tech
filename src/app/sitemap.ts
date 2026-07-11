import type { MetadataRoute } from "next";
import { SITE, ROUTES } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return Object.values(ROUTES).map((r) => ({
    url: new URL(r.path, SITE.url).toString(),
    lastModified: now,
    changeFrequency: r.changeFrequency ?? "monthly",
    priority: r.priority ?? 0.5,
  }));
}
