import { PageHeader } from "@/components/dashboard/page-header";
import { SubNav } from "@/components/dashboard/sub-nav";
import { AssetMarketplace } from "@/components/investments/asset-marketplace";
import { STOCK_ASSETS, INVESTMENT_NAV } from "@/lib/investments-mock-data";

export default function StocksInvestPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Stock investment"
        description="Trade equities from global markets"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Investments", href: "/investments" },
          { label: "Stocks" },
        ]}
      />
      <SubNav items={INVESTMENT_NAV} />
      <AssetMarketplace
        title="Stocks"
        description=""
        type="stock"
        assets={STOCK_ASSETS.map((a) => ({
          symbol: a.symbol,
          name: a.name,
          price: a.price,
          change: a.change,
          extra: a.sector,
        }))}
      />
    </div>
  );
}
