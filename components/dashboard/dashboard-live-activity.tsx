"use client";

import { LiveActivityFeed } from "@/components/home/live-activity-feed";

export function DashboardLiveActivity() {
  return (
    <section>
      <div className="mb-2 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
          Live activity
        </h2>
      </div>
      <div className="overflow-hidden rounded-xl border border-white/5 bg-surface-card p-3 sm:p-4">
        <LiveActivityFeed
          heightClass="h-[220px] sm:h-[240px]"
          fadeFrom="surface-card"
          maxItems={3}
        />
      </div>
    </section>
  );
}
