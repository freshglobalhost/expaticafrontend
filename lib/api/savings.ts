import { apiRequest } from "./client";
import type {
  ApiAutoSaveRule,
  ApiLockedSavings,
  ApiSavingsGoal,
  ApiSavingsTransaction,
  Paginated,
} from "./types";

export async function getSavingsGoals() {
  return apiRequest<Paginated<ApiSavingsGoal>>("/savings/goals/?page_size=50");
}

export async function createSavingsGoal(payload: {
  goal_name: string;
  target_amount: string;
  target_date_label?: string;
}) {
  return apiRequest<ApiSavingsGoal>("/savings/goals/", {
    method: "POST",
    json: payload,
  });
}

export async function updateSavingsGoal(
  id: number | string,
  payload: Partial<{ goal_name: string; target_amount: string; target_date_label: string }>
) {
  return apiRequest<ApiSavingsGoal>(`/savings/goals/${id}/`, {
    method: "PATCH",
    json: payload,
  });
}

export async function getLockedSavings() {
  return apiRequest<Paginated<ApiLockedSavings>>("/savings/locked/?page_size=50");
}

export async function getAutoSaveRules() {
  const data = await apiRequest<Paginated<ApiAutoSaveRule>>(
    "/savings/auto-save/?page_size=50"
  );
  if ((data.results?.length ?? 0) === 0) {
    return bootstrapSavingsDefaults();
  }
  return data;
}

export async function getAutoSaveRulesRaw() {
  return apiRequest<Paginated<ApiAutoSaveRule>>("/savings/auto-save/?page_size=50");
}

export async function bootstrapSavingsDefaults() {
  return apiRequest<Paginated<ApiAutoSaveRule>>("/savings/auto-save/bootstrap/", {
    method: "POST",
    json: {},
  });
}

export async function updateAutoSaveRule(
  id: number | string,
  payload: Partial<{ is_enabled: boolean; rule_name: string; description: string }>
) {
  return apiRequest<ApiAutoSaveRule>(`/savings/auto-save/${id}/`, {
    method: "PATCH",
    json: payload,
  });
}

export async function getSavingsTransactions() {
  return apiRequest<Paginated<ApiSavingsTransaction>>("/savings/transactions/?page_size=50");
}
