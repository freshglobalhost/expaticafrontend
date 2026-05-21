import { PageHeader } from "@/components/dashboard/page-header";
import { SavingsDashboard } from "@/components/savings/savings-dashboard";

export default function SavingsPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Savings"
        description="Goals, locked savings, and auto-save"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Savings" }]}
      />
      <SavingsDashboard />
    </div>
  );
}
