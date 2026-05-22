"use client";

import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { useDashboard } from "@/components/providers/dashboard-provider";

export function LocalDepositGate({
  enabled,
  disabled,
}: {
  enabled: ReactNode;
  disabled: ReactNode;
}) {
  const { summary, isLoading } = useDashboard();

  if (isLoading && !summary) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
      </div>
    );
  }

  const user = summary?.user;
  const canDeposit =
    user?.enable_transfer === true && user?.assigned_bank_account != null;

  return canDeposit ? enabled : disabled;
}
