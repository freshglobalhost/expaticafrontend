"use client";

interface Segment {
  name: string;
  value: number;
  color: string;
}

export function DonutChart({
  data,
  size = 160,
}: {
  data: Segment[];
  size?: number;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  let offset = 0;
  const r = 40;
  const c = 2 * Math.PI * r;

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row">
      <svg width={size} height={size} viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
        {data.map((seg) => {
          const dash = (seg.value / total) * c;
          const el = (
            <circle
              key={seg.name}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth="12"
              strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
            />
          );
          offset += dash;
          return el;
        })}
      </svg>
      <ul className="space-y-2">
        {data.map((seg) => (
          <li key={seg.name} className="flex items-center gap-2 text-sm">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: seg.color }}
            />
            <span className="text-gray-400">{seg.name}</span>
            <span className="font-semibold text-white">{seg.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
