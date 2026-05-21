"use client";

import Link from "next/link";
import { Key, Smartphone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SecuritySettings() {
  return (
    <div className="max-w-2xl space-y-4">
      {[
        {
          icon: Key,
          title: "Transaction PIN",
          desc: "4-digit PIN required for dashboard access",
          href: "/settings/transaction-pin",
          action: "Change",
        },
        { icon: Smartphone, title: "Change password", desc: "Update your login password", href: "/settings/password", action: "Change" },
      ].map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-surface-card p-5">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/15">
                <Icon className="h-6 w-6 text-brand-400" />
              </div>
              <div>
                <p className="font-semibold text-white">{item.title}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
            {item.href ? (
              <Button variant="secondary" size="sm" asChild>
                <Link href={item.href}>
                  {item.action} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <span className="text-sm text-emerald-400">Active</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
