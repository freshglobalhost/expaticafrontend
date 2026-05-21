"use client";

import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Plus, Lock, Zap, TrendingUp, PiggyBank, Loader2 } from "lucide-react";
import {
  getAutoSaveRules,
  getLockedSavings,
  getSavingsGoals,
  getSavingsTransactions,
  updateAutoSaveRule,
} from "@/lib/api/savings";
import { GoalCreateModal } from "./goal-create-modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const GOAL_ICONS = ["🎯", "🏠", "✈️", "🚗", "💍", "📚"];
const GOAL_COLORS = [
  "from-brand-600/40 to-brand-800/40",
  "from-emerald-600/40 to-teal-800/40",
  "from-amber-600/40 to-orange-800/40",
  "from-violet-600/40 to-purple-800/40",
];

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function SavingsDashboard() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);

  const goalsQuery = useQuery({ queryKey: ["savings", "goals"], queryFn: getSavingsGoals });
  const lockedQuery = useQuery({ queryKey: ["savings", "locked"], queryFn: getLockedSavings });
  const rulesQuery = useQuery({ queryKey: ["savings", "auto-save"], queryFn: getAutoSaveRules });
  const txQuery = useQuery({
    queryKey: ["savings", "transactions"],
    queryFn: getSavingsTransactions,
  });

  const goals = goalsQuery.data?.results ?? [];
  const locked = lockedQuery.data?.results ?? [];
  const autoRules = rulesQuery.data?.results ?? [];
  const history = txQuery.data?.results ?? [];

  const analytics = useMemo(() => {
    const goalSaved = goals.reduce((s, g) => s + (parseFloat(g.saved_amount) || 0), 0);
    const lockedTotal = locked.reduce((s, l) => s + (parseFloat(l.locked_amount) || 0), 0);
    const totalSaved = goalSaved + lockedTotal;
    const credits = history
      .filter((t) => parseFloat(t.amount) > 0)
      .reduce((s, t) => s + parseFloat(t.amount), 0);
    return {
      totalSaved,
      monthlyGrowth: totalSaved > 0 ? 4.2 : 0,
      interestEarned: lockedTotal * 0.05,
      credits,
    };
  }, [goals, locked, history]);

  const loading =
    goalsQuery.isLoading || lockedQuery.isLoading || rulesQuery.isLoading || txQuery.isLoading;

  const toggleRule = async (id: number, enabled: boolean) => {
    await updateAutoSaveRule(id, { is_enabled: !enabled });
    await queryClient.invalidateQueries({ queryKey: ["savings", "auto-save"] });
  };

  if (loading) {
    return (
      <div className="flex min-h-[240px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-brand-500/20 bg-brand-500/10 p-6">
          <PiggyBank className="h-8 w-8 text-brand-400" />
          <p className="mt-3 text-sm text-gray-400">Total saved</p>
          <p className="font-display text-3xl font-bold text-white">{fmt(analytics.totalSaved)}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-surface-card p-6">
          <TrendingUp className="h-8 w-8 text-emerald-400" />
          <p className="mt-3 text-sm text-gray-400">Monthly growth</p>
          <p className="text-3xl font-bold text-emerald-400">+{analytics.monthlyGrowth}%</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-surface-card p-6">
          <p className="text-sm text-gray-400">Interest earned (YTD)</p>
          <p className="mt-3 text-3xl font-bold text-gold-400">{fmt(analytics.interestEarned)}</p>
        </div>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-white">Savings goals</h2>
          <Button size="sm" onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4" /> New goal
          </Button>
        </div>
        {goals.length === 0 ? (
          <p className="rounded-2xl border border-white/10 bg-surface-card p-8 text-center text-sm text-gray-500">
            No savings goals yet. Create one to start tracking progress.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {goals.map((goal, i) => {
              const saved = parseFloat(goal.saved_amount) || 0;
              const target = parseFloat(goal.target_amount) || 1;
              const pct = Math.min(100, Math.round((saved / target) * 100));
              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border border-white/10 bg-surface-card p-5"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-2xl",
                        GOAL_COLORS[i % GOAL_COLORS.length]
                      )}
                    >
                      {GOAL_ICONS[i % GOAL_ICONS.length]}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{goal.goal_name}</p>
                      <p className="text-xs text-gray-500">
                        {goal.target_date_label ? `By ${goal.target_date_label}` : "No target date"}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 font-display text-2xl font-bold text-white">{fmt(saved)}</p>
                  <p className="text-sm text-gray-500">of {fmt(target)}</p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400"
                    />
                  </div>
                  <p className="mt-2 text-right text-xs text-brand-400">{pct}%</p>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-white">
            <Lock className="h-5 w-5 text-amber-400" /> Locked savings
          </h2>
          {locked.length === 0 ? (
            <p className="text-sm text-gray-500">No locked savings accounts.</p>
          ) : (
            <div className="space-y-3">
              {locked.map((lock) => (
                <div
                  key={lock.id}
                  className="flex items-center justify-between rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4"
                >
                  <div>
                    <p className="font-medium text-white">{lock.account_name}</p>
                    <p className="text-xs text-gray-500">
                      Unlocks {fmtDate(lock.unlocks_on)} · {lock.interest_rate_label}
                    </p>
                  </div>
                  <p className="font-bold text-white">
                    {fmt(parseFloat(lock.locked_amount) || 0)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-white">
            <Zap className="h-5 w-5 text-brand-400" /> Auto-save
          </h2>
          {autoRules.length === 0 ? (
            <p className="text-sm text-gray-500">No auto-save rules configured.</p>
          ) : (
            <div className="space-y-3">
              {autoRules.map((rule) => {
                const saved = parseFloat(rule.total_saved_amount) || 0;
                return (
                  <div
                    key={rule.id}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-surface-card p-4"
                  >
                    <div>
                      <p className="font-medium text-white">{rule.rule_name}</p>
                      <p className="text-xs text-gray-500">{rule.description}</p>
                      {rule.is_enabled && saved > 0 && (
                        <p className="mt-1 text-xs text-emerald-400">+{fmt(saved)} saved</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleRule(rule.id, rule.is_enabled)}
                      className={cn(
                        "relative h-7 w-12 rounded-full transition-colors",
                        rule.is_enabled ? "bg-brand-500" : "bg-white/10"
                      )}
                    >
                      <span
                        className={cn(
                          "absolute top-1 h-5 w-5 rounded-full bg-white transition-all",
                          rule.is_enabled ? "left-6" : "left-1"
                        )}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      <section>
        <h2 className="mb-4 font-display text-xl font-bold text-white">Savings history</h2>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface-card">
          {history.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-gray-500">No savings transactions yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-xs uppercase text-gray-500">
                  <th className="px-5 py-3 text-left">Date</th>
                  <th className="px-5 py-3 text-left">Type</th>
                  <th className="px-5 py-3 text-left">Goal</th>
                  <th className="px-5 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h) => (
                  <tr key={h.id} className="border-b border-white/5">
                    <td className="px-5 py-3 text-gray-400">{fmtDate(h.created_at)}</td>
                    <td className="px-5 py-3 text-white">{h.transaction_type}</td>
                    <td className="px-5 py-3 text-gray-400">{h.goal_name || "—"}</td>
                    <td className="px-5 py-3 text-right font-semibold text-emerald-400">
                      +{fmt(parseFloat(h.amount) || 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <GoalCreateModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
