"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { getWithdrawals } from "@/lib/api/banking";
import { Badge } from "@/components/ui/badge";

function fmt(n: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(parseFloat(n) || 0);
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const statusVariant = {
  completed: "success",
  pending: "warning",
  processing: "info",
  failed: "danger",
  cancelled: "default",
} as const;

export function RecentWithdrawalsTable() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["withdrawals", { page_size: 20 }],
    queryFn: () => getWithdrawals({ page_size: 20 }),
  });

  const rows = data?.results ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center rounded-2xl border border-white/10 bg-surface-card py-12">
        <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="rounded-xl border border-dashed border-white/10 px-6 py-8 text-center text-sm text-gray-500">
        Could not load withdrawal history.
      </p>
    );
  }

  if (rows.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-white/10 px-6 py-8 text-center text-sm text-gray-500">
        No withdrawals yet. Choose local transfer above to withdraw.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface-card">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/5 text-xs uppercase text-gray-500">
            <th className="px-5 py-4">Reference</th>
            <th className="px-5 py-4">Method</th>
            <th className="px-5 py-4 text-right">Amount</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const variant =
              statusVariant[row.status as keyof typeof statusVariant] ?? "default";
            return (
              <tr key={row.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-5 py-4 font-mono text-brand-400">{row.reference_code}</td>
                <td className="px-5 py-4 text-white">{row.method_name}</td>
                <td className="px-5 py-4 text-right font-semibold">{fmt(row.amount)}</td>
                <td className="px-5 py-4">
                  <Badge variant={variant}>{row.status}</Badge>
                </td>
                <td className="px-5 py-4 text-gray-500">{fmtDate(row.created_at)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
