import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { initAnalytics, trackPageView } from "@/lib/analytics";
import { ADMIN_BASE } from "@/lib/admin-api";

/** Mounts the anonymous visitor tracker and reports client-side route changes. */
export function VisitorAnalytics() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = path.startsWith(ADMIN_BASE);

  useEffect(() => {
    if (isAdmin) return;
    initAnalytics();
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) return;
    trackPageView(path);
  }, [path, isAdmin]);

  return null;
}
