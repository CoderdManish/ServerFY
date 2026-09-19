import { useId, useMemo, useRef, useState } from "react";

export type SeriesPoint = { at: string; current: number; previous: number };

export type ChartRange = "day" | "week" | "month" | "year";

const RANGE_LABEL: Record<ChartRange, string> = {
  day: "Today",
  week: "This week",
  month: "This month",
  year: "This year",
};

function formatBucket(at: string, range: ChartRange) {
  const d = new Date(at);
  if (range === "day") return `${String(d.getUTCHours()).padStart(2, "0")}:00`;
  if (range === "year") return d.toLocaleDateString(undefined, { month: "short", timeZone: "UTC" });
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short", timeZone: "UTC" });
}

type Pt = { x: number; y: number };

/** Catmull-Rom spline converted to cubic bezier segments for a smooth path. */
function smoothPath(pts: Pt[]): string {
  if (pts.length === 0) return "";
  if (pts.length === 1) return `M ${pts[0]!.x},${pts[0]!.y}`;
  let d = `M ${pts[0]!.x},${pts[0]!.y}`;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[i - 1] ?? pts[i]!;
    const p1 = pts[i]!;
    const p2 = pts[i + 1]!;
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${round(c1x)},${round(c1y)} ${round(c2x)},${round(c2y)} ${round(p2.x)},${round(p2.y)}`;
  }
  return d;
}

function round(n: number) {
  return Math.round(n * 100) / 100;
}

/**
 * Dependency-free SVG comparison chart: current period as a glowing smooth
 * area spline, previous period as a dashed comparison line. Hover or tap a
 * point to inspect that bucket; range tabs switch day/week/month/year.
 */
export function ComparisonChart({
  series,
  range,
  onRangeChange,
  title,
  unitLabel = "leads",
}: {
  series: SeriesPoint[];
  range: ChartRange;
  onRangeChange: (r: ChartRange) => void;
  title: string;
  unitLabel?: string;
}) {
  const gid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);

  const active = pinned ?? hover;

  const max = useMemo(
    () => Math.max(1, ...series.flatMap((p) => [p.current, p.previous])),
    [series],
  );

  const totals = useMemo(() => {
    const current = series.reduce((s, p) => s + p.current, 0);
    const previous = series.reduce((s, p) => s + p.previous, 0);
    const changePct = previous ? Math.round(((current - previous) / previous) * 100) : null;
    return { current, previous, changePct };
  }, [series]);

  const w = 100;
  const h = 40;
  const padTop = 4;
  const step = series.length > 1 ? w / series.length : w;

  const toPts = (key: "current" | "previous"): Pt[] =>
    series.map((p, i) => ({
      x: (i + 0.5) * step,
      y: h - (p[key] / max) * (h - padTop),
    }));

  const curPts = useMemo(() => toPts(series.length ? "current" : "current"), [series, max]);
  const prevPts = useMemo(() => (series.length ? toPts("previous") : []), [series, max]);

  const curLine = smoothPath(curPts);
  const prevLine = smoothPath(prevPts);
  const areaPath = curPts.length
    ? `${curLine} L ${curPts.at(-1)!.x},${h} L ${curPts[0]!.x},${h} Z`
    : "";

  const pickIndex = (clientX: number) => {
    const el = wrapRef.current;
    if (!el || series.length === 0) return null;
    const rect = el.getBoundingClientRect();
    const frac = Math.min(0.999, Math.max(0, (clientX - rect.left) / rect.width));
    return Math.floor(frac * series.length);
  };

  const sel = active !== null ? series[active] : null;
  const selX = active !== null ? ((active + 0.5) / Math.max(series.length, 1)) * 100 : 0;
  const selY = sel ? (1 - sel.current / max) * 100 : 0;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl sm:p-6">
      {/* soft ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full bg-orange/10 blur-3xl"
      />

      <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 sm:flex sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="truncate text-base font-extrabold text-white sm:text-lg">{title}</h2>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              {totals.current.toLocaleString()}
            </span>
            {totals.changePct !== null && (
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                  totals.changePct >= 0
                    ? "bg-emerald-400/10 text-emerald-300"
                    : "bg-red-400/10 text-red-300"
                }`}
              >
                {totals.changePct >= 0 ? "+" : ""}
                {totals.changePct}%
              </span>
            )}
            <span className="text-[11px] text-white/45">
              vs {totals.previous.toLocaleString()} previous · {RANGE_LABEL[range].toLowerCase()}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 rounded-full border border-white/10 bg-navy-dark/60 p-1">
          {(["day", "week", "month", "year"] as ChartRange[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setPinned(null);
                setHover(null);
                onRangeChange(r);
              }}
              className={`rounded-full px-3 py-1 text-xs font-bold capitalize transition-colors ${
                range === r ? "bg-orange text-white shadow-lg shadow-orange/25" : "text-white/60 hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={wrapRef}
        className="relative mt-5 cursor-crosshair"
        onMouseMove={(e) => setHover(pickIndex(e.clientX))}
        onMouseLeave={() => setHover(null)}
        onClick={(e) => setPinned(pickIndex(e.clientX))}
      >
        <svg
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
          className="h-44 w-full sm:h-56"
          role="img"
          aria-label={`${title} chart`}
        >
          <defs>
            <linearGradient id={`area-${gid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </linearGradient>
            <filter id={`glow-${gid}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* grid */}
          {[0.25, 0.5, 0.75].map((g) => (
            <line
              key={g}
              x1="0"
              x2={w}
              y1={h * g}
              y2={h * g}
              stroke="currentColor"
              className="text-white/5"
              strokeWidth="0.15"
            />
          ))}

          {series.length > 0 && (
            <>
              {/* previous period — dashed sky line */}
              <path
                d={prevLine}
                fill="none"
                stroke="#38bdf8"
                strokeOpacity="0.55"
                strokeWidth="0.5"
                strokeDasharray="1.6 1.2"
                vectorEffect="non-scaling-stroke"
              />

              {/* current period — gradient area + glowing line */}
              <path d={areaPath} fill={`url(#area-${gid})`} />
              <path
                d={curLine}
                fill="none"
                stroke="#f97316"
                strokeWidth="1"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                filter={`url(#glow-${gid})`}
              />

              {/* active crosshair + point */}
              {active !== null && curPts[active] && (
                <g>
                  <line
                    x1={curPts[active]!.x}
                    x2={curPts[active]!.x}
                    y1="0"
                    y2={h}
                    stroke="currentColor"
                    className="text-white/15"
                    strokeWidth="0.3"
                    strokeDasharray="1 1"
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle
                    cx={curPts[active]!.x}
                    cy={curPts[active]!.y}
                    r="1.4"
                    fill="#f97316"
                    stroke="#070d1f"
                    strokeWidth="0.5"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              )}
            </>
          )}

          {series.length === 0 && (
            <text
              x={w / 2}
              y={h / 2}
              textAnchor="middle"
              className="fill-white/30"
              style={{ fontSize: 3 }}
            >
              No data for this period yet
            </text>
          )}
        </svg>

        {/* floating tooltip */}
        {sel && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-xl border border-white/15 bg-[#0f172a]/95 px-3 py-2 shadow-2xl backdrop-blur-md"
            style={{ left: `${selX}%`, top: `calc(${selY}% - 10px)` }}
          >
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-white/40">
              {formatBucket(sel.at, range)}
            </p>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 font-bold text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                {sel.current.toLocaleString()} {unitLabel}
              </span>
              <span className="flex items-center gap-1.5 text-white/50">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                {sel.previous.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-2 flex justify-between text-[10px] text-white/40">
        <span>{series[0] ? formatBucket(series[0].at, range) : ""}</span>
        <span>{series.at(-1) ? formatBucket(series.at(-1)!.at, range) : ""}</span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-white/5 pt-4 text-xs">
        <span className="flex items-center gap-2 text-white/70">
          <span className="h-1 w-4 rounded-full bg-orange shadow-[0_0_6px_rgba(249,115,22,0.8)]" />
          Current
        </span>
        <span className="flex items-center gap-2 text-white/70">
          <span className="h-0.5 w-4 rounded-full border-t border-dashed border-sky-400" />
          Previous
        </span>
        {pinned !== null && sel && (
          <span className="rounded-full border border-white/15 bg-navy-dark/70 px-3 py-1 font-bold text-white">
            {formatBucket(sel.at, range)}: {sel.current} {unitLabel} (was {sel.previous})
          </span>
        )}
      </div>
    </section>
  );
}
