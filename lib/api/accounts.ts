import { apiFormRequest, apiRequest } from "./client";
import type { ApiUser, DashboardSummary } from "./types";
import {
  clearPasswordResetSession,
  getPasswordResetSession,
  storePasswordResetSession,
  storeTokens,
} from "./auth-storage";

export async function login(email: string, password: string) {
  const tokens = await apiRequest<{ access: string; refresh: string }>("/auth/token/", {
    method: "POST",
    auth: false,
    json: { email, password },
  });
  storeTokens(tokens);
  return tokens;
}

export async function register(payload: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
  country: string;
  transaction_pin: string;
  address?: string;
  gender?: string;
}) {
  return apiRequest<ApiUser>("/accounts/register/", {
    method: "POST",
    auth: false,
    json: payload,
  });
}

export async function getProfile() {
  return apiRequest<ApiUser>("/accounts/me/");
}

export async function updateProfile(data: Partial<ApiUser>) {
  return apiRequest<ApiUser>("/accounts/me/", {
    method: "PATCH",
    json: data as Record<string, unknown>,
  });
}

export async function updateProfileWithPhoto(formData: FormData) {
  return apiFormRequest<ApiUser>("/accounts/me/", formData, "PATCH");
}

export async function getDashboardSummary() {
  return apiRequest<DashboardSummary>("/accounts/me/dashboard/");
}

export async function changePassword(current_password: string, new_password: string) {
  return apiRequest<{ detail: string }>("/accounts/me/password/", {
    method: "POST",
    json: { current_password, new_password },
  });
}

export async function changeTransactionPin(
  new_transaction_pin: string,
  current_transaction_pin?: string
) {
  return apiRequest<{ detail: string }>("/accounts/me/transaction-pin/", {
    method: "POST",
    json: {
      new_transaction_pin,
      ...(current_transaction_pin ? { current_transaction_pin } : {}),
    },
  });
}

export async function verifyTransactionPin(transaction_pin: string) {
  return apiRequest<{ valid: boolean }>("/accounts/verify-transaction-pin/", {
    method: "POST",
    json: { transaction_pin },
  });
}

export async function requestPasswordReset(email: string) {
  return apiRequest<{ detail: string }>("/accounts/password/forgot/", {
    method: "POST",
    auth: false,
    json: { email },
  });
}

export async function verifyPasswordResetCode(email: string, code: string) {
  const result = await apiRequest<{
    detail: string;
    reset_token: string;
    email: string;
  }>("/accounts/password/verify-code/", {
    method: "POST",
    auth: false,
    json: { email, code },
  });
  storePasswordResetSession(result.email, result.reset_token);
  return result;
}

export async function resetPassword(new_password: string) {
  const session = getPasswordResetSession();
  if (!session) {
    throw new Error("Reset session expired. Please start again from forgot password.");
  }
  const result = await apiRequest<{ detail: string }>("/accounts/password/reset/", {
    method: "POST",
    auth: false,
    json: {
      email: session.email,
      reset_token: session.resetToken,
      new_password,
    },
  });
  clearPasswordResetSession();
  return result;
}
