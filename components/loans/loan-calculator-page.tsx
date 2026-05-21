"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { calculateLoan } from "@/lib/loan-calculator";
import { formatCurrency } from "@/lib/utils";

export function LoanCalculatorPage() {
  const [amount, setAmount] = useState(25000);
  const [duration, setDuration] = useState(24);
  const [rate, setRate] = useState(10);

  const calc = useMemo(() => {
    return calculateLoan(amount, duration, rate / 100);
  }, [amount, duration, rate]);

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-surface-card p-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/20">
          <Calculator className="h-6 w-6 text-brand-400" />
        </div>
        <div>
          <h2 className="font-semibold text-white">Loan calculator</h2>
          <p className="text-sm text-gray-400">Estimate monthly payments instantly</p>
        </div>
      </div>
      <div className="space-y-8">
        <div>
          <div className="mb-3 flex justify-between">
            <span className="text-sm text-gray-400">Loan amount</span>
            <span className="font-display text-xl font-bold text-white">
              {formatCurrency(amount)}
            </span>
          </div>
          <Slider value={[amount]} onValueChange={([v]) => setAmount(v)} min={1000} max={500000} step={1000} />
        </div>
        <div>
          <div className="mb-3 flex justify-between">
            <span className="text-sm text-gray-400">Term</span>
            <span className="font-bold text-white">{duration} months</span>
          </div>
          <Slider value={[duration]} onValueChange={([v]) => setDuration(v)} min={3} max={360} step={1} />
        </div>
        <div>
          <div className="mb-3 flex justify-between">
            <span className="text-sm text-gray-400">Interest rate (APR)</span>
            <span className="font-bold text-white">{rate}%</span>
          </div>
          <Slider value={[rate]} onValueChange={([v]) => setRate(v)} min={3} max={24} step={0.1} />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-brand-500/30 bg-brand-500/10 p-4 text-center">
            <p className="text-xs text-brand-300">Monthly</p>
            <p className="mt-1 text-xl font-bold text-white">{formatCurrency(calc.monthlyPayment)}</p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-center">
            <p className="text-xs text-gray-500">Total interest</p>
            <p className="mt-1 text-xl font-bold text-gold-400">{formatCurrency(calc.totalInterest)}</p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-center">
            <p className="text-xs text-gray-500">Total repayment</p>
            <p className="mt-1 text-xl font-bold text-white">{formatCurrency(calc.totalRepayment)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
