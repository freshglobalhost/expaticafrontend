import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";
import { RedirectIfAuthenticated } from "@/components/auth/redirect-if-authenticated";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Create Account",
  description:
    "Open your free PennyCredit account in minutes. Get access to instant loans, savings, investments, virtual cards, and crypto deposits with bank-grade security.",
  path: "/signup",
  keywords: ["open bank account online", "sign up fintech", "create digital wallet"],
});

export default function SignupPage() {
  return (
    <RedirectIfAuthenticated>
      <div className="mx-auto w-full">
        <SignupForm />
      </div>
    </RedirectIfAuthenticated>
  );
}
