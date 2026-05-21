"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Lock, ShieldCheck } from "lucide-react";
import { AuthCard } from "./auth-card";
import { PinInput } from "./pin-input";
import { Button } from "@/components/ui/button";
import { getAccessTokenUserId, logout } from "@/lib/api/auth-storage";
import { verifyTransactionPin } from "@/lib/api/accounts";
import { getErrorMessage } from "@/lib/api/get-error-message";

export function TransactionPinForm() {
  const router = useRouter();
  const [sessionUserId, setSessionUserId] = useState<string | null>(null);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setSessionUserId(getAccessTokenUserId());
    setPin("");
    setError(false);
    setErrorMessage(null);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length !== 4) return;

    setLoading(true);
    setError(false);
    setErrorMessage(null);
    try {
      await verifyTransactionPin(pin);
      router.push("/dashboard");
    } catch (err) {
      setError(true);
      setErrorMessage(
        getErrorMessage(err, "Incorrect PIN. Please try again.")
      );
      setPin("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <div className="mb-8 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/20"
        >
          <Lock className="h-7 w-7 text-brand-400" />
        </motion.div>
        <h2 className="font-display text-2xl font-bold text-white">
          Enter transaction PIN
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Enter your 4-digit PIN to access your dashboard securely
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {sessionUserId ? (
          <PinInput
            key={sessionUserId}
            value={pin}
            onChange={setPin}
            error={error}
          />
        ) : (
          <div className="flex justify-center py-2">
            <Loader2 className="h-6 w-6 animate-spin text-brand-400" />
          </div>
        )}

        {error && errorMessage && (
          <p className="text-center text-xs text-red-400">{errorMessage}</p>
        )}

        <div className="rounded-xl border border-brand-500/20 bg-brand-500/5 p-4">
          <div className="flex gap-3">
            <ShieldCheck className="h-5 w-5 shrink-0 text-brand-400" />
            <p className="text-xs leading-relaxed text-gray-400">
              Your transaction PIN authorizes transfers and dashboard access.
              Never share it with anyone, including PennyCredit staff.
            </p>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={loading || pin.length !== 4 || !sessionUserId}
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Access dashboard"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        <Link href="/forgot-password" className="text-brand-400 hover:text-brand-300">
          Forgot PIN?
        </Link>
        {" · "}
        <button
          type="button"
          className="text-brand-400 hover:text-brand-300"
          onClick={() => logout()}
        >
          Sign out
        </button>
      </p>
    </AuthCard>
  );
}
