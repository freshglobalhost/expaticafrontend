import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  success?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, success, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-xl border bg-surface-elevated/80 px-4 py-2 text-base text-white transition-all placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        error
          ? "border-red-500/50 focus-visible:ring-red-500/50"
          : success
            ? "border-emerald-500/50 focus-visible:ring-emerald-500/50"
            : "border-surface-border focus-visible:ring-brand-500/50 hover:border-white/20",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
