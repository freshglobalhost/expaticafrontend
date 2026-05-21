"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Percent, Clock, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getLoanProducts } from "@/lib/api/loans";
import { loanApplyHref } from "@/lib/loan-product-ui";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function fmt(n: number | string) {
  const value = typeof n === "string" ? parseFloat(n) : n;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

const FEATURES_BY_SLUG: Record<string, string[]> = {
  personal: ["No prepayment penalty", "Fixed monthly payments", "Fast approval"],
  business: ["Working capital", "Equipment financing", "Flexible terms"],
  home: ["Competitive rates", "Long repayment terms", "Property financing"],
  auto: ["New & used vehicles", "Quick processing", "Competitive APR"],
};

export function LoanMarketplace() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["loan-products"],
    queryFn: getLoanProducts,
  });

  const products = data?.results ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center py-16 text-gray-500">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (isError || products.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-white/10 px-6 py-12 text-center text-sm text-gray-500">
        Loan products are not available right now. Please check back later.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product, i) => {
        const features = FEATURES_BY_SLUG[product.slug] ?? [
          "Online application",
          "Transparent rates",
          "Secure processing",
        ];
        const minTerm = Math.min(...(product.available_terms_months.length ? product.available_terms_months : [12]));
        const maxTerm = Math.max(...(product.available_terms_months.length ? product.available_terms_months : [60]));

        return (
          <motion.article
            key={product.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-surface-card to-surface-elevated p-6"
          >
            {product.slug === "personal" && (
              <Badge variant="info" className="absolute right-4 top-4">
                Popular
              </Badge>
            )}
            <h3 className="font-display text-xl font-bold text-white">{product.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-400">
              {product.description || "Apply online with competitive rates."}
            </p>
            <div className="mt-4 flex gap-4 text-sm">
              <span className="flex items-center gap-1 text-brand-400">
                <Percent className="h-4 w-4" />
                From {product.minimum_interest_rate}% APR
              </span>
              <span className="text-gray-500">
                {fmt(product.minimum_amount)} – {fmt(product.maximum_amount)}
              </span>
            </div>
            <ul className="mt-4 space-y-1.5">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-gray-400">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3.5 w-3.5" />
              {minTerm}–{maxTerm} month terms
            </div>
            <div className="mt-6 flex gap-2">
              <Button className="flex-1" asChild>
                <Link href={loanApplyHref(product.slug)}>
                  Apply now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
