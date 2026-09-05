/**
 * Contact / server-request service.
 *
 * Posts to the standalone Express + MongoDB Atlas backend (see /backend).
 * Set VITE_API_URL to the deployed Render URL, e.g.
 *   VITE_API_URL=https://serverfy-backend.onrender.com
 * When it is not set, submissions resolve locally so the form stays usable.
 */

export type ServerRequestPayload = {
  name: string;
  email: string;
  phone: string;
  sapModule: string;
  sapVersion: string;
  serverType: string;
  users: string;
  duration: string;
  requirement: string;
};

export type ServerRequestResult = { ok: true } | { ok: false; message: string };

const API_URL = (import.meta.env['VITE_API_URL'] as string | undefined)?.replace(/\/$/, "");

export async function submitServerRequest(payload: ServerRequestPayload): Promise<ServerRequestResult> {
  if (!API_URL) {
    await new Promise((r) => setTimeout(r, 900));
    if (import.meta.env.DEV) console.info("[ServerFY] no VITE_API_URL set — request not sent", payload);
    return { ok: true };
  }

  try {
    const res = await fetch(`${API_URL}/api/server-requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, company_website: "" }),
    });
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { message?: string } | null;
      return { ok: false, message: data?.message ?? "Could not submit right now. Please try again." };
    }
    return { ok: true };
  } catch {
    return { ok: false, message: "Network error. Please check your connection and try again." };
  }
}
