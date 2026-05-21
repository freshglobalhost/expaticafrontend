"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getFaqs } from "@/lib/api/support";

export function FAQSection() {
  const { data, isLoading } = useQuery({
    queryKey: ["public-faqs", "home"],
    queryFn: getFaqs,
  });

  const faqs = (data?.results ?? []).slice(0, 6);

  return (
    <section id="faq" className="border-t border-white/5 bg-surface-elevated py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-brand-400">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Questions? We&apos;ve got answers.
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
          </div>
        ) : faqs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent className="whitespace-pre-line text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
