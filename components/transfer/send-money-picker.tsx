"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useTransferMethods } from "@/hooks/use-transfer-methods";
import type { MergedTransferMethod } from "@/lib/transfer-methods-merge";
import type { MergeTransferMethodsOptions } from "@/lib/transfer-methods-merge";
import type { TransferMethod, TransferMethodId } from "@/lib/transfer-methods";
import { TransferMethodCard } from "@/components/transfer/transfer-method-card";
import { TransferModal } from "@/components/transfer/transfer-modal";
import { getApiIdForMethod } from "@/hooks/use-transfer-methods";

export function SendMoneyPicker({
  uiMethods,
  columnsClass = "grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3",
  sections,
  allowApiExtras = false,
}: {
  uiMethods: TransferMethod[];
  columnsClass?: string;
  sections?: { title: string; methods: TransferMethod[] }[];
  /** Full /send page: include extra methods returned by the API */
  allowApiExtras?: boolean;
}) {
  const [transferType, setTransferType] = useState<TransferMethodId | null>(null);
  const mergeOptions: MergeTransferMethodsOptions = { allowApiExtras };
  const { methods: allMethods, isLoading } = useTransferMethods(
    uiMethods,
    mergeOptions
  );

  const methodApiId = getApiIdForMethod(allMethods, transferType);
  const selectedMethod = transferType
    ? allMethods.find((m) => m.id === transferType) ?? null
    : null;

  const renderGrid = (list: MergedTransferMethod[]) => (
    <div className={columnsClass}>
      {list.map((m, i) => (
        <TransferMethodCard
          key={m.id}
          method={m}
          index={i}
          onClick={() => setTransferType(m.id)}
        />
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-10 text-gray-500">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  if (sections?.length) {
    return (
      <>
        <div className="space-y-4">
          {sections.map((section, sectionIndex) => {
            const slugs = new Set(section.methods.map((m) => m.id));
            const sectionMethods = allMethods.filter((m) => slugs.has(m.id));
            return (
              <div key={section.title}>
                {sectionIndex > 0 && (
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {section.title}
                  </h3>
                )}
                {renderGrid(sectionMethods)}
              </div>
            );
          })}
        </div>
        <TransferModal
          method={selectedMethod}
          methodApiId={methodApiId}
          onClose={() => setTransferType(null)}
        />
      </>
    );
  }

  return (
    <>
      {renderGrid(allMethods)}
      <TransferModal
        method={selectedMethod}
        methodApiId={methodApiId}
        onClose={() => setTransferType(null)}
      />
    </>
  );
}
