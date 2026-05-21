"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Brain,
  Shield,
  Percent,
  Headphones,
  Eye,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast Approval",
    description: "Loan decisions in under 5 minutes. Funds hit your account same day.",
  },
  {
    icon: Brain,
    title: "AI Credit Scoring",
    description: "Fair, transparent scoring that looks beyond traditional credit history.",
  },
  {
    icon: Shield,
    title: "Secure Banking",
    description: "Bank-grade encryption, biometric login, and real-time fraud monitoring.",
  },
  {
    icon: Percent,
    title: "Low Interest Rates",
    description: "Competitive APR starting at 15%. No surprises, no penalty traps.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Human support around the clock via chat, call, and in-app messaging.",
  },
  {
    icon: Eye,
    title: "No Hidden Fees",
    description: "What you see is what you pay. Zero maintenance fees on standard accounts.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="border-y border-white/5 bg-surface-elevated py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-brand-400">
            Why PennyCredit
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Built for trust. Designed for speed.
          </h2>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/20 to-brand-600/10">
                  <Icon className="h-6 w-6 text-brand-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
