"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useTransferMethods } from "@/hooks/use-transfer-methods";
import type { TransferMethod, TransferMethodId } from "@/lib/transfer-methods";
import { TransferMethodCard } from "@/components/transfer/transfer-method-card";
import { WithdrawalModal } from "@/components/withdrawal/withdrawal-modal";
import { getApiIdForMethod } from "@/hooks/use-transfer-methods";

export function WithdrawPicker({
  uiMethods,
  columnsClass = "grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3",
  autoOpen = true,
}: {
  uiMethods: TransferMethod[];
  columnsClass?: string;
  /** Open the first method (local transfer) as soon as the page loads */
  autoOpen?: boolean;
}) {
  const defaultMethod = uiMethods[0]?.id ?? "local";
  const [methodId, setMethodId] = useState<TransferMethodId | null>(
    autoOpen ? defaultMethod : null
  );
  const { methods: allMethods, isLoading } = useTransferMethods(uiMethods);

  const methodApiId = getApiIdForMethod(allMethods, methodId);
  const selectedMethod = methodId
    ? allMethods.find((m) => m.id === methodId) ??
      uiMethods.find((m) => m.id === methodId) ??
      null
    : null;

  return (
    <>
      {isLoading && allMethods.length === 0 ? (
        <div className="flex justify-center py-10 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      ) : (
        <div className={columnsClass}>
          {allMethods.map((m, i) => (
            <TransferMethodCard
              key={m.id}
              method={m}
              index={i}
              onClick={() => setMethodId(m.id)}
            />
          ))}
        </div>
      )}
      <WithdrawalModal
        method={selectedMethod}
        methodApiId={methodApiId}
        onClose={() => setMethodId(null)}
      />
    </>
  );
}
