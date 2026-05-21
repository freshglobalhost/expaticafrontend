"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { WalletSection } from "./wallet-section";
import { QuickActions } from "./quick-actions";
import { ActiveLoans } from "./active-loans";
import { RecentTransactions } from "./recent-transactions";
import { DashboardLiveActivity } from "./dashboard-live-activity";
import { YourCardsPreview } from "./your-cards-preview";
import { useDashboard } from "@/components/providers/dashboard-provider";

export function DashboardOverview() {
  const { user, isLoading } = useDashboard();
  const firstName = user?.display_name ?? user?.first_name ?? "there";

  if (isLoading && !user) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
      </div>
    );
  }

  return (
    <div className="space-y-4 px-4 py-4 sm:px-5 lg:px-6 lg:py-6">
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-xl font-bold text-white">
          Welcome back, {firstName}
        </h1>
        <p className="text-xs text-gray-500">
          Here&apos;s an overview of your account activity
        </p>
      </motion.div>

      <WalletSection />
      <QuickActions />
      <DashboardLiveActivity />
      <YourCardsPreview />
      <ActiveLoans compact />
      <RecentTransactions />
    </div>
  );
}
