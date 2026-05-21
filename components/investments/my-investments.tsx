"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  DollarSign,
  TrendingUp,
  Clock,
  Plus,
  ChevronRight,
  BarChart3,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { getUserInvestments } from "@/lib/api/investments";
import { mapApiUserInvestment } from "@/lib/investments-api-mapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n);
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function daysRemaining(expiresAt: string) {
  const diff = new Date(expiresAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function progressPercent(startedAt: string, expiresAt: string) {
  const start = new Date(startedAt).getTime();
  const end = new Date(expiresAt).getTime();
  const now = Date.now();
  if (end <= start) return 0;
  return Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
}

export function MyInvestments() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["user-investments"],
    queryFn: getUserInvestments,
  });

  const investments = useMemo(
    () => (data?.results ?? []).map(mapApiUserInvestment),
    [data]
  );

  useEffect(() => {
    if (searchParams.get("success") === "1") {
      setShowSuccess(true);
      router.replace("/investments/my", { scroll: false });
    }
  }, [searchParams, router]);

  const summary = useMemo(() => {
    const active = investments.filter((i) => i.status === "active");
    return {
      activeCount: active.length,
      totalInvested: active.reduce((s, i) => s + i.amount, 0),
      totalReturns: active.reduce((s, i) => s + i.expectedRoi, 0),
      pending: investments.filter((i) => i.status !== "active").length,
    };
  }, [investments]);

  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { label: "Active", value: String(summary.activeCount), icon: Briefcase },
            { label: "Invested", value: fmt(summary.totalInvested), icon: DollarSign },
            { label: "Returns", value: fmt(summary.totalReturns), icon: TrendingUp },
            { label: "Pending", value: String(summary.pending), icon: Clock },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-surface-card px-3 py-3"
              >
                <Icon className="h-4 w-4 text-brand-400" />
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                  {stat.label}
                </p>
                <p className="text-sm font-bold text-white">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <Link
          href="/investments"
          className="flex items-center justify-between rounded-xl border border-white/10 bg-surface-card px-4 py-3 transition-colors hover:border-brand-500/30 hover:bg-brand-500/5"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15">
              <Plus className="h-5 w-5 text-brand-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">New investment</p>
              <p className="text-xs text-gray-500">Browse available investments</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-500" />
        </Link>

        <div>
          <h2 className="mb-3 text-sm font-semibold text-white">All investments</h2>
          {investments.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-surface-card py-12 text-center">
              <BarChart3 className="mx-auto h-10 w-10 text-gray-600" />
              <p className="mt-3 text-sm text-gray-500">No investments yet</p>
              <Button className="mt-4" size="sm" asChild>
                <Link href="/investments">Browse plans</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {investments.map((inv, i) => {
                const remaining = daysRemaining(inv.expiresAt);
                const progress = progressPercent(inv.startedAt, inv.expiresAt);
                const isActive = inv.status === "active";
                return (
                  <motion.article
                    key={inv.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="rounded-xl border border-white/10 bg-surface-card p-4"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15">
                          <BarChart3 className="h-5 w-5 text-brand-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{inv.planName}</p>
                          <p className="text-[10px] text-gray-500">{inv.referenceCode}</p>
                        </div>
                      </div>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize",
                          isActive
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-white/10 text-gray-400"
                        )}
                      >
                        {inv.status}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-center sm:grid-cols-4">
                      {[
                        { label: "Invested", value: fmt(inv.amount) },
                        { label: "Expected ROI", value: fmt(inv.expectedRoi) },
                        { label: "Started", value: fmtDate(inv.startedAt) },
                        { label: "Expires", value: fmtDate(inv.expiresAt) },
                      ].map((cell) => (
                        <div
                          key={cell.label}
                          className="rounded-lg border border-white/5 bg-white/[0.02] px-2 py-2"
                        >
                          <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-500">
                            {cell.label}
                          </p>
                          <p className="mt-0.5 text-xs font-bold text-white">{cell.value}</p>
                        </div>
                      ))}
                    </div>

                    {isActive && (
                      <div className="mt-3">
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-brand-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs">
                          <span className="text-gray-500">{remaining} days remaining</span>
                          <Link
                            href={`/investments/plans/${inv.planId}`}
                            className="font-medium text-brand-400 hover:underline"
                          >
                            View plan
                          </Link>
                        </div>
                      </div>
                    )}
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
              onClick={() => setShowSuccess(false)}
            />
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-sm rounded-xl border border-white/10 bg-surface-card p-6 text-center shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">Success</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Investment successful! Your returns will be credited automatically at maturity.
                </p>
                <Button className="mt-5 w-full" onClick={() => setShowSuccess(false)}>
                  Close
                </Button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
