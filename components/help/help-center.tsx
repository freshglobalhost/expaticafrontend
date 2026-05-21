"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Search, MessageCircle, Ticket, HelpCircle, BookOpen, Loader2 } from "lucide-react";
import { getFaqs, getHelpCategories } from "@/lib/api/support";
import { Input } from "@/components/ui/input";

export function HelpCenter() {
  const [query, setQuery] = useState("");

  const faqsQuery = useQuery({ queryKey: ["public-faqs"], queryFn: getFaqs });
  const categoriesQuery = useQuery({
    queryKey: ["help-categories"],
    queryFn: getHelpCategories,
  });

  const allFaqs = faqsQuery.data?.results ?? [];
  const categories = categoriesQuery.data?.results ?? [];

  const faqs = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return allFaqs.slice(0, 5);
    return allFaqs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    );
  }, [query, allFaqs]);

  const loading = faqsQuery.isLoading;

  return (
    <div>
      <div className="relative mx-auto max-w-2xl">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
        <Input
          className="h-12 pl-12 text-base"
          placeholder="Search FAQs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/help/faq"
          className="rounded-2xl border border-white/10 bg-surface-card p-5 text-center transition-colors hover:border-brand-500/30"
        >
          <HelpCircle className="mx-auto h-7 w-7 text-brand-400" />
          <p className="mt-2 font-semibold text-white">FAQ</p>
        </Link>
        <Link
          href="/help/articles"
          className="rounded-2xl border border-white/10 bg-surface-card p-5 text-center transition-colors hover:border-brand-500/30"
        >
          <BookOpen className="mx-auto h-7 w-7 text-brand-400" />
          <p className="mt-2 font-semibold text-white">Help articles</p>
        </Link>
        <Link
          href="/help/contact"
          className="rounded-2xl border border-white/10 bg-surface-card p-5 text-center transition-colors hover:border-brand-500/30"
        >
          <MessageCircle className="mx-auto h-7 w-7 text-brand-400" />
          <p className="mt-2 font-semibold text-white">Contact us</p>
        </Link>
        <Link
          href="/help/tickets"
          className="rounded-2xl border border-white/10 bg-surface-card p-5 text-center transition-colors hover:border-brand-500/30"
        >
          <Ticket className="mx-auto h-7 w-7 text-brand-400" />
          <p className="mt-2 font-semibold text-white">Submit ticket</p>
        </Link>
      </div>

      {categories.length > 0 && (
        <section className="mx-auto mt-8 max-w-2xl">
          <h2 className="font-display text-lg font-bold text-white">Browse by topic</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/help/articles?category=${cat.slug}`}
                className="rounded-full border border-white/10 bg-surface-card px-3 py-1 text-sm text-gray-300 hover:border-brand-500/40 hover:text-white"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {loading ? (
        <div className="mt-10 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
        </div>
      ) : faqs.length > 0 ? (
        <section className="mx-auto mt-10 max-w-2xl">
          <h2 className="font-display text-lg font-bold text-white">Quick answers</h2>
          <ul className="mt-4 space-y-3">
            {faqs.map((f) => (
              <li key={f.id} className="rounded-xl bg-surface-card p-4">
                <p className="font-medium text-white">{f.question}</p>
                <p className="mt-1 line-clamp-3 text-sm text-gray-400">{f.answer}</p>
              </li>
            ))}
          </ul>
          <Link
            href="/help/faq"
            className="mt-4 inline-block text-sm text-brand-400 hover:underline"
          >
            View all FAQs →
          </Link>
        </section>
      ) : null}
    </div>
  );
}
