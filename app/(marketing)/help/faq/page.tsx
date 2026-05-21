"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { getFaqs } from "@/lib/api/support";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HelpFaqPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["public-faqs"],
    queryFn: getFaqs,
  });

  const faqs = data?.results ?? [];

  return (
    <>
      <main className="min-h-screen bg-surface px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <Link href="/help" className="text-sm text-brand-400 hover:underline">
            ← Help Center
          </Link>
          <h1 className="mt-4 font-display text-3xl font-bold text-white">FAQ</h1>
          <p className="mt-2 text-sm text-gray-400">
            Answers about accounts, loans, savings, investments, cards, and security on PennyCredit.
          </p>

          {isLoading && (
            <div className="mt-12 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
            </div>
          )}

          {isError && (
            <p className="mt-8 text-sm text-red-400">
              Could not load FAQs. Ensure the API is running and run{" "}
              <code className="text-brand-400">python manage.py seed_support</code>.
            </p>
          )}

          {!isLoading && !isError && faqs.length > 0 && (
            <Accordion type="single" collapsible className="mt-8">
              {faqs.map((f) => (
                <AccordionItem key={f.id} value={`f-${f.id}`}>
                  <AccordionTrigger>{f.question}</AccordionTrigger>
                  <AccordionContent className="whitespace-pre-line text-gray-400">
                    {f.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </main>
      <MarketingFooter />
    </>
  );
}
