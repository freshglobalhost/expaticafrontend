import { TransactionPinForm } from "@/components/auth/transaction-pin-form";
import { RequireAuth } from "@/components/auth/require-auth";

export const metadata = {
  title: "Transaction PIN — PennyCredit",
};

export default function TransactionPinPage() {
  return (
    <RequireAuth>
      <div className="mx-auto w-full max-w-md">
        <TransactionPinForm />
      </div>
    </RequireAuth>
  );
}
