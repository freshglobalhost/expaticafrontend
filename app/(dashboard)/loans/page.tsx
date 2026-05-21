import { PageHeader } from "@/components/dashboard/page-header";
import { SubNav } from "@/components/dashboard/sub-nav";
import { LoanMarketplace } from "@/components/loans/loan-marketplace";
import { LOAN_NAV } from "@/lib/loans-mock-data";

export default function LoansPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Loan marketplace"
        description="Compare products and find the right financing for your goals"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Loans" }]}
      />
      <SubNav items={LOAN_NAV} />
      <LoanMarketplace />
    </div>
  );
}
