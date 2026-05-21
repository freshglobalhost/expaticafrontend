"use client";

import Link from "next/link";
import { ChevronRight, CreditCard, Inbox, Loader2 } from "lucide-react";
import { useDashboard } from "@/components/providers/dashboard-provider";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function YourCardsPreview() {
  const { cards, isLoading } = useDashboard();
  const preview = cards.slice(0, 2);

  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
          Your cards
        </h2>
        <Link
          href="/cards"
          className="flex items-center gap-0.5 text-xs font-medium text-brand-400"
        >
          View all
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      {isLoading ? (
        <div className="flex justify-center rounded-xl border border-white/5 bg-surface-card py-8">
          <Loader2 className="h-6 w-6 animate-spin text-brand-400" />
        </div>
      ) : preview.length === 0 ? (
        <div className="flex flex-col items-center rounded-xl border border-white/5 bg-surface-card py-8 text-gray-500">
          <Inbox className="mb-2 h-7 w-7 opacity-40" />
          <p className="text-sm">No virtual cards yet</p>
          <Link href="/cards" className="mt-2 text-xs text-brand-400 hover:text-brand-300">
            Request a card
          </Link>
        </div>
      ) : (
        <ul className="space-y-2">
          {preview.map((card) => (
            <li key={card.id}>
              <Link
                href="/cards"
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-surface-card p-3 transition-colors hover:border-brand-500/25"
              >
                <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-brand-800">
                  <CreditCard className="h-4 w-4 text-white/80" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{card.name}</p>
                  <p className="text-[10px] text-gray-500">
                    •••• {card.last4} · {card.frozen ? "Frozen" : "Active"}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-bold text-white">
                  {fmt(card.available)}
                </p>
                <ChevronRight className="h-4 w-4 text-gray-600" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
