"use client";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface FormFieldProps {
  label: React.ReactNode;
  htmlFor: string;
  error?: string;
  success?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  error,
  success,
  hint,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
      {!error && success && (
        <p className="flex items-center gap-1.5 text-xs text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
          Looks good
        </p>
      )}
      {!error && hint && (
        <p className="text-xs text-gray-500">{hint}</p>
      )}
    </div>
  );
}
