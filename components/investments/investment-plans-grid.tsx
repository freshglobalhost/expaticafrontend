"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { INVESTMENT_PLANS } from "@/lib/investments-mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function InvestmentPlansGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {INVESTMENT_PLANS.map((plan, i) => (
        <motion.article
          key={plan.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="rounded-2xl border border-white/10 bg-surface-card p-6"
        >
          <div className="flex items-start justify-between">
            <h3 className="font-display text-xl font-bold text-white">{plan.name}</h3>
            <Badge variant="info">{plan.duration}</Badge>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            {plan.capitalReturned ? "Capital + returns at maturity" : "ROI only at maturity"}
          </p>
          <dl className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-lg bg-white/5 p-2">
              <dt className="text-gray-500">Min</dt>
              <dd className="font-semibold text-white">{fmt(plan.minAmount)}</dd>
            </div>
            <div className="rounded-lg bg-white/5 p-2">
              <dt className="text-gray-500">Return</dt>
              <dd className="font-semibold text-emerald-400">{plan.roiDisplay}</dd>
            </div>
            <div className="rounded-lg bg-white/5 p-2">
              <dt className="text-gray-500">Horizon</dt>
              <dd className="font-semibold text-white">{plan.duration}</dd>
            </div>
          </dl>
          <Button className="mt-6 w-full" asChild>
            <Link href={`/investments/plans/${plan.id}`}>View details</Link>
          </Button>
        </motion.article>
      ))}
    </div>
  );
}
