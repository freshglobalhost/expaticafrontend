"use client";

import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export function LoginFormWrapper() {
  return (
    <Suspense fallback={<div className="min-h-48" aria-busy="true" />}>
      <LoginForm />
    </Suspense>
  );
}
