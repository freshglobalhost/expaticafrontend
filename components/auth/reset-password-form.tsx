"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { AuthCard } from "./auth-card";
import { FormField } from "./form-field";
import { PasswordInput } from "./password-input";
import { PasswordStrengthMeter } from "./password-strength-meter";
import { Button } from "@/components/ui/button";
import { resetPasswordSchema, type ResetPasswordForm } from "@/lib/auth-schemas";
import { resetPassword } from "@/lib/api/accounts";
import { getPasswordResetSession } from "@/lib/api/auth-storage";
import { getErrorMessage } from "@/lib/api/get-error-message";

export function ResetPasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const password = watch("password");

  useEffect(() => {
    if (!getPasswordResetSession()) {
      router.replace("/forgot-password");
      return;
    }
    setReady(true);
  }, [router]);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    setApiError(null);
    try {
      await resetPassword(data.password);
      setDone(true);
      setTimeout(() => router.push("/login"), 2500);
    } catch (err) {
      setApiError(getErrorMessage(err, "Could not reset password."));
    } finally {
      setLoading(false);
    }
  });

  if (!ready) {
    return null;
  }

  if (done) {
    return (
      <AuthCard>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20">
            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white">Password updated</h2>
          <p className="mt-3 text-sm text-gray-400">Redirecting you to sign in…</p>
        </motion.div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-white">Reset password</h2>
        <p className="mt-2 text-sm text-gray-400">
          Choose a strong new password for your account
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        {apiError && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {apiError}
          </p>
        )}
        <FormField label="New password" htmlFor="password" error={errors.password?.message}>
          <PasswordInput id="password" error={!!errors.password} {...register("password")} />
          <PasswordStrengthMeter password={password || ""} />
        </FormField>

        <FormField
          label="Confirm new password"
          htmlFor="confirmPassword"
          error={errors.confirmPassword?.message}
        >
          <PasswordInput
            id="confirmPassword"
            error={!!errors.confirmPassword}
            {...register("confirmPassword")}
          />
        </FormField>

        <Button type="submit" className="w-full" size="lg" disabled={loading || !isValid}>
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Update password
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        <Link href="/login" className="text-brand-400 hover:text-brand-300">
          Back to sign in
        </Link>
      </p>
    </AuthCard>
  );
}
