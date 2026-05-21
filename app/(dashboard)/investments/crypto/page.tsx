import { PageHeader } from "@/components/dashboard/page-header";
import { SubNav } from "@/components/dashboard/sub-nav";
import { AssetMarketplace } from "@/components/investments/asset-marketplace";
import { CRYPTO_ASSETS, INVESTMENT_NAV } from "@/lib/investments-mock-data";

export default function CryptoInvestPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Crypto investment"
        description="Buy and hold top digital assets"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Investments", href: "/investments" },
          { label: "Crypto" },
        ]}
      />
      <SubNav items={INVESTMENT_NAV} />
      <AssetMarketplace
        title="Crypto"
        description=""
        type="crypto"
        assets={CRYPTO_ASSETS.map((a) => ({
          symbol: a.symbol,
          name: a.name,
          price: a.price,
          change: a.change,
          extra: `MCap ${a.marketCap}`,
        }))}
      />
    </div>
  );
}
