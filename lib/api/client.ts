import { API_BASE_URL } from "./config";
import { clearTokens, getAccessToken, getStoredTokens, storeTokens } from "./auth-storage";

export class ApiError extends Error {
  status: number;
  data: Record<string, unknown>;

  constructor(status: number, message: string, data: Record<string, unknown> = {}) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

type RequestOptions = RequestInit & {
  auth?: boolean;
  json?: Record<string, unknown>;
};

function flattenErrors(data: Record<string, unknown>): string {
  if (typeof data.detail === "string") return data.detail;
  const parts: string[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) parts.push(`${key}: ${value.join(", ")}`);
    else if (typeof value === "string") parts.push(value);
  }
  return parts.join(" ") || "Request failed";
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { auth = true, json, headers: customHeaders, ...init } = options;
  const headers = new Headers(customHeaders);

  if (json) {
    headers.set("Content-Type", "application/json");
  }

  if (auth) {
    const token = getAccessToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
    body: json ? JSON.stringify(json) : init.body,
  });

  const text = await res.text();
  let data: Record<string, unknown> = {};
  if (text) {
    try {
      data = JSON.parse(text) as Record<string, unknown>;
    } catch {
      data = { detail: text };
    }
  }

  if (res.status === 401 && auth) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      return apiRequest<T>(path, options);
    }
    clearTokens();
  }

  if (!res.ok) {
    throw new ApiError(res.status, flattenErrors(data), data);
  }

  return (text ? JSON.parse(text) : {}) as T;
}

async function tryRefreshToken(): Promise<boolean> {
  const tokens = getStoredTokens();
  if (!tokens?.refresh) return false;

  try {
    const res = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: tokens.refresh }),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { access: string };
    storeTokens({ access: data.access, refresh: tokens.refresh });
    return true;
  } catch {
    return false;
  }
}

export async function apiFormRequest<T>(
  path: string,
  formData: FormData,
  method = "PATCH",
  retried = false
): Promise<T> {
  const headers = new Headers();
  const token = getAccessToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: formData,
  });

  const text = await res.text();
  let data: Record<string, unknown> = {};
  if (text) {
    try {
      data = JSON.parse(text) as Record<string, unknown>;
    } catch {
      data = { detail: text };
    }
  }

  if (res.status === 401 && token && !retried) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      return apiFormRequest<T>(path, formData, method, true);
    }
    clearTokens();
  }

  if (!res.ok) {
    throw new ApiError(res.status, flattenErrors(data), data);
  }
  return data as T;
}
