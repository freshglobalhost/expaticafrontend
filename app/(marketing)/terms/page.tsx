import type { Metadata } from "next";
import { MarketingPageShell } from "@/components/layout/marketing-page-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms & Conditions",
  description:
    "Read PennyCredit Terms & Conditions covering accounts, loans, investments, fees, security responsibilities, and legal limitations.",
  path: "/terms",
  keywords: ["terms of service", "banking terms", "loan agreement"],
});

const SECTIONS = [
  {
    title: "Acceptance of terms",
    body: "By opening or using a PennyCredit account, you agree to these Terms & Conditions and our Privacy Policy. If you do not agree, do not use our services.",
  },
  {
    title: "Eligibility",
    body: "You must be at least 18 years old and legally capable of entering a binding contract. Services may not be available in all jurisdictions.",
  },
  {
    title: "Accounts & security",
    body: "You are responsible for maintaining the confidentiality of your login credentials and transaction PIN. Notify us immediately of unauthorized access.",
  },
  {
    title: "Loans & investments",
    body: "Loan approvals, rates, and investment returns are subject to product terms disclosed at application. Past performance does not guarantee future results. Investments carry risk of loss.",
  },
  {
    title: "Fees",
    body: "Standard banking features may be free on eligible plans. Premium features, international transfers, loan origination, and certain investment products may incur fees disclosed before you confirm a transaction.",
  },
  {
    title: "Limitation of liability",
    body: "To the maximum extent permitted by law, PennyCredit is not liable for indirect, incidental, or consequential damages arising from use of the platform, except where prohibited by applicable law.",
  },
  {
    title: "Contact",
    body: "Questions about these terms: legal@pennycredit.com. Last updated: May 2026.",
  },
];

export default function TermsPage() {
  return (
    <MarketingPageShell title="Terms & Conditions">
      {SECTIONS.map((s) => (
        <section key={s.title}>
          <h2 className="font-display text-xl font-semibold text-white">{s.title}</h2>
          <p className="mt-2">{s.body}</p>
        </section>
      ))}
    </MarketingPageShell>
  );
}
