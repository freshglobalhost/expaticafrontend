"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { PinInput } from "@/components/auth/pin-input";
import { FormField } from "@/components/auth/form-field";
import { Button } from "@/components/ui/button";
import { changeTransactionPin } from "@/lib/api/accounts";

export function TransactionPinSettings() {
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length !== 4 || newPin !== confirmPin) {
      setError("New PIN and confirmation must match (4 digits).");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await changeTransactionPin(
        newPin,
        currentPin.length === 4 ? currentPin : undefined
      );
      setDone(true);
      setCurrentPin("");
      setNewPin("");
      setConfirmPin("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update PIN");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="max-w-md rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
        <p className="mt-4 font-semibold text-white">Transaction PIN updated</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-md space-y-5 rounded-2xl border border-white/10 bg-surface-card p-6"
    >
      <p className="text-sm text-gray-400">
        Enter your current PIN (if you have one), then choose a new 4-digit PIN.
      </p>
      <FormField label="Current PIN (optional if first time)" htmlFor="current-pin">
        <PinInput value={currentPin} onChange={setCurrentPin} />
      </FormField>
      <FormField label="New PIN" htmlFor="new-pin">
        <PinInput value={newPin} onChange={setNewPin} />
      </FormField>
      <FormField label="Confirm new PIN" htmlFor="confirm-pin">
        <PinInput value={confirmPin} onChange={setConfirmPin} />
      </FormField>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <Button type="submit" disabled={loading || newPin.length !== 4}>
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Update transaction PIN"}
      </Button>
    </form>
  );
}
