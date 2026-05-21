"use client";

import { ShieldCheck } from "lucide-react";
import { PinInput } from "@/components/auth/pin-input";

interface CardPinSectionProps {
  pin: string;
  onPinChange: (value: string) => void;
  formKey: string;
}

export function CardPinSection({ pin, onPinChange, formKey }: CardPinSectionProps) {
  return (
    <div className="rounded-xl border border-amber-500/15 bg-amber-500/5 p-3">
      <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-amber-400/90">
        <ShieldCheck className="h-3.5 w-3.5" />
        Transaction PIN
      </p>
      <p className="mb-3 text-center text-[11px] text-gray-500">
        Enter your 4-digit PIN to authorize this action
      </p>
      <PinInput key={formKey} value={pin} onChange={onPinChange} />
    </div>
  );
}
