import { MarketingFooter } from "@/components/layout/marketing-footer";
import { TicketForm } from "@/components/help/ticket-form";
import Link from "next/link";

export default function TicketsPage() {
  return (
    <>
      <main className="min-h-screen bg-surface px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Link href="/help" className="text-sm text-brand-400 hover:underline">← Help Center</Link>
          <h1 className="mt-4 font-display text-3xl font-bold text-white">Submit a ticket</h1>
        </div>
        <div className="mt-10">
          <TicketForm />
        </div>
      </main>
      <MarketingFooter />
    </>
  );
}
