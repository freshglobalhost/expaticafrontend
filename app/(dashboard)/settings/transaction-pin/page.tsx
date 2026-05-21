import { TransactionPinSettings } from "@/components/settings/transaction-pin-settings";

export const metadata = { title: "Transaction PIN — PennyCredit" };

export default function TransactionPinSettingsPage() {
  return (
    <div>
      <h2 className="font-display text-xl font-bold text-white">Transaction PIN</h2>
      <p className="mt-1 text-sm text-gray-500">
        Required for dashboard access and sensitive actions.
      </p>
      <div className="mt-6">
        <TransactionPinSettings />
      </div>
    </div>
  );
}
