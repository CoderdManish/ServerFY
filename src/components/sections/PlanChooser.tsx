import { useState } from "react";
import { ArrowRight, Calculator } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import { plans } from "@/data/serverfy";
import { cn } from "@/lib/utils";

const who = [
  { id: "student", label: "Student / beginner", plan: "starter" },
  { id: "professional", label: "Working professional", plan: "professional" },
  { id: "consultant", label: "Consultant / technical", plan: "advanced" },
  { id: "institute", label: "Trainer / institute", plan: "advanced" },
] as const;

/** "Which plan should I choose?" + simple cost estimate. */
export function PlanChooser() {
  const [role, setRole] = useState<(typeof who)[number]["id"]>("student");
  const [users, setUsers] = useState(1);
  const [months, setMonths] = useState(1);

  let planId: string = who.find((w) => w.id === role)!.plan;
  if (users > 5) planId = "dedicated";
  else if (users > 2 && planId !== "advanced") planId = "advanced";
  else if (users === 2 && planId === "starter") planId = "professional";
  const plan = plans.find((p) => p.id === planId)!;
  const total = plan.monthly ? plan.monthly * months : null;

  return (
    <div className="neu-card mx-auto mt-14 max-w-4xl rounded-3xl p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="icon-tile-soft grid size-10 place-items-center rounded-xl text-orange">
          <Calculator className="size-5" aria-hidden="true" />
        </span>
        <h3 className="text-xl font-black tracking-tight text-foreground">Which plan should I choose?</h3>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-5">
          <fieldset>
            <legend className="text-xs font-bold text-muted-foreground">I am a…</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {who.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setRole(w.id)}
                  aria-pressed={role === w.id}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors",
                    role === w.id ? "border-orange bg-orange text-white" : "border-border bg-card text-foreground hover:border-orange/50",
                  )}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="block text-xs font-bold text-muted-foreground">
            Number of users: <span className="text-foreground">{users}</span>
            <input type="range" min={1} max={40} value={users} onChange={(e) => setUsers(+e.target.value)} className="mt-2 w-full accent-orange" />
          </label>
          <label className="block text-xs font-bold text-muted-foreground">
            Duration: <span className="text-foreground">{months} month{months > 1 ? "s" : ""}</span>
            <input type="range" min={1} max={12} value={months} onChange={(e) => setMonths(+e.target.value)} className="mt-2 w-full accent-orange" />
          </label>
        </div>

        <div className="rounded-2xl bg-navy-gradient p-5 text-white">
          <p className="type-eyebrow text-orange">Recommended</p>
          <p className="mt-1 text-2xl font-black">{plan.name}</p>
          <p className="mt-1 text-xs text-white/60">Best for {plan.bestFor.toLowerCase()}</p>
          <p className="mt-4 text-sm text-white/70">Estimated total</p>
          <p className="text-3xl font-extrabold">{total ? `₹${total.toLocaleString("en-IN")}` : "Custom quote"}</p>
          <p className="mt-1 text-[0.7rem] text-white/45">Indicative, excluding taxes. Batch pricing on request.</p>
          <CtaButton href={`/free-demo?plan=${plan.id}&users=${users}&months=${months}`} className="mt-5 w-full">
            Get free 24-hour demo <ArrowRight className="size-4" aria-hidden="true" />
          </CtaButton>
        </div>
      </div>
    </div>
  );
}
