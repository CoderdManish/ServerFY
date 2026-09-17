import { useMemo, useState } from "react";

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

/**
 * Lightweight dependency-free SVG chart: current period as bars, previous period
 * as a comparison line. Clicking a bucket selects it and reports the detail.
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
  const [active, setActive] = useState<number | null>(null);
  const max = useMemo(
    () => Math.max(1, ...series.flatMap((p) => [p.current, p.previous])),
    [series],
  );

  const w = 100;
  const h = 40;
  const step = series.length > 1 ? w / series.length : w;
  const barW = Math.max(step * 0.45, 0.8);

  const linePoints = series
    .map((p, i) => `${(i + 0.5) * step},${h - (p.previous / max) * (h - 4)}`)
    .join(" ");

  const selected = active !== null ? series[active] : null;

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl sm:p-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 sm:flex sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="truncate text-base font-extrabold text-white sm:text-lg">{title}</h2>
          <p className="mt-1 text-xs text-white/50">
            Bars show {RANGE_LABEL[range].toLowerCase()} · line shows the previous period
          </p>
        </div>
        <div className="flex flex-wrap gap-1 rounded-full border border-white/10 bg-navy-dark/60 p-1">
          {(["day", "week", "month", "year"] as ChartRange[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setActive(null);
                onRangeChange(r);
              }}
              className={`rounded-full px-3 py-1 text-xs font-bold capitalize transition-colors ${
                range === r ? "bg-orange text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
          className="h-44 w-full sm:h-56"
          role="img"
          aria-label={`${title} chart`}
        >
          {[0.25, 0.5, 0.75].map((g) => (
            <line
              key={g}
              x1="0"
              x2={w}
              y1={h * g}
              y2={h * g}
              stroke="currentColor"
              className="text-white/10"
              strokeWidth="0.15"
            />
          ))}
          {series.map((p, i) => {
            const barH = (p.current / max) * (h - 4);
            return (
              <g key={p.at} onClick={() => setActive(i)} className="cursor-pointer">
                <rect x={i * step} y={0} width={step} height={h} fill="transparent" />
                <rect
                  x={(i + 0.5) * step - barW / 2}
                  y={h - barH}
                  width={barW}
                  height={Math.max(barH, 0.4)}
                  rx="0.6"
                  className={active === i ? "fill-orange" : "fill-orange/60"}
                />
              </g>
            );
          })}
          <polyline
            points={linePoints}
            fill="none"
            stroke="currentColor"
            className="text-sky-300/80"
            strokeWidth="0.4"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="mt-2 flex justify-between text-[10px] text-white/40">
          <span>{series[0] ? formatBucket(series[0].at, range) : ""}</span>
          <span>{series.at(-1) ? formatBucket(series.at(-1)!.at, range) : ""}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
        <span className="flex items-center gap-2 text-white/70">
          <span className="h-2 w-4 rounded-full bg-orange" /> Current
        </span>
        <span className="flex items-center gap-2 text-white/70">
          <span className="h-0.5 w-4 rounded-full bg-sky-300" /> Previous
        </span>
        {selected && (
          <span className="rounded-full border border-white/15 bg-navy-dark/70 px-3 py-1 font-bold text-white">
            {formatBucket(selected.at, range)}: {selected.current} {unitLabel} (was{" "}
            {selected.previous})
          </span>
        )}
      </div>
    </section>
  );
}
