import { PageHeader } from "@/components/dashboard/page-header";
import { SubNav } from "@/components/dashboard/sub-nav";
import { RealEstateGrid } from "@/components/investments/real-estate-grid";
import { INVESTMENT_NAV } from "@/lib/investments-mock-data";

export default function RealEstatePage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Real estate investment"
        description="Fractional property and REIT opportunities"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Investments", href: "/investments" },
          { label: "Real Estate" },
        ]}
      />
      <SubNav items={INVESTMENT_NAV} />
      <RealEstateGrid />
    </div>
  );
}
