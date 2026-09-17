import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ADMIN_BASE, ApiError, api, apiConfigured, getToken, setToken } from "@/lib/admin-api";

export const Route = createFileRoute("/sfy-console-9f2a/")({
  ssr: false,
  component: ConsoleLogin,
  head: () => ({
    meta: [
      { title: "Sign in" },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
});

function ConsoleLogin() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (getToken()) void navigate({ to: `${ADMIN_BASE}/dashboard`, replace: true });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    setError(null);
    try {
      const res = await api<{ token: string }>("/api/auth/login", {
        method: "POST",
        auth: false,
        body: { email: String(fd.get("email") ?? ""), password: String(fd.get("password") ?? "") },
      });
      setToken(res.token);
      await navigate({ to: `${ADMIN_BASE}/dashboard`, replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not sign in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-navy-gradient px-4 py-10">
      <div className="w-full max-w-sm rounded-3xl border border-white/12 bg-white/[0.05] p-6 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-8">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-orange/40 bg-orange/15 text-lg font-black text-orange">
          S
        </div>
        <h1 className="mt-5 text-center text-xl font-black text-white">ServerFY Console</h1>
        <p className="mt-1 text-center text-xs text-white/50">Authorised staff only.</p>

        {!apiConfigured() && (
          <p className="mt-5 rounded-2xl border border-orange/35 bg-orange/10 p-3 text-xs text-white/80">
            The data service address is not configured yet, so sign-in is unavailable.
          </p>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <input
            name="email"
            type="email"
            required
            autoComplete="username"
            placeholder="Email"
            aria-label="Email"
            className="w-full rounded-2xl border border-white/12 bg-navy-dark/70 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-orange"
          />
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Password"
            aria-label="Password"
            className="w-full rounded-2xl border border-white/12 bg-navy-dark/70 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-orange"
          />
          {error && <p className="text-xs text-red-300">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-2xl bg-orange px-4 py-3 text-sm font-black text-white disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
