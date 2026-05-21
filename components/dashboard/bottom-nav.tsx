"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ArrowLeftRight,
  Send,
  CreditCard,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Home", icon: Home, match: (p: string) => p === "/dashboard" },
  {
    href: "/transactions",
    label: "Activity",
    icon: ArrowLeftRight,
    match: (p: string) => p.startsWith("/transactions") || p === "/crypto/history",
  },
  {
    href: "/send",
    label: "Send",
    icon: Send,
    center: true,
    match: (p: string) => p === "/send" || p === "/receive",
  },
  { href: "/cards", label: "Cards", icon: CreditCard, match: (p: string) => p.startsWith("/cards") },
  {
    href: "/settings/profile",
    label: "Account",
    icon: User,
    match: (p: string) => p.startsWith("/settings"),
  },
];

export function DashboardBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-surface-elevated/95 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-[4.25rem] max-w-lg items-end justify-around px-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = item.match(pathname);

          if (item.center) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -top-3 flex flex-col items-center gap-0.5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-500/30">
                  <Icon className="h-5 w-5 text-white" />
                </span>
                <span className="text-[10px] font-semibold text-brand-400">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-w-[3.5rem] flex-col items-center gap-1 py-2",
                active ? "text-brand-400" : "text-gray-500"
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                  active && "bg-brand-500/15"
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
