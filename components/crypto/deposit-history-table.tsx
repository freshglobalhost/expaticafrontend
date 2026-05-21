"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { getTransactions } from "@/lib/api/transactions";
import { mapCryptoAsset } from "@/lib/crypto-ui";
import { getCryptoAssets } from "@/lib/api/transactions";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusVariant = {
  completed: "success",
  confirming: "info",
  pending: "warning",
  processing: "info",
  failed: "danger",
  cancelled: "default",
} as const;

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function DepositHistoryTable() {
  const assetsQuery = useQuery({
    queryKey: ["crypto-assets"],
    queryFn: getCryptoAssets,
  });

  const txQuery = useQuery({
    queryKey: ["transactions", "crypto-deposits"],
    queryFn: () => getTransactions({ page_size: 50 }),
  });

  const assetUi = useMemo(() => {
    const map = new Map<string, ReturnType<typeof mapCryptoAsset>>();
    for (const a of assetsQuery.data ?? []) {
      map.set(a.symbol, mapCryptoAsset(a));
    }
    return map;
  }, [assetsQuery.data]);

  const deposits = useMemo(
    () =>
      (txQuery.data?.results ?? []).filter(
        (tx) => tx.category === "deposit" && tx.crypto_symbol
      ),
    [txQuery.data]
  );

  const isLoading = assetsQuery.isLoading || txQuery.isLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center rounded-2xl border border-white/10 bg-surface-card py-16">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (deposits.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-surface-card px-6 py-12 text-center text-sm text-gray-500">
        No crypto deposits yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/5 text-xs uppercase text-gray-500">
            <th className="px-5 py-4 text-left">Reference</th>
            <th className="px-5 py-4 text-left">Asset</th>
            <th className="px-5 py-4 text-right">Amount</th>
            <th className="px-5 py-4 text-left">Status</th>
            <th className="px-5 py-4 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {deposits.map((dep) => {
            const symbol = dep.crypto_symbol ?? "";
            const asset = assetUi.get(symbol);
            const variant =
              statusVariant[dep.status as keyof typeof statusVariant] ?? "default";
            return (
              <tr key={dep.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-5 py-4 font-mono text-brand-400">
                  {dep.reference_code}
                </td>
                <td className="px-5 py-4">
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-sm font-bold text-white",
                        asset?.gradient
                      )}
                    >
                      {asset?.icon ?? symbol.slice(0, 1)}
                    </span>
                    {symbol}
                  </span>
                </td>
                <td className="px-5 py-4 text-right font-medium text-white">
                  {dep.crypto_amount} {symbol}
                </td>
                <td className="px-5 py-4">
                  <Badge variant={variant}>{dep.status}</Badge>
                </td>
                <td className="px-5 py-4 text-gray-500">{fmtDate(dep.created_at)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
