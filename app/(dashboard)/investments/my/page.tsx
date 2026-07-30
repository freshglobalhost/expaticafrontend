import { Suspense } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { SubNav } from "@/components/dashboard/sub-nav";
import { MyInvestments } from "@/components/investments/my-investments";
import { INVESTMENT_NAV } from "@/lib/investments-mock-data";

export const metadata = {
  title: "My Investments — Expatica",
};

export default function MyInvestmentsPage() {
  return (
    <div className="px-4 py-4 sm:px-5 lg:px-6 lg:py-5">
      <PageHeader
        title="My investments"
        description="Track and manage your investment portfolio"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "My investments" },
        ]}
      />
      <SubNav items={INVESTMENT_NAV} />
      <Suspense fallback={<p className="text-sm text-gray-500">Loading…</p>}>
        <MyInvestments />
      </Suspense>
    </div>
  );
}
