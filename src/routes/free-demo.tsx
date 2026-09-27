import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { ctaClasses } from "@/components/CtaButton";
import { modules, site } from "@/data/serverfy";
import { submitServerRequest } from "@/lib/server-request-service";
import { waLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { buildHead, breadcrumbList } from "@/lib/seo";

const title = "Free 24-Hour SAP Server Demo | ServerFY";
const description =
  "Request a free 24-hour SAP S/4HANA or ECC demo server. Pick your module, version and users — we confirm on WhatsApp, usually the same working day.";

export const Route = createFileRoute("/free-demo")({
  component: FreeDemoPage,
  head: () =>
    buildHead({
      title,
      description,
      path: "/free-demo",
      type: "website",
      keywords: "free sap demo server, sap practice server trial, sap server free trial, sap s4hana demo access",
      jsonLd: [breadcrumbList([{ name: "Home", item: "/" }, { name: "Free Demo", item: "/free-demo" }])],
    }),
});

const field =
  "h-12 w-full rounded-xl border border-border bg-card px-4 text-sm text-foreground outline-none focus:border-blue-bright";

function FreeDemoPage() {
  const [v, setV] = useState({
    name: "", phone: "", email: "", module: "", version: "S/4HANA", serverType: "Shared",
    experience: "Beginner", users: "1", duration: "1 month",
  });
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");
  const set = (k: keyof typeof v, val: string) => setV((p) => ({ ...p, [k]: val }));

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const m = q.get("module");
    const u = q.get("users");
    const mo = q.get("months");
    setV((p) => ({
      ...p,
      ...(m ? { module: m } : {}),
      ...(u ? { users: u } : {}),
      ...(mo ? { duration: `${mo} month${mo === "1" ? "" : "s"}` } : {}),
    }));
    trackEvent("demo_page_view");
  }, []);

  const message = `Hi ServerFY, I'd like a free 24-hour SAP demo.
Name: ${v.name}
Module: ${v.module || "Not sure"}
Version: ${v.version}
Server type: ${v.serverType}
Experience: ${v.experience}
Users: ${v.users}
Duration: ${v.duration}`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (v.name.trim().length < 2 || v.phone.replace(/\D/g, "").length < 8) {
      setError("Please enter your name and a WhatsApp number.");
      return;
    }
    setError("");
    setState("loading");
    const res = await submitServerRequest({
      name: v.name, email: v.email || site.email, phone: v.phone,
      sapModule: v.module || "Not sure", sapVersion: v.version, serverType: v.serverType,
      users: v.users, duration: v.duration, requirement: `Free 24-hour demo request. Experience: ${v.experience}`,
    });
    trackEvent("demo_requested", { module: v.module || "unknown", ok: res.ok });
    setState("done");
    window.open(waLink(message), "_blank", "noopener");
  };

  return (
    <PageShell
      eyebrow="Free demo"
      title="Get your 24-hour SAP server demo"
      intro="Tell us what you want to practise. We prepare a demo environment and confirm the details with you on WhatsApp."
    >
      <section className="section-y">
        <div className="container-fy max-w-3xl">
          {state === "done" ? (
            <div className="neu-card rounded-3xl p-8 text-center">
              <CheckCircle2 className="mx-auto size-10 text-orange" aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-black text-foreground">Request received</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                WhatsApp should have opened with your details. If it didn't, tap below.
              </p>
              <a href={waLink(message)} target="_blank" rel="noreferrer noopener" className={ctaClasses({ className: "mt-6" })}>
                Open WhatsApp <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          ) : (
            <form onSubmit={submit} className="neu-card grid gap-4 rounded-3xl p-6 sm:grid-cols-2 sm:p-8" noValidate>
              <Sel label="SAP module" value={v.module} onChange={(x) => set("module", x)}
                options={["", ...modules.map((m) => m.code)]} labels={{ "": "Not sure yet" }} />
              <Sel label="SAP version" value={v.version} onChange={(x) => set("version", x)} options={["S/4HANA", "ECC 6.0", "HANA"]} />
              <Sel label="Server type" value={v.serverType} onChange={(x) => set("serverType", x)} options={["Shared", "Dedicated"]} />
              <Sel label="Experience level" value={v.experience} onChange={(x) => set("experience", x)} options={["Beginner", "Intermediate", "Consultant", "Trainer / institute"]} />
              <Sel label="Number of users" value={v.users} onChange={(x) => set("users", x)} options={["1", "2", "5", "10", "20", "40+"]} />
              <Sel label="Preferred duration" value={v.duration} onChange={(x) => set("duration", x)} options={["1 month", "2 months", "3 months", "6 months", "12 months"]} />
              <label className="text-xs font-bold text-muted-foreground">Your name
                <input className={`${field} mt-1.5`} value={v.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
              </label>
              <label className="text-xs font-bold text-muted-foreground">WhatsApp number
                <input type="tel" className={`${field} mt-1.5`} value={v.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" placeholder="+91" />
              </label>
              <label className="text-xs font-bold text-muted-foreground sm:col-span-2">Email (optional)
                <input type="email" className={`${field} mt-1.5`} value={v.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
              </label>
              {error ? <p className="text-sm font-semibold text-destructive sm:col-span-2">{error}</p> : null}
              <button type="submit" disabled={state === "loading"} className={ctaClasses({ size: "lg", className: "sm:col-span-2" })}>
                {state === "loading" ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
                Request free demo on WhatsApp
              </button>
            </form>
          )}
        </div>
      </section>
    </PageShell>
  );
}

function Sel({ label, value, onChange, options, labels = {} }: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; labels?: Record<string, string>;
}) {
  return (
    <label className="text-xs font-bold text-muted-foreground">
      {label}
      <select className={`${field} mt-1.5`} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o} value={o}>{labels[o] ?? o}</option>)}
      </select>
    </label>
  );
}
