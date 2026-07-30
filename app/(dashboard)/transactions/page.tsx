import { PageHeader } from "@/components/dashboard/page-header";
import { TransactionsTable } from "@/components/dashboard/transactions-table";

export const metadata = {
  title: "Transactions — Expatica",
};

export default function TransactionsPage() {
  return (
    <div className="px-4 py-4 sm:px-5 lg:px-6 lg:py-5">
      <PageHeader
        title="Transactions"
        description="View and filter all account activity"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Transactions" },
        ]}
      />
      <TransactionsTable compact />
    </div>
  );
}
