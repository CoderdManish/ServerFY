import { Check, Database, MonitorCog, Server } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  label?: string;
  compact?: boolean;
  className?: string;
};

export function SapSystemGraphic({ label = "SAP environment", compact = false, className }: Props) {
  return (
    <div className={cn("enterprise-console", className)} aria-label={`${label} live system diagram`} role="img">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="grid size-7 shrink-0 place-items-center rounded-md bg-white/10 text-[0.6rem] font-black text-white">
            SAP
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-extrabold text-white">{label}</p>
            <p className="text-[0.6rem] font-bold uppercase tracking-wider text-white/45">Private landscape</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[0.62rem] font-bold uppercase tracking-wider text-white/60">
          <i className="led-online size-2 rounded-full bg-green not-italic" /> Live
        </span>
      </div>

      <div className={cn("relative grid items-center gap-3 p-4", compact ? "min-h-52" : "min-h-64")}>
        <svg className="pointer-events-none absolute inset-0 size-full text-blue-bright/35" viewBox="0 0 420 250" aria-hidden="true">
          <path className="system-flow-line" d="M80 63 H173 Q190 63 190 80 V113" />
          <path className="system-flow-line system-flow-line-delay" d="M340 63 H247 Q230 63 230 80 V113" />
          <path className="system-flow-line" d="M210 145 V177 Q210 191 195 191 H80" />
          <path className="system-flow-line system-flow-line-delay" d="M210 145 V177 Q210 191 225 191 H340" />
        </svg>

        <div className="relative z-10 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <SystemNode icon={MonitorCog} label="SAP GUI" detail="Secure login" />
          <div className="grid size-16 place-items-center rounded-2xl border border-orange/35 bg-orange/10 text-orange shadow-glow-orange">
            <Server className="size-7" aria-hidden="true" />
          </div>
          <SystemNode icon={Database} label="IDES Data" detail="Ready to use" />
        </div>

        <div className="relative z-10 mx-auto mt-3 grid w-full max-w-64 grid-cols-3 gap-2 text-center">
          {['Practice', 'Explore', 'Build skills'].map((item, index) => (
            <div key={item} className="rounded-lg border border-white/10 bg-white/[0.05] px-2 py-2">
              <span className="mx-auto mb-1 grid size-5 place-items-center rounded-full bg-orange/15 text-orange">
                <Check className="size-3" aria-hidden="true" />
              </span>
              <span className="text-[0.62rem] font-bold text-white/75">{item}</span>
              <span className="sr-only"> step {index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SystemNode({ icon: NodeIcon, label, detail }: { icon: typeof Server; label: string; detail: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-white/10 bg-white/[0.06] p-3 text-center">
      <NodeIcon className="mx-auto size-5 text-blue-bright" aria-hidden="true" />
      <p className="mt-2 truncate text-[0.68rem] font-extrabold text-white">{label}</p>
      <p className="mt-0.5 truncate text-[0.58rem] text-white/45">{detail}</p>
    </div>
  );
}