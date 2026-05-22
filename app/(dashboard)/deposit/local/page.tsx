import Link from "next/link";
import { PageHeader } from "@/components/dashboard/page-header";
import { LocalDepositFlow } from "@/components/deposit/local-deposit-flow";
import { LocalDepositInstructions } from "@/components/deposit/local-deposit-instructions";
import { LocalDepositGate } from "@/components/deposit/local-deposit-gate";
import { Button } from "@/components/ui/button";

export default function LocalDepositPage() {
  return (
    <div className="px-4 py-4 sm:px-5 lg:px-6 lg:py-5">
      <PageHeader
        title="Local bank deposit"
        description="Transfer from your local bank using your assigned account details"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Deposit", href: "/deposit" },
          { label: "Local bank" },
        ]}
        action={
          <Button variant="secondary" size="sm" asChild>
            <Link href="/crypto/deposit">Crypto deposit</Link>
          </Button>
        }
      />
      <LocalDepositGate enabled={<LocalDepositFlow />} disabled={<LocalDepositInstructions />} />
    </div>
  );
}
