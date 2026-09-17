import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ADMIN_BASE, apiConfigured, submitLead } from "@/lib/admin-api";

const SEEN_KEY = "sfy_lead_popup_seen";
const SEEN_DAYS = 7;

const COURSES = [
  "SAP S/4HANA Server Access",
  "SAP ECC Server Access",
  "SAP Dedicated Server",
  "SAP FICO",
  "SAP MM",
  "SAP SD",
  "SAP PP",
  "SAP ABAP",
  "SAP Basis / HANA",
  "Other",
];

function recentlySeen() {
  try {
    const raw = window.localStorage.getItem(SEEN_KEY);
    if (!raw) return false;
    return Date.now() - Number(raw) < SEEN_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

/** Lead-capture popup shown once a visitor scrolls halfway down any public page. */
export function LeadPopup() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith(ADMIN_BASE);
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAdmin || recentlySeen()) return undefined;
    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total > 0 && scrolled / total >= 0.5) {
        setOpen(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isAdmin]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    setOpen(false);
    try {
      window.localStorage.setItem(SEEN_KEY, String(Date.now()));
    } catch {
      /* storage blocked — popup will simply show again next visit */
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    setError(null);
    try {
      if (!apiConfigured()) throw new Error("not-configured");
      await submitLead({
        name: String(fd.get("name") ?? ""),
        email: String(fd.get("email") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        interest: String(fd.get("interest") ?? ""),
        location: String(fd.get("location") ?? ""),
        source: "popup",
        page: pathname,
        referrer: document.referrer.slice(0, 500),
        device: window.innerWidth < 768 ? "mobile" : "desktop",
        consent: fd.get("consent") === "on",
        company_website: "",
      });
      setSent(true);
      try {
        window.localStorage.setItem(SEEN_KEY, String(Date.now()));
      } catch {
        /* ignore */
      }
    } catch {
      setError("We could not send that just now. Please try again or message us on WhatsApp.");
    } finally {
      setBusy(false);
    }
  }

  if (isAdmin || !open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-navy-dark/80 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-popup-title"
        tabIndex={-1}
        className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border border-white/15 bg-navy-gradient p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] outline-none sm:p-7"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors hover:text-white"
        >
          ×
        </button>

        {sent ? (
          <div className="py-8 text-center">
            <p className="text-2xl font-black text-white">Thank you!</p>
            <p className="mt-2 text-sm text-white/70">
              Our SAP server team will contact you shortly with access details.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-6 rounded-xl bg-orange px-5 py-2.5 text-sm font-bold text-white"
            >
              Continue browsing
            </button>
          </div>
        ) : (
          <>
            <p className="type-eyebrow text-orange">ServerFY</p>
            <h2 id="lead-popup-title" className="mt-1 text-2xl font-black text-white">
              Get SAP server access details
            </h2>
            <p className="mt-1 text-sm text-white/60">
              Share your details and we will send pricing, modules and a demo login.
            </p>

            <form onSubmit={onSubmit} className="mt-5 space-y-3">
              <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" />
              <Field name="name" placeholder="Name*" required />
              <Field name="email" type="email" placeholder="E-mail*" required />
              <Field name="phone" type="tel" placeholder="Mobile number*" required />
              <select
                name="interest"
                defaultValue=""
                className="w-full rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none focus:border-orange"
              >
                <option value="" disabled className="bg-navy-dark">
                  Select an SAP module / server
                </option>
                {COURSES.map((c) => (
                  <option key={c} value={c} className="bg-navy-dark">
                    {c}
                  </option>
                ))}
              </select>
              <Field name="location" placeholder="Your location" />

              <label className="flex items-start gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-xs text-white/65">
                <input type="checkbox" name="consent" defaultChecked className="mt-0.5 accent-orange" />
                <span>
                  I agree to be contacted by ServerFY about SAP server access and accept the privacy
                  policy.
                </span>
              </label>

              {error && <p className="text-xs text-red-300">{error}</p>}

              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-2xl bg-orange px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition-opacity disabled:opacity-60"
              >
                {busy ? "Sending…" : "Get access details"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  name,
  placeholder,
  type = "text",
  required,
}: {
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <input
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
      aria-label={placeholder}
      className="w-full rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none focus:border-orange"
    />
  );
}
