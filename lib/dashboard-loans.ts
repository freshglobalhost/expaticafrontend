import type { ApiLoan, ApiLoanRepayment } from "@/lib/api/types";

export type DisplayLoan = {
  id: string;
  title: string;
  amount: number;
  paid: number;
  monthly: number;
  dueDate: string;
  status: "active" | "closing";
  rate: string;
};

function nextRepayment(repayments: ApiLoanRepayment[] | undefined) {
  if (!repayments?.length) return undefined;
  return repayments.find((r) => !r.paid_on);
}

export function mapApiLoan(loan: ApiLoan): DisplayLoan {
  const principal = Number(loan.principal_amount);
  const outstanding = Number(loan.outstanding_balance);
  const paid = Math.max(0, principal - outstanding);
  const progress = principal > 0 ? paid / principal : 0;
  const upcoming = nextRepayment(loan.repayments);
  const monthly = upcoming
    ? Number(upcoming.amount)
    : loan.term_months > 0
      ? outstanding / loan.term_months
      : 0;

  let dueDate = "—";
  if (upcoming?.due_on) {
    dueDate = new Date(upcoming.due_on).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return {
    id: loan.reference_code,
    title: loan.product_name,
    amount: principal,
    paid,
    monthly,
    dueDate,
    status: progress >= 0.85 ? "closing" : "active",
    rate: `${loan.interest_rate}% APR`,
  };
}
