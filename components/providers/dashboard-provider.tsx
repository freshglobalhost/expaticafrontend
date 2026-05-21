"use client";

import { createContext, useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "@/lib/api/accounts";
import { getTransactions } from "@/lib/api/transactions";
import type { ApiUser, DashboardSummary } from "@/lib/api/types";
import { mapApiCard, type DisplayCard } from "@/lib/dashboard-cards";
import { mapApiLoan, type DisplayLoan } from "@/lib/dashboard-loans";
import {
  mapApiNotification,
  type DisplayNotification,
} from "@/lib/dashboard-notifications";
import {
  mapApiTransaction,
  type DisplayTransaction,
} from "@/lib/dashboard-transactions";

type DashboardContextValue = {
  summary: DashboardSummary | undefined;
  user: ApiUser | undefined;
  transactions: DisplayTransaction[];
  recentTransactions: DisplayTransaction[];
  loans: DisplayLoan[];
  cards: DisplayCard[];
  notifications: DisplayNotification[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const summaryQuery = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: getDashboardSummary,
  });

  const transactionsQuery = useQuery({
    queryKey: ["transactions", { page_size: 100 }],
    queryFn: () => getTransactions({ page_size: 100 }),
  });

  const transactions = useMemo(
    () => (transactionsQuery.data?.results ?? []).map(mapApiTransaction),
    [transactionsQuery.data]
  );

  const recentTransactions = useMemo(() => {
    if (summaryQuery.data?.recent_transactions?.length) {
      return summaryQuery.data.recent_transactions.map(mapApiTransaction);
    }
    return transactions.slice(0, 4);
  }, [summaryQuery.data, transactions]);

  const loans = useMemo(
    () => (summaryQuery.data?.active_loans ?? []).map(mapApiLoan),
    [summaryQuery.data?.active_loans]
  );

  const cards = useMemo(
    () => (summaryQuery.data?.virtual_cards ?? []).map(mapApiCard),
    [summaryQuery.data?.virtual_cards]
  );

  const notifications = useMemo(
    () => (summaryQuery.data?.notifications ?? []).map(mapApiNotification),
    [summaryQuery.data?.notifications]
  );

  const value: DashboardContextValue = {
    summary: summaryQuery.data,
    user: summaryQuery.data?.user,
    transactions,
    recentTransactions,
    loans,
    cards,
    notifications,
    isLoading: summaryQuery.isLoading || transactionsQuery.isLoading,
    isError: summaryQuery.isError || transactionsQuery.isError,
    refetch: () => {
      void summaryQuery.refetch();
      void transactionsQuery.refetch();
    },
  };

  return (
    <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return ctx;
}
