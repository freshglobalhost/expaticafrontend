import { PageHeader } from "@/components/dashboard/page-header";
import { WithdrawPageSection } from "@/components/withdrawal/withdraw-page-section";

export const metadata = { title: "Withdraw — Expatica" };

export default function WithdrawPage() {
  return (
    <div className="px-4 py-4 sm:px-5 lg:px-6 lg:py-5">
      <PageHeader
        title="Withdraw"
        description="Send funds to a local bank account or a crypto address"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Withdraw" },
        ]}
      />
      <WithdrawPageSection />
    </div>
  );
}
