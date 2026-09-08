import { Rocket, ShieldCheck, Cloud, Headphones, CalendarDays, Users, GraduationCap, Settings, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Primitives";

const perks = [
  { icon: Rocket, title: "Fast Access", text: "Get connected quickly" },
  { icon: ShieldCheck, title: "Secure & Reliable", text: "Your data and access are safe" },
  { icon: Cloud, title: "Multiple Environments", text: "ECC, S/4HANA, HANA & more" },
  { icon: Headphones, title: "Technical Support", text: "We're here to help" },
  { icon: CalendarDays, title: "Flexible Plans", text: "30 days to 6 months" },
  { icon: Users, title: "Trusted by Learners", text: "Students, consultants & companies" },
];

const cards = [
  { icon: GraduationCap, title: "Practice", text: "Hands-on SAP environments for learning and skill development." },
  { icon: Settings, title: "Test & Develop", text: "Work with SAP environments for testing, development and configuration scenarios." },
  { icon: BarChart3, title: "Train & Demonstrate", text: "Give students and teams access to real SAP systems for training and demonstration." },
];

export function WhatIsServerfy() {
  return (
    <section aria-labelledby="what-is-serverfy" className="bg-white py-14">
      <div className="container-fy">
        <ul className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {perks.map((p) => (
            <li key={p.title} className="flex flex-col items-center text-center">
              <span className="ico-blue mb-3 grid size-12 place-items-center rounded-2xl">
                <p.icon className="size-6" aria-hidden="true" />
              </span>
              <p className="text-sm font-extrabold tracking-tight text-navy">{p.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{p.text}</p>
            </li>
          ))}
        </ul>

        <div className="tintcard-blue mt-12 grid gap-10 rounded-3xl p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:p-10">
          <div>
            <h2 id="what-is-serverfy" className="text-3xl font-black tracking-tight text-navy">
              What is ServerFY?
            </h2>
            <p className="mt-1 text-lg font-bold text-blue">Your SAP Practice &amp; Infrastructure Partner</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              ServerFY provides ready-to-access SAP environments for students, consultants, professionals,
              trainers, companies and institutes. Whether you want to learn, practice, test, develop or train,
              we give you the SAP environment you need without the complexity of building and maintaining your
              own infrastructure.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-blue/40 bg-white px-4 py-2 text-sm font-bold text-blue transition hover:-translate-y-0.5 hover:border-blue hover:shadow-card"
            >
              Learn More About Us <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <ul className="grid gap-5 sm:grid-cols-3">
            {cards.map((c, i) => (
              <Reveal as="li" key={c.title} y={14} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-blue/12 bg-white p-6 text-center shadow-[0_12px_30px_-24px_rgba(7,85,184,0.8)]">
                  <span className="ico-blue mx-auto mb-4 grid size-12 place-items-center rounded-2xl">
                    <c.icon className="size-6" aria-hidden="true" />
                  </span>
                  <p className="text-base font-extrabold tracking-tight text-navy">{c.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
