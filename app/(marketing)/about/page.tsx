import type { Metadata } from "next";
import { MarketingPageShell } from "@/components/layout/marketing-page-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About PennyCredit",
  description:
    "Learn about PennyCredit — a premium fintech platform combining digital banking, fast loans, investments, virtual cards, and crypto services for customers worldwide.",
  path: "/about",
  keywords: ["about PennyCredit", "fintech company", "digital bank"],
});

export default function AboutPage() {
  return (
    <MarketingPageShell
      title="About PennyCredit"
      subtitle="Premium digital banking built for a global financial life"
    >
      <p>
        PennyCredit is a premium fintech platform that unifies digital banking, instant loans,
        investments, virtual cards, and crypto — in one secure, elegant experience.
      </p>
      <h2 className="font-display text-xl font-semibold text-white">Our mission</h2>
      <p>
        We believe everyone deserves access to world-class financial tools without complexity.
        Our mission is to make saving, borrowing, and growing wealth simple, transparent, and
        accessible from anywhere.
      </p>
      <h2 className="font-display text-xl font-semibold text-white">What we offer</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Multi-currency digital wallets with real-time balances</li>
        <li>Personal, business, emergency, and specialty loans</li>
        <li>Curated investment and savings plans</li>
        <li>Virtual Visa and Mastercard cards for online spending</li>
        <li>Bitcoin, Ethereum, USDT, and Solana deposits</li>
        <li>Wire, local, and digital payment transfers globally</li>
      </ul>
    </MarketingPageShell>
  );
}
