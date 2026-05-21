"use client";

import { cn } from "@/lib/utils";

interface MiniChartProps {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
  className?: string;
}

export function MiniChart({
  data,
  color = "from-brand-500 to-brand-400",
  height = 120,
  className,
}: MiniChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className={cn("flex items-end gap-2", className)} style={{ height }}>
      {data.map((d, i) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
          <div
            className="relative w-full overflow-hidden rounded-t-md bg-white/5"
            style={{ height: height - 28 }}
          >
            <div
              className={cn(
                "absolute bottom-0 w-full rounded-t-md bg-gradient-to-t",
                color
              )}
              style={{ height: `${(d.value / max) * 100}%` }}
            />
          </div>
          <span className="text-[10px] text-gray-500">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
