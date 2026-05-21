"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { getLoan } from "@/lib/api/loans";
import { Badge } from "@/components/ui/badge";

function fmt(n: number | string) {
  const value = typeof n === "string" ? parseFloat(n) : n;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value || 0
  );
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function RepaymentTracking() {
  const params = useParams();
  const loanId = params?.id as string | undefined;

  const { data: loan, isLoading, isError } = useQuery({
    queryKey: ["loan", loanId],
    queryFn: () => getLoan(loanId!),
    enabled: !!loanId,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (isError || !loan) {
    return (
      <p className="rounded-xl border border-dashed border-white/10 px-6 py-12 text-center text-sm text-gray-500">
        Loan not found.
      </p>
    );
  }

  const schedule = loan.repayments ?? [];
  const paid = schedule.filter((r) => r.paid_on).length;
  const total = schedule.length;
  const next = schedule.find((r) => !r.paid_on);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/5 bg-surface-card p-4">
          <p className="text-xs text-gray-500">Installments paid</p>
          <p className="text-2xl font-bold text-white">
            {paid} / {total || "—"}
          </p>
        </div>
        <div className="rounded-xl border border-white/5 bg-surface-card p-4">
          <p className="text-xs text-gray-500">Next due</p>
          <p className="text-2xl font-bold text-brand-400">
            {next ? fmtDate(next.due_on) : "—"}
          </p>
        </div>
        <div className="rounded-xl border border-white/5 bg-surface-card p-4">
          <p className="text-xs text-gray-500">Next amount</p>
          <p className="text-2xl font-bold text-white">
            {next ? fmt(next.amount) : "—"}
          </p>
        </div>
      </div>

      {schedule.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-surface-card px-6 py-12 text-center text-sm text-gray-500">
          No repayment schedule on file for this loan yet.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 text-xs uppercase text-gray-500">
                  <th className="px-5 py-4">#</th>
                  <th className="px-5 py-4">Due date</th>
                  <th className="px-5 py-4">Amount</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, index) => {
                  const isPaid = !!row.paid_on;
                  return (
                    <tr key={row.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-5 py-4 text-gray-400">{index + 1}</td>
                      <td className="px-5 py-4 text-white">{fmtDate(row.due_on)}</td>
                      <td className="px-5 py-4 font-semibold text-white">
                        {fmt(row.amount)}
                      </td>
                      <td className="px-5 py-4">
                        <Badge variant={isPaid ? "success" : "info"}>
                          {isPaid ? "paid" : "upcoming"}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
