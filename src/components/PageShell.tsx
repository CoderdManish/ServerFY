import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FloatingActions } from "@/components/sections/FloatingActions";

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
          <div className="container-fy relative">
            <Breadcrumbs
              className="mb-5"
              items={crumbs ?? [{ name: "Home", to: "/" }, { name: title }]}
            />
            <p className="type-eyebrow text-orange">{eyebrow}</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">{intro}</p>
          </div>
        </section>
        {children}
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
