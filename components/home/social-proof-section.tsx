"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "./animated-counter";
import { LiveActivityFeed } from "./live-activity-feed";

const stats = [
  { label: "Loans Disbursed", value: 12, suffix: "B+", prefix: "$", decimals: 0 },
  { label: "Active Users", value: 500, suffix: "K+", prefix: "", decimals: 0 },
  { label: "Approval Speed", value: 5, suffix: " min", prefix: "<", decimals: 0 },
  { label: "Satisfaction Rate", value: 98, suffix: "%", prefix: "", decimals: 0 },
];

export function SocialProofSection() {
  return (
    <section className="relative border-y border-white/5 bg-surface-elevated py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-brand-400">
            Trusted Worldwide
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Real people. Real money. Real time.
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/5 bg-surface-card p-6 text-center"
              >
                <p className="font-display text-3xl font-bold text-white sm:text-4xl">
                  <AnimatedCounter
                    end={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </p>
                <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Live feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/5 bg-surface-card p-6"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
              </span>
              <span className="text-sm font-medium text-gray-300">
                Live Activity
              </span>
            </div>
            <LiveActivityFeed />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
