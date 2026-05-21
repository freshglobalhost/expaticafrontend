import { AUTH_STORAGE_KEY } from "./config";

export type AuthTokens = {
  access: string;
  refresh: string;
};

export const RESET_EMAIL_KEY = "pennycredit_reset_email";
export const RESET_TOKEN_KEY = "pennycredit_reset_token";

export function getStoredTokens(): AuthTokens | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthTokens;
  } catch {
    return null;
  }
}

export function storeTokens(tokens: AuthTokens) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(tokens));
}

export function clearTokens() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

/** JWT `user_id` for the current session (client-side decode, not verified). */
export function getAccessTokenUserId(): string | null {
  const token = getAccessToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1])) as {
      user_id?: number;
      sub?: string;
    };
    const id = payload.user_id ?? payload.sub;
    return id != null ? String(id) : null;
  } catch {
    return null;
  }
}

/** Clear auth and hard-navigate so the next login uses a fresh session. */
export function logout() {
  clearTokens();
  clearPasswordResetSession();
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}

export function getAccessToken(): string | null {
  return getStoredTokens()?.access ?? null;
}

export function isAuthenticated(): boolean {
  return !!getAccessToken();
}

export function storePasswordResetSession(email: string, resetToken: string) {
  sessionStorage.setItem(RESET_EMAIL_KEY, email);
  sessionStorage.setItem(RESET_TOKEN_KEY, resetToken);
}

export function getPasswordResetSession(): { email: string; resetToken: string } | null {
  const email = sessionStorage.getItem(RESET_EMAIL_KEY);
  const resetToken = sessionStorage.getItem(RESET_TOKEN_KEY);
  if (!email || !resetToken) return null;
  return { email, resetToken };
}

export function clearPasswordResetSession() {
  sessionStorage.removeItem(RESET_EMAIL_KEY);
  sessionStorage.removeItem(RESET_TOKEN_KEY);
}
