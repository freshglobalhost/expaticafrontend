"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Shield, Bell, Key } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/settings/profile", label: "Profile", icon: User },
  { href: "/settings/security", label: "Security", icon: Shield },
  { href: "/settings/transaction-pin", label: "Transaction PIN", icon: Key },
  { href: "/settings/notifications", label: "Notifications", icon: Bell },
  { href: "/settings/password", label: "Password", icon: Key },
];

export function SettingsNav() {
  const pathname = usePathname();

  return (
    <nav className="mb-8 flex flex-wrap gap-1 rounded-xl border border-white/5 bg-surface-card p-1">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
              active ? "bg-brand-500/15 text-brand-400" : "text-gray-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
