import { PageHeader } from "@/components/dashboard/page-header";
import { VirtualCardsManager } from "@/components/cards/virtual-cards-manager";

export default function VirtualCardsPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Virtual cards"
        description="Premium Visa & Mastercard virtual cards — freeze, control spending, customize"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Virtual Cards" },
        ]}
      />
      <VirtualCardsManager />
    </div>
  );
}
