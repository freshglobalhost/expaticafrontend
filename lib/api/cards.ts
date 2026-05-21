import { apiRequest } from "./client";
import type { ApiVirtualCard, CardSensitiveDetails, Paginated } from "./types";

export type ApiCardTransaction = {
  id: number;
  card: number;
  card_name: string;
  merchant_name: string;
  amount: string;
  created_at: string;
};

export type ApiCardRequest = {
  id: number;
  card_name: string;
  theme: string;
  issuance_fee: string;
  status: string;
  issued_card: number | null;
  issued_card_detail?: ApiVirtualCard;
  created_at: string;
  updated_at: string;
};

export async function getVirtualCards() {
  return apiRequest<Paginated<ApiVirtualCard>>("/cards/?page_size=50");
}

export async function getVirtualCard(id: number | string) {
  return apiRequest<ApiVirtualCard>(`/cards/${id}/`);
}

export async function updateVirtualCard(
  id: number | string,
  payload: Partial<{ theme: string; spending_limit: string; card_name: string }>
) {
  return apiRequest<ApiVirtualCard>(`/cards/${id}/`, {
    method: "PATCH",
    json: payload,
  });
}

export async function freezeCard(id: number | string) {
  return apiRequest<ApiVirtualCard>(`/cards/${id}/freeze/`, { method: "POST", json: {} });
}

export async function unfreezeCard(id: number | string) {
  return apiRequest<ApiVirtualCard>(`/cards/${id}/unfreeze/`, { method: "POST", json: {} });
}

export async function fundCard(
  id: number | string,
  payload: { amount: string; transaction_pin: string }
) {
  return apiRequest<ApiVirtualCard>(`/cards/${id}/fund/`, {
    method: "POST",
    json: payload,
  });
}

export async function withdrawCard(
  id: number | string,
  payload: { amount: string; transaction_pin: string }
) {
  return apiRequest<ApiVirtualCard>(`/cards/${id}/withdraw/`, {
    method: "POST",
    json: payload,
  });
}

export async function revealCardSensitive(
  id: number | string,
  transaction_pin: string
) {
  return apiRequest<CardSensitiveDetails>(`/cards/${id}/reveal-sensitive/`, {
    method: "POST",
    json: { transaction_pin },
  });
}

export async function createCardRequest(payload: {
  card_name: string;
  theme: string;
  network: string;
  spending_limit: string;
  transaction_pin: string;
}) {
  return apiRequest<ApiCardRequest>("/cards/requests/", {
    method: "POST",
    json: payload,
  });
}

export async function getCardTransactions(params?: { card?: number | string; page_size?: number }) {
  const qs = new URLSearchParams();
  if (params?.card != null) qs.set("card", String(params.card));
  if (params?.page_size) qs.set("page_size", String(params.page_size));
  const query = qs.toString();
  return apiRequest<Paginated<ApiCardTransaction>>(
    query ? `/cards/transactions/?${query}` : "/cards/transactions/"
  );
}
