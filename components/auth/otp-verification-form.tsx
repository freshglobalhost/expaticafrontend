"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { AuthCard } from "./auth-card";
import { OtpInput } from "./otp-input";
import { Button } from "@/components/ui/button";
import { otpSchema, type OtpForm } from "@/lib/auth-schemas";
import { requestPasswordReset, verifyPasswordResetCode } from "@/lib/api/accounts";
import { RESET_EMAIL_KEY } from "@/lib/api/auth-storage";
import { getErrorMessage } from "@/lib/api/get-error-message";

export function OtpVerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const flow = searchParams.get("flow") ?? "reset";
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [apiError, setApiError] = useState<string | null>(null);
  const [resetEmail, setResetEmail] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<OtpForm>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  });

  const code = watch("code");

  useEffect(() => {
    if (flow !== "reset") {
      router.replace("/login");
      return;
    }
    const email = sessionStorage.getItem(RESET_EMAIL_KEY);
    if (!email) {
      router.replace("/forgot-password");
      return;
    }
    setResetEmail(email);
  }, [flow, router]);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const onSubmit = handleSubmit(async (data) => {
    if (!resetEmail) return;
    setLoading(true);
    setApiError(null);
    try {
      await verifyPasswordResetCode(resetEmail, data.code);
      router.push("/reset-password");
    } catch (err) {
      setApiError(getErrorMessage(err, "Invalid or expired code."));
    } finally {
      setLoading(false);
    }
  });

  const handleResend = async () => {
    if (!resetEmail || countdown > 0) return;
    setApiError(null);
    try {
      await requestPasswordReset(resetEmail);
      setCountdown(60);
    } catch (err) {
      setApiError(getErrorMessage(err, "Could not resend code."));
    }
  };

  if (flow !== "reset" || !resetEmail) {
    return null;
  }

  return (
    <AuthCard>
      <div className="mb-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/20"
        >
          <ShieldCheck className="h-7 w-7 text-brand-400" />
        </motion.div>
        <h2 className="font-display text-2xl font-bold text-white">Verify reset code</h2>
        <p className="mt-2 text-sm text-gray-400">
          Enter the 6-digit code sent to{" "}
          <span className="font-medium text-white">{resetEmail}</span>
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {apiError && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-center text-sm text-red-400">
            {apiError}
          </p>
        )}
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <div>
              <OtpInput value={field.value} onChange={field.onChange} error={!!errors.code} />
              {errors.code && (
                <p className="mt-3 text-center text-xs text-red-400">{errors.code.message}</p>
              )}
            </div>
          )}
        />

        <p className="text-center text-sm text-gray-500">
          {countdown > 0 ? (
            <>
              Resend code in <span className="text-white">{countdown}s</span>
            </>
          ) : (
            <button
              type="button"
              className="font-medium text-brand-400 hover:text-brand-300"
              onClick={handleResend}
            >
              Resend code
            </button>
          )}
        </p>

        <Button type="submit" className="w-full" size="lg" disabled={loading || code.length !== 6}>
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verify & continue"}
        </Button>
      </form>

      <Link
        href="/forgot-password"
        className="mt-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Go back
      </Link>
    </AuthCard>
  );
}
