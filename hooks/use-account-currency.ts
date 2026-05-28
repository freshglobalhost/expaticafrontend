"use client";

import { useDashboard } from "@/components/providers/dashboard-provider";
import { formatAccountMoney, getCurrencyInputPrefix } from "@/lib/currency";

export function useAccountCurrency(): string {
  const { summary, user } = useDashboard();
  return summary?.currency_code ?? user?.currency_code ?? "USD";
}

export function useFormatAccountMoney() {
  const currency = useAccountCurrency();
  return (amount: number, options?: Intl.NumberFormatOptions) =>
    formatAccountMoney(amount, currency, options);
}

export function useCurrencyInputPrefix(): string {
  const currency = useAccountCurrency();
  return getCurrencyInputPrefix(currency);
}
