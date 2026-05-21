import { PageHeader } from "@/components/dashboard/page-header";
import { SubNav } from "@/components/dashboard/sub-nav";
import { LoanHistoryTable } from "@/components/loans/loan-history-table";
import { LOAN_NAV } from "@/lib/loans-mock-data";

export default function LoanHistoryPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Loan history"
        description="All past and current loan applications"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Loans", href: "/loans" },
          { label: "History" },
        ]}
      />
      <SubNav items={LOAN_NAV} />
      <LoanHistoryTable />
    </div>
  );
}
