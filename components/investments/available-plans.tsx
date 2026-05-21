"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { BarChart3, Check, Shield, ArrowRight, Loader2 } from "lucide-react";
import { getInvestmentPlans } from "@/lib/api/investments";
import { mapApiInvestmentPlan } from "@/lib/investments-api-mapper";
import { HOW_INVESTMENTS_WORK } from "@/lib/investments-mock-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n);
}

export function AvailablePlans() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["investment-plans"],
    queryFn: getInvestmentPlans,
  });

  const plans = (data?.results ?? []).map(mapApiInvestmentPlan);

  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
      </div>
    );
  }

  if (isError || plans.length === 0) {
    return (
      <p className="rounded-xl border border-white/10 bg-surface-card p-8 text-center text-sm text-gray-500">
        No investment plans available. Run{" "}
        <code className="text-brand-400">python manage.py seed_investments</code> on the backend.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-sm font-semibold text-white">Available Plans</h2>
        <p className="mt-0.5 text-xs text-gray-500">
          Choose a plan and start earning returns on your investment
        </p>
      </div>

      <div className="space-y-3">
        {plans.map((plan, i) => (
          <motion.article
            key={plan.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="rounded-xl border border-white/10 bg-surface-card p-4 sm:p-5"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-white">{plan.name}</h3>
                <p className="text-xs text-gray-500">Investment Plan</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                { label: "Min Amount", value: fmt(plan.minAmount) },
                { label: "Max Amount", value: fmt(plan.maxAmount) },
                { label: "ROI", value: plan.roiDisplay, highlight: true },
                { label: "Duration", value: plan.duration },
              ].map((cell) => (
                <div
                  key={cell.label}
                  className="rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-2 text-center"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                    {cell.label}
                  </p>
                  <p
                    className={cn(
                      "mt-0.5 text-sm font-bold",
                      cell.highlight ? "text-emerald-400" : "text-white"
                    )}
                  >
                    {cell.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Check className="h-3.5 w-3.5" />
                {plan.capitalReturned ? "Capital Returned" : "Capital Not Returned"}
              </span>
              <span className="flex items-center gap-1.5 text-gray-400">
                <Shield className="h-3.5 w-3.5" />
                Secure Investment
              </span>
            </div>

            <Button className="mt-4 w-full" asChild>
              <Link href={`/investments/plans/${plan.id}`}>
                Invest Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.article>
        ))}
      </div>

      <div className="rounded-xl border border-white/5 bg-surface-card p-4">
        <h3 className="text-sm font-semibold text-white">How Investments Work</h3>
        <ul className="mt-3 space-y-2">
          {HOW_INVESTMENTS_WORK.map((line) => (
            <li key={line} className="flex gap-2 text-xs text-gray-400">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-500" />
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
