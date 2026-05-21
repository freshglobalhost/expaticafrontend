"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Banknote,
  Building2,
  LineChart,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";

const products = [
  {
    icon: Banknote,
    title: "Personal Loans",
    description: "Up to $500K with flexible repayment. Approved in minutes.",
    href: "/loans",
    gradient: "from-brand-500/20 to-brand-600/5",
    accent: "text-brand-400",
  },
  {
    icon: Building2,
    title: "Banking",
    description: "Send money via wire, local transfer, PayPal, Wise, and more.",
    href: "/send",
    gradient: "from-emerald-500/20 to-emerald-600/5",
    accent: "text-emerald-400",
  },
  {
    icon: LineChart,
    title: "Investments",
    description: "Crypto, stocks, real estate, and fixed income from $100.",
    href: "/investments",
    gradient: "from-purple-500/20 to-purple-600/5",
    accent: "text-purple-400",
  },
  {
    icon: CreditCard,
    title: "Virtual Cards",
    description: "Instant virtual cards with limits, themes, and one-tap freeze.",
    href: "/cards",
    gradient: "from-rose-500/20 to-rose-600/5",
    accent: "text-rose-400",
  },
];

export function ProductsSection() {
  return (
    <section id="products" className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-brand-400">
            Our Products
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
            Everything your financial life needs
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -2 }}
              >
                <Link
                  href={product.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-surface-card p-4 transition-shadow hover:border-brand-500/30"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 transition-opacity group-hover:opacity-100`}
                  />
                  <div className="relative flex flex-1 flex-col">
                    <div
                      className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ${product.accent}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-base font-semibold text-white">
                      {product.title}
                    </h3>
                    <p className="mt-1.5 flex-1 text-xs leading-relaxed text-gray-400">
                      {product.description}
                    </p>
                    <span className="mt-3 flex items-center gap-1 text-xs font-medium text-brand-400">
                      Learn more
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
