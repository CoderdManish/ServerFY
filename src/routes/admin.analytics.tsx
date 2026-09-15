import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/admin/analytics")({
  ssr: false,
  component: AnalyticsAdmin,
  head: () =>
    buildHead({
      title: "Visitor Analytics | ServerFY Admin",
      description: "Private dashboard for ServerFY anonymous visitor analytics.",
      path: "/admin/analytics",
      noindex: true,
    }),
});

const API_URL = (import.meta.env["VITE_API_URL"] as string | undefined)?.replace(/\/$/, "");
const KEY_STORE = "sfy_admin_key";

type Summary = {
  days: number;
  totals: {
    visitors: number;
    sessions: number;
    pageviews: number;
    timeOnPageMs: number;
    returningVisitors: number;
  };
  topPages: { path?: string; views: number; visitors: number }[];
  referrers: { referrer?: string; sessions: number }[];
  devices: { device?: string; visitors: number }[];
  countries: { country?: string; visitors: number }[];
  topEvents: { name?: string; count: number }[];
  topClicks: { label?: string; count: number }[];
};

type JourneyItem = {
  _id: string;
  type: string;
  name?: string;
  path?: string;
  durationMs?: number;
  scrollDepth?: number;
  target?: { label?: string; text?: string; href?: string };
  occurredAt: string;
};

function formatDuration(ms: number) {
  if (!ms) return "0s";
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  return `${m}m ${s % 60}s`;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">{label}</p>
      <p className="mt-2 text-2xl font-black text-white">{value}</p>
    </div>
  );
}

