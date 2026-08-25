"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  Landmark,
  ArrowLeftRight,
  BarChart3,
  TrendingUp,
  CreditCard,
  Monitor,
  LogOut,
  PiggyBank,
  Settings,
  Shield as LogoIcon,
  Loader2,
  ArrowDownToLine,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/api/auth-storage";
import { useDashboard } from "@/components/providers/dashboard-provider";
import { SIDEBAR_MENU } from "@/lib/dashboard-mock-data";

const iconMap: Record<string, React.ElementType> = {
  layout: LayoutDashboard,
  wallet: Wallet,
  loan: Landmark,
  transactions: ArrowLeftRight,
  chart: BarChart3,
  invest: TrendingUp,
  savings: PiggyBank,
  card: CreditCard,
  devices: Monitor,
  settings: Settings,
  logout: LogOut,
  withdraw: ArrowDownToLine,
};

function formatMoney(n: number | string, currency = "USD") {
  const num = typeof n === "string" ? parseFloat(n) : n;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(Number.isFinite(num) ? num : 0);
}

export function DashboardSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { user, summary, isLoading } = useDashboard();

  const currency = summary?.currency_code ?? "USD";
  const balance = summary?.primary_wallet_balance ?? "0";
  const depositBalance = summary?.deposit_balance ?? "0";
  const loanBalance = summary?.loan_balance ?? "0";
  const initials = user?.initials ?? "?";
  const name = user?.full_name ?? "Account";
  const accountId = user?.account_reference ?? "";

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-white/5 bg-surface-elevated">
      <div className="border-b border-white/5 p-5">
        <Link href="/dashboard" onClick={() => onNavigate?.()} className="mb-6 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700">
            <LogoIcon className="h-4 w-4 text-white" />
          </div>
          <span className="font-display text-lg font-bold text-white">
            Expati<span className="text-brand-400">ca</span>
          </span>
        </Link>

        {isLoading && !user ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-brand-400" />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3">
              {user?.profile_picture_url ? (
                <img
                  src={user.profile_picture_url}
                  alt=""
                  className="h-11 w-11 shrink-0 rounded-xl object-cover ring-2 ring-brand-500/30"
                />
              ) : (
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white ring-2 ring-brand-500/30">
                  {initials}
                  <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface-elevated bg-emerald-500" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-white">{name}</p>
                <p className="text-xs text-gray-500">ID: {accountId}</p>
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-brand-500/20 bg-gradient-to-br from-brand-500/10 to-transparent p-3">
              <p className="text-[10px] text-gray-500">Available balance</p>
              <p className="font-display text-xl font-bold text-white">
                {formatMoney(balance, currency)}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-white/5 px-2.5 py-2">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500">
                    Deposit
                  </p>
                  <p className="text-sm font-semibold text-emerald-400">
                    {formatMoney(depositBalance, currency)}
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 px-2.5 py-2">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500">
                    Loan
                  </p>
                  <p className="text-sm font-semibold text-amber-400">
                    {formatMoney(loanBalance, currency)}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {SIDEBAR_MENU.map((item) => {
            const Icon = iconMap[item.icon] ?? LayoutDashboard;
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : item.href.includes("#")
                  ? pathname === "/dashboard"
                  : item.href.startsWith("/settings")
                    ? pathname.startsWith("/settings")
                    : pathname === item.href ||
                      (item.href !== "/loans" &&
                        item.href !== "/investments" &&
                        pathname.startsWith(item.href));

            if (item.icon === "logout") {
              return (
                <li key={item.href}>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate?.();
                      logout();
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                      "mt-4 text-gray-500 hover:bg-white/5 hover:text-red-400"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {item.label}
                  </button>
                </li>
              );
            }

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => onNavigate?.()}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-brand-500/15 text-brand-400"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
