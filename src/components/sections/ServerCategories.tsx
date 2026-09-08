import { ArrowRight, Boxes, Cloud, Cpu, Database } from "lucide-react";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Primitives";
import { Link } from "@tanstack/react-router";
import { modules } from "@/data/serverfy";

const environments = [
  {
    icon: Database,
    tint: "bg-blue/10 text-blue",
    title: "SAP ECC",
    desc: "Practice traditional SAP ECC environments with full access.",
    cta: "Explore ECC",
    href: "/servers/sap-ecc-server-access",
  },
  {
    icon: Cloud,
    tint: "bg-orange/10 text-orange",
    title: "SAP S/4HANA",
    desc: "Access modern SAP S/4HANA environments for hands-on practice.",
    cta: "Explore S/4HANA",
    href: "/servers/sap-s4hana-server-access",
  },
  {
    icon: Cpu,
    tint: "bg-blue/10 text-blue",
    title: "SAP Server",
    desc: "Work with SAP server environments for supported technical scenarios.",
    cta: "Explore SAP Server",
    href: "/servers/sap-server-access",
  },
  {
    icon: Boxes,
    tint: "bg-green/10 text-green",
    title: "Other SAP Systems",
    desc: "Explore additional SAP environments available on request.",
    cta: "View All Environments",
    href: "/servers",
  },
];

const featuredFunctional = ["MM", "FICO", "SD", "PP", "WM", "EWM"];
const featuredTechnical = ["ABAP", "Basis", "HANA", "Fiori"];

const tileTints = [
  "bg-orange/10 text-orange",
  "bg-green/10 text-green",
  "bg-violet/10 text-violet",
  "bg-blue/10 text-blue",
];

function ModuleTile({ code, index }: { code: string; index: number }) {
  const mod = modules.find((m) => m.code.toLowerCase() === code.toLowerCase());
  if (!mod) return null;
  return (
    <li>
      <Link
        to="/modules/$code"
        params={{ code: mod.code.toLowerCase() }}
        className="group flex h-full flex-col items-center gap-2 rounded-2xl border border-border bg-background px-3 py-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange/40 hover:shadow-card"
      >
        <span
          className={`grid size-12 place-items-center rounded-2xl ${tileTints[index % tileTints.length]} transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon name={mod.icon} className="size-6" />
        </span>
        <span className="text-sm font-extrabold text-foreground">{mod.code}</span>
        <span className="text-xs font-medium leading-snug text-muted-foreground">{mod.name}</span>
      </Link>
    </li>
  );
}

export function ServerCategories() {
  return (
    <section id="servers" className="section-y relative bg-soft-tint">
      <div className="container-fy">
        {/* Explore SAP Environments */}
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Explore SAP Environments
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Choose the right SAP environment for your learning or project needs.
            </p>
          </div>
          <Link
            to="/servers"
            className="group inline-flex items-center gap-1.5 text-sm font-extrabold text-blue transition-colors hover:text-orange"
          >
            View All Environments
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </Reveal>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {environments.map((env, i) => (
            <Reveal as="li" key={env.title} delay={i * 0.06} y={16}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <span className={`grid size-12 place-items-center rounded-2xl ${env.tint}`}>
                  <env.icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-foreground">{env.title}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">{env.desc}</p>
                <Link
                  to={env.href}
                  className="group mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-blue/40 px-4 py-2 text-xs font-extrabold text-blue transition-all duration-300 hover:border-blue hover:bg-blue hover:text-white"
                >
                  {env.cta}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* Practice the SAP Modules You Need */}
        <Reveal className="mt-16 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Practice the SAP Modules You Need
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Choose from a wide range of functional and technical modules.
            </p>
          </div>
          <Link
            to="/modules"
            className="group inline-flex items-center gap-1.5 text-sm font-extrabold text-blue transition-colors hover:text-orange"
          >
            View All SAP Modules
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="rounded-3xl border border-border bg-background p-6 shadow-sm sm:p-8">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-muted-foreground">
              Functional Modules
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
              {featuredFunctional.map((code, i) => (
                <ModuleTile key={code} code={code} index={i} />
              ))}
            </ul>
          </Reveal>

          <Reveal className="rounded-3xl border border-border bg-background p-6 shadow-sm sm:p-8" delay={0.08}>
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-muted-foreground">
              Technical Modules
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {featuredTechnical.map((code, i) => (
                <ModuleTile key={code} code={code} index={i + 2} />
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
