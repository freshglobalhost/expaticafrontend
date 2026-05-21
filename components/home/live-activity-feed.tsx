"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, TrendingUp, Send } from "lucide-react";
import { INITIAL_LIVE_ACTIVITIES } from "@/lib/live-activity-data";
import {
  generateActivity,
  getHumanInterval,
  type ActivityNotification,
} from "@/lib/live-activity";
import { formatCurrency } from "@/lib/utils";

const actionIcons: Record<string, React.ElementType> = {
  deposited: ArrowDownLeft,
  withdrew: ArrowUpRight,
  "received a loan of": TrendingUp,
  invested: TrendingUp,
  transferred: Send,
};

const actionColors: Record<string, string> = {
  deposited: "text-emerald-400 bg-emerald-500/15",
  withdrew: "text-amber-400 bg-amber-500/15",
  "received a loan of": "text-brand-400 bg-brand-500/15",
  invested: "text-purple-400 bg-purple-500/15",
  transferred: "text-blue-400 bg-blue-500/15",
};

interface LiveActivityFeedProps {
  heightClass?: string;
  fadeFrom?: string;
  maxItems?: number;
}

export function LiveActivityFeed({
  heightClass = "h-[280px]",
  fadeFrom = "surface-elevated",
  maxItems = 4,
}: LiveActivityFeedProps) {
  const [notifications, setNotifications] = useState<ActivityNotification[] | null>(null);

  useEffect(() => {
    setNotifications([...INITIAL_LIVE_ACTIVITIES]);
  }, []);

  const addNotification = useCallback(() => {
    setNotifications((prev) => {
      if (!prev) return prev;
      const next = [generateActivity(), ...prev];
      return next.slice(0, maxItems);
    });
  }, [maxItems]);

  useEffect(() => {
    if (notifications === null) return;
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      timeoutId = setTimeout(() => {
        addNotification();
        scheduleNext();
      }, getHumanInterval());
    };

    scheduleNext();
    return () => clearTimeout(timeoutId);
  }, [addNotification, notifications]);

  const fadeTop = fadeFrom === "surface-card" ? "from-surface-card" : "from-surface-elevated";

  if (notifications === null) {
    return (
      <div
        className={`relative overflow-hidden ${heightClass}`}
        aria-hidden
      />
    );
  }

  return (
    <div className={`relative overflow-hidden ${heightClass}`}>
      <div className={`absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b ${fadeTop} to-transparent`} />
      <div className={`absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t ${fadeTop} to-transparent`} />

      <AnimatePresence mode="popLayout">
        {notifications.map((notif) => {
          const Icon = actionIcons[notif.action] ?? ArrowDownLeft;
          const colorClass =
            actionColors[notif.action] ?? "text-brand-400 bg-brand-500/15";

          return (
            <motion.div
              key={notif.id}
              layout
              initial={{ opacity: 0, y: -40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mb-2.5 flex items-start gap-3 rounded-xl border border-white/5 bg-surface-card/60 p-3 backdrop-blur-sm sm:mb-3 sm:rounded-2xl sm:p-4"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colorClass}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-snug text-gray-200">
                  <span className="font-semibold text-white">{notif.name}</span> from{" "}
                  <span className="text-brand-300">{notif.city}</span> just {notif.action}{" "}
                  <span className="font-semibold text-gold-400">
                    {formatCurrency(notif.amount)}
                  </span>
                </p>
                <p className="mt-1 text-xs text-gray-500">{notif.timeAgo}</p>
              </div>
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
