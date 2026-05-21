/** Build login URL with optional post-auth redirect (dashboard paths only). */
export function loginUrl(nextPath?: string): string {
  if (!nextPath || !nextPath.startsWith("/")) return "/login";
  return `/login?next=${encodeURIComponent(nextPath)}`;
}

export const AUTH_NEXT_STORAGE_KEY = "pennycredit_auth_next";

export function storeAuthNextPath(path: string) {
  if (typeof window === "undefined") return;
  if (path.startsWith("/")) {
    sessionStorage.setItem(AUTH_NEXT_STORAGE_KEY, path);
  }
}

export function consumeAuthNextPath(): string | null {
  if (typeof window === "undefined") return null;
  const path = sessionStorage.getItem(AUTH_NEXT_STORAGE_KEY);
  sessionStorage.removeItem(AUTH_NEXT_STORAGE_KEY);
  if (path?.startsWith("/")) return path;
  return null;
}

/** Homepage / marketing loan entry points */
export const LOGIN_FOR_LOANS = loginUrl("/loans");
export const LOGIN_FOR_LOAN_APPLY = loginUrl("/loans/apply");
