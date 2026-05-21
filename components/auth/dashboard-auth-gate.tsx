"use client";

import { Suspense } from "react";
import { RequireAuth } from "@/components/auth/require-auth";

function AuthCheckingFallback() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-surface"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Checking session…</span>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
    </div>
  );
}

export function DashboardAuthGate({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<AuthCheckingFallback />}>
      <RequireAuth>{children}</RequireAuth>
    </Suspense>
  );
}
