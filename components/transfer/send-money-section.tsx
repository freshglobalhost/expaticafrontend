"use client";

import Link from "next/link";
import { ChevronRight, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { DASHBOARD_SEND_OPTIONS } from "@/lib/transfer-methods";
import { getLoanProducts } from "@/lib/api/loans";
import { getLoanProductUi, loanApplyHref } from "@/lib/loan-product-ui";
import { SendMoneyPicker } from "@/components/transfer/send-money-picker";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function LoanProductCard({
  label,
  subtitle,
  icon: Icon,
  color,
  href,
  index,
}: {
  label: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  href: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
    >
      <Link
        href={href}
        className={cn(
          "group flex w-full flex-col rounded-xl border border-white/10 bg-surface-card p-3.5 text-left shadow-sm transition-all sm:p-4",
          "hover:border-brand-500/40 hover:bg-brand-500/5"
        )}
      >
        <div
          className={cn(
            "mb-3 flex h-12 w-12 items-center justify-center rounded-xl ring-2 ring-white/10 transition-all sm:h-[3.25rem] sm:w-[3.25rem]",
            color,
            "group-hover:ring-brand-500/50"
          )}
        >
          <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
        </div>
        <p className="text-[15px] font-semibold leading-tight text-white sm:text-base">{label}</p>
        <p className="mt-0.5 text-xs leading-snug text-gray-500">{subtitle}</p>
      </Link>
    </motion.div>
  );
}

/** Dashboard quick section — loans + compact send methods */
export function SendMoneySection() {
  const productsQuery = useQuery({
    queryKey: ["loan-products"],
    queryFn: getLoanProducts,
  });

  const loanCards = (productsQuery.data?.results ?? []).slice(0, 4).map((p) => {
    const ui = getLoanProductUi(p.slug);
    return {
      key: p.slug,
      label: p.name,
      subtitle: p.description || ui.subtitle,
      icon: ui.icon,
      color: ui.color,
      href: loanApplyHref(p.slug),
    };
  });

  return (
    <div className="space-y-4">
      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Request a loan
        </h2>
        {productsQuery.isLoading ? (
          <div className="flex items-center justify-center py-8 text-gray-500">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : loanCards.length === 0 ? (
          <p className="rounded-xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-gray-500">
            No loan products available yet.{" "}
            <Link href="/loans" className="text-brand-400 hover:underline">
              Browse loans
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3">
            {loanCards.map(({ key, ...card }, i) => (
              <LoanProductCard key={key} {...card} index={i} />
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Send money
          </h2>
          <Link
            href="/send"
            className="flex items-center gap-0.5 text-xs font-medium text-brand-400 hover:text-brand-300"
          >
            View all
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <SendMoneyPicker uiMethods={DASHBOARD_SEND_OPTIONS} />
      </div>
    </div>
  );
}
