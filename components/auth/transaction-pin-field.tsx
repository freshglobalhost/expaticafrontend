"use client";

import { cn } from "@/lib/utils";

interface TransactionPinFieldProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  masked?: boolean;
  autoComplete?: string;
  className?: string;
}

/** Single-field 4-digit transaction PIN — reliable mobile keyboard focus */
export function TransactionPinField({
  id = "transaction-pin",
  value,
  onChange,
  error,
  masked = true,
  autoComplete = "off",
  className,
}: TransactionPinFieldProps) {
  return (
    <input
      id={id}
      type={masked ? "password" : "tel"}
      inputMode="numeric"
      pattern="[0-9]*"
      maxLength={4}
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 4))}
      autoComplete={autoComplete}
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck={false}
      data-1p-ignore
      data-lpignore="true"
      placeholder="••••"
      aria-label="4-digit transaction PIN"
      className={cn(
        "h-11 w-full rounded-xl border bg-surface-elevated px-4 text-center text-lg font-bold tracking-[0.35em] text-white placeholder:tracking-normal placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-surface",
        error
          ? "border-red-500/50 focus:ring-red-500/50"
          : "border-surface-border focus:ring-brand-500/50",
        className
      )}
    />
  );
}
