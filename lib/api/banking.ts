import { apiRequest } from "./client";
import type { ApiTransfer, ApiTransferMethod, Paginated } from "./types";

export async function getTransferMethods(params?: { page_size?: number }) {
  const qs = new URLSearchParams();
  if (params?.page_size) qs.set("page_size", String(params.page_size));
  const query = qs.toString();
  return apiRequest<Paginated<ApiTransferMethod>>(
    query ? `/banking/methods/?${query}` : "/banking/methods/"
  );
}

export async function getTransfers(params?: { page?: number; page_size?: number }) {
  const qs = new URLSearchParams();
  if (params?.page) qs.set("page", String(params.page));
  if (params?.page_size) qs.set("page_size", String(params.page_size));
  const query = qs.toString();
  return apiRequest<Paginated<ApiTransfer>>(
    query ? `/banking/transfers/?${query}` : "/banking/transfers/"
  );
}

export async function createTransfer(payload: {
  method: number;
  amount: string;
  transaction_pin: string;
  recipient_details?: Record<string, string>;
  note?: string;
}) {
  return apiRequest<ApiTransfer>("/banking/transfers/", {
    method: "POST",
    json: payload,
  });
}
