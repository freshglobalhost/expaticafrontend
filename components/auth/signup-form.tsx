"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { AuthCard } from "./auth-card";
import { FormField } from "./form-field";
import { PasswordInput } from "./password-input";
import { PasswordStrengthMeter } from "./password-strength-meter";
import { PinInput } from "./pin-input";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/auth/phone-input";
import { signupSchema, type SignupForm } from "@/lib/auth-schemas";
import { COUNTRIES } from "@/lib/countries";
import { isoFromCountryName } from "@/lib/phone-countries";
import { login, register as registerAccount } from "@/lib/api/accounts";
import { getErrorMessage } from "@/lib/api/get-error-message";

export function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, touchedFields },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      country: "",
      agreeTerms: true,
      transactionPin: "",
    },
  });

  const password = watch("password");
  const country = watch("country");
  const countryIso = isoFromCountryName(country);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    setApiError(null);
    try {
      await registerAccount({
        email: data.email,
        password: data.password,
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        country: data.country,
        transaction_pin: data.transactionPin,
      });
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2200);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  });

  if (success) {
    return (
      <AuthCard>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-6 text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20">
            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white">
            Account created!
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Your 4-digit transaction PIN is set. Use it each time you sign in to
            access your dashboard.
          </p>
          <p className="mt-2 text-xs text-gray-500">Redirecting to set up your PIN…</p>
        </motion.div>
      </AuthCard>
    );
  }

  return (
    <AuthCard className="!p-6 sm:!p-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-white">
          Create account
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Please enter your information to build your account.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {apiError && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {apiError}
          </p>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="First name"
            htmlFor="firstName"
            error={errors.firstName?.message}
            success={!!touchedFields.firstName && !errors.firstName}
          >
            <Input
              id="firstName"
              placeholder="John"
              error={!!errors.firstName}
              {...register("firstName")}
            />
          </FormField>
          <FormField
            label="Last name"
            htmlFor="lastName"
            error={errors.lastName?.message}
            success={!!touchedFields.lastName && !errors.lastName}
          >
            <Input
              id="lastName"
              placeholder="Doe"
              error={!!errors.lastName}
              {...register("lastName")}
            />
          </FormField>
        </div>

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
            {...register("email")}
          />
        </FormField>

        <FormField
          label="Country"
          htmlFor="country"
          error={errors.country?.message}
        >
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select
                id="country"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={field.onBlur}
                error={!!errors.country}
              >
                <option value="" disabled>
                  Choose country
                </option>
                {COUNTRIES.map((c) => (
                  <option key={`${c.code}-${c.name}`} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </Select>
            )}
          />
        </FormField>

        <FormField
          label="Phone number"
          htmlFor="phone"
          error={errors.phone?.message}
          hint="Pick country above or use the flag — typing +1, +44, etc. updates country automatically"
        >
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                id="phone"
                value={field.value}
                onChange={field.onChange}
                countryIso={countryIso}
                onCountrySync={(_iso, countryName) =>
                  setValue("country", countryName, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                error={!!errors.phone}
              />
            )}
          />
        </FormField>

        <FormField
          label="4-digit transaction PIN"
          htmlFor="transactionPin"
          error={errors.transactionPin?.message}
          hint="Used to sign in and authorize transactions on your account"
        >
          <Controller
            name="transactionPin"
            control={control}
            render={({ field }) => (
              <PinInput
                value={field.value || ""}
                onChange={field.onChange}
                error={!!errors.transactionPin}
                masked={false}
              />
            )}
          />
        </FormField>

        <FormField
          label="Password"
          htmlFor="password"
          error={errors.password?.message}
        >
          <PasswordInput
            id="password"
            autoComplete="new-password"
            error={!!errors.password}
            {...register("password")}
          />
          <PasswordStrengthMeter password={password || ""} />
        </FormField>

        <FormField
          label="Confirm password"
          htmlFor="confirmPassword"
          error={errors.confirmPassword?.message}
        >
          <PasswordInput
            id="confirmPassword"
            autoComplete="new-password"
            error={!!errors.confirmPassword}
            {...register("confirmPassword")}
          />
        </FormField>

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-400">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-surface-border accent-brand-500"
              {...register("agreeTerms")}
            />
            <span>
              I agree to Expatica&apos;s{" "}
              <Link href="/terms" className="text-brand-400 hover:underline">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-brand-400 hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.agreeTerms && (
            <p className="mt-1.5 text-xs text-red-400">
              {errors.agreeTerms.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Create my account
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-brand-400 hover:text-brand-300">
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}
