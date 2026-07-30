import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Expatica — Premium Digital Banking, Loans & Investments",
  description:
    "Bank smarter with Expatica: instant loans, savings and investment plans, virtual Visa & Mastercard cards, crypto deposits, and low-fee global transfers in one secure app.",
  path: "/",
  keywords: [
    "open digital bank account",
    "apply for loan online",
    "virtual card online",
  ],
});

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="pt-16">{children}</div>
    </>
  );
}
