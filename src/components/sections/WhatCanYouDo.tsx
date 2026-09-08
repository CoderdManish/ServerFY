import { waLink, waMessages, waProps } from "@/lib/whatsapp";
import {
  Rocket,
  Users,
  Maximize2,
  MonitorSmartphone,
  UsersRound,
  MonitorPlay,
  Building2,
  Landmark,
  PlayCircle,
  BookOpen,
  GraduationCap,
  ClipboardCheck,
  Lightbulb,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import audStudents from "@/assets/aud-students.webp.asset.json";
import audConsultants from "@/assets/aud-consultants.webp.asset.json";
import audProfessionals from "@/assets/aud-professionals.webp.asset.json";
import audTrainers from "@/assets/aud-trainers.webp.asset.json";

const actions = [
  {
    icon: Rocket,
    tint: "bg-violet-100 text-violet-600",
    title: "Practice SAP",
    desc: "Gain hands-on experience",
  },
  {
    icon: Users,
    tint: "bg-blue-100 text-blue-600",
    title: "Learn SAP",
    desc: "Apply training concepts in real systems",
  },
  {
    icon: Maximize2,
    tint: "bg-sky-100 text-sky-700",
    title: "Test Configurations",
    desc: "Experiment with customization and SPRO",
  },
  {
    icon: MonitorSmartphone,
    tint: "bg-cyan-100 text-cyan-600",
    title: "Develop",
    desc: "Work on development and technical environments",
  },
  {
    icon: UsersRound,
    tint: "bg-indigo-100 text-indigo-600",
    title: "Train Teams",
    desc: "Conduct live training sessions",
  },
  {
    icon: MonitorPlay,
    tint: "bg-blue-100 text-blue-700",
    title: "Demonstrate",
    desc: "Show real SAP processes for classroom or client demos",
  },
];

const audiences = [
  {
    image: audStudents.url,
    title: "Students",
    desc: "Practice and build confidence after training.",
  },
  {
    image: audConsultants.url,
    title: "Consultants",
    desc: "Test scenarios and configurations for projects.",
  },
  {
    image: audProfessionals.url,
    title: "Professionals",
    desc: "Refresh skills and explore new processes.",
  },
  {
    image: audTrainers.url,
    title: "Trainers",
    desc: "Demonstrate real SAP systems during training sessions.",
  },
  {
    icon: Building2,
    tint: "bg-slate-100 text-slate-600",
    title: "Companies",
    desc: "Provide SAP access for internal learning and development.",
  },
  {
    icon: Landmark,
    tint: "bg-slate-100 text-slate-600",
    title: "Institutes",
    desc: "Give students access to practical SAP environments.",
  },
];

const flow = [
  { icon: PlayCircle, label: "Watch Tutorial", tint: "bg-blue-50 text-blue-600" },
  { icon: BookOpen, label: "Understand Concept", tint: "bg-rose-50 text-rose-500" },
  { icon: GraduationCap, label: "Open SAP", tint: "bg-sky-50 text-sky-600" },
  { icon: ClipboardCheck, label: "Perform Transaction", tint: "bg-orange-50 text-orange" },
  { icon: Lightbulb, label: "Learn from Mistakes", tint: "bg-indigo-50 text-indigo-600" },
  { icon: BadgeCheck, label: "Build Confidence", tint: "bg-amber-50 text-amber-500" },
];


export function WhatCanYouDo() {
  return (
    <section id="what-can-you-do" className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/60 to-blue-50/50 py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* What Can You Do With ServerFY? */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            What Can You Do With{" "}
            <span className="text-orange">ServerFY?</span>
          </h2>
          <p className="mt-3 text-slate-600">
            A complete SAP environment for multiple use cases.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {actions.map((a) => (
            <div
              key={a.title}
              className="group rounded-2xl border border-slate-200/80 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange/40 hover:shadow-lg"
            >
              <div
                className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${a.tint} transition-transform duration-300 group-hover:scale-110`}
              >
                <a.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-slate-900">{a.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{a.desc}</p>
            </div>
          ))}
        </div>

        {/* Built for Every SAP Learner & Professional */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Built for Every SAP Learner &amp; Professional
          </h2>
          <p className="mt-2 text-slate-600">
            ServerFY is designed for individuals and organizations across different needs.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {audiences.map((a) => (
            <div
              key={a.title}
              className="group flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {"image" in a ? (
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  width={256}
                  height={256}
                  className="h-14 w-14 shrink-0 rounded-xl object-cover"
                />
              ) : (
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${a.tint}`}
                >
                  <a.icon className="h-7 w-7" />
                </div>
              )}
              <div>
                <h3 className="text-sm font-bold text-slate-900">{a.title}</h3>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>


        {/* Why Practice + CTA */}
        <div className="mt-14 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-sky-50 to-blue-50 p-8 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
              Why Practice on a Real SAP Environment?
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Watching tutorials isn't enough. Real learning happens when you practice.
            </p>
            <div className="mt-8 grid grid-cols-3 items-start justify-items-center gap-y-6 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
              {flow.map((step, i) => (
                <div key={step.label} className="flex items-center gap-3 sm:gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${step.tint} shadow-md ring-1 ring-white`}>
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span className="max-w-[72px] text-center text-[10px] font-semibold leading-tight text-slate-700">
                      {step.label}
                    </span>
                  </div>
                  {i < flow.length - 1 && (
                    <ArrowRight className="hidden h-4 w-4 text-slate-300 sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-navy-gradient p-8 text-white shadow-xl">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl"
            />
            <div className="relative">
              <h3 className="text-2xl font-extrabold leading-tight">
                Turn Your SAP Knowledge Into Real Experience
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                ServerFY gives you the environment, access and support to go from
                learning to doing.
              </p>
              <a
                href={waLink(waMessages.demo)}
                {...waProps}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange/30 transition-all hover:-translate-y-0.5 hover:bg-orange-600"
              >
                Get Free 24-Hour Demo <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
