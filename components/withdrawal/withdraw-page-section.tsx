"use client";

import { WITHDRAW_OPTIONS } from "@/lib/transfer-methods";
import { WithdrawPicker } from "@/components/withdrawal/withdraw-picker";
import { RecentWithdrawalsTable } from "@/components/withdrawal/recent-withdrawals-table";

export function WithdrawPageSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Local bank withdrawal
        </h2>
        <p className="mb-3 text-xs text-gray-500">
          The withdrawal form opens automatically. Close it and pick Local Transfer to open it again.
        </p>
        <WithdrawPicker uiMethods={WITHDRAW_OPTIONS} autoOpen />
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-white">Recent withdrawals</h2>
        <RecentWithdrawalsTable />
      </div>
    </div>
  );
}
