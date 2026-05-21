import { apiRequest } from "./client";
import type { ApiInvestmentPlan, ApiUserInvestment, Paginated } from "./types";

export async function getInvestmentPlans() {
  return apiRequest<Paginated<ApiInvestmentPlan>>("/investments/plans/?page_size=50");
}

export async function getInvestmentPlan(slug: string) {
  return apiRequest<ApiInvestmentPlan>(`/investments/plans/${slug}/`);
}

export async function getUserInvestments() {
  return apiRequest<Paginated<ApiUserInvestment>>("/investments/positions/?page_size=50");
}

export async function createUserInvestment(payload: {
  plan: number;
  invested_amount: string;
  transaction_pin: string;
}) {
  return apiRequest<ApiUserInvestment>("/investments/positions/", {
    method: "POST",
    json: payload,
  });
}
