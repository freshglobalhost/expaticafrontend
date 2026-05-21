"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/api/auth-storage";

function AuthCheckingFallback() {
  return (
    <div
      className="mx-auto flex min-h-48 w-full max-w-md items-center justify-center"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Checking session…</span>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-teal border-t-transparent" />
    </div>
  );
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const ok = isAuthenticated();
    if (!ok) {
      router.replace("/login");
      return;
    }
    setAuthed(true);
    setReady(true);
  }, [router]);

  if (!ready) {
    return <AuthCheckingFallback />;
  }

  if (!authed) {
    return null;
  }

  return <>{children}</>;
}