function Panel({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string | number }[];
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <h2 className="text-sm font-extrabold uppercase tracking-[0.12em] text-orange">{title}</h2>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-white/45">No data yet.</p>
      ) : (
        <ul className="mt-3 divide-y divide-white/8">
          {rows.map((r) => (
            <li key={r.label} className="flex items-center justify-between gap-4 py-2 text-sm">
              <span className="min-w-0 truncate text-white/75">{r.label}</span>
              <span className="shrink-0 font-bold text-white">{r.value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AnalyticsAdmin() {
  const [adminKey, setAdminKey] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [days, setDays] = useState(7);
  const [data, setData] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [visitorId, setVisitorId] = useState("");
  const [journey, setJourney] = useState<JourneyItem[] | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(KEY_STORE);
    if (stored) setAdminKey(stored);
  }, []);

  const load = useCallback(async () => {
    if (!API_URL || !adminKey) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/analytics/summary?days=${days}`, {
        headers: { "x-admin-key": adminKey },
      });
      if (res.status === 401) {
        setError("That access key was not accepted.");
        setData(null);
        return;
      }
      if (!res.ok) {
        setError(`The analytics service replied with an error (${res.status}).`);
        setData(null);
        return;
      }
      setData((await res.json()) as Summary);
    } catch {
      setError("Could not reach the analytics service. Check that it is running.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [adminKey, days]);

  useEffect(() => {
    void load();
  }, [load]);

  async function loadJourney() {
    if (!API_URL || !adminKey || !visitorId.trim()) return;
    setJourney(null);
    try {
      const res = await fetch(
        `${API_URL}/api/analytics/visitors/${encodeURIComponent(visitorId.trim())}`,
        { headers: { "x-admin-key": adminKey } },
      );
      if (!res.ok) {
        setError("Could not load that visitor journey.");
        return;
      }
      const json = (await res.json()) as { items: JourneyItem[] };
      setJourney(json.items);
    } catch {
      setError("Could not load that visitor journey.");
    }
  }

  return (
    <main className="min-h-screen bg-navy-gradient px-4 py-12">
      <div className="mx-auto w-full max-w-6xl">
        <p className="type-eyebrow text-orange">ServerFY admin</p>
        <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">Visitor analytics</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/65">
          Anonymous traffic insights — visitors, pages, time spent, clicks, devices, locations and
          individual journeys. No visitor login or personal data is collected.
        </p>

        {!API_URL && (
          <div className="mt-8 rounded-2xl border border-orange/40 bg-orange/10 p-5 text-sm text-white/85">
            The analytics service address is not configured yet. Once the service is live, add its
            web address as <code className="font-mono text-orange">VITE_API_URL</code> and this page
            will start showing data.
          </div>
        )}

        {!adminKey ? (
          <form
            className="mt-8 max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-6"
            onSubmit={(e) => {
              e.preventDefault();
              sessionStorage.setItem(KEY_STORE, keyInput.trim());
              setAdminKey(keyInput.trim());
            }}
          >
            <label htmlFor="adminKey" className="text-sm font-bold text-white">
              Access key
            </label>
            <p className="mt-1 text-xs text-white/55">
              The private key you set for the analytics service.
            </p>
            <input
              id="adminKey"
              type="password"
              autoComplete="off"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              className="mt-3 w-full rounded-xl border border-white/15 bg-navy-dark/70 px-4 py-2.5 text-sm text-white outline-none focus:border-orange"
              placeholder="Enter access key"
            />
            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-orange px-4 py-2.5 text-sm font-bold text-white"
            >
              View dashboard
            </button>
          </form>
        ) : (
          <>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {[1, 7, 30, 90].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDays(d)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-bold transition-colors ${
                    days === d
                      ? "border-orange bg-orange text-white"
                      : "border-white/15 text-white/70 hover:border-white/35"
                  }`}
                >
                  {d === 1 ? "Today" : `Last ${d} days`}
                </button>
              ))}
              <button
                type="button"
                onClick={() => void load()}
                className="rounded-full border border-white/15 px-4 py-1.5 text-sm font-bold text-white/70 hover:border-white/35"
              >
                Refresh
              </button>
              <button
                type="button"
                onClick={() => {
                  sessionStorage.removeItem(KEY_STORE);
                  setAdminKey("");
                  setData(null);
                }}
                className="rounded-full border border-white/15 px-4 py-1.5 text-sm font-bold text-white/70 hover:border-white/35"
              >
                Sign out
              </button>
            </div>

            {error && (
              <p className="mt-6 rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-white/85">
                {error}
              </p>
            )}
            {loading && <p className="mt-6 text-sm text-white/55">Loading…</p>}

            {data && (
              <>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  <Stat label="Visitors" value={String(data.totals.visitors)} />
                  <Stat label="Sessions" value={String(data.totals.sessions)} />
                  <Stat label="Page views" value={String(data.totals.pageviews)} />
                  <Stat label="Returning" value={String(data.totals.returningVisitors)} />
                  <Stat label="Time on page" value={formatDuration(data.totals.timeOnPageMs)} />
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <Panel
                    title="Top pages"
                    rows={data.topPages.map((p) => ({
                      label: p.path ?? "unknown",
                      value: `${p.views} views · ${p.visitors} visitors`,
                    }))}
                  />
                  <Panel
                    title="Traffic sources"
                    rows={data.referrers.map((r) => ({
                      label: r.referrer ?? "direct",
                      value: `${r.sessions} sessions`,
                    }))}
                  />
                  <Panel
                    title="Devices"
                    rows={data.devices.map((d) => ({
                      label: d.device ?? "unknown",
                      value: d.visitors,
                    }))}
                  />
                  <Panel
                    title="Locations"
                    rows={data.countries.map((c) => ({
                      label: c.country ?? "unknown",
                      value: c.visitors,
                    }))}
                  />
                  <Panel
                    title="Most clicked"
                    rows={data.topClicks.map((c) => ({
                      label: c.label ?? "unlabelled",
                      value: c.count,
                    }))}
                  />
                  <Panel
                    title="Tracked actions"
                    rows={data.topEvents.map((e) => ({ label: e.name ?? "event", value: e.count }))}
                  />
                </div>
              </>
            )}

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h2 className="text-sm font-extrabold uppercase tracking-[0.12em] text-orange">
                Visitor journey
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                <input
                  value={visitorId}
                  onChange={(e) => setVisitorId(e.target.value)}
                  placeholder="Visitor ID"
                  className="min-w-[240px] flex-1 rounded-xl border border-white/15 bg-navy-dark/70 px-4 py-2.5 text-sm text-white outline-none focus:border-orange"
                />
                <button
                  type="button"
                  onClick={() => void loadJourney()}
                  className="rounded-xl bg-orange px-4 py-2.5 text-sm font-bold text-white"
                >
                  Show journey
                </button>
              </div>
              {journey && (
                <ol className="mt-4 space-y-2">
                  {journey.map((item) => (
                    <li
                      key={item._id}
                      className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-white/8 bg-navy-dark/50 px-4 py-2 text-sm text-white/75"
                    >
                      <span className="font-mono text-xs text-white/45">
                        {new Date(item.occurredAt).toLocaleString()}
                      </span>
                      <span className="font-bold text-orange">{item.type}</span>
                      <span className="min-w-0 truncate">
                        {item.path ?? item.name ?? item.target?.label ?? item.target?.text ?? ""}
                      </span>
                      {item.durationMs ? <span>{formatDuration(item.durationMs)}</span> : null}
                      {item.scrollDepth ? <span>{item.scrollDepth}% scrolled</span> : null}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
