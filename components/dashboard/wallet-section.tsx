"use client";

import { motion } from "framer-motion";
import { Eye, EyeOff, Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { QuickAccess } from "@/components/dashboard/quick-access";
import { useDashboard } from "@/components/providers/dashboard-provider";
import { cn } from "@/lib/utils";

function fmt(n: number | string, currency = "USD") {
  const num = typeof n === "string" ? parseFloat(n) : n;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number.isFinite(num) ? num : 0);
}

const CRYPTO_COLORS: Record<string, string> = {
  BTC: "text-orange-400",
  ETH: "text-purple-400",
  USDT: "text-emerald-400",
};

export function WalletSection() {
  const [hideBalance, setHideBalance] = useState(false);
  const { summary, isLoading } = useDashboard();

  const currency = summary?.currency_code ?? "USD";
  const balance = summary?.primary_wallet_balance ?? "0";
  const cryptoBalances = [
    { symbol: "BTC", amount: parseFloat(summary?.btc_balance ?? "0") },
    { symbol: "ETH", amount: parseFloat(summary?.eth_balance ?? "0") },
    { symbol: "USDT", amount: parseFloat(summary?.usdt_balance ?? "0") },
  ];

  return (
    <section id="wallets" className="scroll-mt-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 p-4 shadow-lg shadow-brand-900/40"
      >
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-12 -left-6 h-28 w-28 rounded-full bg-gold-500/10" />

        <div className="relative flex items-start justify-between gap-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-100/80">
              Available balance
            </p>
            <div className="mt-1 flex items-center gap-2">
              {isLoading && !summary ? (
                <Loader2 className="h-7 w-7 animate-spin text-white/80" />
              ) : (
                <p className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {hideBalance ? "••••••" : fmt(balance, currency)}
                </p>
              )}
              <button
                type="button"
                onClick={() => setHideBalance(!hideBalance)}
                className="rounded-lg p-1 text-white/70 hover:bg-white/10"
                aria-label={hideBalance ? "Show balance" : "Hide balance"}
              >
                {hideBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
            </div>
            <p className="mt-0.5 text-xs text-brand-100/70">
              {summary?.recent_transactions_count ?? 0} transactions on record
            </p>
          </div>
          <Link
            href="/crypto/deposit"
            className="flex items-center gap-1 rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/20"
          >
            <Plus className="h-3.5 w-3.5" />
            Fund
          </Link>
        </div>

        <div className="relative mt-4 grid grid-cols-3 gap-2 border-t border-white/15 pt-3">
          {cryptoBalances.map((c) => (
            <div key={c.symbol} className="text-center">
              <p className={cn("text-xs font-bold", CRYPTO_COLORS[c.symbol] ?? "text-white")}>
                {c.symbol}
              </p>
              <p className="mt-0.5 text-sm font-semibold text-white">
                {hideBalance
                  ? "••••"
                  : c.amount < 1
                    ? c.amount
                    : c.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      <QuickAccess />
    </section>
  );
}
