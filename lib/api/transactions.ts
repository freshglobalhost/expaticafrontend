import { apiFormRequest, apiRequest } from "./client";
import type { ApiTransaction, CryptoAsset, Paginated } from "./types";

export async function getTransactions(params?: {
  page?: number;
  page_size?: number;
}) {
  const qs = new URLSearchParams();
  if (params?.page) qs.set("page", String(params.page));
  if (params?.page_size) qs.set("page_size", String(params.page_size));
  const query = qs.toString();
  return apiRequest<Paginated<ApiTransaction>>(
    query ? `/transactions/?${query}` : "/transactions/"
  );
}

export async function getCryptoAssets() {
  return apiRequest<CryptoAsset[]>("/transactions/crypto-assets/");
}

export async function createCryptoDeposit(payload: {
  crypto_symbol: string;
  crypto_amount: string;
  transaction_hash?: string;
  proof_image?: File;
}) {
  const form = new FormData();
  form.set("crypto_symbol", payload.crypto_symbol);
  form.set("crypto_amount", payload.crypto_amount);
  if (payload.transaction_hash) {
    form.set("transaction_hash", payload.transaction_hash);
  }
  if (payload.proof_image) {
    form.set("proof_image", payload.proof_image);
  }
  return apiFormRequest<ApiTransaction>("/transactions/crypto-deposit/", form, "POST");
}
