"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { MergedTransferMethod } from "@/lib/transfer-methods-merge";
import { cn } from "@/lib/utils";

export function TransferMethodCard({
  method,
  onClick,
  index,
  disabled,
}: {
  method: MergedTransferMethod;
  onClick: () => void;
  index: number;
  disabled?: boolean;
}) {
  const unavailable = disabled || method.apiId == null;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      onClick={onClick}
      disabled={unavailable}
      className={cn(
        "group w-full rounded-xl border border-white/10 bg-surface-card p-3.5 text-left shadow-sm transition-all sm:p-4",
        "hover:border-brand-500/40 hover:bg-brand-500/5",
        unavailable && "cursor-not-allowed opacity-50 hover:border-white/10 hover:bg-surface-card"
      )}
    >
      <div
        className={cn(
          "mb-3 h-12 w-12 overflow-hidden rounded-xl ring-2 ring-white/10 transition-all sm:h-[3.25rem] sm:w-[3.25rem]",
          "group-hover:ring-brand-500/50"
        )}
      >
        <Image
          src={method.image}
          alt={method.label}
          width={52}
          height={52}
          className={cn(
            "h-full w-full",
            method.image.endsWith(".svg") ? "object-contain p-1.5" : "object-cover"
          )}
          unoptimized
        />
      </div>
      <p className="text-[15px] font-semibold leading-tight text-white sm:text-base">
        {method.label}
      </p>
      <p className="mt-0.5 text-xs leading-snug text-gray-500">{method.subtitle}</p>
    </motion.button>
  );
}
