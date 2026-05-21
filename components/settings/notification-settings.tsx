"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const NOTIFICATIONS = [
  { id: "tx", label: "Transaction alerts", desc: "Deposits, withdrawals, and transfers" },
  { id: "loan", label: "Loan updates", desc: "Approvals, due dates, and repayments" },
  { id: "invest", label: "Investment activity", desc: "Portfolio changes and price alerts" },
  { id: "security", label: "Security alerts", desc: "New logins and device activity" },
  { id: "marketing", label: "Product updates", desc: "Features and promotional offers" },
  { id: "email", label: "Email digest", desc: "Weekly account summary" },
];

export function NotificationSettings() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    tx: true, loan: true, invest: true, security: true, marketing: false, email: true,
  });

  return (
    <div className="max-w-2xl space-y-3">
      {NOTIFICATIONS.map((n) => (
        <div key={n.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-surface-card p-5">
          <div>
            <p className="font-medium text-white">{n.label}</p>
            <p className="text-sm text-gray-500">{n.desc}</p>
          </div>
          <button
            type="button"
            onClick={() => setPrefs((p) => ({ ...p, [n.id]: !p[n.id] }))}
            className={cn("relative h-7 w-12 rounded-full", prefs[n.id] ? "bg-brand-500" : "bg-white/10")}
          >
            <span className={cn("absolute top-1 h-5 w-5 rounded-full bg-white transition-all", prefs[n.id] ? "left-6" : "left-1")} />
          </button>
        </div>
      ))}
    </div>
  );
}
