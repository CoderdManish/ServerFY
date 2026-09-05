import { Activity, ArrowRight, Cpu, HardDrive, MemoryStick, Server } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import { Reveal, SectionHeading } from "@/components/Primitives";

const usage = [
  { t: "Mon", cpu: 28, ram: 52 },
  { t: "Tue", cpu: 41, ram: 61 },
  { t: "Wed", cpu: 35, ram: 58 },
  { t: "Thu", cpu: 52, ram: 66 },
  { t: "Fri", cpu: 42, ram: 68 },
  { t: "Sat", cpu: 30, ram: 55 },
  { t: "Sun", cpu: 38, ram: 63 },
];

const gauges = [
  { label: "CPU", value: 42, icon: Cpu },
  { label: "RAM", value: 68, icon: MemoryStick },
  { label: "Storage", value: 51, icon: HardDrive },
];


function path(values: number[], w: number, h: number, close: boolean) {
  const max = 80;
  const step = w / (values.length - 1);
  const pts = values.map((v, i) => `${(i * step).toFixed(1)},${(h - (v / max) * h).toFixed(1)}`);
  const d = `M${pts.join(" L")}`;
  return close ? `${d} L${w},${h} L0,${h} Z` : d;
}

function UsageChart() {
  const w = 320;
  const h = 128;
  const cpu = usage.map((u) => u.cpu);
  const ram = usage.map((u) => u.ram);
  return (
    <figure className="m-0">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-32 w-full" role="img" aria-label="Weekly CPU and RAM utilisation">
        <defs>
          <linearGradient id="fy-cpu" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--blue-bright)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--blue-bright)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="fy-ram" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--orange)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--orange)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={path(ram, w, h, true)} fill="url(#fy-ram)" />
        <path d={path(ram, w, h, false)} fill="none" stroke="var(--orange)" strokeWidth="2" strokeLinejoin="round" />
        <path d={path(cpu, w, h, true)} fill="url(#fy-cpu)" />
        <path d={path(cpu, w, h, false)} fill="none" stroke="var(--blue-bright)" strokeWidth="2" strokeLinejoin="round" />
      </svg>
      <figcaption className="mt-2 flex justify-between text-[0.65rem] font-semibold text-muted-foreground">
        {usage.map((u) => (
          <span key={u.t}>{u.t}</span>
        ))}
      </figcaption>
    </figure>
  );
}

export function DashboardPreview() {
  return (
    <section className="section-y bg-soft-mesh">
      <div className="container-fy">
        <SectionHeading
          eyebrow="Dashboard preview"
          title="Manage Your SAP Servers From One Dashboard"
          sub="A preview of the ServerFY customer console — monitor usage, check expiry and extend access in a couple of clicks."
        />

        <Reveal className="mt-12" delay={0.1}>
          <div className="rounded-[2rem] glass-panel p-3 sm:p-5">
            <div className="overflow-hidden rounded-3xl border border-border bg-card">
              {/* window bar */}
              <div className="flex items-center gap-3 border-b border-border bg-muted/60 px-4 py-3">
                <span className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-orange" />
                  <span className="size-2.5 rounded-full bg-border" />
                  <span className="size-2.5 rounded-full bg-border" />
                </span>
                <span className="type-eyebrow text-muted-foreground">ServerFY Console — My Servers</span>
              </div>

              <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
                {/* server card */}
                <div className="rounded-2xl border border-border p-5">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy text-white">
                        <Server className="size-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-extrabold text-foreground">SAP S/4HANA Practice</p>
                        <p className="text-xs text-muted-foreground">Shared · 8 GB RAM · Client 800</p>
                      </div>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-wider text-emerald-700">
                      <span className="size-1.5 rounded-full bg-emerald-500 led-online" />
                      Online
                    </span>
                  </div>

                  <dl className="mt-6 space-y-4">
                    {gauges.map((g) => (
                      <div key={g.label}>
                        <div className="flex items-center justify-between text-xs font-bold">
                          <dt className="flex items-center gap-1.5 text-muted-foreground">
                            <g.icon className="size-3.5" aria-hidden="true" /> {g.label}
                          </dt>
                          <dd className="text-foreground">{g.value}%</dd>
                        </div>
                        <div className="mt-1.5 h-2 rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue to-blue-bright"
                            style={{ width: `${g.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 flex items-center justify-between rounded-xl bg-muted px-4 py-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Expires in</span>
                    <span className="text-lg font-extrabold text-orange">23 Days</span>
                  </div>

                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <CtaButton href="/contact" size="sm" variant="blue" className="flex-1">
                      Open Server
                    </CtaButton>
                    <CtaButton href="/contact" size="sm" variant="outlineDark" className="flex-1">
                      Extend Access
                    </CtaButton>
                  </div>
                </div>

                {/* chart + list */}
                <div className="flex flex-col gap-5">
                  <div className="rounded-2xl border border-border p-5">
                    <div className="flex items-center justify-between">
                      <p className="type-eyebrow text-muted-foreground">Weekly utilisation</p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue">
                        <Activity className="size-3.5" aria-hidden="true" /> Live
                      </span>
                    </div>
                    <div className="mt-4">
                      <UsageChart />
                    </div>
                  </div>

                  <ul className="rounded-2xl border border-border p-3">
                    {[
                      { name: "SAP ECC 6.0 — MM Practice", status: "Online" },
                      { name: "SAP HANA — Modelling Lab", status: "Online" },
                      { name: "SAP ABAP — Dev Sandbox", status: "Provisioning" },
                    ].map((s) => (
                      <li key={s.name} className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 hover:bg-muted">
                        <span className="min-w-0 truncate text-sm font-semibold text-foreground">{s.name}</span>
                        <span className="inline-flex shrink-0 items-center gap-1.5 text-[0.65rem] font-extrabold uppercase tracking-wider text-muted-foreground">
                          <span className={`size-1.5 rounded-full ${s.status === "Online" ? "bg-emerald-500" : "bg-orange"}`} />
                          {s.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              Console preview — visual mockup of upcoming functionality
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
