import { PageHeader } from "@/components/dashboard/page-header";
import { SendMoneyPageSection } from "@/components/transfer/send-money-page-section";

export const metadata = { title: "Send money — Expatica" };

export default function SendMoneyPage() {
  return (
    <div className="px-4 py-4 sm:px-5 lg:px-6 lg:py-5">
      <PageHeader
        title="Send money"
        description="Wire, local, and digital payout methods"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Send money" },
        ]}
      />
      <SendMoneyPageSection />
    </div>
  );
}
