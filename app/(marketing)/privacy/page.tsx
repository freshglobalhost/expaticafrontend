import type { Metadata } from "next";
import { MarketingPageShell } from "@/components/layout/marketing-page-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "PennyCredit Privacy Policy — how we collect, use, store, and protect your personal data when you use our banking, loan, and investment services.",
  path: "/privacy",
  keywords: ["privacy policy", "data protection", "GDPR"],
});

export default function PrivacyPage() {
  return (
    <MarketingPageShell title="Privacy Policy" subtitle="Last updated: May 2026">
      <p>
        PennyCredit (&quot;we&quot;, &quot;us&quot;) respects your privacy. This policy explains what
        information we collect, how we use it, and your rights regarding personal data.
      </p>
      <h2 className="font-display text-xl font-semibold text-white">Information we collect</h2>
      <p>
        We collect information you provide when registering (name, email, phone, country),
        transaction data, device and log data for security, and documents you upload for
        verification or crypto deposit proof.
      </p>
      <h2 className="font-display text-xl font-semibold text-white">How we use your data</h2>
      <p>
        We use your data to operate accounts, process loans and payments, prevent fraud, improve
        our services, and communicate important account updates.
      </p>
      <h2 className="font-display text-xl font-semibold text-white">Your rights</h2>
      <p>
        Depending on your jurisdiction, you may request access, correction, deletion, or
        portability of your personal data. Contact privacy@pennycredit.com to exercise these
        rights.
      </p>
    </MarketingPageShell>
  );
}
