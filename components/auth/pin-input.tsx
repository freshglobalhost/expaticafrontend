"use client";

import { useRef, KeyboardEvent, ClipboardEvent } from "react";
import { cn } from "@/lib/utils";

interface PinInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  length?: number;
  masked?: boolean;
}

/** 4-digit transaction PIN input */
export function PinInput({
  value,
  onChange,
  error,
  length = 4,
  masked = true,
}: PinInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.padEnd(length, " ").split("").slice(0, length);

  const handleChange = (index: number, char: string) => {
    if (!/^\d?$/.test(char)) return;
    const arr = value.padEnd(length, " ").split("").slice(0, length);
    arr[index] = char;
    onChange(arr.join("").replace(/\s/g, "").slice(0, length));
    if (char && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index]?.trim() && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pasted);
    inputsRef.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type={masked ? "password" : "text"}
          inputMode="numeric"
          maxLength={1}
          value={digits[i]?.trim() || ""}
          onChange={(e) => handleChange(i, e.target.value.slice(-1))}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          data-1p-ignore
          data-lpignore="true"
          name={`pc-auth-digit-${i}`}
          readOnly
          onFocus={(e) => e.currentTarget.removeAttribute("readOnly")}
          className={cn(
            "h-11 w-11 rounded-lg border bg-surface-elevated text-center text-lg font-bold text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-surface",
            error
              ? "border-red-500/50 focus:ring-red-500/50"
              : "border-surface-border focus:ring-brand-500/50"
          )}
          aria-label={`PIN digit ${i + 1}`}
        />
      ))}
    </div>
  );
}
