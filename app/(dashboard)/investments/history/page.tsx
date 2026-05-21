import { PageHeader } from "@/components/dashboard/page-header";
import { SubNav } from "@/components/dashboard/sub-nav";
import { InvestmentHistoryTable } from "@/components/investments/investment-history-table";
import { INVESTMENT_NAV } from "@/lib/investments-mock-data";

export default function InvestmentHistoryPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Investment history"
        description="All buys, sells, and portfolio deposits"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Investments", href: "/investments" },
          { label: "History" },
        ]}
      />
      <SubNav items={INVESTMENT_NAV} />
      <InvestmentHistoryTable />
    </div>
  );
}
