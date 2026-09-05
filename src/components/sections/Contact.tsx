import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CheckCircle2, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { ctaClasses } from "@/components/CtaButton";
import { Eyebrow, Reveal } from "@/components/Primitives";
import { modules, site } from "@/data/serverfy";
import { submitServerRequest, type ServerRequestPayload } from "@/lib/server-request-service";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<keyof ServerRequestPayload, string>>;

const empty: ServerRequestPayload = {
  name: "",
  email: "",
  phone: "",
  sapModule: "",
  sapVersion: "",
  serverType: "",
  users: "1",
  duration: "1 month",
  requirement: "",
};

const fieldClass =
  "h-12 w-full rounded-xl border border-border bg-card px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-blue-bright";

export function Contact() {
  const [values, setValues] = useState<ServerRequestPayload>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set = <K extends keyof ServerRequestPayload>(key: K, v: string) => {
    setValues((p) => ({ ...p, [key]: v }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const validate = () => {
    const e: Errors = {};
    if (values.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) e.email = "Enter a valid email address.";
    if (values.phone.replace(/\D/g, "").length < 8) e.phone = "Enter a reachable phone or WhatsApp number.";
    if (!values.sapModule) e.sapModule = "Select the SAP module you need.";
    if (!values.sapVersion) e.sapVersion = "Select an SAP version.";
    if (!values.serverType) e.serverType = "Select a server type.";
    if (values.requirement.trim().length < 10) e.requirement = "Tell us a little about your requirement.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setState("loading");
    const res = await submitServerRequest(values);
    if (res.ok) {
      setState("success");
      setValues(empty);
    } else {
      setState("error");
    }
  };

  return (
    <section id="contact" className="section-y relative overflow-hidden bg-navy-gradient">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.1]" />
      <div className="container-fy relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Eyebrow tone="dark">Contact</Eyebrow>
          <h2 className="type-section mt-5 text-white">Tell Us What SAP Environment You Need.</h2>
          <p className="mt-4 text-white/65">
            Share your module, version and duration. We will confirm availability and send a configuration proposal.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              { icon: Phone, text: site.phone, href: site.phoneHref },
              { icon: Mail, text: site.email, href: `mailto:${site.email}` },
              { icon: MapPin, text: site.address },
            ].map((c) => (
              <li key={c.text}>
                <a
                  href={c.href ?? "#contact"}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-white/35"
                >
                  <c.icon className="size-4 shrink-0 text-orange" aria-hidden="true" />
                  <span className="min-w-0 truncate">{c.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <Reveal delay={0.08}>
          <div className="relative rounded-3xl border border-white/10 bg-card p-5 shadow-lift sm:p-7">
            <AnimatePresence mode="wait">
              {state === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <span className="grid size-14 place-items-center rounded-2xl icon-tile">
                    <CheckCircle2 className="size-7" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold text-foreground">Request received</h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Thanks — our SAP infrastructure team will get back to you with a configuration and availability
                    confirmation.
                  </p>
                  <button
                    type="button"
                    onClick={() => setState("idle")}
                    className={cn(ctaClasses({ variant: "outlineDark", size: "sm" }), "mt-6")}
                  >
                    Send another request
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={onSubmit}
                  noValidate
                  className="grid gap-4 sm:grid-cols-2"
                >
                  <Field label="Name" error={errors.name} id="fy-name">
                    <input id="fy-name" className={fieldClass} value={values.name} onChange={(e) => set("name", e.target.value)} placeholder="Your full name" autoComplete="name" />
                  </Field>
                  <Field label="Email" error={errors.email} id="fy-email">
                    <input id="fy-email" type="email" className={fieldClass} value={values.email} onChange={(e) => set("email", e.target.value)} placeholder="you@company.com" autoComplete="email" />
                  </Field>
                  <Field label="Phone / WhatsApp" error={errors.phone} id="fy-phone">
                    <input id="fy-phone" type="tel" className={fieldClass} value={values.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 00000 00000" autoComplete="tel" />
                  </Field>
                  <Field label="SAP Module" error={errors.sapModule} id="fy-module">
                    <select id="fy-module" className={fieldClass} value={values.sapModule} onChange={(e) => set("sapModule", e.target.value)}>
                      <option value="">Select module</option>
                      {modules.map((m) => (
                        <option key={m.code} value={m.code}>
                          SAP {m.code} — {m.name}
                        </option>
                      ))}
                      <option value="Other">Other / not sure</option>
                    </select>
                  </Field>
                  <Field label="SAP Version" error={errors.sapVersion} id="fy-version">
                    <select id="fy-version" className={fieldClass} value={values.sapVersion} onChange={(e) => set("sapVersion", e.target.value)}>
                      <option value="">Select version</option>
                      {["S/4HANA", "ECC 6.0", "HANA", "BTP", "Not sure"].map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Server Type" error={errors.serverType} id="fy-type">
                    <select id="fy-type" className={fieldClass} value={values.serverType} onChange={(e) => set("serverType", e.target.value)}>
                      <option value="">Select type</option>
                      {["Shared", "Dedicated", "Practice", "Training", "Development", "Testing", "Demo / POC"].map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Users" id="fy-users">
                    <select id="fy-users" className={fieldClass} value={values.users} onChange={(e) => set("users", e.target.value)}>
                      {["1", "2–5", "6–15", "16–50", "50+"].map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Duration" id="fy-duration">
                    <select id="fy-duration" className={fieldClass} value={values.duration} onChange={(e) => set("duration", e.target.value)}>
                      {["1 month", "3 months", "6 months", "12 months", "Custom"].map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Requirement" error={errors.requirement} id="fy-req" className="sm:col-span-2">
                    <textarea
                      id="fy-req"
                      rows={4}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-blue-bright"
                      value={values.requirement}
                      onChange={(e) => set("requirement", e.target.value)}
                      placeholder="Tell us what you plan to do on the server — practice, training batch, development, testing…"
                    />
                  </Field>

                  {state === "error" ? (
                    <p className="sm:col-span-2 text-sm font-semibold text-destructive">
                      Something went wrong. Please try again or reach us on WhatsApp.
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className={cn(ctaClasses({ variant: "primary", size: "lg" }), "sm:col-span-2 w-full")}
                  >
                    {state === "loading" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Sending request…
                      </>
                    ) : (
                      <>
                        Request Server Configuration
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  error,
  children,
  className,
}: {
  label: string;
  id: string;
  error?: string | undefined;
  children: React.ReactNode;
  className?: string | undefined;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-xs font-semibold text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
