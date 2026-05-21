"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { AuthCard } from "./auth-card";
import { FormField } from "./form-field";
import { PasswordInput } from "./password-input";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema, type LoginForm } from "@/lib/auth-schemas";
import { login } from "@/lib/api/accounts";
import { clearTokens } from "@/lib/api/auth-storage";
import { getErrorMessage } from "@/lib/api/get-error-message";
import { storeAuthNextPath } from "@/lib/auth-routes";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    clearTokens();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: { remember: false },
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    setApiError(null);
    try {
      await login(data.email, data.password);
      const next = searchParams.get("next");
      if (next?.startsWith("/")) {
        storeAuthNextPath(next);
      }
      router.push("/transaction-pin");
    } catch (err) {
      setApiError(getErrorMessage(err, "Sign in failed"));
    } finally {
      setLoading(false);
    }
  });

  return (
    <AuthCard>
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-white">Welcome back</h2>
        <p className="mt-2 text-sm text-gray-400">
          Sign in with your email and password — you&apos;ll enter your 4-digit
          transaction PIN next
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        {apiError && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {apiError}
          </p>
        )}
        <FormField
          label="Email address"
          htmlFor="email"
          error={errors.email?.message}
          success={!!touchedFields.email && !errors.email}
        >
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={!!errors.email}
            success={!!touchedFields.email && !errors.email}
            {...register("email")}
          />
        </FormField>

        <FormField
          label="Password"
          htmlFor="password"
          error={errors.password?.message}
        >
          <PasswordInput
            id="password"
            placeholder="••••••••"
            autoComplete="current-password"
            error={!!errors.password}
            {...register("password")}
          />
        </FormField>

        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-400">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-surface-border bg-surface-elevated text-brand-500 focus:ring-brand-500/50"
              {...register("remember")}
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-brand-400 hover:text-brand-300"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={loading || !isValid}
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Sign in
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-center text-sm text-gray-500"
      >
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-brand-400 hover:text-brand-300">
          Create one free
        </Link>
      </motion.p>
    </AuthCard>
  );
}
