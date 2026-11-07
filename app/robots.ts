import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/studio", "/staff", "/staff-login", "/staff-admin", "/auth", "/api"],
    },
  };
}
