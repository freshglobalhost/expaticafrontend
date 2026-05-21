import { PageHeader } from "@/components/dashboard/page-header";
import { SubNav } from "@/components/dashboard/sub-nav";
import { FIXED_INCOME_PRODUCTS, INVESTMENT_NAV } from "@/lib/investments-mock-data";

export default function FixedIncomePage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Fixed income"
        description="Bonds, treasuries, and stable yield products"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Investments", href: "/investments" },
          { label: "Fixed Income" },
        ]}
      />
      <SubNav items={INVESTMENT_NAV} />
      <div className="grid gap-4 md:grid-cols-3">
        {FIXED_INCOME_PRODUCTS.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-white/10 bg-surface-card p-6"
          >
            <h3 className="font-semibold text-white">{p.name}</h3>
            <p className="mt-4 text-3xl font-bold text-emerald-400">{p.rate}</p>
            <p className="text-sm text-gray-500">{p.term}</p>
            <p className="mt-2 text-xs text-gray-500">Min. ${p.minInvest.toLocaleString()}</p>
            <button
              type="button"
              className="mt-6 w-full rounded-xl bg-brand-500/15 py-2.5 text-sm font-medium text-brand-400"
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
