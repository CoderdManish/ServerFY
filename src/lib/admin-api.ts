/** Client helpers for the private ServerFY admin console. */

export const ADMIN_BASE = "/sfy-console-9f2a";

const API_URL = (import.meta.env["VITE_API_URL"] as string | undefined)?.replace(/\/$/, "");
const TOKEN_KEY = "sfy_admin_token";

export type AdminPermission = "analytics" | "leads" | "requests" | "admins";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "viewer";
  permissions: AdminPermission[];
  active: boolean;
  lastLoginAt?: string;
  createdAt?: string;
};

export function apiConfigured() {
  return Boolean(API_URL);
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem(TOKEN_KEY, token);
  else window.localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function api<T>(
  path: string,
  options: { method?: string; body?: unknown; auth?: boolean } = {},
): Promise<T> {
  if (!API_URL) throw new ApiError(0, "The data service address is not configured yet.");
  const headers: Record<string, string> = {};
  if (options.body !== undefined) headers["Content-Type"] = "application/json";
  if (options.auth !== false) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: options.method ?? "GET",
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });
  } catch {
    throw new ApiError(0, "Could not reach the data service. Please try again.");
  }

  if (res.status === 204) return undefined as T;
  const data = (await res.json().catch(() => null)) as { message?: string } | null;
  if (!res.ok) {
    if (res.status === 401) setToken(null);
    throw new ApiError(res.status, data?.message ?? "Something went wrong.");
  }
  return data as T;
}

export function submitLead(payload: Record<string, unknown>) {
  return api<{ ok: true }>("/api/leads", { method: "POST", body: payload, auth: false });
}
