/**
 * Anonymous visitor analytics — no signup, no login.
 *
 * Stores a random visitor id (localStorage) and session id (sessionStorage,
 * 30 min inactivity window), then batches events to the Express + MongoDB
 * backend at POST {VITE_API_URL}/api/analytics/collect.
 * When VITE_API_URL is not set nothing is sent.
 */

const API_URL = (import.meta.env['VITE_API_URL'] as string | undefined)?.replace(/\/$/, "");

const VISITOR_KEY = "sfy_vid";
const SESSION_KEY = "sfy_sid";
const SESSION_TS_KEY = "sfy_sid_ts";
const SESSION_TIMEOUT = 30 * 60 * 1000;

type EventType = "pageview" | "pageleave" | "click" | "scroll" | "event" | "session_start";

type AnalyticsEvent = {
  type: EventType;
  name?: string;
  path?: string;
  title?: string;
  referrer?: string;
  entryPath?: string;
  durationMs?: number;
  scrollDepth?: number;
  target?: { tag?: string; text?: string; id?: string; href?: string; label?: string };
  props?: Record<string, string | number | boolean>;
  occurredAt: number;
};

let queue: AnalyticsEvent[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let started = false;
let isReturning = false;
let entryPath = "";
let currentPath = "";
let pageStart = 0;
let maxScroll = 0;
const scrollSent = new Set<number>();

const uid = () =>
  (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`).replace(/-/g, "");

function deviceType(): "mobile" | "tablet" | "desktop" {
  const w = window.innerWidth;
  if (w < 640) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function visitorId() {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = uid();
    localStorage.setItem(VISITOR_KEY, id);
  } else {
    isReturning = true;
  }
  return id;
}

function sessionId() {
  const now = Date.now();
  const last = Number(sessionStorage.getItem(SESSION_TS_KEY) ?? 0);
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id || now - last > SESSION_TIMEOUT) {
    id = uid();
    sessionStorage.setItem(SESSION_KEY, id);
    push({ type: "session_start", referrer: document.referrer || "direct", path: location.pathname });
  }
  sessionStorage.setItem(SESSION_TS_KEY, String(now));
  return id;
}

function payload() {
  return {
    visitorId: visitorId(),
    sessionId: sessionId(),
    isReturning,
    device: {
      type: deviceType(),
      screen: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    events: [] as AnalyticsEvent[],
  };
}

function flush(useBeacon = false) {
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  if (!API_URL || queue.length === 0) return;
  const body = JSON.stringify({ ...payload(), events: queue.slice(0, 50) });
  queue = [];
  const url = `${API_URL}/api/analytics/collect`;
  if (useBeacon && navigator.sendBeacon) {
    navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
    return;
  }
  void fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

function push(e: Omit<AnalyticsEvent, "occurredAt"> & { occurredAt?: number }) {
  queue.push({ ...e, occurredAt: e.occurredAt ?? Date.now(), entryPath: e.entryPath ?? entryPath });
  if (queue.length >= 20) return flush();
  if (!flushTimer) flushTimer = setTimeout(() => flush(), 5000);
}

/** Track a named custom event, e.g. trackEvent("clicked_whatsapp", { section: "hero" }) */
export function trackEvent(name: string, props?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  push({ type: "event", name, path: location.pathname, ...(props ? { props } : {}) });
}

function scrollDepth() {
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return 100;
  return Math.min(100, Math.round(((window.scrollY || 0) / scrollable) * 100));
}

function endPage() {
  if (!currentPath) return;
  push({
    type: "pageleave",
    path: currentPath,
    durationMs: Math.max(0, Date.now() - pageStart),
    scrollDepth: maxScroll,
  });
}

/** Record a page view; call on first load and on every client-side route change. */
export function trackPageView(path: string) {
  if (typeof window === "undefined" || !API_URL) return;
  if (path === currentPath) return;
  if (currentPath) endPage();
  currentPath = path;
  pageStart = Date.now();
  maxScroll = 0;
  scrollSent.clear();
  push({ type: "pageview", path, title: document.title, referrer: document.referrer || "direct" });
}

function labelFor(el: Element) {
  const node = el.closest("a,button,[data-analytics]") as HTMLElement | null;
  if (!node) return null;
  const anchor = node as HTMLAnchorElement;
  return {
    tag: node.tagName.toLowerCase(),
    text: (node.innerText || node.getAttribute("aria-label") || "").trim().slice(0, 160),
    id: node.id || undefined,
    href: anchor.href || undefined,
    label: node.dataset['analytics'] || (node.innerText || node.getAttribute("aria-label") || "").trim().slice(0, 160),
  };
}

/** Boot the tracker once (idempotent). */
export function initAnalytics() {
  if (started || typeof window === "undefined" || !API_URL) return;
  started = true;
  entryPath = location.pathname;

  document.addEventListener(
    "click",
    (e) => {
      const t = e.target as Element | null;
      if (!t) return;
      const target = labelFor(t);
      if (!target) return;
      push({ type: "click", path: location.pathname, target });
    },
    { capture: true, passive: true },
  );

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const d = scrollDepth();
        if (d > maxScroll) maxScroll = d;
        for (const step of [25, 50, 75, 100]) {
          if (maxScroll >= step && !scrollSent.has(step)) {
            scrollSent.add(step);
            push({ type: "scroll", path: location.pathname, scrollDepth: step });
          }
        }
      });
    },
    { passive: true },
  );

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      endPage();
      pageStart = Date.now();
      flush(true);
    }
  });

  window.addEventListener("pagehide", () => {
    endPage();
    currentPath = "";
    flush(true);
  });
}
