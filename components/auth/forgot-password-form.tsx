"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Loader2, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { AuthCard } from "./auth-card";
import { FormField } from "./form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { forgotPasswordSchema, type ForgotPasswordForm } from "@/lib/auth-schemas";
import { requestPasswordReset } from "@/lib/api/accounts";
import { RESET_EMAIL_KEY } from "@/lib/api/auth-storage";
import { getErrorMessage } from "@/lib/api/get-error-message";

export function ForgotPasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    setApiError(null);
    try {
      await requestPasswordReset(data.email);
      sessionStorage.setItem(RESET_EMAIL_KEY, data.email.trim().toLowerCase());
      setSent(true);
    } catch (err) {
      setApiError(getErrorMessage(err, "Could not send reset code. Try again."));
    } finally {
      setLoading(false);
    }
  });

  const goToOtp = () => {
    router.push("/verify-otp?flow=reset");
  };

  if (sent) {
    return (
      <AuthCard>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/20">
            <Mail className="h-8 w-8 text-brand-400" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white">Check your email</h2>
          <p className="mt-3 text-sm text-gray-400">
            If an account exists for{" "}
            <span className="font-medium text-white">{getValues("email")}</span>, we sent a
            6-digit code. In development, check the Django server console for the code.
          </p>
          <Button className="mt-8 w-full" size="lg" onClick={goToOtp}>
            Enter verification code
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Link
            href="/login"
            className="mt-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>
        </motion.div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-white">Forgot password?</h2>
        <p className="mt-2 text-sm text-gray-400">
          Enter your email and we&apos;ll send you a reset code
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        {apiError && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {apiError}
          </p>
        )}
        <FormField label="Email address" htmlFor="email" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            error={!!errors.email}
            {...register("email")}
          />
        </FormField>

        <Button type="submit" className="w-full" size="lg" disabled={loading || !isValid}>
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Send reset code
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <Link
        href="/login"
        className="mt-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to sign in
      </Link>
    </AuthCard>
  );
}
