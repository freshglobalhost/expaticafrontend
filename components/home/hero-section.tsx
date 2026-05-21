"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Wallet,
  CreditCard,
  PiggyBank,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const floatingCards = [
  { icon: Wallet, label: "Balance", value: "$2.4M", x: "-10%", y: "15%", delay: 0 },
  { icon: TrendingUp, label: "Investments", value: "+18.4%", x: "75%", y: "10%", delay: 0.2 },
  { icon: CreditCard, label: "Virtual Card", value: "•••• 4821", x: "80%", y: "55%", delay: 0.4 },
  { icon: PiggyBank, label: "Savings", value: "$850K", x: "5%", y: "60%", delay: 0.6 },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-surface bg-hero-gradient">
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-brand-600/5 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pb-12 pt-6 sm:px-6 sm:pt-8 lg:flex-row lg:items-center lg:gap-10 lg:px-8 lg:pb-16 lg:pt-10">
        {/* Copy */}
        <div className="z-10 flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wide text-brand-300 sm:text-xs"
          >
            <Sparkles className="h-4 w-4 shrink-0 text-gold-400" />
            Trusted by over 2 million customers worldwide
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Banking that{" "}
            <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-gold-400 bg-clip-text text-transparent">
              moves
            </span>{" "}
            at the speed of your ambitions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mx-auto mt-6 max-w-xl text-lg text-gray-400 lg:mx-0"
          >
            Premium digital banking, instant loans, smart investments, and
            virtual cards — all in one luxurious, secure platform built for
            a global, modern financial life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
          >
            <Button size="xl" className="group w-full sm:w-auto" asChild>
              <Link href="/loans">
                Apply for Loan
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="secondary" size="xl" className="w-full sm:w-auto" asChild>
              <Link href="/signup">Open Free Account</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 lg:justify-start"
          >
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Globally Regulated
            </span>
            <span>256-bit Encryption</span>
            <span>Insured Deposits</span>
          </motion.div>
        </div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mt-8 w-full flex-1 lg:mt-0"
        >
          <div className="relative mx-auto max-w-lg animate-float lg:max-w-none">
            {/* Main dashboard card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface-card to-surface-elevated p-6 shadow-2xl shadow-black/50">
              <div className="absolute inset-0 bg-card-shine" />
              <div className="relative">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Balance</p>
                    <p className="font-display text-3xl font-bold text-white">
                      $4,285,000
                    </p>
                  </div>
                  <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
                    +12.5% this month
                  </div>
                </div>

                <div className="mb-6 grid grid-cols-3 gap-3">
                  {[
                    { label: "Loans", value: "$1.2M", color: "brand" },
                    { label: "Savings", value: "$850K", color: "gold" },
                    { label: "Invest", value: "$2.1M", color: "emerald" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/5 bg-white/5 p-3"
                    >
                      <p className="text-xs text-gray-500">{item.label}</p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Mini chart */}
                <div className="flex h-24 items-end gap-1.5">
                  {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map(
                    (h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                        className="flex-1 rounded-t-sm bg-gradient-to-t from-brand-600 to-brand-400 opacity-80"
                      />
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Floating mini cards */}
            {floatingCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + card.delay }}
                  style={{ left: card.x, top: card.y }}
                  className="absolute hidden rounded-2xl border border-white/10 bg-surface-card/95 px-4 py-3 shadow-xl backdrop-blur-md lg:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/20">
                      <Icon className="h-4 w-4 text-brand-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{card.label}</p>
                      <p className="text-sm font-semibold text-white">
                        {card.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
