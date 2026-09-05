import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/Primitives";
import { steps } from "@/data/serverfy";

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  const scaleY = scaleX;

  return (
    <section className="section-y bg-soft-mesh">
      <div className="container-fy">
        <SectionHeading
          eyebrow="How it works"
          title="From request to working SAP session"
          sub="Four steps, no complex setup on your side. You only need a client machine and an internet connection."
        />

        <div ref={ref} className="relative mt-14">
          {/* desktop line */}
          <div className="absolute inset-x-0 top-9 hidden h-0.5 bg-border lg:block">
            <motion.div style={{ scaleX }} className="h-full origin-left bg-gradient-to-r from-blue to-orange" />
          </div>
          {/* mobile line */}
          <div className="absolute bottom-0 left-[19px] top-4 w-0.5 bg-border lg:hidden">
            <motion.div style={{ scaleY }} className="h-full w-full origin-top bg-gradient-to-b from-blue to-orange" />
          </div>

          <ol className="grid gap-8 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, i) => (
              <motion.li
                key={s.no}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-14 lg:pl-0"
              >
                <span className="absolute left-0 top-0 grid size-10 place-items-center rounded-xl icon-tile lg:relative lg:mb-6 lg:size-[4.5rem] lg:rounded-2xl">
                  <Icon name={s.icon} className="size-5 lg:size-7" />
                  <span className="absolute -right-1.5 -top-1.5 rounded-full bg-navy px-1.5 py-0.5 text-[0.6rem] font-extrabold text-white lg:-right-2 lg:-top-2 lg:px-2 lg:text-[0.68rem]">
                    {s.no}
                  </span>
                </span>
                <h3 className="text-lg font-extrabold text-foreground">{s.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
