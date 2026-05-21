"use client";

import { cn } from "@/lib/utils";

/** Simulated QR code pattern (not scannable) */
export function FakeQRCode({
  value,
  size = 180,
  className,
}: {
  value: string;
  size?: number;
  className?: string;
}) {
  const cells = 21;
  const seed = value.split("").reduce((a, c) => a + c.charCodeAt(0), 0);

  const isDark = (row: number, col: number) => {
    const inCorner =
      (row < 7 && col < 7) ||
      (row < 7 && col >= cells - 7) ||
      (row >= cells - 7 && col < 7);
    if (inCorner) {
      const r = Math.min(row, col, cells - 1 - row, cells - 1 - col);
      return r < 2 || (r >= 3 && r < 5);
    }
    return ((row * 7 + col * 13 + seed) % 5) > 1;
  };

  const cellSize = size / cells;

  return (
    <div
      className={cn(
        "inline-block rounded-xl bg-white p-3 shadow-lg",
        className
      )}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {Array.from({ length: cells }).map((_, row) =>
          Array.from({ length: cells }).map((_, col) =>
            isDark(row, col) ? (
              <rect
                key={`${row}-${col}`}
                x={col * cellSize}
                y={row * cellSize}
                width={cellSize}
                height={cellSize}
                fill="#0a0f1a"
              />
            ) : null
          )
        )}
      </svg>
    </div>
  );
}
