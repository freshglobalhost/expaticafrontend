"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Percent, Calendar, Wallet } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { calculateLoan } from "@/lib/loan-calculator";
import { formatCurrency } from "@/lib/utils";

const MIN_AMOUNT = 1_000;
const MAX_AMOUNT = 500_000;
const MIN_DURATION = 3;
const MAX_DURATION = 60;

export function LoanCalculator() {
  const [amount, setAmount] = useState(50_000);
  const [duration, setDuration] = useState(12);

  const calculation = useMemo(
    () => calculateLoan(amount, duration),
    [amount, duration]
  );

  return (
    <section id="calculator" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-brand-400">
            Loan Calculator
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Know your repayment before you apply
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface-card to-surface-elevated shadow-2xl"
        >
          <div className="border-b border-white/5 bg-brand-500/10 px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/20">
                <Calculator className="h-5 w-5 text-brand-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Interactive Calculator</h3>
                <p className="text-sm text-gray-400">Real-time estimates · 18% APR</p>
              </div>
            </div>
          </div>

          <div className="space-y-10 p-8">
            {/* Amount slider */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Wallet className="h-4 w-4 text-brand-400" />
                  Loan Amount
                </label>
                <span className="font-display text-2xl font-bold text-white">
                  {formatCurrency(amount)}
                </span>
              </div>
              <Slider
                value={[amount]}
                onValueChange={([v]) => setAmount(v)}
                min={MIN_AMOUNT}
                max={MAX_AMOUNT}
                step={1_000}
              />
              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>{formatCurrency(MIN_AMOUNT)}</span>
                <span>{formatCurrency(MAX_AMOUNT)}</span>
              </div>
            </div>

            {/* Duration slider */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Calendar className="h-4 w-4 text-brand-400" />
                  Duration
                </label>
                <span className="font-display text-2xl font-bold text-white">
                  {duration} months
                </span>
              </div>
              <Slider
                value={[duration]}
                onValueChange={([v]) => setDuration(v)}
                min={MIN_DURATION}
                max={MAX_DURATION}
                step={1}
              />
              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>{MIN_DURATION} months</span>
                <span>{MAX_DURATION} months</span>
              </div>
            </div>

            {/* Results */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 text-center">
                <p className="text-xs uppercase tracking-wider text-brand-300">
                  Monthly Repayment
                </p>
                <p className="mt-2 font-display text-2xl font-bold text-white">
                  {formatCurrency(calculation.monthlyPayment)}
                </p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/5 p-5 text-center">
                <p className="flex items-center justify-center gap-1 text-xs uppercase tracking-wider text-gray-400">
                  <Percent className="h-3 w-3" />
                  Total Interest
                </p>
                <p className="mt-2 font-display text-2xl font-bold text-gold-400">
                  {formatCurrency(calculation.totalInterest)}
                </p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/5 p-5 text-center">
                <p className="text-xs uppercase tracking-wider text-gray-400">
                  Total Repayment
                </p>
                <p className="mt-2 font-display text-2xl font-bold text-white">
                  {formatCurrency(calculation.totalRepayment)}
                </p>
              </div>
            </div>

            <p className="text-center text-xs text-gray-500">
              Estimates are indicative. Final rates depend on credit assessment.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
