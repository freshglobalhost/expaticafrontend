import type { Metadata } from "next";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { HelpCenter } from "@/components/help/help-center";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Help Center",
  description:
    "Expatica Help Center — guides for accounts, loans, cards, investments, crypto deposits, transfers, security, and transaction PIN support.",
  path: "/help",
  keywords: ["Expatica help", "customer support", "banking FAQ"],
});

export default function HelpPage() {
  return (
    <>
      <main className="min-h-screen bg-surface px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-4xl font-bold text-white">Help Center</h1>
          <p className="mt-3 text-gray-400">How can we help you today?</p>
        </div>
        <div className="mt-12">
          <HelpCenter />
        </div>
      </main>
      <MarketingFooter />
    </>
  );
}
