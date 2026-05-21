import { PageHeader } from "@/components/dashboard/page-header";
import { SubNav } from "@/components/dashboard/sub-nav";
import { AvailablePlans } from "@/components/investments/available-plans";
import { INVESTMENT_NAV } from "@/lib/investments-mock-data";

export const metadata = {
  title: "Investment Plans — PennyCredit",
};

export default function InvestmentsPage() {
  return (
    <div className="px-4 py-4 sm:px-5 lg:px-6 lg:py-5">
      <PageHeader
        title="Investment plans"
        description="Choose a plan and start earning returns on your investment"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Investment plans" },
        ]}
      />
      <SubNav items={INVESTMENT_NAV} />
      <AvailablePlans />
    </div>
  );
}
