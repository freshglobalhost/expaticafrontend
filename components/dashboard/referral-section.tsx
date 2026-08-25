"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Gift, Loader2 } from "lucide-react";
import { useDashboard } from "@/components/providers/dashboard-provider";
import { Button } from "@/components/ui/button";
import { resolveReferral } from "@/lib/referral";
import { cn } from "@/lib/utils";

export function ReferralSection({ compact = false }: { compact?: boolean }) {
  const { user, isLoading } = useDashboard();
  const [copied, setCopied] = useState(false);
  const { code: referralCode, link: referralLink } = resolveReferral(user);

  const handleCopyLink = async () => {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (isLoading && !user) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.02]",
          compact ? "h-[52px]" : "py-6"
        )}
      >
        <Loader2 className="h-4 w-4 animate-spin text-brand-400" />
      </div>
    );
  }

  if (!referralCode || !referralLink) {
    return null;
  }

  if (compact) {
    return (
      <div className="mt-3 rounded-xl border border-brand-500/20 bg-brand-500/5 p-2.5">
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
          Referral link
        </p>
        <div className="flex items-center gap-2">
          <code className="min-w-0 flex-1 truncate text-[11px] text-gray-300">
            {referralLink}
          </code>
          <button
            type="button"
            onClick={handleCopyLink}
            className="shrink-0 rounded-lg p-1 text-gray-500 hover:bg-white/5 hover:text-brand-400"
            title="Copy referral link"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
        <p className="mt-1 truncate text-[10px] text-gray-500">
          Name: <span className="text-gray-300">{referralCode}</span>
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-brand-500/20 bg-gradient-to-br from-brand-500/10 to-transparent p-4"
    >
      <h3 className="mb-1 flex items-center gap-2 text-sm font-semibold text-white">
        <Gift className="h-4 w-4 text-brand-400" />
        Your referral link
      </h3>
      <p className="mb-3 text-xs text-gray-500">
        Share this link with friends. Your username is used as the referral name.
      </p>

      <div className="space-y-3">
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
          <code className="flex-1 truncate text-xs text-gray-300">{referralLink}</code>
          <button
            type="button"
            onClick={handleCopyLink}
            className="shrink-0 text-gray-500 hover:text-brand-400"
            title="Copy referral link"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
        <p className="text-[11px] text-gray-500">
          Referral name: <span className="font-medium text-gray-300">{referralCode}</span>
        </p>

        <AnimatePresence>
          {copied && (
            <motion.p
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              className="text-xs text-emerald-400"
            >
              Copied to clipboard
            </motion.p>
          )}
        </AnimatePresence>

        <Button variant="secondary" size="sm" onClick={handleCopyLink} className="w-full">
          <Copy className="h-4 w-4" />
          Copy referral link
        </Button>
      </div>
    </motion.div>
  );
}
