import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { RedirectIfAuthenticated } from "@/components/auth/redirect-if-authenticated";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sign In",
  description:
    "Sign in to your PennyCredit account to access digital banking, loans, investments, virtual cards, and secure money transfers.",
  path: "/login",
  index: false,
});

export default function LoginPage() {
  return (
    <RedirectIfAuthenticated>
      <div className="mx-auto w-full">
        <LoginForm />
      </div>
    </RedirectIfAuthenticated>
  );
}
