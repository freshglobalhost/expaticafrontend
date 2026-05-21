import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    "",
    "/about",
    "/help",
    "/help/faq",
    "/help/contact",
    "/careers",
    "/privacy",
    "/terms",
    "/signup",
  ];

  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : ("monthly" as const),
    priority: path === "" ? 1 : path === "/about" || path === "/help" ? 0.8 : 0.6,
  }));
}
