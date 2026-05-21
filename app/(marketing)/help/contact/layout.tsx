import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Support",
  description:
    "Contact PennyCredit support for help with your account, loans, transfers, cards, or investments. We respond to tickets within one business day.",
  path: "/help/contact",
  keywords: ["contact PennyCredit", "customer service"],
});

export default function HelpContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
