import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import {
  ADMIN_BASE,
  ApiError,
  api,
  getToken,
  setToken,
  type AdminPermission,
  type AdminUser,
} from "@/lib/admin-api";
import { ComparisonChart, type ChartRange, type SeriesPoint } from "@/components/admin/ComparisonChart";

export const Route = createFileRoute("/sfy-console-9f2a/dashboard")({
  ssr: false,
  component: Dashboard,
  head: () => ({
    meta: [{ title: "Console" }, { name: "robots", content: "noindex, nofollow, noarchive" }],
  }),
});

type Summary = {
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

type TimeSeries = {
  series: SeriesPoint[];
  totals: { current: number; previous: number; changePct: number | null };
};

type LeadStats = TimeSeries & {
  totals: { current: number; previous: number; changePct: number | null; allTime: number };
  statuses: { status: string; count: number }[];
  sources: { source: string; count: number }[];
};

type Lead = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  interest?: string;
  location?: string;
  source?: string;
  page?: string;
  status: string;
  createdAt: string;
};

const RANGE_DAYS: Record<ChartRange, number> = { day: 1, week: 7, month: 30, year: 90 };
const PERMISSIONS: AdminPermission[] = ["analytics", "leads", "requests", "admins", "blog"];
const STATUSES = ["new", "contacted", "qualified", "converted", "lost"];

