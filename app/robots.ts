import type { MetadataRoute } from "next";
import { siteUrl } from "@/app/lib/siteUrl";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Nothing useful to index, and /unlock is the admin door.
      disallow: ["/api/", "/unlock"],
    },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
