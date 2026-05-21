import { PageHeader } from "@/components/dashboard/page-header";
import { SubNav } from "@/components/dashboard/sub-nav";
import { LoanEligibility } from "@/components/loans/loan-eligibility";
import { LOAN_NAV } from "@/lib/loans-mock-data";

export default function LoanEligibilityRoute() {
  return (
    <div className="p-6">
      <PageHeader
        title="Loan eligibility"
        description="See if you qualify before starting a full application"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Loans", href: "/loans" },
          { label: "Eligibility" },
        ]}
      />
      <SubNav items={LOAN_NAV} />
      <LoanEligibility />
    </div>
  );
}