function formatDuration(ms: number) {
  if (!ms) return "0s";
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ${s % 60}s`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-xl">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/45">{label}</p>
      <p className="mt-1.5 text-xl font-black text-white sm:text-2xl">{value}</p>
      {hint && <p className="mt-1 text-[11px] text-white/45">{hint}</p>}
    </div>
  );
}

function Panel({ title, rows }: { title: string; rows: { label: string; value: string | number }[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
      <h3 className="text-xs font-extrabold uppercase tracking-[0.12em] text-orange">{title}</h3>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-white/45">No data yet.</p>
      ) : (
        <ul className="mt-3 divide-y divide-white/10">
          {rows.slice(0, 10).map((r) => (
            <li key={r.label} className="flex items-center justify-between gap-3 py-2 text-sm">
              <span className="min-w-0 truncate text-white/75">{r.label}</span>
              <span className="shrink-0 font-bold text-white">{r.value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const [me, setMe] = useState<AdminUser | null>(null);
  const [tab, setTab] = useState<"overview" | "leads" | "team">("overview");
  const [error, setError] = useState<string | null>(null);

  const signOut = useCallback(() => {
    setToken(null);
    void navigate({ to: ADMIN_BASE, replace: true });
  }, [navigate]);

  useEffect(() => {
    if (!getToken()) {
      void navigate({ to: ADMIN_BASE, replace: true });
      return;
    }
    api<{ user: AdminUser }>("/api/auth/me")
      .then((r) => setMe(r.user))
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) signOut();
        else setError(err instanceof ApiError ? err.message : "Could not load your account.");
      });
  }, [navigate, signOut]);

  const can = (p: AdminPermission) => Boolean(me && (me.role === "owner" || me.permissions.includes(p)));

  if (error && !me) {
    return (
      <main className="grid min-h-screen place-items-center bg-navy-gradient px-4 text-center">
        <div>
          <p className="text-sm text-white/80">{error}</p>
          <button onClick={signOut} className="mt-4 rounded-xl bg-orange px-4 py-2 text-sm font-bold text-white">
            Back to sign in
          </button>
        </div>
      </main>
    );
  }

  if (!me) {
    return (
      <main className="grid min-h-screen place-items-center bg-navy-gradient">
        <p className="text-sm text-white/60">Loading console…</p>
      </main>
    );
  }

  const tabs = (
    [
      { id: "overview", label: "Analytics", allowed: can("analytics") },
      { id: "leads", label: "Leads", allowed: can("leads") },
      { id: "team", label: "Team", allowed: can("admins") },
    ] as const
  ).filter((t) => t.allowed);

  return (
    <main className="min-h-screen bg-navy-gradient px-3 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-6xl">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
          <div className="min-w-0">
            <p className="type-eyebrow text-orange">ServerFY console</p>
            <h1 className="truncate text-2xl font-black text-white sm:text-3xl">
              Welcome, {me.name.split(" ")[0]}
            </h1>
            <p className="mt-1 truncate text-xs text-white/50">
              {me.email} · {me.role}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {can("blog") && (
              <Link
                to="/sfy-console-9f2a/blog"
                className="rounded-full bg-orange px-4 py-2 text-xs font-bold text-white"
              >
                Blog studio
              </Link>
            )}
            <button
              onClick={signOut}
              className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-white/75 hover:border-white/35"
            >
              Sign out
            </button>
          </div>
        </header>

        <nav className="mt-6 flex flex-wrap gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                tab === t.id ? "bg-orange text-white" : "text-white/65 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="mt-6">
          {tab === "overview" && can("analytics") && <AnalyticsTab />}
          {tab === "leads" && can("leads") && <LeadsTab />}
          {tab === "team" && can("admins") && <TeamTab meId={me.id} />}
          {tabs.length === 0 && (
            <p className="text-sm text-white/60">No sections have been shared with your account yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}

type VisitorRow = {
  visitorId: string;
  lastSeen: string;
  firstSeen: string;
  events: number;
  pageviews: number;
  sessions: number;
  device?: string;
  country?: string;
  landingPage?: string;
};

function AnalyticsTab() {
  const [range, setRange] = useState<ChartRange>("week");
  const [ts, setTs] = useState<TimeSeries | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [visitorId, setVisitorId] = useState("");
  const [visitors, setVisitors] = useState<VisitorRow[] | null>(null);
  const [visitorsUnsupported, setVisitorsUnsupported] = useState(false);
  const [journey, setJourney] = useState<
    { _id: string; type: string; name?: string; path?: string; durationMs?: number; occurredAt: string }[] | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const loadJourney = (id: string) => {
    if (!id.trim()) return;
    api<{ items: typeof journey }>(`/api/analytics/visitors/${encodeURIComponent(id.trim())}`)
      .then((r) => setJourney(r.items ?? []))
      .catch(() => setError("Could not load that visitor journey."));
  };

  useEffect(() => {
    setError(null);
    api<TimeSeries>(`/api/analytics/timeseries?range=${range}`).then(setTs).catch(() => setTs(null));
    api<Summary>(`/api/analytics/summary?days=${RANGE_DAYS[range]}`)
      .then(setSummary)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Could not load analytics."));
    setVisitorsUnsupported(false);
    api<{ visitors: VisitorRow[] }>(`/api/analytics/visitors?days=${RANGE_DAYS[range]}`)
      .then((r) => setVisitors(r.visitors ?? []))
      .catch((err) => {
        setVisitors([]);
        if (err instanceof ApiError && err.status === 404) setVisitorsUnsupported(true);
      });
  }, [range]);

  const t = summary?.totals;

  return (
    <div className="space-y-5">
      {error && <p className="rounded-2xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-white/85">{error}</p>}

      <ComparisonChart
        title="Visitors"
        unitLabel="visitors"
        range={range}
        onRangeChange={setRange}
        series={ts?.series ?? []}
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Stat
          label="Visitors"
          value={String(ts?.totals.current ?? t?.visitors ?? 0)}
          hint={
            ts?.totals.changePct === null || ts?.totals.changePct === undefined
              ? "No previous data"
              : `${ts.totals.changePct >= 0 ? "+" : ""}${ts.totals.changePct}% vs previous`
          }
        />
        <Stat label="Sessions" value={String(t?.sessions ?? 0)} />
        <Stat label="Page views" value={String(t?.pageviews ?? 0)} />
        <Stat label="Returning" value={String(t?.returningVisitors ?? 0)} />
        <Stat label="Time on page" value={formatDuration(t?.timeOnPageMs ?? 0)} />
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <Panel
          title="Top pages"
          rows={(summary?.topPages ?? []).map((p) => ({
            label: p.path ?? "unknown",
            value: `${p.views} views · ${p.visitors} visitors`,
          }))}
        />
        <Panel
          title="Traffic sources"
          rows={(summary?.referrers ?? []).map((r) => ({ label: r.referrer ?? "direct", value: r.sessions }))}
        />
        <Panel
          title="Devices"
          rows={(summary?.devices ?? []).map((d) => ({ label: d.device ?? "unknown", value: d.visitors }))}
        />
        <Panel
          title="Locations"
          rows={(summary?.countries ?? []).map((c) => ({ label: c.country ?? "unknown", value: c.visitors }))}
        />
        <Panel
          title="Most clicked"
          rows={(summary?.topClicks ?? []).map((c) => ({ label: c.label ?? "unlabelled", value: c.count }))}
        />
        <Panel
          title="Tracked actions"
          rows={(summary?.topEvents ?? []).map((e) => ({ label: e.name ?? "event", value: e.count }))}
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xs font-extrabold uppercase tracking-[0.12em] text-orange">Recent visitors</h3>
          <span className="text-[11px] text-white/40">{visitors?.length ?? 0} in this period</span>
        </div>
        {visitorsUnsupported ? (
          <p className="mt-3 text-sm text-white/45">
            Visitor IDs need the latest backend update — add the <code>GET /api/analytics/visitors</code> route
            and redeploy the backend.
          </p>
        ) : visitors === null ? (
          <p className="mt-3 text-sm text-white/45">Loading visitors…</p>
        ) : visitors.length === 0 ? (
          <p className="mt-3 text-sm text-white/45">No visitors recorded in this period yet.</p>
        ) : (
          <ul className="mt-3 divide-y divide-white/10">
            {visitors.slice(0, 25).map((v) => (
              <li key={v.visitorId}>
                <button
                  type="button"
                  onClick={() => {
                    setVisitorId(v.visitorId);
                    loadJourney(v.visitorId);
                  }}
                  className="flex w-full flex-wrap items-center gap-x-3 gap-y-1 py-2 text-left text-sm transition-colors hover:text-white"
                >
                  <span className="min-w-0 flex-1 truncate font-mono text-[12px] font-bold text-orange">
                    {v.visitorId}
                  </span>
                  <span className="text-white/50">{v.device ?? "device?"}</span>
                  <span className="text-white/50">{v.country ?? "—"}</span>
                  <span className="text-white/70">{v.pageviews} pages</span>
                  <span className="text-white/40">
                    {new Date(v.lastSeen).toLocaleString(undefined, {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
        <h3 className="text-xs font-extrabold uppercase tracking-[0.12em] text-orange">Visitor journey</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <input
            value={visitorId}
            onChange={(e) => setVisitorId(e.target.value)}
            placeholder="Visitor ID"
            className="min-w-[200px] flex-1 rounded-xl border border-white/15 bg-navy-dark/70 px-4 py-2.5 text-sm text-white outline-none focus:border-orange"
          />
          <button
            onClick={() => loadJourney(visitorId)}
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
                className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-white/10 bg-navy-dark/50 px-3 py-2 text-sm text-white/75"
              >
                <span className="font-mono text-[11px] text-white/45">
                  {new Date(item.occurredAt).toLocaleString()}
                </span>
                <span className="font-bold text-orange">{item.type}</span>
                <span className="min-w-0 truncate">{item.path ?? item.name ?? ""}</span>
                {item.durationMs ? <span>{formatDuration(item.durationMs)}</span> : null}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

function LeadsTab() {
  const [range, setRange] = useState<ChartRange>("week");
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState<string | null>(null);

  const loadLeads = useCallback(() => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (status) params.set("status", status);
    api<{ items: Lead[] }>(`/api/leads?${params.toString()}`)
      .then((r) => setLeads(r.items))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Could not load leads."));
  }, [q, status]);

  useEffect(() => {
    api<LeadStats>(`/api/leads/stats?range=${range}`).then(setStats).catch(() => setStats(null));
  }, [range]);

  useEffect(() => {
    const id = setTimeout(loadLeads, 250);
    return () => clearTimeout(id);
  }, [loadLeads]);

  async function updateStatus(id: string, next: string) {
    setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status: next } : l)));
    try {
      await api(`/api/leads/${id}`, { method: "PATCH", body: { status: next } });
    } catch {
      setError("Could not update that lead.");
    }
  }

  function exportCsv() {
    const rows = [
      ["Date", "Name", "Email", "Phone", "Interest", "Location", "Source", "Page", "Status"],
      ...leads.map((l) => [
        new Date(l.createdAt).toISOString(),
        l.name,
        l.email,
        l.phone,
        l.interest ?? "",
        l.location ?? "",
        l.source ?? "",
        l.page ?? "",
        l.status,
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `serverfy-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-5">
      {error && <p className="rounded-2xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-white/85">{error}</p>}

      <ComparisonChart
        title="Leads generated"
        range={range}
        onRangeChange={setRange}
        series={stats?.series ?? []}
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="This period"
          value={String(stats?.totals.current ?? 0)}
          hint={
            stats?.totals.changePct === null || stats?.totals.changePct === undefined
              ? "No previous data"
              : `${stats.totals.changePct >= 0 ? "+" : ""}${stats.totals.changePct}% vs previous`
          }
        />
        <Stat label="Previous period" value={String(stats?.totals.previous ?? 0)} />
        <Stat label="All time" value={String(stats?.totals.allTime ?? 0)} />
        <Stat
          label="Converted"
          value={String(stats?.statuses.find((s) => s.status === "converted")?.count ?? 0)}
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
        <div className="flex flex-wrap gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, email, phone…"
            className="min-w-[200px] flex-1 rounded-xl border border-white/15 bg-navy-dark/70 px-4 py-2.5 text-sm text-white outline-none focus:border-orange"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border border-white/15 bg-navy-dark/70 px-3 py-2.5 text-sm text-white outline-none focus:border-orange"
          >
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s} className="bg-navy-dark">
                {s}
              </option>
            ))}
          </select>
          <button
            onClick={exportCsv}
            className="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-bold text-white/75 hover:border-white/35"
          >
            Export CSV
          </button>
        </div>

        <div className="mt-4 space-y-2">
          {leads.length === 0 && <p className="text-sm text-white/45">No leads yet.</p>}
          {leads.map((l) => (
            <div
              key={l._id}
              className="grid gap-2 rounded-2xl border border-white/10 bg-navy-dark/50 p-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">{l.name}</p>
                <p className="truncate text-xs text-white/60">
                  {l.email} · {l.phone}
                </p>
                <p className="mt-1 truncate text-[11px] text-white/45">
                  {[l.interest, l.location, l.page, new Date(l.createdAt).toLocaleString()]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
              <select
                value={l.status}
                onChange={(e) => void updateStatus(l._id, e.target.value)}
                className="rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2 text-xs font-bold text-white outline-none focus:border-orange"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s} className="bg-navy-dark">
                    {s}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamTab({ meId }: { meId: string }) {
  const [items, setItems] = useState<AdminUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    api<{ items: AdminUser[] }>("/api/auth/admins")
      .then((r) => setItems(r.items))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Could not load the team."));
  }, []);

  useEffect(load, [load]);

  async function createAdmin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      await api("/api/auth/admins", {
        method: "POST",
        body: {
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          password: String(fd.get("password") ?? ""),
          role: String(fd.get("role") ?? "admin"),
          permissions: PERMISSIONS.filter((p) => fd.get(`perm_${p}`) === "on"),
        },
      });
      form.reset();
      setNotice("New admin created.");
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not create that admin.");
    } finally {
      setBusy(false);
    }
  }

  async function togglePermission(user: AdminUser, perm: AdminPermission) {
    const next = user.permissions.includes(perm)
      ? user.permissions.filter((p) => p !== perm)
      : [...user.permissions, perm];
    setItems((prev) => prev.map((u) => (u.id === user.id ? { ...u, permissions: next } : u)));
    try {
      await api(`/api/auth/admins/${user.id}`, { method: "PATCH", body: { permissions: next } });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not update permissions.");
      load();
    }
  }

  async function setActive(user: AdminUser, active: boolean) {
    try {
      await api(`/api/auth/admins/${user.id}`, { method: "PATCH", body: { active } });
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not update that account.");
    }
  }

  async function remove(user: AdminUser) {
    if (!window.confirm(`Remove access for ${user.email}?`)) return;
    try {
      await api(`/api/auth/admins/${user.id}`, { method: "DELETE" });
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not remove that account.");
    }
  }

  return (
    <div className="space-y-5">
      {error && <p className="rounded-2xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-white/85">{error}</p>}
      {notice && <p className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-3 text-sm text-white/85">{notice}</p>}

      <form onSubmit={createAdmin} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
        <h3 className="text-xs font-extrabold uppercase tracking-[0.12em] text-orange">Add an admin</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <input name="name" required placeholder="Full name" className="rounded-xl border border-white/15 bg-navy-dark/70 px-4 py-2.5 text-sm text-white outline-none focus:border-orange" />
          <input name="email" type="email" required placeholder="Email" className="rounded-xl border border-white/15 bg-navy-dark/70 px-4 py-2.5 text-sm text-white outline-none focus:border-orange" />
          <input name="password" type="password" required minLength={10} placeholder="Temporary password (10+ chars)" className="rounded-xl border border-white/15 bg-navy-dark/70 px-4 py-2.5 text-sm text-white outline-none focus:border-orange" />
          <select name="role" defaultValue="admin" className="rounded-xl border border-white/15 bg-navy-dark/70 px-4 py-2.5 text-sm text-white outline-none focus:border-orange">
            <option value="admin" className="bg-navy-dark">Admin</option>
            <option value="viewer" className="bg-navy-dark">Viewer</option>
          </select>
        </div>
        <div className="mt-3 flex flex-wrap gap-3">
          {PERMISSIONS.map((p) => (
            <label key={p} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold capitalize text-white/75">
              <input type="checkbox" name={`perm_${p}`} defaultChecked={p !== "admins"} className="accent-orange" />
              {p}
            </label>
          ))}
        </div>
        <button type="submit" disabled={busy} className="mt-4 rounded-xl bg-orange px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">
          {busy ? "Creating…" : "Create admin"}
        </button>
      </form>

      <div className="space-y-2">
        {items.map((u) => (
          <div key={u.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">
                  {u.name} {u.id === meId && <span className="text-orange">(you)</span>}
                </p>
                <p className="truncate text-xs text-white/55">
                  {u.email} · {u.role} · {u.active ? "active" : "disabled"}
                </p>
              </div>
              {u.role !== "owner" && u.id !== meId && (
                <div className="flex shrink-0 gap-2">
                  <button onClick={() => void setActive(u, !u.active)} className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-bold text-white/75 hover:border-white/35">
                    {u.active ? "Disable" : "Enable"}
                  </button>
                  <button onClick={() => void remove(u)} className="rounded-full border border-red-400/30 px-3 py-1.5 text-xs font-bold text-red-200 hover:border-red-400/60">
                    Remove
                  </button>
                </div>
              )}
            </div>
            {u.role !== "owner" && (
              <div className="mt-3 flex flex-wrap gap-2">
                {PERMISSIONS.map((p) => {
                  const on = u.permissions.includes(p);
                  return (
                    <button
                      key={p}
                      onClick={() => void togglePermission(u, p)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-bold capitalize transition-colors ${
                        on ? "border-orange bg-orange/20 text-orange" : "border-white/15 text-white/50"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
