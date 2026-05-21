import { PageHeader } from "@/components/dashboard/page-header";
import { SubNav } from "@/components/dashboard/sub-nav";
import { LoanDetailsView } from "@/components/loans/loan-details-view";
import { LOAN_NAV } from "@/lib/loans-mock-data";

export default function LoanDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="p-6">
      <PageHeader
        title="Loan details"
        description={`Loan ${params.id}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Loans", href: "/loans" },
          { label: params.id },
        ]}
      />
      <SubNav items={LOAN_NAV} />
      <LoanDetailsView />
    </div>
  );
}
