"use client";

import { motion } from "framer-motion";
import { Wifi, Snowflake } from "lucide-react";
import {
  CARD_THEMES,
  type VirtualCard,
} from "@/lib/cards-mock-data";
import { cn } from "@/lib/utils";

export function VirtualCardVisual({
  card,
  flipped = false,
  showCvv = false,
  cvv = "•••",
  className,
}: {
  card: VirtualCard;
  flipped?: boolean;
  showCvv?: boolean;
  cvv?: string;
  className?: string;
}) {
  const theme = CARD_THEMES[card.theme];

  return (
    <div className={cn("perspective-1000 mx-auto w-full max-w-[280px]", className)}>
      <motion.div
        className="relative aspect-[1.586/1] w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
      >
        {/* Front */}
        <div
          className={cn(
            "absolute inset-0 overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br p-4 shadow-2xl backface-hidden sm:p-5",
            theme.gradient,
            card.frozen && "opacity-60 grayscale"
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute inset-0 bg-card-shine" />
          {card.frozen && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <Snowflake className="h-16 w-16 text-white/80" />
            </div>
          )}
          <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
              {card.network === "visa" ? (
                <span className="font-display text-2xl font-bold italic tracking-tight text-white">
                  VISA
                </span>
              ) : (
                <div className="flex">
                  <div className="h-8 w-8 rounded-full bg-red-500 opacity-90" />
                  <div className="-ml-4 h-8 w-8 rounded-full bg-amber-500 opacity-90" />
                </div>
              )}
              <span className={cn("text-xs font-medium", theme.accent)}>
                {card.type === "premium" ? "PREMIUM" : "STANDARD"}
              </span>
            </div>
            <div>
              <p className="font-mono text-base tracking-[0.15em] text-white/95 sm:text-lg">
                {card.maskedCardNumber || `•••• •••• •••• ${card.last4}`}
              </p>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-[10px] uppercase text-white/50">Card holder</p>
                  <p className="text-sm font-medium text-white">{card.cardholderName}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase text-white/50">Expires</p>
                  <p className="text-sm font-medium text-white">{card.expiry}</p>
                </div>
                <Wifi className="h-6 w-6 rotate-90 text-white/60" />
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute inset-0 overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br p-6 shadow-2xl",
            "from-zinc-800 to-zinc-950"
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="mt-6 h-10 w-full rounded-md bg-zinc-700" />
          <div className="mt-6 flex justify-end">
            <div className="rounded bg-white/90 px-3 py-2">
              <p className="text-[10px] text-zinc-600">CVV</p>
              <motion.p
                key={showCvv ? cvv : "hidden"}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="font-mono text-lg font-bold text-zinc-900"
              >
                {showCvv ? cvv : "•••"}
              </motion.p>
            </div>
          </div>
          <p className="mt-auto text-center text-xs text-white/40">
            Expatica Virtual · Not a physical card
          </p>
        </div>
      </motion.div>
    </div>
  );
}
