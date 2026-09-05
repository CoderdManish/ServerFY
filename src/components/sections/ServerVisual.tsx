import { Cloud, Database, Network, ShieldCheck } from "lucide-react";

/**
 * Lightweight SVG/CSS infrastructure visual (no WebGL) — GPU-friendly transforms
 * only, so it stays smooth on mobile and respects reduced-motion.
 */
export function ServerVisual({ compact = false }: { compact?: boolean }) {
  const racks = compact ? 2 : 3;

  return (
    <div className="relative isolate w-full" aria-hidden="true">
      {/* glow */}
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--blue-bright)_35%,transparent),transparent)] blur-2xl" />

      {/* network lines */}
      <svg viewBox="0 0 520 420" className="absolute inset-0 -z-10 size-full opacity-70">
        <defs>
          <linearGradient id="fy-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--blue-bright)" stopOpacity="0.1" />
            <stop offset="50%" stopColor="var(--blue-bright)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--orange)" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {[
          "M40 70 C170 40 300 120 480 60",
          "M30 200 C160 240 320 150 495 210",
          "M50 350 C180 320 330 380 480 330",
          "M60 60 L60 360",
          "M460 70 L460 340",
        ].map((d, i) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="url(#fy-line)"
            strokeWidth="1.4"
            strokeDasharray="10 14"
            style={{ animation: `dash-flow ${9 + i * 2}s linear infinite` }}
          />
        ))}
        {[
          [60, 70],
          [460, 60],
          [60, 200],
          [460, 210],
          [60, 350],
          [460, 330],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" fill="var(--blue-bright)" />
        ))}
      </svg>

      <div className="float-slow relative mx-auto grid max-w-[430px] gap-3 rounded-[26px] border border-white/12 bg-white/[0.04] p-4 backdrop-blur-sm sm:p-5">
        {/* top chips */}
        <div className="flex items-center justify-between gap-2 text-white/70">
          {[
            { icon: Cloud, label: "Cloud" },
            { icon: Database, label: "HANA DB" },
            { icon: Network, label: "Network" },
            { icon: ShieldCheck, label: "Secure" },
          ].map(({ icon: I, label }) => (
            <span
              key={label}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-[0.6rem] font-bold uppercase tracking-wider"
            >
              <I className="size-3.5 text-blue-bright" aria-hidden="true" />
              <span className="hidden sm:inline">{label}</span>
            </span>
          ))}
        </div>

        {/* racks */}
        {Array.from({ length: racks }).map((_, r) => (
          <div key={r} className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-3">
            <div className="mb-2 flex items-center justify-between text-[0.6rem] font-bold uppercase tracking-widest text-white/45">
              <span>Rack {r + 1} · {r === 0 ? "S/4HANA" : r === 1 ? "ECC 6.0" : "HANA DB"}</span>
              <span className="text-white/30">Active</span>
            </div>
            <div className="space-y-1.5">
              {Array.from({ length: 4 }).map((__, u) => (
                <div key={u} className="flex items-center gap-2 rounded-lg bg-navy-dark/60 px-2.5 py-2">
                  <span
                    className="size-1.5 shrink-0 rounded-full bg-orange led"
                    style={{ animationDelay: `${(r * 4 + u) * 0.35}s` }}
                  />
                  <span className="h-1.5 flex-1 rounded-full bg-white/10">
                    <span
                      className="block h-full rounded-full bg-gradient-to-r from-blue-bright to-blue"
                      style={{ width: `${45 + ((r * 4 + u) * 13) % 50}%` }}
                    />
                  </span>
                  <span className="flex gap-1">
                    {Array.from({ length: 3 }).map((___, d) => (
                      <span key={d} className="size-1 rounded-full bg-blue-bright/60" />
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
