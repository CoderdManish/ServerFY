import { Quote, Star } from "lucide-react";
import { motion } from "motion/react";
import { Reveal, SectionHeading } from "@/components/Primitives";
import { testimonials } from "@/data/serverfy";

export function Testimonials() {
  return (
    <section className="section-y overflow-hidden bg-soft-mesh">
      <div className="container-fy">
        <SectionHeading
          eyebrow="Testimonials"
          title="What SAP professionals say"
          sub="Sample reviews shown for now — send us your real customer feedback and we will put it here."
        />
      </div>

      {/* Drag / swipe carousel */}
      <Reveal className="mt-12">
        <div className="container-fy">
          <motion.ul
            drag="x"
            dragConstraints={{ left: -1200, right: 0 }}
            dragElastic={0.08}
            className="flex cursor-grab gap-4 active:cursor-grabbing"
            style={{ touchAction: "pan-y" }}
          >
            {testimonials.map((t) => (
              <li
                key={t.role}
                className="w-[85vw] shrink-0 rounded-2xl border border-border bg-background p-6 shadow-card sm:w-[46%] lg:w-[31%] xl:w-[24%]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex gap-0.5" aria-label={`${t.stars} out of 5 stars`}>
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="size-4 fill-orange text-orange" aria-hidden="true" />
                    ))}
                  </span>
                  <Quote className="size-5 text-border" aria-hidden="true" />
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-foreground">"{t.quote}"</blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-navy text-xs font-extrabold text-white">
                    {t.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-extrabold text-foreground">{t.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">{t.role}</span>
                  </span>
                </div>
              </li>
            ))}
          </motion.ul>
          <p className="mt-4 text-center text-xs text-muted-foreground">Drag or swipe to see more</p>
        </div>
      </Reveal>
    </section>
  );
}
