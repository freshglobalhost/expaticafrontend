import { Suspense } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { SubNav } from "@/components/dashboard/sub-nav";
import { LoanApplicationForm } from "@/components/loans/loan-application-form";
import { LOAN_NAV } from "@/lib/loans-mock-data";

export default function LoanApplyPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Apply for a loan"
        description="Complete all steps to submit your application"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Loans", href: "/loans" },
          { label: "Apply" },
        ]}
      />
      <SubNav items={LOAN_NAV} />
      <Suspense fallback={<div className="text-gray-500">Loading…</div>}>
        <LoanApplicationForm />
      </Suspense>
    </div>
  );
}
