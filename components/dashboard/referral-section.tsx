"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getUserReferralLink } from "@/lib/api/banking";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ReferralSection() {
  const [copied, setCopied] = useState(false);

  const referralQuery = useQuery({
    queryKey: ["referral-link"],
    queryFn: getUserReferralLink,
    retry: 1,
  });

  const referralLink = referralQuery.data?.referral_link || "";
  const referralCode = referralQuery.data?.referral_code || "";

  const handleCopyLink = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (referralQuery.isLoading) {
    return (
      <div className="flex justify-center py-6">
        <Loader2 className="h-5 w-5 animate-spin text-brand-400" />
      </div>
    );
  }

  if (referralQuery.isError || !referralLink) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-brand-500/20 bg-gradient-to-br from-brand-500/10 to-transparent p-4"
    >
      <h3 className="mb-2 text-sm font-semibold text-white">Your Referral Link</h3>
      <p className="mb-3 text-xs text-gray-500">
        Share this link with friends and earn rewards when they sign up
      </p>

      <div className="space-y-3">
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
          <code className="flex-1 truncate text-xs text-gray-300">{referralCode}</code>
          <button
            type="button"
            onClick={handleCopyLink}
            className="shrink-0 text-gray-500 hover:text-brand-400"
            title="Copy referral code"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>

        <AnimatePresence>
          {copied && (
            <motion.p
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              className="text-xs text-emerald-400"
            >
              ✓ Copied to clipboard
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
          Copy Full Link
        </Button>
      </div>
    </motion.div>
  );
}
