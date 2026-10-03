import type { MetadataRoute } from "next";
import {publicSiteConfig} from "@/lib/site-mode";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    {
      url: "https://kindergarten-website-red.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  if (publicSiteConfig.showNews) {
    pages.push({
      url: "https://kindergarten-website-red.vercel.app/news",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  return pages;
}
