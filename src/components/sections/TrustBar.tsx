import { Reveal } from "@/components/Primitives";

const modules = ["S/4HANA 2023", "ECC 6.0 EHP8", "HANA 2.0", "SAP BW/4HANA", "Solution Manager", "Fiori / UI5"];
const badges = ["Secure VPN access", "Daily backups", "24/7 monitoring"];

export function TrustBar() {
  return (
    <section aria-label="Available SAP releases" className="border-y border-border bg-white py-7">
      <div className="container-fy flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <Reveal className="shrink-0" y={12}>
          <p className="type-eyebrow text-muted-foreground">Live releases available today</p>
        </Reveal>
        <Reveal className="min-w-0 flex-1" y={12} delay={0.06}>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:justify-center">
            {modules.map((m) => (
              <li key={m} className="text-sm font-extrabold tracking-tight text-navy/55">
                {m}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="shrink-0" y={12} delay={0.12}>
          <ul className="flex flex-wrap gap-2">
            {badges.map((b) => (
              <li
                key={b}
                className="rounded-full border border-border bg-secondary px-3 py-1 text-[0.7rem] font-bold text-blue"
              >
                {b}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
