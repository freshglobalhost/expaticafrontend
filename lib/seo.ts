import type { Metadata } from "next";

/** Public site URL for canonical links, Open Graph, and sitemap */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://expaticaonline.com";

export const SITE_NAME = "Expatica";

export const DEFAULT_DESCRIPTION =
  "Expatica is a premium digital banking platform offering instant personal and business loans, multi-currency wallets, investment plans, virtual cards, crypto deposits, and global money transfers — secure, fast, and built for modern finance.";

export const DEFAULT_KEYWORDS = [
  "Expatica",
  "digital banking",
  "online banking",
  "personal loans",
  "business loans",
  "instant loan approval",
  "investment platform",
  "savings accounts",
  "virtual debit card",
  "crypto deposit",
  "send money internationally",
  "wire transfer",
  "fintech app",
  "mobile banking",
  "multi-currency wallet",
];

type PageSeoOptions = {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  /** Set false for login, dashboard, etc. */
  index?: boolean;
  ogType?: "website" | "article";
};

export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  keywords = [],
  index = true,
  ogType = "website",
}: PageSeoOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle =
    title === SITE_NAME || title.includes(SITE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords: [...new Set([...DEFAULT_KEYWORDS, ...keywords])],
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    robots: index
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        }
      : {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        },
    openGraph: {
      type: ogType,
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: "@expatica",
    },
    category: "finance",
  };
}

export const rootMetadata: Metadata = {
  ...createPageMetadata({
    title: `${SITE_NAME} — Premium Digital Banking, Loans & Investments`,
    description: DEFAULT_DESCRIPTION,
    path: "/",
  }),
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.webmanifest",
};
