"use client";

import {
  PRIMARY_SEND_OPTIONS,
  MORE_SEND_OPTIONS,
  SEND_MONEY_OPTIONS,
} from "@/lib/transfer-methods";
import { SendMoneyPicker } from "@/components/transfer/send-money-picker";
import { RecentTransfersTable } from "@/components/transfer/recent-transfers-table";

/** Full send money page — all payout methods + transfer history */
export function SendMoneyPageSection() {
  return (
    <div className="space-y-8">
      <SendMoneyPicker
        uiMethods={SEND_MONEY_OPTIONS}
        sections={[
          { title: "", methods: PRIMARY_SEND_OPTIONS },
          { title: "More options", methods: MORE_SEND_OPTIONS },
        ]}
      />

      <div>
        <h2 className="mb-3 text-sm font-semibold text-white">Recent transfers</h2>
        <RecentTransfersTable />
      </div>
    </div>
  );
}
