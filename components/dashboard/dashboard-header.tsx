"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  ChevronDown,
  AlertTriangle,
  CheckCircle2,
  Info,
  Shield,
  Menu,
  X,
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardSearch } from "@/components/dashboard/dashboard-search";
import { useDashboard } from "@/components/providers/dashboard-provider";
import { cn } from "@/lib/utils";

const typeIcons = {
  warning: AlertTriangle,
  success: CheckCircle2,
  info: Info,
};

function UserAvatarLink() {
  const { user } = useDashboard();
  const initials = user?.initials ?? "?";

  return (
    <Link
      href="/settings/profile"
      className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white"
    >
      {user?.profile_picture_url ? (
        <img
          src={user.profile_picture_url}
          alt=""
          className="h-full w-full object-cover"
        />
      ) : (
        initials
      )}
    </Link>
  );
}

export function DashboardHeader() {
  const { notifications = [] } = useDashboard();
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 overflow-visible border-b border-white/5 bg-surface-elevated lg:left-72">
        {/* Mobile bar */}
        <div className="flex h-14 items-center justify-between gap-2 px-3 lg:hidden">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-surface-card text-gray-300"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link href="/dashboard" className="flex min-w-0 items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="truncate font-display text-sm font-bold text-white">
                Expati<span className="text-brand-400">ca</span>
              </span>
            </Link>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <NotificationButton
              notifOpen={notifOpen}
              setNotifOpen={setNotifOpen}
              unread={unread}
            />
            <UserAvatarLink />
          </div>
        </div>
        <div className="border-t border-white/5 px-3 pb-3 pt-2 lg:hidden">
          <DashboardSearch />
        </div>

        {/* Desktop bar */}
        <div className="hidden h-14 items-center justify-between gap-4 px-6 lg:flex">
          <DashboardSearch className="max-w-md flex-1" />
          <div className="flex items-center gap-3">
            <NotificationButton
              notifOpen={notifOpen}
              setNotifOpen={setNotifOpen}
              unread={unread}
            />
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-white/5 bg-surface-card px-3 py-2 text-sm text-gray-300"
            >
              May 2026
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} />

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black/50 lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-30 w-72 lg:hidden"
            >
              <DashboardSidebar onNavigate={() => setMenuOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function NotificationButton({
  notifOpen,
  setNotifOpen,
  unread,
}: {
  notifOpen: boolean;
  setNotifOpen: (v: boolean) => void;
  unread: number;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setNotifOpen(!notifOpen)}
        className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/5 bg-surface-card text-gray-400 transition-colors hover:text-white"
      >
        <Bell className="h-4 w-4" />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand-500 text-[9px] font-bold text-white">
            {unread}
          </span>
        )}
      </button>
    </div>
  );
}

function NotificationPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { notifications, isLoading } = useDashboard();
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-50" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed right-4 top-[7.25rem] z-[60] w-[calc(100%-2rem)] max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-surface-card shadow-2xl lg:top-14 lg:left-auto lg:right-6"
          >
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
              <p className="font-semibold text-white">Notifications</p>
              <span className="text-xs text-brand-400">{unread} unread</span>
            </div>
            <ul className="max-h-72 overflow-y-auto">
              {isLoading ? (
                <li className="px-4 py-8 text-center text-sm text-gray-500">Loading…</li>
              ) : notifications.length === 0 ? (
                <li className="px-4 py-8 text-center text-sm text-gray-500">
                  No notifications yet
                </li>
              ) : (
                notifications.map((n) => {
                  const Icon = typeIcons[n.type];
                  return (
                    <li
                      key={n.id}
                      className={cn(
                        "border-b border-white/5 px-4 py-3",
                        n.unread && "bg-brand-500/5"
                      )}
                    >
                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500/15 text-brand-400">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-white">{n.title}</p>
                          <p className="text-xs text-gray-500 line-clamp-2">{n.message}</p>
                          <p className="mt-0.5 text-[10px] text-gray-600">{n.time}</p>
                        </div>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
