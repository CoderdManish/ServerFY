/** Client helpers for the private ServerFY admin console. */

export const ADMIN_BASE = "/sfy-console-9f2a";

const API_URL = (import.meta.env["VITE_API_URL"] as string | undefined)?.replace(/\/$/, "");
const TOKEN_KEY = "sfy_admin_token";

export type AdminPermission = "analytics" | "leads" | "requests" | "admins" | "blog";

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
    const init: RequestInit = { method: options.method ?? "GET", headers };
    if (options.body !== undefined) init.body = JSON.stringify(options.body);
    res = await fetch(`${API_URL}${path}`, init);
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

// ---------- Blog panel ----------

export type BlogSectionDraft = { heading: string; paragraphs: string[]; bullets?: string[] };

export type BlogPostDraft = {
  id?: string;
  slug?: string;
  title: string;
  metaTitle: string;
  description: string;
  keywords: string;
  category: string;
  tags: string[];
  author: string;
  authorRole: string;
  date: string;
  updated?: string;
  readMinutes: number;
  featured: boolean;
  excerpt: string;
  intro: string;
  tint: "blue" | "orange" | "green" | "violet";
  icon: string;
  cover?: string;
  coverAlt?: string;
  sections: BlogSectionDraft[];
  takeaways: string[];
  faq: { q: string; a: string }[];
  status: "draft" | "published";
  views?: number;
  updatedAt?: string;
};

export function listBlogPosts(params: { q?: string; status?: string; category?: string } = {}) {
  const qs = new URLSearchParams();
  if (params.q) qs.set("q", params.q);
  if (params.status) qs.set("status", params.status);
  if (params.category) qs.set("category", params.category);
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  return api<{ items: BlogPostDraft[] }>(`/api/blog/admin${suffix}`);
}

export function getBlogPost(id: string) {
  return api<{ post: BlogPostDraft }>(`/api/blog/admin/${id}`);
}

export function createBlogPost(body: Partial<BlogPostDraft>) {
  return api<{ post: BlogPostDraft }>("/api/blog/admin", { method: "POST", body });
}

export function updateBlogPost(id: string, body: Partial<BlogPostDraft>) {
  return api<{ post: BlogPostDraft }>(`/api/blog/admin/${id}`, { method: "PATCH", body });
}

export function duplicateBlogPost(id: string) {
  return api<{ post: BlogPostDraft }>(`/api/blog/admin/${id}/duplicate`, { method: "POST" });
}

export function deleteBlogPost(id: string) {
  return api<{ ok: true }>(`/api/blog/admin/${id}`, { method: "DELETE" });
}

export function listBlogCategories() {
  return api<{ items: { id: string; name: string }[] }>("/api/blog/categories");
}

export function createBlogCategory(name: string) {
  return api<{ category: { id: string; name: string } }>("/api/blog/categories", {
    method: "POST",
    body: { name },
  });
}

export function renameBlogCategory(id: string, name: string) {
  return api<{ category: { id: string; name: string } }>(`/api/blog/categories/${id}`, {
    method: "PATCH",
    body: { name },
  });
}

export function deleteBlogCategory(id: string) {
  return api<{ ok: true }>(`/api/blog/categories/${id}`, { method: "DELETE" });
}

/** Uploads a .docx and returns a pre-filled article draft. */
export async function importBlogDocx(file: File): Promise<Partial<BlogPostDraft>> {
  if (!API_URL) throw new ApiError(0, "The data service address is not configured yet.");
  const form = new FormData();
  form.append("file", file);
  const token = getToken();
  const res = await fetch(`${API_URL}/api/blog/import-docx`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form,
  });
  const data = (await res.json().catch(() => null)) as
    | { draft?: Partial<BlogPostDraft>; message?: string }
    | null;
  if (!res.ok) throw new ApiError(res.status, data?.message ?? "Could not read that document.");
  return data?.draft ?? {};
}
