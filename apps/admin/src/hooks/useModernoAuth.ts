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
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !sessionData?.session?.user) {
          if (isMounted) {
            setUser(null);
            setEntitlements([]);
          }
          return;
        }

        const authUser = sessionData.session.user;

        // Consultar rol real desde global_users en Supabase
        const { data: dbUserData } = await supabase
          .from("global_users")
          .select("role, status")
          .eq("id", authUser.id)
          .single();

        const realRole = (dbUserData?.role as "user" | "admin" | "superadmin") || "user";
        const realStatus = (dbUserData?.status as "active" | "suspended") || "active";

        if (isMounted) {
          setUser({
            id: authUser.id,
            email: authUser.email || "",
            name: authUser.user_metadata?.name || authUser.email?.split("@")[0] || "Usuario",
            avatarUrl: authUser.user_metadata?.avatar_url,
            role: realRole,
            status: realStatus,
          });
        }

        // Consultar entitlements reales desde Supabase
        const { data: entData, error: entError } = await supabase
          .from("user_product_entitlements")
          .select("*")
          .eq("user_id", authUser.id);

        if (!entError && entData && isMounted) {
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
      } catch (err) {
        console.error("Error inicializando sesión en Supabase:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const authUser = session.user;

        const { data: dbUserData } = await supabase
          .from("global_users")
          .select("role, status")
          .eq("id", authUser.id)
          .single();

        const realRole = (dbUserData?.role as "user" | "admin" | "superadmin") || "user";
        const realStatus = (dbUserData?.status as "active" | "suspended") || "active";

        setUser({
          id: authUser.id,
          email: authUser.email || "",
          name: authUser.user_metadata?.name || authUser.email?.split("@")[0] || "Usuario",
          avatarUrl: authUser.user_metadata?.avatar_url,
          role: realRole,
          status: realStatus,
        });

        const { data: entData } = await supabase
          .from("user_product_entitlements")
          .select("*")
          .eq("user_id", authUser.id);

        if (entData) {
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
    await supabase.auth.signOut();
    setUser(null);
    setEntitlements([]);
  };

  const isSuperAdmin = user?.role === "superadmin" || user?.role === "admin";

  return {
    user,
    isAuthenticated: !!user,
    isSuperAdmin,
    isLoading,
    entitlements,
    signOut,
  };
}
