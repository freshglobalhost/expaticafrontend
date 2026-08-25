"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useDashboard } from "@/components/providers/dashboard-provider";
import { Button } from "@/components/ui/button";
import { getReferralCode, getReferralLink } from "@/lib/referral";

export function ReferralSection() {
  const { user } = useDashboard();
  const [copied, setCopied] = useState(false);

  const referralCode =
    user?.referral_code || getReferralCode(user?.username);
  const referralLink =
    user?.referral_link || getReferralLink(user?.username);

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

  if (!referralCode || !referralLink) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-brand-500/20 bg-gradient-to-br from-brand-500/10 to-transparent p-4"
    >
      <h3 className="mb-2 text-sm font-semibold text-white">Your referral link</h3>
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

        <Button
          variant="secondary"
          size="sm"
          onClick={handleCopyLink}
          className="w-full"
        >
          <Copy className="h-4 w-4" />
          Copy referral link
        </Button>
      </div>
    </motion.div>
  );
}
