"use client";

import { TransactionPinField } from "./transaction-pin-field";

interface PinInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  length?: number;
  masked?: boolean;
}

/** @deprecated Use TransactionPinField — kept for existing imports */
export function PinInput({ value, onChange, error, masked = true }: PinInputProps) {
  return (
    <TransactionPinField
      value={value}
      onChange={onChange}
      error={error}
      masked={masked}
    />
  );
}
