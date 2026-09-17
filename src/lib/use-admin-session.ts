import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ADMIN_BASE, api, getToken, setToken, type AdminUser } from "@/lib/admin-api";

export type AdminSession = {
  user: AdminUser | null;
  /** True until the sign-in check has finished — render nothing meaningful yet. */
  checking: boolean;
  signOut: () => void;
};

/** Verifies the stored session with the data service and redirects out when invalid. */
export function useAdminSession(): AdminSession {
  const navigate = useNavigate();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (!getToken()) {
      void navigate({ to: ADMIN_BASE, replace: true });
      return;
    }
    void (async () => {
      try {
        const res = await api<{ user: AdminUser }>("/api/auth/me");
        if (!cancelled) {
          setUser(res.user);
          setChecking(false);
        }
      } catch {
        if (!cancelled) {
          setToken(null);
          void navigate({ to: ADMIN_BASE, replace: true });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return {
    user,
    checking,
    signOut: () => {
      setToken(null);
      void navigate({ to: ADMIN_BASE, replace: true });
    },
  };
}

export function can(user: AdminUser | null, permission: string) {
  if (!user) return false;
  return user.role === "owner" || user.permissions.includes(permission as never);
}
