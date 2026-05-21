import type { ApiInvestmentPlan, ApiUserInvestment } from "@/lib/api/types";
import type { SavingsInvestmentPlan } from "@/lib/investments-mock-data";

export function mapApiInvestmentPlan(plan: ApiInvestmentPlan): SavingsInvestmentPlan {
  const min = parseFloat(plan.minimum_amount) || 0;
  const max = parseFloat(plan.maximum_amount) || 0;
  const roiValue = parseFloat(plan.return_value) || 0;
  const roiDisplay =
    plan.return_type === "percent"
      ? `${roiValue.toFixed(2)}%`
      : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(roiValue);

  return {
    id: plan.slug as SavingsInvestmentPlan["id"],
    planId: plan.id,
    name: plan.name,
    minAmount: min,
    maxAmount: max,
    roiDisplay,
    roiType: plan.return_type,
    roiValue,
    duration: plan.duration_label,
    lockLabel: plan.duration_label.toLowerCase(),
    capitalReturned: plan.returns_capital,
  };
}

export type MappedUserInvestment = {
  id: string;
  planId: string;
  planDbId: number;
  planName: string;
  amount: number;
  expectedRoi: number;
  capitalReturned: boolean;
  startedAt: string;
  expiresAt: string;
  status: string;
  referenceCode: string;
};

export function mapApiUserInvestment(inv: ApiUserInvestment): MappedUserInvestment {
  return {
    id: String(inv.id),
    planId: inv.plan_slug,
    planDbId: inv.plan,
    planName: inv.plan_name,
    amount: parseFloat(inv.invested_amount) || 0,
    expectedRoi: parseFloat(inv.expected_return_amount) || 0,
    capitalReturned: true,
    startedAt: inv.created_at,
    expiresAt: inv.matures_at,
    status: inv.status,
    referenceCode: inv.reference_code,
  };
}
