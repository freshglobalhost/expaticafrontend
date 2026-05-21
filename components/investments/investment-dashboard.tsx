"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight, Loader2 } from "lucide-react";
import { getInvestmentPlans, getUserInvestments } from "@/lib/api/investments";
import { mapApiInvestmentPlan, mapApiUserInvestment } from "@/lib/investments-api-mapper";
import {
  GROWTH_CHART,
  PNL_CARDS,
  ASSET_ALLOCATION,
} from "@/lib/investments-mock-data";
import { MiniChart } from "@/components/dashboard/mini-chart";
import { DonutChart } from "./donut-chart";
import { Button } from "@/components/ui/button";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export function InvestmentDashboard() {
  const positionsQuery = useQuery({
    queryKey: ["user-investments"],
    queryFn: getUserInvestments,
  });
  const plansQuery = useQuery({
    queryKey: ["investment-plans"],
    queryFn: getInvestmentPlans,
  });

  const investments = (positionsQuery.data?.results ?? []).map(mapApiUserInvestment);
  const active = investments.filter((i) => i.status === "active");
  const totalInvested = active.reduce((s, i) => s + i.amount, 0);
  const totalReturn = active.reduce((s, i) => s + i.expectedRoi, 0);
  const totalValue = totalInvested + totalReturn;
  const returnPercent =
    totalInvested > 0 ? ((totalReturn / totalInvested) * 100).toFixed(1) : "0";

  const featuredPlans = (plansQuery.data?.results ?? [])
    .slice(0, 2)
    .map(mapApiInvestmentPlan);

  const loading = positionsQuery.isLoading || plansQuery.isLoading;

  if (loading) {
    return (
      <div className="flex min-h-[240px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-brand-500/20 bg-gradient-to-br from-brand-500/15 via-surface-card to-surface-elevated p-8"
      >
        <div className="relative z-10">
          <p className="text-sm text-gray-400">Portfolio value</p>
          <p className="font-display text-4xl font-bold text-white sm:text-5xl">
            {fmt(totalValue)}
          </p>
          <p className="mt-2 flex items-center gap-1 text-emerald-400">
            <TrendingUp className="h-4 w-4" />
            {active.length} active position{active.length !== 1 ? "s" : ""}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Invested {fmt(totalInvested)} · Expected return {fmt(totalReturn)} (+{returnPercent}
            %)
          </p>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-surface-card p-6">
          <h3 className="font-semibold text-white">Investment growth</h3>
          <MiniChart
            className="mt-6"
            data={GROWTH_CHART.map((d) => ({ label: d.month, value: d.value }))}
            height={140}
            color="from-brand-600 to-gold-500"
          />
        </div>
        <div className="rounded-2xl border border-white/10 bg-surface-card p-6">
          <h3 className="mb-4 font-semibold text-white">Asset allocation</h3>
          <DonutChart data={ASSET_ALLOCATION} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PNL_CARDS.map((card) => (
          <div key={card.label} className="rounded-xl border border-white/5 bg-surface-card p-4">
            <p className="text-xs text-gray-500">{card.label}</p>
            <p
              className={`text-lg font-bold ${card.positive ? "text-emerald-400" : "text-red-400"}`}
            >
              {card.positive ? "+" : ""}
              {fmt(Math.abs(card.amount))}
            </p>
          </div>
        ))}
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-white">Featured plans</h3>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/investments">
              View all <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        {featuredPlans.length === 0 ? (
          <p className="text-sm text-gray-500">No plans available.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {featuredPlans.map((plan) => (
              <Link
                key={plan.id}
                href={`/investments/plans/${plan.id}`}
                className="rounded-2xl border border-white/5 bg-surface-card p-5 transition-colors hover:border-brand-500/30"
              >
                <p className="font-semibold text-white">{plan.name}</p>
                <p className="mt-1 text-sm text-gray-400">
                  {plan.duration} · {plan.lockLabel}
                </p>
                <p className="mt-3 text-brand-400">{plan.roiDisplay} ROI</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
