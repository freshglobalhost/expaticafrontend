"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Sparkles, Loader2 } from "lucide-react";
import { ELIGIBILITY_CRITERIA } from "@/lib/loans-mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/auth/form-field";
import Link from "next/link";

export function LoanEligibility() {
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<null | "eligible" | "review">(null);

  const runCheck = async () => {
    setChecking(true);
    await new Promise((r) => setTimeout(r, 1500));
    setChecking(false);
    setResult("review");
  };

  const metCount = ELIGIBILITY_CRITERIA.filter((c) => c.met).length;
  const score = Math.round((metCount / ELIGIBILITY_CRITERIA.length) * 100);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-surface-card p-6">
        <h2 className="font-semibold text-white">Quick eligibility check</h2>
        <p className="mt-1 text-sm text-gray-400">Enter your details for an instant pre-qualification</p>
        <div className="mt-6 space-y-4">
          <FormField label="Annual income" htmlFor="income">
            <Input id="income" placeholder="$75,000" />
          </FormField>
          <FormField label="Employment type" htmlFor="employment">
            <Input id="employment" placeholder="Full-time employed" />
          </FormField>
          <FormField label="Requested loan amount" htmlFor="amount">
            <Input id="amount" placeholder="$25,000" />
          </FormField>
          <Button className="w-full" onClick={runCheck} disabled={checking}>
            {checking ? <Loader2 className="h-5 w-5 animate-spin" /> : "Check eligibility"}
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-surface-card p-6">
        {result ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/20">
                <Sparkles className="h-10 w-10 text-amber-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">Pre-qualified for review</h3>
              <p className="mt-2 text-sm text-gray-400">
                Score: {score}% — Complete a full application for final approval
              </p>
              <Button className="mt-6" asChild>
                <Link href="/loans/apply">Start application</Link>
              </Button>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-semibold text-white">Criteria overview</h2>
              <span className="text-2xl font-bold text-brand-400">{score}%</span>
            </div>
            <ul className="space-y-3">
              {ELIGIBILITY_CRITERIA.map((c) => (
                <li
                  key={c.label}
                  className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3"
                >
                  <div>
                    <p className="text-sm text-white">{c.label}</p>
                    <p className="text-xs text-gray-500">{c.value}</p>
                  </div>
                  {c.met ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400" />
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
