"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Zap, Globe, type LucideIcon } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: string;
}

const FEATURES: { icon: LucideIcon; label: string }[] = [
  { icon: Shield, label: "Bank-grade security" },
  { icon: Zap, label: "Instant transfers" },
  { icon: Globe, label: "Global reach" },
];

const PAGE_COPY: Record<
  string,
  { title: React.ReactNode; subtitle: string }
> = {
  "/login": {
    title: (
      <>
        Welcome to your{" "}
        <span className="text-brand-400">financial future</span>
      </>
    ),
    subtitle:
      "Swift and secure access to loans, banking, and investments — all in one premium platform.",
  },
  "/signup": {
    title: (
      <>
        Start your{" "}
        <span className="text-brand-400">financial future</span>
      </>
    ),
    subtitle:
      "Create your free account in minutes. Set your transaction PIN once and manage money worldwide.",
  },
};

const DEFAULT_COPY = {
  title: (
    <>
      Your money,{" "}
      <span className="text-brand-400">elevated</span>
    </>
  ),
  subtitle:
    "Secure access to loans, banking, investments, and more — trusted by customers worldwide.",
};

export function AuthLayout({
  children,
  title: titleProp,
  subtitle: subtitleProp,
}: AuthLayoutProps) {
  const pathname = usePathname();
  const pageCopy = PAGE_COPY[pathname] ?? DEFAULT_COPY;
  const title = titleProp ?? pageCopy.title;
  const subtitle = subtitleProp ?? pageCopy.subtitle;

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Brand panel — compact top-aligned (competitor-style) */}
      <div className="relative hidden w-[42%] shrink-0 overflow-hidden lg:flex lg:flex-col">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute -right-10 bottom-1/4 h-64 w-64 rounded-full bg-gold-500/15 blur-3xl" />

        <div className="relative z-10 flex flex-col px-8 py-8 xl:px-10 xl:py-10">
          <Link href="/" className="flex w-fit items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-500/30">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-white">
              Penny<span className="text-brand-400">Credit</span>
            </span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 max-w-md xl:mt-10"
          >
            <h1 className="font-display text-3xl font-bold leading-tight text-white xl:text-[2rem]">
              {title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              {subtitle}
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {FEATURES.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    className="flex flex-col items-center rounded-xl border border-white/5 bg-white/5 px-2 py-3 text-center backdrop-blur-sm"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/15">
                      <Icon className="h-4 w-4 text-brand-400" />
                    </div>
                    <p className="mt-2 text-[11px] font-medium leading-tight text-gray-300">
                      {item.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex min-h-screen flex-1 flex-col bg-surface lg:bg-surface-elevated/30">
        <div className="flex items-center justify-between p-4 sm:p-6 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-lg font-bold text-white">
              Penny<span className="text-brand-400">Credit</span>
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center overflow-y-auto px-4 py-6 sm:px-8 lg:py-8">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
