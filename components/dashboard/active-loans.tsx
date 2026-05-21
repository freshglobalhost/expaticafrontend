"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Inbox, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useDashboard } from "@/components/providers/dashboard-provider";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function ActiveLoans({ compact = false }: { compact?: boolean }) {
  const { loans, isLoading } = useDashboard();
  const displayLoans = compact ? loans.slice(0, 2) : loans;

  return (
    <section id="loans" className={compact ? "scroll-mt-6" : "mt-6 scroll-mt-6"}>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
          {compact ? "Your loans" : "Active loans"}
        </h2>
        <Link
          href="/loans"
          className="flex items-center gap-0.5 text-xs font-medium text-brand-400"
        >
          View all
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center rounded-xl border border-white/5 bg-surface-card py-10">
          <Loader2 className="h-6 w-6 animate-spin text-brand-400" />
        </div>
      ) : displayLoans.length === 0 ? (
        <div className="flex flex-col items-center rounded-xl border border-white/5 bg-surface-card py-10 text-gray-500">
          <Inbox className="mb-2 h-8 w-8 opacity-40" />
          <p className="text-sm">No active loans</p>
          <Link href="/loans" className="mt-2 text-xs text-brand-400 hover:text-brand-300">
            Browse available loans
          </Link>
        </div>
      ) : (
        <div className={compact ? "space-y-2" : "grid gap-4 md:grid-cols-2 xl:grid-cols-3"}>
          {displayLoans.map((loan, i) => {
            const progress =
              loan.amount > 0 ? Math.round((loan.paid / loan.amount) * 100) : 0;
            return (
              <motion.article
                key={loan.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl border border-white/5 bg-surface-card p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">{loan.title}</p>
                    <p className="text-[10px] text-gray-500">
                      {fmt(loan.monthly)}/mo · Due {loan.dueDate}
                    </p>
                  </div>
                  <Badge variant={loan.status === "closing" ? "warning" : "success"}>
                    {loan.status === "closing" ? "Closing" : "Active"}
                  </Badge>
                </div>
                <div className="mt-2 flex items-end justify-between">
                  <p className="text-lg font-bold text-white">{fmt(loan.amount)}</p>
                  <p className="text-xs text-gray-500">{progress}% paid</p>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </section>
  );
}
