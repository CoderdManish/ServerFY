import { ArrowRight, Headphones, MessageCircle } from "lucide-react";
import { CtaButton } from "@/components/CtaButton";
import { Eyebrow, Reveal } from "@/components/Primitives";
import { site } from "@/data/serverfy";

export function ExpertCTA() {
  return (
    <section className="section-y bg-navy-dark">
      <div className="container-fy grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <Eyebrow tone="dark">Expert support</Eyebrow>
          <h2 className="type-section mt-5 text-white">Not Sure Which SAP Server You Need?</h2>
          <p className="mt-4 max-w-xl text-white/65">
            Tell us your SAP module, version and requirement. Our SAP experts will help you choose the right environment.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaButton href="/contact" size="lg">
              Talk To An SAP Expert
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </CtaButton>
            <CtaButton href={site.whatsapp} target="_blank" rel="noreferrer" size="lg" variant="outlineLight">
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp Us
            </CtaButton>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="glass-dark relative mx-auto max-w-md rounded-3xl p-6">
            <div className="flex items-center gap-3">
              <span className="icon-tile grid size-12 place-items-center rounded-2xl">
                <Headphones className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-extrabold text-white">SAP infrastructure desk</p>
                <p className="text-xs text-white/55">Typical reply within business hours</p>
              </div>
            </div>
            <ul className="mt-6 space-y-3">
              {[
                "Module and version guidance",
                "Right-sizing RAM, CPU and storage",
                "Trainer and batch setups",
                "Dedicated landscape scoping",
              ].map((l) => (
                <li key={l} className="flex items-center gap-3 rounded-xl border border-white/8 bg-navy/40 px-4 py-3 text-sm text-white/80">
                  <span className="size-1.5 shrink-0 rounded-full bg-orange led" />
                  {l}
                </li>
              ))}
            </ul>
            <div className="mt-6 grid grid-cols-2 gap-3 text-center">
              <a href={site.phoneHref} className="rounded-xl border border-white/10 px-3 py-3 text-xs font-bold text-white/80 hover:border-white/40">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="truncate rounded-xl border border-white/10 px-3 py-3 text-xs font-bold text-white/80 hover:border-white/40">
                {site.email}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
