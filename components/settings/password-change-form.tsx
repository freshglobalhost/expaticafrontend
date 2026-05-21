"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { FormField } from "@/components/auth/form-field";
import { PasswordInput } from "@/components/auth/password-input";
import { PasswordStrengthMeter } from "@/components/auth/password-strength-meter";
import { Button } from "@/components/ui/button";
import { passwordSchema } from "@/lib/auth-schemas";
import { changePassword } from "@/lib/api/accounts";

const schema = z
  .object({
    current: z.string().min(1, "Required"),
    password: passwordSchema,
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, { message: "Passwords do not match", path: ["confirm"] });

type Form = z.infer<typeof schema>;

export function PasswordChangeForm() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Form>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const password = watch("password");

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    setApiError(null);
    try {
      await changePassword(data.current, data.password);
      setDone(true);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Failed to update password");
    } finally {
      setLoading(false);
    }
  });

  if (done) {
    return (
      <div className="max-w-md rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
        <p className="mt-4 font-semibold text-white">Password updated</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md space-y-5 rounded-2xl border border-white/10 bg-surface-card p-6">
      <FormField label="Current password" htmlFor="current" error={errors.current?.message}>
        <PasswordInput id="current" error={!!errors.current} {...register("current")} />
      </FormField>
      <FormField label="New password" htmlFor="password" error={errors.password?.message}>
        <PasswordInput id="password" error={!!errors.password} {...register("password")} />
        <PasswordStrengthMeter password={password || ""} />
      </FormField>
      <FormField label="Confirm new password" htmlFor="confirm" error={errors.confirm?.message}>
        <PasswordInput id="confirm" error={!!errors.confirm} {...register("confirm")} />
      </FormField>
      {apiError && <p className="text-sm text-red-400">{apiError}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Update password"}
      </Button>
    </form>
  );
}
