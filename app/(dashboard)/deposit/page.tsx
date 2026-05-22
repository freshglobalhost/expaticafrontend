import Link from "next/link";
import { Bitcoin, Building2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { cn } from "@/lib/utils";

const OPTIONS = [
  {
    href: "/crypto/deposit",
    title: "Cryptocurrency deposit",
    description: "Fund with BTC, ETH, USDT, or SOL. Submit proof after sending.",
    icon: Bitcoin,
    color: "from-orange-500/20 to-amber-500/5 border-orange-500/20 text-orange-400",
  },
  {
    href: "/deposit/local",
    title: "Local bank deposit",
    description: "Wire or transfer to your assigned local bank account (when enabled).",
    icon: Building2,
    color: "from-brand-500/20 to-brand-600/5 border-brand-500/20 text-brand-400",
  },
] as const;

export default function DepositHubPage() {
  return (
    <div className="px-4 py-4 sm:px-5 lg:px-6 lg:py-5">
      <PageHeader
        title="Deposit money"
        description="Choose how you want to fund your wallet"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Deposit" },
        ]}
      />
      <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
        {OPTIONS.map((opt) => {
          const Icon = opt.icon;
          return (
            <Link
              key={opt.href}
              href={opt.href}
              className={cn(
                "group rounded-2xl border bg-gradient-to-br p-5 transition-colors hover:border-brand-500/40",
                opt.color.split(" ")[2]
              )}
            >
              <div
                className={cn(
                  "mb-4 flex h-12 w-12 items-center justify-center rounded-xl border bg-gradient-to-br",
                  opt.color
                )}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="font-display text-lg font-semibold text-white group-hover:text-brand-300">
                {opt.title}
              </h2>
              <p className="mt-2 text-sm text-gray-400">{opt.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
