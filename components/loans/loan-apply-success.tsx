"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LoanApplySuccess() {
  return (
    <div className="mx-auto max-w-lg text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CheckCircle2 className="h-14 w-14 text-emerald-400" />
        </motion.div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-display text-3xl font-bold text-white"
      >
        Application submitted!
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6"
      >
        <div className="flex items-center justify-center gap-2 text-amber-400">
          <Clock className="h-5 w-5 animate-pulse" />
          <span className="font-semibold">Approval pending</span>
        </div>
        <p className="mt-3 text-sm text-gray-400">
          Reference <span className="font-mono text-white">APP-2026-88421</span>.
          We&apos;ll review your application within 24 hours and notify you by email.
        </p>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "65%" }}
            transition={{ delay: 0.6, duration: 1.2 }}
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-brand-500"
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">Review in progress — 65%</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
      >
        <Button asChild>
          <Link href="/loans/history">View loan history</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/dashboard">Back to dashboard</Link>
        </Button>
      </motion.div>
    </div>
  );
}
