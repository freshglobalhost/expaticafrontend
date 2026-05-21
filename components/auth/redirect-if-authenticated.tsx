"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/api/auth-storage";

/** Sends logged-in users away from login/register pages */
export function RedirectIfAuthenticated({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/transaction-pin");
    }
  }, [router]);

  return <>{children}</>;
}
