"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  BarChart3,
  Wallet,
  Lock,
  Shield,
  Loader2,
} from "lucide-react";
import {
  calcExpectedRoi,
  calcTotalReturn,
} from "@/lib/investments-mock-data";
import { getInvestmentPlan, createUserInvestment } from "@/lib/api/investments";
import { mapApiInvestmentPlan } from "@/lib/investments-api-mapper";
import { useDashboard } from "@/components/providers/dashboard-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/auth/form-field";
import { getErrorMessage } from "@/lib/api/get-error-message";
import { ApiError } from "@/lib/api/client";
import { cn } from "@/lib/utils";
import {
  useAccountCurrency,
  useCurrencyInputPrefix,
  useFormatAccountMoney,
} from "@/hooks/use-account-currency";

export function InvestPlanFlow({ planId }: { planId: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { summary, refetch } = useDashboard();
  const accountCurrency = useAccountCurrency();
  const formatMoney = useFormatAccountMoney();
  const currencyPrefix = useCurrencyInputPrefix();
  const planQuery = useQuery({
    queryKey: ["investment-plan", planId],
    queryFn: () => getInvestmentPlan(planId),
  });

  const [amount, setAmount] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plan = planQuery.data ? mapApiInvestmentPlan(planQuery.data) : null;

  const amountNum = parseFloat(amount) || 0;
  const maxBal = parseFloat(summary?.primary_wallet_balance ?? "0") || 0;

  const expectedRoi = useMemo(
    () => (plan && amountNum > 0 ? calcExpectedRoi(amountNum, plan) : 0),
    [amountNum, plan]
  );
  const totalReturn = useMemo(
    () => (plan && amountNum > 0 ? calcTotalReturn(amountNum, plan) : 0),
    [amountNum, plan]
  );

  const overMax = plan ? amountNum > plan.maxAmount : false;
  const overBalance = amountNum > maxBal;
  const belowMin = plan ? amountNum > 0 && amountNum < plan.minAmount : false;

  const canSubmit =
    !!plan?.planId &&
    amountNum >= (plan?.minAmount ?? 0) &&
    !overMax &&
    !overBalance &&
    agreed &&
    pin.length === 4 &&
    !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !plan?.planId) return;
    setLoading(true);
    setError(null);
    try {
      await createUserInvestment({
        plan: plan.planId,
        invested_amount: amountNum.toFixed(2),
        transaction_pin: pin,
      });
      await queryClient.invalidateQueries({ queryKey: ["user-investments"] });
      await refetch();
      router.push("/investments/my?success=1");
    } catch (err) {
      setError(
        err instanceof ApiError
          ? getErrorMessage(err, "Investment failed.")
          : "Investment failed."
      );
      setLoading(false);
    }
  };

  if (planQuery.isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
      </div>
    );
  }

  if (!plan) {
    return (
      <p className="text-center text-sm text-gray-500">
        Plan not found.{" "}
        <Link href="/investments" className="text-brand-400 hover:underline">
          Browse plans
        </Link>
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <Link
        href="/investments"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to plans
      </Link>

      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-surface-card px-4 py-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
            Available balance
          </p>
          <p className="text-lg font-bold text-white">{formatMoney(maxBal)}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15">
          <Wallet className="h-5 w-5 text-brand-400" />
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-surface-card p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-white">{plan.name}</h2>
            <p className="text-xs text-gray-500">Investment details</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {[
            { label: "Minimum", value: formatMoney(plan.minAmount) },
            { label: "Maximum", value: formatMoney(plan.maxAmount) },
            { label: "ROI", value: plan.roiDisplay, green: true },
            { label: "Duration", value: plan.duration },
            {
              label: "Capital return",
              value: plan.capitalReturned ? "Capital + ROI Returned" : "ROI only",
              green: plan.capitalReturned,
              span: true,
            },
          ].map((cell) => (
            <div
              key={cell.label}
              className={cn(
                "rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-2",
                cell.span && "col-span-2 sm:col-span-3"
              )}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                {cell.label}
              </p>
              <p
                className={cn(
                  "mt-0.5 text-xs font-semibold sm:text-sm",
                  cell.green ? "text-emerald-400" : "text-white"
                )}
              >
                {cell.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-sm text-red-400">{error}</p>}
        <div className="rounded-xl border border-white/10 bg-surface-card p-4">
          <h3 className="font-semibold text-white">Enter investment amount</h3>

          <label className="mt-3 block text-xs font-medium text-gray-400">
            Investment amount ($)
          </label>
          <div className="relative mt-1.5">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-400">
              $
            </span>
            <input
              type="number"
              min={0}
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="h-11 w-full rounded-xl border border-white/10 bg-surface-elevated pl-8 pr-3 text-lg font-bold text-white placeholder:text-gray-600 focus:border-brand-500/50 focus:outline-none"
            />
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] text-gray-500">
            <span>Min: {formatMoney(plan.minAmount)}</span>
            <span>Max: {formatMoney(plan.maxAmount)}</span>
          </div>
          {(overMax || overBalance || belowMin) && amountNum > 0 && (
            <p className="mt-1 text-xs text-red-400">
              {overBalance
                ? "Insufficient account balance"
                : overMax
                  ? "Amount exceeds plan maximum"
                  : "Amount below minimum"}
            </p>
          )}

          <FormField label="Transaction PIN" htmlFor="inv-pin" className="mt-4">
            <Input
              id="inv-pin"
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="••••"
            />
          </FormField>

          <div className="mt-4 space-y-2 rounded-lg border border-white/5 bg-white/[0.02] p-3 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Your investment</span>
              <span className="font-semibold text-white">{formatMoney(amountNum)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Expected ROI</span>
              <span className="font-semibold text-white">{formatMoney(expectedRoi)}</span>
            </div>
            <div className="flex justify-between border-t border-white/5 pt-2">
              <span className="font-semibold text-white">Total return</span>
              <span className="font-bold text-emerald-400">{formatMoney(totalReturn)}</span>
            </div>
          </div>

          <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-white/20 accent-brand-500"
            />
            <span className="text-xs text-gray-400">
              I understand that my investment of{" "}
              <strong className="text-white">{formatMoney(amountNum || 0)}</strong> will be locked for{" "}
              <strong className="text-white">{plan.lockLabel}</strong> and returns will be
              automatically credited after the duration.
            </span>
          </label>

          <Button type="submit" className="mt-4 w-full" disabled={!canSubmit}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing…
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Confirm investment
              </>
            )}
          </Button>

          <p className="mt-3 flex items-center justify-center gap-1 text-center text-[10px] text-gray-500">
            <Shield className="h-3 w-3" />
            Your investment is secured with bank-grade encryption
          </p>
        </div>
      </form>
    </div>
  );
}
