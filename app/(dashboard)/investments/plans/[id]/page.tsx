import { PageHeader } from "@/components/dashboard/page-header";
import { SubNav } from "@/components/dashboard/sub-nav";
import { InvestPlanFlow } from "@/components/investments/invest-plan-flow";
import { INVESTMENT_NAV } from "@/lib/investments-mock-data";

export default async function InvestmentPlanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="px-4 py-4 sm:px-5 lg:px-6 lg:py-5">
      <PageHeader
        title="Invest"
        description="Complete your investment"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Plans", href: "/investments" },
          { label: id },
        ]}
      />
      <SubNav items={INVESTMENT_NAV} />
      <InvestPlanFlow planId={id} />
    </div>
  );
}
