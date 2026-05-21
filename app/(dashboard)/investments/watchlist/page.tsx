import { PageHeader } from "@/components/dashboard/page-header";
import { SubNav } from "@/components/dashboard/sub-nav";
import { WatchlistTable } from "@/components/investments/watchlist-table";
import { INVESTMENT_NAV } from "@/lib/investments-mock-data";

export default function WatchlistPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Watchlist"
        description="Assets you're tracking"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Investments", href: "/investments" },
          { label: "Watchlist" },
        ]}
      />
      <SubNav items={INVESTMENT_NAV} />
      <WatchlistTable />
    </div>
  );
}
