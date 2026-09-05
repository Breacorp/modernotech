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

          // Consultar rol real y estado desde global_users en Supabase
          const { data: dbUserData } = await supabase
            .from("global_users")
            .select("role, status")
            .eq("id", u.id)
            .single();

          const realRole = (dbUserData?.role as "user" | "admin" | "superadmin") || "user";
          const realStatus = (dbUserData?.status as "active" | "suspended") || "active";

          if (isMounted) {
            setUser({
              id: u.id,
              email: u.email || "",
              name: u.user_metadata?.name || u.email?.split("@")[0] || "Usuario",
              avatarUrl: u.user_metadata?.avatar_url,
              role: realRole,
              status: realStatus,
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
                  quotaLabel: e.quota_limit_bytes
                    ? `${Math.round(e.quota_limit_bytes / (1024 * 1024 * 1024))} GB`
                    : e.tier.toUpperCase(),
                  grantedBy: e.granted_by,
                  grantNotes: e.grant_notes,
                }))
              );
            }
          } catch (_) {}
          return;
        }

        if (isMounted) {
          setUser(null);
          setEntitlements([]);
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
        const { data: dbUserData } = await supabase
          .from("global_users")
          .select("role, status")
          .eq("id", u.id)
          .single();

        const realRole = (dbUserData?.role as "user" | "admin" | "superadmin") || "user";
        const realStatus = (dbUserData?.status as "active" | "suspended") || "active";

        setUser({
          id: u.id,
          email: u.email || "",
          name: u.user_metadata?.name || u.email?.split("@")[0] || "Usuario",
          avatarUrl: u.user_metadata?.avatar_url,
          role: realRole,
          status: realStatus,
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
                quotaLabel: e.quota_limit_bytes
                  ? `${Math.round(e.quota_limit_bytes / (1024 * 1024 * 1024))} GB`
                  : e.tier.toUpperCase(),
                grantedBy: e.granted_by,
                grantNotes: e.grant_notes,
              }))
            );
          }
        } catch (_) {}
      } else {
        setUser(null);
        setEntitlements([]);
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
    setUser(null);
    setEntitlements([]);
  };

  const isSuperAdmin = user?.role === "superadmin";

  return {
    user,
    isAuthenticated: !!user,
    isSuperAdmin,
    isLoading,
    entitlements,
    signOut,
  };
}
