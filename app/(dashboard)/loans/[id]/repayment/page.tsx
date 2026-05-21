import { PageHeader } from "@/components/dashboard/page-header";
import { SubNav } from "@/components/dashboard/sub-nav";
import { RepaymentTracking } from "@/components/loans/repayment-tracking";
import { LOAN_NAV } from "@/lib/loans-mock-data";

export default function LoanRepaymentPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="p-6">
      <PageHeader
        title="Repayment tracking"
        description={`Schedule and progress for ${params.id}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Loans", href: "/loans" },
          { label: params.id, href: `/loans/${params.id}` },
          { label: "Repayment" },
        ]}
      />
      <SubNav items={LOAN_NAV} />
      <RepaymentTracking />
    </div>
  );
}
