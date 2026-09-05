/**
 * Contact / server-request service abstraction.
 *
 * Today this resolves locally (no backend). To connect a real backend, replace the
 * body of `submitServerRequest` with a call to your endpoint or a TanStack
 * `createServerFn` — the form component does not need to change.
 *
 *   const res = await fetch("/api/public/server-request", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(payload),
 *   });
 *   if (!res.ok) return { ok: false, message: "Could not submit right now." };
 *   return { ok: true };
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

export async function submitServerRequest(payload: ServerRequestPayload): Promise<ServerRequestResult> {
  // No backend connected yet — simulate a network round-trip.
  await new Promise((r) => setTimeout(r, 900));
  if (import.meta.env.DEV) console.info("[ServerFY] server request payload", payload);
  return { ok: true };
}
