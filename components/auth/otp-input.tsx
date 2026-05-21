"use client";

import { useRef, KeyboardEvent, ClipboardEvent } from "react";
import { cn } from "@/lib/utils";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  length?: number;
}

export function OtpInput({
  value,
  onChange,
  error,
  length = 6,
}: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.padEnd(length, " ").split("").slice(0, length);

  const updateDigit = (index: number, digit: string) => {
    const arr = value.padEnd(length, " ").split("").slice(0, length);
    arr[index] = digit;
    const next = arr.join("").replace(/\s/g, "").slice(0, length);
    onChange(next);
  };

  const handleChange = (index: number, char: string) => {
    if (!/^\d?$/.test(char)) return;
    updateDigit(index, char);
    if (char && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index]?.trim() && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) inputsRef.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < length - 1)
      inputsRef.current[index + 1]?.focus();
  };

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pasted);
    const focusIndex = Math.min(pasted.length, length - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[i]?.trim() || ""}
          onChange={(e) => handleChange(i, e.target.value.slice(-1))}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={cn(
            "h-14 w-11 rounded-xl border bg-surface-elevated text-center text-xl font-semibold text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface sm:h-16 sm:w-14",
            error
              ? "border-red-500/50 focus:ring-red-500/50"
              : "border-surface-border focus:ring-brand-500/50"
          )}
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  );
}
