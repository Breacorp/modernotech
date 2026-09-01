"use client";

import { useEffect, useState } from "react";
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

export function useModernoAuth() {
  const [user, setUser] = useState<ModernoUser | null>(null);
  const [entitlements, setEntitlements] = useState<UserEntitlement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (!error && data?.session?.user) {
          const u = data.session.user;
          const isOwner = u.email === "jlbrea89@gmail.com" || u.email?.includes("breacorp");
          
          if (isMounted) {
            setUser({
              id: u.id,
              email: u.email || "",
              name: u.user_metadata?.name || (isOwner ? "Jose Luis Brea Fabeiro (Dueño)" : u.email?.split("@")[0] || "Usuario"),
              avatarUrl: u.user_metadata?.avatar_url,
              role: isOwner ? "superadmin" : (u.user_metadata?.role || "user"),
              status: "active"
            });
          }

          // Consultar entitlements reales desde Supabase
          try {
            const { data: entData, error: entError } = await supabase
              .from("user_product_entitlements")
              .select("*")
              .eq("user_id", u.id);

            if (!entError && entData && entData.length > 0 && isMounted) {
              setEntitlements(
                entData.map((e: any) => ({
                  productId: e.product_id,
                  tier: e.tier,
                  status: e.status,
                  quotaLabel: e.quota_limit_bytes ? `${Math.round(e.quota_limit_bytes / (1024 * 1024 * 1024))} GB` : e.tier.toUpperCase(),
                  grantedBy: e.granted_by,
                  grantNotes: e.grant_notes,
                }))
              );
            }
          } catch (e) {
            console.debug("Supabase entitlements query fallback");
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
        console.debug("Moderno Auth: Session init");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const u = session.user;
        const isOwner = u.email === "jlbrea89@gmail.com" || u.email?.includes("breacorp");
        setUser({
          id: u.id,
          email: u.email || "",
          name: u.user_metadata?.name || (isOwner ? "Jose Luis Brea Fabeiro (Dueño)" : u.email?.split("@")[0] || "Usuario"),
          avatarUrl: u.user_metadata?.avatar_url,
          role: isOwner ? "superadmin" : (u.user_metadata?.role || "user"),
          status: "active"
        });

        try {
          const { data: entData } = await supabase
            .from("user_product_entitlements")
            .select("*")
            .eq("user_id", u.id);

          if (entData && entData.length > 0) {
            setEntitlements(
              entData.map((e: any) => ({
                productId: e.product_id,
                tier: e.tier,
                status: e.status,
                quotaLabel: e.quota_limit_bytes ? `${Math.round(e.quota_limit_bytes / (1024 * 1024 * 1024))} GB` : e.tier.toUpperCase(),
                grantedBy: e.granted_by,
                grantNotes: e.grant_notes,
              }))
            );
          }
        } catch (_) {}
      } else {
        if (typeof window !== "undefined" && !localStorage.getItem("moderno_auth_session")) {
          setUser(null);
          setEntitlements([]);
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
    setEntitlements([]);
  };

  const setDemoSession = (demoUser: ModernoUser) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("moderno_auth_session", JSON.stringify(demoUser));
    }
    setUser(demoUser);
  };

  const isSuperAdmin = user?.role === "superadmin" || user?.role === "admin" || user?.email === "jlbrea89@gmail.com";

  return {
    user,
    isAuthenticated: !!user,
    isSuperAdmin,
    isLoading,
    entitlements,
    signOut,
    setDemoSession,
  };
}
