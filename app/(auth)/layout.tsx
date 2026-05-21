import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Account access",
  description: "Sign in or create your PennyCredit account.",
  index: false,
});

export default function AuthRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
