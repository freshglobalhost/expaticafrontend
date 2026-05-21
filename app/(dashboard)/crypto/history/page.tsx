import Link from "next/link";
import { PageHeader } from "@/components/dashboard/page-header";
import { DepositHistoryTable } from "@/components/crypto/deposit-history-table";
import { Button } from "@/components/ui/button";

export default function CryptoHistoryPage() {
  return (
    <div className="px-4 py-4 sm:px-5 lg:px-6 lg:py-5">
      <PageHeader
        title="Deposit history"
        description="Track all deposits to your account"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Deposit", href: "/crypto/deposit" },
          { label: "History" },
        ]}
        action={
          <Button asChild>
            <Link href="/crypto/deposit">New deposit</Link>
          </Button>
        }
      />
      <DepositHistoryTable />
    </div>
  );
}
