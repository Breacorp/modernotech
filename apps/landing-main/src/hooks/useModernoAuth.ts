"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export interface UserEntitlement {
  productId: string;
  tier: "free" | "premium" | "pro" | "family" | "vip" | "enterprise";
  status: "active" | "past_due" | "canceled";
  quotaLabel?: string;
}

export interface ModernoUser {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
}

const DEFAULT_ENTITLEMENTS: UserEntitlement[] = [
  { productId: "access", tier: "premium", status: "active", quotaLabel: "Consorcio Activo" },
  { productId: "cloud", tier: "free", status: "active", quotaLabel: "5 GB Free" },
  { productId: "play", tier: "free", status: "active", quotaLabel: "Free Catalog" },
  { productId: "cinema", tier: "free", status: "active", quotaLabel: "Free Tier" },
  { productId: "mercatto", tier: "free", status: "active", quotaLabel: "Free Tier" },
  { productId: "ai", tier: "free", status: "active", quotaLabel: "50 Req/Día" },
];

export function useModernoAuth() {
  const [user, setUser] = useState<ModernoUser | null>(null);
  const [entitlements, setEntitlements] = useState<UserEntitlement[]>(DEFAULT_ENTITLEMENTS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (!error && data?.session?.user) {
          const u = data.session.user;
          if (isMounted) {
            setUser({
              id: u.id,
              email: u.email || "",
              name: u.user_metadata?.name || u.email?.split("@")[0] || "Usuario",
              avatarUrl: u.user_metadata?.avatar_url,
            });
          }
          return;
        }

        if (typeof window !== "undefined") {
          const localSession = localStorage.getItem("moderno_auth_session");
          if (localSession) {
            const parsed = JSON.parse(localSession);
            if (isMounted) {
              setUser(parsed);
            }
            return;
          }
        }
      } catch (err) {
        console.debug("Moderno Auth: No hay sesión activa o conexión offline");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const u = session.user;
        setUser({
          id: u.id,
          email: u.email || "",
          name: u.user_metadata?.name || u.email?.split("@")[0] || "Usuario",
          avatarUrl: u.user_metadata?.avatar_url,
        });
      } else {
        if (typeof window !== "undefined" && !localStorage.getItem("moderno_auth_session")) {
          setUser(null);
        }
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (_) {}
    if (typeof window !== "undefined") {
      localStorage.removeItem("moderno_auth_session");
    }
    setUser(null);
  };

  const setDemoSession = (demoUser: ModernoUser) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("moderno_auth_session", JSON.stringify(demoUser));
    }
    setUser(demoUser);
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    entitlements,
    signOut,
    setDemoSession,
  };
}
