import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/dashboard/",
          "/login",
          "/signup",
          "/transaction-pin",
          "/verify-otp",
          "/forgot-password",
          "/reset-password",
          "/settings",
          "/send",
          "/receive",
          "/transactions",
          "/cards",
          "/loans/apply",
          "/crypto/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
