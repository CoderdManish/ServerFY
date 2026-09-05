import { Reveal, SectionHeading } from "@/components/Primitives";
import { comparison } from "@/data/serverfy";
import { cn } from "@/lib/utils";

export function Comparison() {
  return (
    <section className="section-y">
      <div className="container-fy">
        <SectionHeading
          eyebrow="Compare"
          title="Server comparison"
          sub="Match the resources to your workload. Dedicated plans are sized around your landscape."
        />

        {/* Desktop table */}
        <Reveal className="mt-12 hidden overflow-hidden rounded-3xl border border-border bg-card shadow-card lg:block">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">ServerFY plan comparison by feature</caption>
            <thead>
              <tr className="bg-navy text-white">
                <th scope="col" className="px-6 py-4 text-left type-eyebrow">Feature</th>
                {comparison.plans.map((p) => (
                  <th
                    key={p}
                    scope="col"
                    className={cn("px-6 py-4 text-left type-eyebrow", p === "Professional" && "text-orange")}
                  >
                    {p}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row, i) => (
                <tr key={row.feature} className={cn(i % 2 ? "bg-background" : "bg-card", "transition-colors hover:bg-accent/60")}>
                  <th scope="row" className="px-6 py-3.5 text-left font-bold text-foreground">{row.feature}</th>
                  {row.values.map((v, j) => (
                    <td
                      key={`${row.feature}-${j}`}
                      className={cn("px-6 py-3.5 text-muted-foreground", j === 1 && "font-bold text-foreground")}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Mobile cards */}
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:hidden">
          {comparison.plans.map((p, idx) => (
            <Reveal as="li" key={p} delay={idx * 0.05}>
              <div
                className={cn(
                  "rounded-2xl border p-5",
                  idx === 1 ? "border-orange/40 bg-navy text-white" : "border-border bg-card",
                )}
              >
                <p className={cn("type-eyebrow", idx === 1 ? "text-orange" : "text-blue")}>{p}</p>
                <dl className="mt-4 space-y-2.5">
                  {comparison.rows.map((row) => (
                    <div key={row.feature} className="flex items-start justify-between gap-4 text-sm">
                      <dt className={idx === 1 ? "text-white/55" : "text-muted-foreground"}>{row.feature}</dt>
                      <dd className={cn("text-right font-bold", idx === 1 ? "text-white" : "text-foreground")}>
                        {row.values[idx]}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
