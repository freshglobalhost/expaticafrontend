"use client";

import { motion } from "framer-motion";
import { PiggyBank, TrendingUp, Wallet, PieChart } from "lucide-react";
import {
  SPENDING_CHART,
  SAVINGS_CHART,
  INVESTMENT_CHART,
} from "@/lib/dashboard-mock-data";
import { MiniChart } from "./mini-chart";

const overviewCards = [
  {
    label: "Net worth",
    value: "$89,240",
    change: "+8.2%",
    icon: Wallet,
    color: "text-brand-400",
  },
  {
    label: "Monthly spending",
    value: "$3,900",
    change: "-12%",
    icon: PieChart,
    color: "text-amber-400",
  },
  {
    label: "Total savings",
    value: "$11,400",
    change: "+24%",
    icon: PiggyBank,
    color: "text-emerald-400",
  },
  {
    label: "Investments",
    value: "$35,720",
    change: "+18.4%",
    icon: TrendingUp,
    color: "text-purple-400",
  },
];

export function AnalyticsSection() {
  return (
    <section id="analytics" className="mt-6 scroll-mt-6">
      <h2 className="mb-3 font-display text-lg font-bold text-white">
        Analytics
      </h2>

      <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-xl border border-white/5 bg-surface-card p-3 sm:p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">{card.label}</p>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
              <p className="mt-1.5 font-display text-lg font-bold text-white sm:text-xl">
                {card.value}
              </p>
              <p className="mt-1 text-xs text-emerald-400">{card.change}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-white/10 bg-surface-card p-4"
        >
          <h3 className="text-sm font-semibold text-white">Spending</h3>
          <p className="text-xs text-gray-500">Last 5 months</p>
          <MiniChart
            className="mt-6"
            data={SPENDING_CHART.map((d) => ({
              label: d.month,
              value: d.amount,
            }))}
            color="from-amber-600 to-amber-400"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="rounded-xl border border-white/10 bg-surface-card p-4"
        >
          <h3 className="text-sm font-semibold text-white">Savings growth</h3>
          <p className="text-xs text-gray-500">Last 5 months</p>
          <MiniChart
            className="mt-6"
            data={SAVINGS_CHART.map((d) => ({
              label: d.month,
              value: d.amount,
            }))}
            color="from-emerald-600 to-emerald-400"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-brand-500/20 bg-gradient-to-br from-brand-500/10 to-surface-card p-4"
        >
          <h3 className="font-semibold text-white">Investment portfolio</h3>
          <p className="text-xs text-gray-500">Last 5 months</p>
          <MiniChart
            className="mt-6"
            data={INVESTMENT_CHART.map((d) => ({
              label: d.month,
              value: d.amount,
            }))}
            color="from-purple-600 to-brand-400"
          />
        </motion.div>
      </div>
    </section>
  );
}
