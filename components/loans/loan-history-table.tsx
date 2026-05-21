"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { getLoanApplications, getLoans } from "@/lib/api/loans";
import { Badge } from "@/components/ui/badge";

function fmt(n: number | string) {
  const value = typeof n === "string" ? parseFloat(n) : n;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const statusMap = {
  active: "success",
  pending: "warning",
  approved: "info",
  closed: "default",
  rejected: "danger",
  cancelled: "default",
} as const;

type HistoryRow = {
  key: string;
  id: string;
  numericId: number;
  product: string;
  amount: string;
  appliedAt: string;
  status: string;
  isLoan: boolean;
};

export function LoanHistoryTable() {
  const loansQuery = useQuery({ queryKey: ["loans"], queryFn: getLoans });
  const appsQuery = useQuery({ queryKey: ["loan-applications"], queryFn: getLoanApplications });

  const rows = useMemo(() => {
    const loanRows: HistoryRow[] = (loansQuery.data?.results ?? []).map((loan) => ({
      key: `loan-${loan.id}`,
      id: loan.reference_code,
      numericId: loan.id,
      product: loan.product_name,
      amount: loan.principal_amount,
      appliedAt: loan.applied_on || loan.created_at,
      status: loan.status,
      isLoan: true,
    }));

    const appRows: HistoryRow[] = (appsQuery.data?.results ?? [])
      .filter((app) => !loanRows.some((l) => l.id === app.reference_code))
      .map((app) => ({
        key: `app-${app.id}`,
        id: app.reference_code,
        numericId: app.id,
        product: app.product_name,
        amount: app.requested_amount,
        appliedAt: app.created_at,
        status: app.status,
        isLoan: false,
      }));

    return [...loanRows, ...appRows].sort(
      (a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
    );
  }, [loansQuery.data, appsQuery.data]);

  const isLoading = loansQuery.isLoading || appsQuery.isLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center rounded-2xl border border-white/10 bg-surface-card py-16">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-surface-card px-6 py-12 text-center text-sm text-gray-500">
        No loan history yet.{" "}
        <Link href="/loans" className="text-brand-400 hover:underline">
          Browse loan products
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface-card">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/5 text-xs uppercase text-gray-500">
            <th className="px-5 py-4">Loan ID</th>
            <th className="px-5 py-4">Product</th>
            <th className="px-5 py-4">Amount</th>
            <th className="px-5 py-4">Applied</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((loan) => {
            const variant =
              statusMap[loan.status as keyof typeof statusMap] ?? "default";
            return (
              <tr key={loan.key} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-5 py-4 font-mono text-brand-400">{loan.id}</td>
                <td className="px-5 py-4 text-white">{loan.product}</td>
                <td className="px-5 py-4 font-semibold">{fmt(loan.amount)}</td>
                <td className="px-5 py-4 text-gray-400">{fmtDate(loan.appliedAt)}</td>
                <td className="px-5 py-4">
                  <Badge variant={variant}>{loan.status}</Badge>
                </td>
                <td className="px-5 py-4">
                  {loan.isLoan && loan.status === "active" && (
                    <Link
                      href={`/loans/${loan.numericId}`}
                      className="text-brand-400 hover:underline"
                    >
                      View
                    </Link>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
