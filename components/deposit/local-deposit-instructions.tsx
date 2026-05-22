"use client";

import Link from "next/link";
import { Building2, Bitcoin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LocalDepositInstructions() {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
        <Building2 className="h-8 w-8 shrink-0 text-amber-400" />
        <div>
          <h2 className="font-display text-lg font-semibold text-white">
            Local bank deposit not enabled
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Your account does not have assigned local bank details yet.
          </p>
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-white/5 bg-surface-card p-5 text-sm text-gray-400">
        <p className="font-medium text-white">How to fund your wallet</p>
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            <strong className="text-gray-300">Deposit with cryptocurrency</strong> — use
            Bitcoin, Ethereum, USDT, or SOL. Transfers are reviewed after you submit proof.
          </li>
          <li>
            <strong className="text-gray-300">Request local bank details</strong> — open live
            chat and ask support to enable a local bank transfer option for your country. An
            admin will assign your personal bank account details when approved.
          </li>
        </ol>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild className="flex-1">
          <Link href="/crypto/deposit">
            <Bitcoin className="mr-2 h-4 w-4" />
            Crypto deposit
          </Link>
        </Button>
        <Button
          variant="secondary"
          className="flex-1"
          type="button"
          onClick={() => {
            const tawk = (
              window as Window & { Tawk_API?: { maximize?: () => void } }
            ).Tawk_API;
            if (tawk?.maximize) {
              tawk.maximize();
            }
          }}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Contact support (live chat)
        </Button>
      </div>

      <p className="text-center text-xs text-gray-500">
        Use the chat widget in the bottom-right corner to reach support, or email us from
        your registered address.
      </p>
    </div>
  );
}
