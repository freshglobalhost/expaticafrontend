import { MarketingFooter } from "@/components/layout/marketing-footer";
import { ContactForm } from "@/components/help/contact-form";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <main className="min-h-screen bg-surface px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Link href="/help" className="text-sm text-brand-400 hover:underline">← Help Center</Link>
          <h1 className="mt-4 font-display text-3xl font-bold text-white">Contact us</h1>
          <p className="mt-2 text-gray-400">We typically respond within 24 hours</p>
        </div>
        <div className="mt-10">
          <ContactForm />
        </div>
      </main>
      <MarketingFooter />
    </>
  );
}
