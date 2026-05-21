"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { INVESTMENT_PLANS } from "@/lib/investments-mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
function fmt(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function InvestmentPlanDetail({ id }: { id: string }) {
  const plan = INVESTMENT_PLANS.find((p) => p.id === id);
  if (!plan) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <Badge variant="info" className="mb-4">
        {plan.duration}
      </Badge>
      <h2 className="font-display text-3xl font-bold text-white">{plan.name}</h2>
      <p className="mt-2 text-gray-400">
        Invest between {fmt(plan.minAmount)} and {fmt(plan.maxAmount)}. Expected return:{" "}
        {plan.roiDisplay}.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-surface-card p-4 text-center">
          <p className="text-xs text-gray-500">Min. investment</p>
          <p className="text-xl font-bold text-white">{fmt(plan.minAmount)}</p>
        </div>
        <div className="rounded-xl bg-surface-card p-4 text-center">
          <p className="text-xs text-gray-500">Expected return</p>
          <p className="text-xl font-bold text-emerald-400">{plan.roiDisplay}</p>
        </div>
        <div className="rounded-xl bg-surface-card p-4 text-center">
          <p className="text-xs text-gray-500">Duration</p>
          <p className="text-xl font-bold text-white">{plan.duration}</p>
        </div>
      </div>
      <div className="mt-8 rounded-2xl border border-white/10 bg-surface-card p-6">
        <h3 className="font-semibold text-white">Start investing</h3>
        <Button className="mt-4 w-full" asChild>
          <Link href={`/investments/plans/${plan.id}`}>Continue to invest</Link>
        </Button>
      </div>
      <Link
        href="/investments"
        className="mt-6 inline-block text-sm text-brand-400 hover:underline"
      >
        ← All plans
      </Link>
    </div>
  );
}
