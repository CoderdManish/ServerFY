import { Cloud, Database, Network, ShieldCheck } from "lucide-react";

const infrastructure = [
  { icon: Cloud, label: "Cloud" },
  { icon: Database, label: "HANA DB" },
  { icon: Network, label: "Network" },
  { icon: ShieldCheck, label: "Secure" },
];

const rackNames = ["S/4HANA", "ECC 6.0", "HANA DB"];

/**
 * CSS-only server cabinet: richer than a flat illustration while remaining
 * lightweight, responsive and free of image decoding work in the hero.
 */
export function ServerVisual({ compact = false }: { compact?: boolean }) {
  const racks = compact ? 2 : 3;

  return (
    <div className="relative isolate mx-auto w-full max-w-[520px]" aria-hidden="true">
      <div className="pointer-events-none absolute inset-x-[8%] bottom-0 -z-10 h-[72%] rounded-[40%] bg-blue-bright/20 blur-3xl" />

      <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-navy-dark/85 p-2 shadow-[0_28px_70px_-24px_color-mix(in_oklab,var(--blue-bright)_45%,transparent)] sm:p-3">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,color-mix(in_oklab,var(--blue-bright)_8%,transparent)_50%,transparent_70%)]" />

        {/* Cabinet top */}
        <div className="relative flex items-center justify-between border-b border-white/10 px-3 py-2 sm:px-4">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-orange led" />
            <span className="text-[0.58rem] font-extrabold uppercase tracking-[0.16em] text-white/55 sm:text-[0.65rem]">
              ServerFY infrastructure
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[0.55rem] font-bold uppercase text-white/45">
            <span className="size-1.5 rounded-full bg-emerald-400 led-online" />
            Online
          </div>
        </div>

        {/* Infrastructure controls */}
        <div className="relative grid grid-cols-4 gap-1.5 px-2 py-3 sm:gap-2 sm:px-3">
          {infrastructure.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex min-w-0 items-center justify-center gap-1.5 rounded-lg border border-blue-bright/25 bg-blue/15 px-1 py-2 text-blue-bright shadow-[inset_0_1px_0_color-mix(in_oklab,var(--blue-bright)_18%,transparent)] sm:px-2"
            >
              <Icon className="size-3.5 shrink-0" strokeWidth={1.8} />
              <span className="truncate text-[0.5rem] font-extrabold uppercase text-white/65 sm:text-[0.58rem]">{label}</span>
            </div>
          ))}
        </div>

        {/* Rack cabinet */}
        <div className="relative rounded-[20px] border border-blue-bright/25 bg-navy/80 p-2.5 shadow-[inset_0_0_30px_color-mix(in_oklab,var(--blue-bright)_9%,transparent)] sm:p-3.5">
          <span className="absolute inset-y-3 left-1.5 w-px bg-white/10" />
          <span className="absolute inset-y-3 right-1.5 w-px bg-white/10" />

          <div className="space-y-3">
            {Array.from({ length: racks }).map((_, rackIndex) => (
              <div key={rackNames[rackIndex]} className="rounded-xl border border-white/10 bg-navy-dark/55 p-2 sm:p-2.5">
                <div className="mb-2 flex items-center justify-between px-1 text-[0.55rem] font-extrabold uppercase tracking-[0.13em] text-white/45 sm:text-[0.62rem]">
                  <span>Rack {rackIndex + 1} · {rackNames[rackIndex]}</span>
                  <span className="flex items-center gap-1.5 text-emerald-400/80">
                    <span className="size-1 rounded-full bg-emerald-400" /> Active
                  </span>
                </div>

                <div className="space-y-1.5">
                  {Array.from({ length: 4 }).map((__, unitIndex) => {
                    const index = rackIndex * 4 + unitIndex;
                    const width = 52 + ((index * 11) % 37);
                    return (
                      <div
                        key={unitIndex}
                        className="grid h-8 grid-cols-[auto_1fr_auto] items-center gap-2 rounded-md border border-white/[0.07] bg-navy-dark px-2 shadow-[inset_0_1px_1px_color-mix(in_oklab,var(--blue-bright)_8%,transparent),0_2px_5px_color-mix(in_oklab,var(--navy-dark)_70%,transparent)]"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="size-1.5 rounded-full bg-orange led" style={{ animationDelay: `${index * 0.25}s` }} />
                          <span className="hidden h-3 w-4 rounded-sm border border-white/10 sm:block">
                            <span className="mx-auto mt-1 block h-px w-2 bg-white/20" />
                          </span>
                        </div>

                        <div className="flex min-w-0 items-center gap-2">
                          <div className="flex h-2 flex-1 items-center rounded-full bg-white/[0.07] p-px">
                            <span
                              className="block h-full rounded-full bg-gradient-to-r from-blue-bright to-blue shadow-[0_0_8px_color-mix(in_oklab,var(--blue-bright)_50%,transparent)]"
                              style={{ width: `${width}%` }}
                            />
                          </div>
                          <div className="hidden gap-[3px] sm:flex">
                            {Array.from({ length: 8 }).map((___, vent) => (
                              <span key={vent} className="h-2.5 w-px bg-white/15" />
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <span className="size-1 rounded-full bg-blue-bright/90" />
                          <span className="size-1 rounded-full bg-blue-bright/55" />
                          <span className="size-1 rounded-full bg-blue-bright/35" />
                          <span className="ml-1 size-3 rounded-full border border-white/15 shadow-[inset_0_0_0_2px_color-mix(in_oklab,var(--navy-dark)_80%,transparent)]" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cabinet feet */}
        <div className="relative mx-8 flex justify-between">
          <span className="h-2 w-10 rounded-b-md bg-white/10" />
          <span className="h-2 w-10 rounded-b-md bg-white/10" />
        </div>
      </div>
    </div>
  );
}