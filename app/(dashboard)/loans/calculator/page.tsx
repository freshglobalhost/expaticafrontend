import { PageHeader } from "@/components/dashboard/page-header";
import { SubNav } from "@/components/dashboard/sub-nav";
import { LoanCalculatorPage } from "@/components/loans/loan-calculator-page";
import { LOAN_NAV } from "@/lib/loans-mock-data";

export default function LoanCalculatorRoute() {
  return (
    <div className="p-6">
      <PageHeader
        title="Loan calculator"
        description="Model monthly payments before you apply"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Loans", href: "/loans" },
          { label: "Calculator" },
        ]}
      />
      <SubNav items={LOAN_NAV} />
      <LoanCalculatorPage />
    </div>
  );
}
