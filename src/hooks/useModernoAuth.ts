"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { supabase } from "../lib/supabase";

export interface UserEntitlement {
  productId: string;
  productName?: string;
  tier: "free" | "premium" | "pro" | "family" | "vip" | "enterprise" | "custom";
  status: "active" | "suspended" | "past_due" | "canceled";
  quotaLabel?: string;
  grantedBy?: string;
  grantNotes?: string;
  validUntil?: string;
}

export interface ModernoUser {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  role?: "user" | "admin" | "superadmin";
  status?: "active" | "suspended";
}

export interface GlobalUserRecord {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  company?: string;
  role: "user" | "admin" | "superadmin";
  status: "active" | "suspended" | "pending";
  createdAt: string;
  lastLogin?: string;
  entitlements: UserEntitlement[];
}

interface ModernoAuthContextValue {
  user: ModernoUser | null;
  entitlements: UserEntitlement[];
  isLoading: boolean;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  activeServicesCount: number;
  signOut: () => Promise<void>;
}

const ModernoAuthContext = createContext<ModernoAuthContextValue | null>(null);

function mapEntitlements(rows: any[] | null): UserEntitlement[] {
  if (!rows) return [];

  return rows.map((e: any) => ({
    productId: e.product_id,
    tier: e.tier,
    status: e.status,
    quotaLabel: e.quota_limit_bytes
      ? `${Math.round(e.quota_limit_bytes / (1024 * 1024 * 1024))} GB`
      : typeof e.tier === "string"
        ? e.tier.toUpperCase()
        : undefined,
    grantedBy: e.granted_by,
    grantNotes: e.grant_notes,
    validUntil: e.valid_until,
  }));
}

async function loadUserData(userId: string) {
  const [{ data: profile }, { data: entitlements }] = await Promise.all([
    supabase.from("global_users").select("role, status").eq("id", userId).maybeSingle(),
    supabase.from("user_product_entitlements").select("*").eq("user_id", userId),
  ]);

  return {
    role: (profile?.role as ModernoUser["role"]) || "user",
    status: (profile?.status as ModernoUser["status"]) || "active",
    entitlements: mapEntitlements(entitlements),
  };
}

/**
 * Single source of truth for Moderno ID across the app.
 * Mounted once in the root layout, so the navbar, the authenticated banner and
 * any page share one session subscription and one pair of Supabase queries.
 */
export const ModernoAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<ModernoUser | null>(null);
  const [entitlements, setEntitlements] = useState<UserEntitlement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Avoid loading profile + entitlements twice (getSession + INITIAL_SESSION).
  const loadedUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const applySessionUser = (sessionUser: {
      id: string;
      email?: string;
      user_metadata?: Record<string, any>;
    }) => {
      if (!isMounted) return;

      setUser({
        id: sessionUser.id,
        email: sessionUser.email || "",
        name:
          sessionUser.user_metadata?.name ||
          sessionUser.email?.split("@")[0] ||
          "Usuario",
        avatarUrl: sessionUser.user_metadata?.avatar_url,
        role: "user",
        status: "active",
      });

      if (loadedUserIdRef.current === sessionUser.id) return;
      loadedUserIdRef.current = sessionUser.id;

      loadUserData(sessionUser.id)
        .then((data) => {
          if (!isMounted) return;
          setUser((current) =>
            current ? { ...current, role: data.role, status: data.status } : current
          );
          setEntitlements(data.entitlements);
        })
        .catch(() => {
          /* Keep the session user even if the profile query fails. */
        });
    };

    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (!error && data?.session?.user) {
          applySessionUser(data.session.user);
          return;
        }

        if (isMounted) {
          loadedUserIdRef.current = null;
          setUser(null);
          setEntitlements([]);
        }
      } catch {
        if (isMounted) {
          loadedUserIdRef.current = null;
          setUser(null);
          setEntitlements([]);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        applySessionUser(session.user);
      } else {
        loadedUserIdRef.current = null;
        setUser(null);
        setEntitlements([]);
      }
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      /* Clear local state regardless of the network result. */
    }
    loadedUserIdRef.current = null;
    setUser(null);
    setEntitlements([]);
  }, []);

  const value = useMemo<ModernoAuthContextValue>(() => {
    const activeServicesCount = entitlements.filter(
      (item) => item.status === "active"
    ).length;

    return {
      user,
      entitlements,
      isLoading,
      isAuthenticated: !!user,
      isSuperAdmin: user?.role === "superadmin",
      activeServicesCount,
      signOut,
    };
  }, [user, entitlements, isLoading, signOut]);

  return React.createElement(
    ModernoAuthContext.Provider,
    { value },
    children
  );
};

export function useModernoAuth(): ModernoAuthContextValue {
  const context = useContext(ModernoAuthContext);

  if (!context) {
    throw new Error(
      "useModernoAuth debe usarse dentro de <ModernoAuthProvider>. Revisá el layout raíz."
    );
  }

  return context;
}
