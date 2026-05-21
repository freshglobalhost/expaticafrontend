"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDownLeft,
  ChevronRight,
  Inbox,
  Loader2,
} from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { useDashboard } from "@/components/providers/dashboard-provider";
import type { DisplayTransaction } from "@/lib/dashboard-transactions";
import { cn } from "@/lib/utils";

export function RecentTransactions() {
  const { recentTransactions, isLoading } = useDashboard();
  const [selected, setSelected] = useState<DisplayTransaction | null>(null);

  return (
    <section id="transactions" className="scroll-mt-6">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
          Recent transactions
        </h2>
        <Link
          href="/transactions"
          className="flex items-center gap-0.5 text-xs font-medium text-brand-400"
        >
          View all
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/5 bg-surface-card">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-brand-400" />
          </div>
        ) : recentTransactions.length === 0 ? (
          <div className="flex flex-col items-center py-10 text-gray-500">
            <Inbox className="mb-2 h-8 w-8 opacity-40" />
            <p className="text-sm">No transactions yet</p>
          </div>
        ) : (
          <ul>
            {recentTransactions.map((tx) => (
              <li key={tx.id}>
                <button
                  type="button"
                  onClick={() => setSelected(tx)}
                  className="flex w-full items-center gap-3 border-b border-white/5 px-3 py-3 text-left last:border-0 hover:bg-white/5"
                >
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                      tx.amount >= 0
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-red-500/10 text-red-400"
                    )}
                  >
                    {tx.amount >= 0 ? (
                      <ArrowDownLeft className="h-4 w-4" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {tx.description}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      {tx.date} · {tx.category}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 text-sm font-semibold",
                      tx.amount >= 0 ? "text-emerald-400" : "text-white"
                    )}
                  >
                    {tx.amountLabel}
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-gray-600" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Transaction details"
      >
        {selected && (
          <dl className="space-y-3 text-sm">
            {[
              ["ID", selected.id],
              ["Description", selected.description],
              ["Amount", selected.amountLabel],
              ["Status", selected.status],
              ["Date", `${selected.date} ${selected.time}`],
              ["Counterparty", selected.counterparty],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between gap-4 border-b border-white/5 pb-2"
              >
                <dt className="text-gray-500">{k}</dt>
                <dd className="text-right font-medium text-white">{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </Dialog>
    </section>
  );
}
