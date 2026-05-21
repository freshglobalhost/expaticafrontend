"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, ArrowUpRight, ArrowDownLeft, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { useDashboard } from "@/components/providers/dashboard-provider";
import type { DisplayTransaction } from "@/lib/dashboard-transactions";
import { cn } from "@/lib/utils";

const CATEGORIES: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "transfer", label: "Transfer" },
  { value: "deposit", label: "Deposit" },
  { value: "withdrawal", label: "Withdrawal" },
  { value: "loan", label: "Loan" },
  { value: "investment", label: "Investment" },
  { value: "card", label: "Card" },
  { value: "savings", label: "Savings" },
  { value: "fee", label: "Fee" },
  { value: "other", label: "Other" },
];

export function TransactionsTable({ compact = false }: { compact?: boolean }) {
  const { transactions, isLoading, isError } = useDashboard();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<DisplayTransaction | null>(null);

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      const matchCat = category === "all" || tx.category === category;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        tx.description.toLowerCase().includes(q) ||
        tx.id.toLowerCase().includes(q) ||
        tx.counterparty.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [transactions, search, category]);

  return (
    <section className={cn(!compact && "mt-8 scroll-mt-6")}>
      {!compact && (
        <h2 className="mb-4 font-display text-xl font-bold text-white">Transactions</h2>
      )}

      <div className="mb-3 space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500" />
          <input
            type="search"
            placeholder="Search by name, ID, or counterparty…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-xl border border-white/5 bg-surface-card pl-9 pr-3 text-sm text-white placeholder:text-gray-500 focus:border-brand-500/50 focus:outline-none"
          />
        </div>
        <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 scrollbar-none">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCategory(c.value)}
              className={cn(
                "shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                category === c.value
                  ? "bg-brand-500/20 text-brand-400"
                  : "border border-white/5 bg-surface-card text-gray-400 hover:text-white"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center rounded-xl border border-white/5 bg-surface-card py-16">
          <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
        </div>
      ) : isError ? (
        <p className="rounded-xl border border-red-500/20 bg-red-500/10 py-10 text-center text-sm text-red-400">
          Could not load transactions. Is the API running?
        </p>
      ) : compact ? (
        <div className="overflow-hidden rounded-xl border border-white/5 bg-surface-card">
          <ul>
            {filtered.map((tx, i) => (
              <motion.li
                key={tx.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
              >
                <button
                  type="button"
                  onClick={() => setSelected(tx)}
                  className="flex w-full items-center gap-3 border-b border-white/5 px-3 py-2.5 text-left last:border-0 hover:bg-white/5"
                >
                  <TxIcon amount={tx.amount} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {tx.description}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      {tx.date} · {tx.time} · {tx.category}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p
                      className={cn(
                        "text-sm font-semibold",
                        tx.amount >= 0 ? "text-emerald-400" : "text-white"
                      )}
                    >
                      {tx.amountLabel}
                    </p>
                    <Badge
                      variant={tx.status === "completed" ? "success" : "warning"}
                      className="mt-0.5 text-[9px]"
                    >
                      {tx.status}
                    </Badge>
                  </div>
                </button>
              </motion.li>
            ))}
          </ul>
          {filtered.length === 0 && (
            <p className="py-10 text-center text-sm text-gray-500">
              No transactions match your filters
            </p>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-gray-500">
                  <th className="px-5 py-4 font-medium">Transaction</th>
                  <th className="px-5 py-4 font-medium">Category</th>
                  <th className="px-5 py-4 font-medium">Date</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((tx, i) => (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => setSelected(tx)}
                    className="cursor-pointer border-b border-white/5 transition-colors hover:bg-white/5"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <TxIcon amount={tx.amount} />
                        <div>
                          <p className="font-medium text-white">{tx.description}</p>
                          <p className="text-xs text-gray-500">{tx.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 capitalize text-gray-400">{tx.category}</td>
                    <td className="px-5 py-4 text-gray-400">
                      {tx.date}
                      <span className="block text-xs text-gray-500">{tx.time}</span>
                    </td>
                    <td className="px-5 py-4">
                      <Badge
                        variant={tx.status === "completed" ? "success" : "warning"}
                      >
                        {tx.status}
                      </Badge>
                    </td>
                    <td
                      className={cn(
                        "px-5 py-4 text-right font-semibold",
                        tx.amount >= 0 ? "text-emerald-400" : "text-white"
                      )}
                    >
                      {tx.amountLabel}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <p className="py-12 text-center text-gray-500">
              No transactions match your filters
            </p>
          )}
        </div>
      )}

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
              ["Category", selected.category],
              ["Amount", selected.amountLabel],
              ["Status", selected.status],
              ["Date", `${selected.date} ${selected.time}`],
              ["Reference", selected.reference],
              ["Counterparty", selected.counterparty],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between gap-4 border-b border-white/5 pb-2"
              >
                <dt className="text-gray-500">{k}</dt>
                <dd className="text-right font-medium text-white capitalize">{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </Dialog>
    </section>
  );
}

function TxIcon({ amount }: { amount: number }) {
  return (
    <div
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
        amount >= 0 ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/10 text-red-400"
      )}
    >
      {amount >= 0 ? (
        <ArrowDownLeft className="h-3.5 w-3.5" />
      ) : (
        <ArrowUpRight className="h-3.5 w-3.5" />
      )}
    </div>
  );
}
