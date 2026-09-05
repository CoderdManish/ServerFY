import { ArrowRight, Check } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import { Eyebrow, Reveal } from "@/components/Primitives";
import { ServerVisual } from "./ServerVisual";

const perks = ["24 Hour Access", "Multiple SAP Modules", "No Complex Setup", "Fast Activation"];

export function TrialBanner() {
  return (
    <section className="section-y bg-white">
      <div className="container-fy">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-navy-gradient p-7 sm:p-10 lg:p-14">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.12] [mask-image:radial-gradient(80%_70%_at_20%_20%,#000,transparent)]" />
            <div className="relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <Eyebrow tone="dark">Free trial</Eyebrow>
                <h2 className="type-section mt-5 text-white">
                  Start Your SAP Journey Today with a <span className="text-gradient-orange">Free Trial</span>
                </h2>
                <p className="mt-4 max-w-xl text-white/65">
                  Try a prepared SAP environment before you commit. Tell us the module you want and we will set up trial
                  access for you.
                </p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {perks.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm font-semibold text-white/85">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-orange/20 text-orange">
                        <Check className="size-3" aria-hidden="true" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <CtaButton href="#contact" size="lg" className="mt-8">
                  Start Free Trial
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </CtaButton>
              </div>
              <div className="mx-auto w-full max-w-sm">
                <ServerVisual compact />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
