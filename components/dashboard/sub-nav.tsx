"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
}

export function SubNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <div className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-white/5 bg-surface-card p-1">
      {items.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/loans" &&
            item.href !== "/investments" &&
            pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-brand-500/15 text-brand-400"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
