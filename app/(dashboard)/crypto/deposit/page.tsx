import Link from "next/link";
import { PageHeader } from "@/components/dashboard/page-header";
import { CryptoDepositFlow } from "@/components/crypto/crypto-deposit-flow";
import { Button } from "@/components/ui/button";

export default function CryptoDepositPage() {
  return (
    <div className="px-4 py-4 sm:px-5 lg:px-6 lg:py-5">
      <PageHeader
        title="Deposit money"
        description="Fund your wallet with crypto — BTC, ETH, USDT, or SOL"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Deposit" },
        ]}
        action={
          <Button variant="secondary" size="sm" asChild>
            <Link href="/crypto/history">History</Link>
          </Button>
        }
      />
      <CryptoDepositFlow />
    </div>
  );
}
