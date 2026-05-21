import type { Metadata } from "next";
import { FaqPageJsonLd } from "@/components/seo/json-ld";
import { HELP_FAQ } from "@/lib/help-mock-data";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common PennyCredit questions about loans, virtual cards, crypto deposits, transaction PIN, insurance, and account security.",
  path: "/help/faq",
  keywords: ["PennyCredit FAQ", "loan FAQ", "virtual card help"],
});

export default function HelpFaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FaqPageJsonLd
        items={HELP_FAQ.map((f) => ({ question: f.q, answer: f.a }))}
      />
      {children}
    </>
  );
}
