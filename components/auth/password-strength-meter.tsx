"use client";

import { motion } from "framer-motion";
import { getPasswordStrength } from "@/lib/password-strength";
import { cn } from "@/lib/utils";

interface PasswordStrengthMeterProps {
  password: string;
}

const labelColors: Record<string, string> = {
  weak: "text-red-400",
  fair: "text-amber-400",
  good: "text-brand-400",
  strong: "text-emerald-400",
};

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  if (!password) return null;

  const { score, label, color, checks } = getPasswordStrength(password);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="space-y-3 overflow-hidden"
    >
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">Password strength</span>
        <span className={cn("font-medium capitalize", labelColors[label])}>
          {label}
        </span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: i < score ? "100%" : "0%" }}
              transition={{ duration: 0.2 }}
              className={cn("h-full rounded-full", color)}
            />
          </div>
        ))}
      </div>
      <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
        {checks.map((check) => (
          <li
            key={check.label}
            className={cn(
              "flex items-center gap-1.5 text-xs transition-colors",
              check.met ? "text-emerald-400/90" : "text-gray-500"
            )}
          >
            <span
              className={cn(
                "h-1 w-1 rounded-full",
                check.met ? "bg-emerald-400" : "bg-gray-600"
              )}
            />
            {check.label}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
