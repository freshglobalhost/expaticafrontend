"use client";

import Link from "next/link";
import { Plus, TrendingUp, Landmark, CreditCard } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { useDashboard } from "@/components/providers/dashboard-provider";

const QUICK_LINKS = [
  {
    href: "/crypto/deposit",
    label: "Deposit",
    icon: Plus,
    color: "bg-brand-500/15 text-brand-400",
    sub: (ctx: ReturnType<typeof useDashboard>) =>
      ctx.summary
        ? `${formatCurrency(parseFloat(ctx.summary.deposit_balance || "0"))} balance`
        : "Fund account",
  },
  {
    href: "/loans",
    label: "Loans",
    icon: Landmark,
    color: "bg-amber-500/15 text-amber-400",
    sub: (ctx: ReturnType<typeof useDashboard>) =>
      ctx.loans.length > 0
        ? `${ctx.loans.length} active`
        : "View & apply",
  },
  {
    href: "/cards",
    label: "Cards",
    icon: CreditCard,
    color: "bg-rose-500/15 text-rose-400",
    sub: (ctx: ReturnType<typeof useDashboard>) =>
      ctx.cards.length > 0
        ? `${ctx.cards.length} card${ctx.cards.length === 1 ? "" : "s"}`
        : "Virtual cards",
  },
  {
    href: "/investments",
    label: "Invest",
    icon: TrendingUp,
    color: "bg-purple-500/15 text-purple-400",
    sub: () => "Earn returns",
  },
] as const;

export function QuickAccess() {
  const dashboard = useDashboard();

  return (
    <div className="mt-3 rounded-xl border border-white/5 bg-surface-card p-3.5 sm:p-4">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
        Quick access
      </h2>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 md:gap-3">
        {QUICK_LINKS.map((item) => {
          const Icon = item.icon;
          const sub = dashboard.isLoading ? "…" : item.sub(dashboard);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-3.5 text-center transition-colors",
                "hover:border-brand-500/30 hover:bg-brand-500/5"
              )}
            >
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl",
                  item.color
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="text-[11px] text-gray-500">{sub}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
