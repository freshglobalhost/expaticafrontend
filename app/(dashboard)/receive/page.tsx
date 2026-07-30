import { PageHeader } from "@/components/dashboard/page-header";
import { MoneyFlowForm } from "@/components/transfer/money-flow-forms";

export const metadata = { title: "Receive — Expatica" };

export default function ReceiveMoneyPage() {
  return (
    <div className="px-4 py-4 sm:px-5 lg:px-6 lg:py-5">
      <PageHeader
        title="Receive"
        description="Get paid instantly with a payment link"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Receive" },
        ]}
      />
      <MoneyFlowForm type="receive" />
    </div>
  );
}
