import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}

export function HomePageJsonLd() {
  return (
    <JsonLd
      data={[
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          logo: `${SITE_URL}/icon.svg`,
          description: DEFAULT_DESCRIPTION,
          sameAs: [],
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL,
          description: DEFAULT_DESCRIPTION,
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${SITE_URL}/help?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "FinancialService",
          name: SITE_NAME,
          url: SITE_URL,
          description: DEFAULT_DESCRIPTION,
          areaServed: "Worldwide",
          serviceType: [
            "Digital banking",
            "Personal loans",
            "Business loans",
            "Investment products",
            "Virtual cards",
            "Cryptocurrency deposits",
            "International money transfer",
          ],
        },
      ]}
    />
  );
}

export function FaqPageJsonLd({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}
