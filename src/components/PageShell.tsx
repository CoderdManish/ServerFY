import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FloatingActions } from "@/components/sections/FloatingActions";
import { CtaButton } from "@/components/CtaButton";
import { SapSystemGraphic } from "@/components/SapSystemGraphic";
import { ArrowRight, Check } from "lucide-react";

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  crumbs?: Crumb[];
  children: ReactNode;
};

export function PageShell({ eyebrow, title, intro, crumbs, children }: Props) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-navy-gradient pt-28 pb-14 lg:pt-32 lg:pb-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(60%_60%_at_15%_0%,color-mix(in_oklab,var(--orange)_22%,transparent),transparent_70%),radial-gradient(50%_50%_at_90%_20%,color-mix(in_oklab,var(--blue-bright)_28%,transparent),transparent_70%)]"
          />
          <div className="container-fy relative grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <Breadcrumbs
                className="mb-5"
                items={crumbs ?? [{ name: "Home", to: "/" }, { name: title }]}
              />
              <p className="type-eyebrow text-orange">{eyebrow}</p>
              <h1 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                {title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">{intro}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <CtaButton href="/contact">
                  Get SAP access
                  <ArrowRight className="size-4" aria-hidden="true" />
                </CtaButton>
                <CtaButton href="/pricing" variant="outlineLight">View plans</CtaButton>
              </div>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-white/65">
                {['24-hour demo', 'Secure remote login', 'Expert support'].map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <Check className="size-3.5 text-orange" aria-hidden="true" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <SapSystemGraphic label={title} compact className="hidden lg:block" />
          </div>
        </section>
        {children}
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
