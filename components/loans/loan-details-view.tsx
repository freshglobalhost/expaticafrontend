"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Calendar, Percent, Hash, ArrowRight, Loader2 } from "lucide-react";
import { getLoan } from "@/lib/api/loans";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function fmt(n: number | string) {
  const value = typeof n === "string" ? parseFloat(n) : n;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value || 0
  );
}

function fmtDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const statusBadge = {
  active: "success",
  pending: "warning",
  approved: "info",
  closed: "default",
  rejected: "danger",
} as const;

export function LoanDetailsView() {
  const params = useParams();
  const loanId = params?.id as string | undefined;

  const { data: loan, isLoading, isError } = useQuery({
    queryKey: ["loan", loanId],
    queryFn: () => getLoan(loanId!),
    enabled: !!loanId,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (isError || !loan) {
    return (
      <p className="rounded-xl border border-dashed border-white/10 px-6 py-12 text-center text-sm text-gray-500">
        Loan not found.
      </p>
    );
  }

  const principal = parseFloat(loan.principal_amount);
  const outstanding = parseFloat(loan.outstanding_balance);
  const paid = Math.max(0, principal - outstanding);
  const progress = principal > 0 ? Math.round((paid / principal) * 100) : 0;
  const repayments = loan.repayments ?? [];
  const paidCount = repayments.filter((r) => r.paid_on).length;
  const nextRepayment = repayments.find((r) => !r.paid_on);
  const monthlyPayment = nextRepayment ? parseFloat(nextRepayment.amount) : 0;
  const badgeVariant =
    statusBadge[loan.status as keyof typeof statusBadge] ?? "default";

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/10 bg-gradient-to-br from-surface-card to-surface-elevated p-6 lg:col-span-2"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Badge variant={badgeVariant}>{loan.status}</Badge>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">
              {loan.product_name}
            </h2>
            <p className="text-sm text-gray-500">{loan.reference_code}</p>
          </div>
          <Button asChild>
            <Link href={`/loans/${loan.id}/repayment`}>
              Track repayment <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-gray-500">Principal</p>
            <p className="text-xl font-bold text-white">{fmt(principal)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Outstanding</p>
            <p className="text-xl font-bold text-amber-400">{fmt(outstanding)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Paid to date</p>
            <p className="text-xl font-bold text-emerald-400">{fmt(paid)}</p>
          </div>
        </div>
        <div className="mt-6">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-gray-400">Repayment progress</span>
            <span className="text-white">
              {progress}% · {paidCount}/{repayments.length || loan.term_months} installments
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400"
            />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Percent className="h-4 w-4" /> {loan.interest_rate}% APR
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> Next due {fmtDate(nextRepayment?.due_on ?? null)}
          </span>
          <span className="flex items-center gap-1">
            <Hash className="h-4 w-4" /> Disbursed {fmtDate(loan.disbursed_on)}
          </span>
        </div>
      </motion.div>
      <div className="rounded-2xl border border-white/10 bg-surface-card p-6">
        <h3 className="font-semibold text-white">Next payment</h3>
        <p className="mt-4 font-display text-3xl font-bold text-white">
          {monthlyPayment > 0 ? fmt(monthlyPayment) : "—"}
        </p>
        <p className="text-sm text-gray-500">
          Due {fmtDate(nextRepayment?.due_on ?? null)}
        </p>
        <Button className="mt-6 w-full" disabled>
          Make payment
        </Button>
      </div>
    </div>
  );
}
