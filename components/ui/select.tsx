import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => (
    <div className="relative">
      <select
        className={cn(
          "flex h-12 w-full appearance-none rounded-xl border bg-surface-elevated/80 px-4 pr-10 text-sm text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-red-500/50 focus-visible:ring-red-500/50"
            : "border-surface-border focus-visible:ring-brand-500/50 hover:border-white/20",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
    </div>
  )
);
Select.displayName = "Select";

export { Select };
