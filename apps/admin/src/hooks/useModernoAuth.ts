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

export const INITIAL_GLOBAL_USERS_MOCK: GlobalUserRecord[] = [
  {
    id: "usr_gonzo_admin_01",
    email: "jlbrea89@gmail.com",
    name: "Gonzo Blasco (Dueño)",
    company: "Moderno Tech HQ",
    role: "superadmin",
    status: "active",
    createdAt: "2025-08-10T12:00:00Z",
    lastLogin: "Hace 5 minutos",
    entitlements: [
      { productId: "access", productName: "Moderno Access", tier: "enterprise", status: "active", quotaLabel: "Multi-Sede Ilimitado" },
      { productId: "cloud", productName: "Moderno Cloud", tier: "pro", status: "active", quotaLabel: "6 TB Pro Studio" },
      { productId: "play", productName: "Moderno Play", tier: "vip", status: "active", quotaLabel: "VIP Pass 4K 60FPS" },
      { productId: "one", productName: "Moderno One", tier: "enterprise", status: "active", quotaLabel: "ERP Completo RLS" },
      { productId: "ai", productName: "Moderno AI", tier: "pro", status: "active", quotaLabel: "Tokens Ilimitados" },
      { productId: "cleaner", productName: "AI Cleaner Pro", tier: "pro", status: "active", quotaLabel: "Licencia Team Studio" },
      { productId: "crm", productName: "Moderno CRM (WaTicket)", tier: "enterprise", status: "active", quotaLabel: "Inbox Multiagente" },
      { productId: "weather", productName: "Moderno Weather", tier: "pro", status: "active", quotaLabel: "Radar Doppler HQ" }
    ]
  },
  {
    id: "usr_martinez_access_02",
    email: "carlos.martinez@consorcioalberdi.com.ar",
    name: "Carlos Martínez",
    company: "Consorcio Torre Alberdi",
    role: "user",
    status: "active",
    createdAt: "2026-08-20T14:30:00Z",
    lastLogin: "Hoy, 10:15",
    entitlements: [
      { productId: "access", productName: "Moderno Access", tier: "enterprise", status: "active", quotaLabel: "3 Edificios / 140 Unidades" },
      { productId: "cloud", productName: "Moderno Cloud", tier: "family", status: "active", quotaLabel: "2 TB Bóveda Compartida" },
      { productId: "play", productName: "Moderno Play", tier: "free", status: "active", quotaLabel: "Catálogo Free" },
      { productId: "ai", productName: "Moderno AI", tier: "free", status: "active", quotaLabel: "50 Req/Día" }
    ]
  },
  {
    id: "usr_valeria_cloud_03",
    email: "valeria.diseno@studioba.ar",
    name: "Valeria Gómez",
    company: "Studio BA Audiovisual",
    role: "user",
    status: "active",
    createdAt: "2026-08-25T09:12:00Z",
    lastLogin: "Ayer, 18:40",
    entitlements: [
      { productId: "cloud", productName: "Moderno Cloud", tier: "pro", status: "active", quotaLabel: "6 TB Pro Studio" },
      { productId: "cinema", productName: "Cinema Studio AI", tier: "vip", status: "active", quotaLabel: "Beta Privada 4K" },
      { productId: "cleaner", productName: "AI Cleaner Pro", tier: "pro", status: "active", quotaLabel: "Licencia Lifetime" },
      { productId: "play", productName: "Moderno Play", tier: "free", status: "active", quotaLabel: "Catálogo Free" }
    ]
  },
  {
    id: "usr_lucas_play_04",
    email: "lucas.gamer99@gmail.com",
    name: "Lucas Rossi",
    company: "Particular",
    role: "user",
    status: "active",
    createdAt: "2026-08-28T19:05:00Z",
    lastLogin: "Hoy, 01:20",
    entitlements: [
      { productId: "play", productName: "Moderno Play", tier: "vip", status: "active", quotaLabel: "VIP Pass 60 FPS" },
      { productId: "cloud", productName: "Moderno Cloud", tier: "free", status: "active", quotaLabel: "5 GB Free" },
      { productId: "ai", productName: "Moderno AI", tier: "free", status: "active", quotaLabel: "50 Req/Día" }
    ]
  },
  {
    id: "usr_esteban_susp_05",
    email: "esteban.morales@tempmail.com",
    name: "Esteban Morales",
    company: "Freelance",
    role: "user",
    status: "suspended",
    createdAt: "2026-08-15T11:00:00Z",
    lastLogin: "Hace 10 días",
    entitlements: [
      { productId: "access", productName: "Moderno Access", tier: "free", status: "suspended", quotaLabel: "Bloqueado" },
      { productId: "cloud", productName: "Moderno Cloud", tier: "free", status: "suspended", quotaLabel: "Suspendido" },
      { productId: "play", productName: "Moderno Play", tier: "free", status: "suspended", quotaLabel: "Suspendido" }
    ]
  },
  {
    id: "usr_ana_one_06",
    email: "ana.logistica@distribuidorasur.com",
    name: "Ana Laura Beltrán",
    company: "Distribuidora Sur Logística",
    role: "user",
    status: "active",
    createdAt: "2026-08-29T16:20:00Z",
    lastLogin: "Hoy, 08:00",
    entitlements: [
      { productId: "one", productName: "Moderno One", tier: "pro", status: "active", quotaLabel: "ERP Inventario & Ventas" },
      { productId: "crm", productName: "Moderno CRM (WaTicket)", tier: "pro", status: "active", quotaLabel: "WhatsApp API 5 Agentes" },
      { productId: "cloud", productName: "Moderno Cloud", tier: "family", status: "active", quotaLabel: "2 TB Empresa" }
    ]
  }
];

export function useModernoAuth() {
  const [user, setUser] = useState<ModernoUser | null>(null);
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
              name: u.user_metadata?.name || (isOwner ? "Gonzo Blasco (Dueño)" : u.email?.split("@")[0] || "Usuario"),
              avatarUrl: u.user_metadata?.avatar_url,
              role: isOwner ? "superadmin" : (u.user_metadata?.role || "user"),
              status: "active"
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
        console.debug("Moderno Auth: Session init");
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
        const isOwner = u.email === "jlbrea89@gmail.com" || u.email?.includes("breacorp");
        setUser({
          id: u.id,
          email: u.email || "",
          name: u.user_metadata?.name || (isOwner ? "Gonzo Blasco (Dueño)" : u.email?.split("@")[0] || "Usuario"),
          avatarUrl: u.user_metadata?.avatar_url,
          role: isOwner ? "superadmin" : (u.user_metadata?.role || "user"),
          status: "active"
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

  const isSuperAdmin = user?.role === "superadmin" || user?.role === "admin" || user?.email === "jlbrea89@gmail.com";

  const defaultEntitlements: UserEntitlement[] = [
    { productId: "access", tier: "premium" as any, status: "active", quotaLabel: "Consorcio Activo" },
    { productId: "cloud", tier: "free", status: "active", quotaLabel: "5 GB Free" },
    { productId: "play", tier: "free", status: "active", quotaLabel: "Free Catalog" },
    { productId: "cinema", tier: "free", status: "active", quotaLabel: "Free Tier" },
    { productId: "mercatto", tier: "free", status: "active", quotaLabel: "Free Tier" },
    { productId: "ai", tier: "free", status: "active", quotaLabel: "50 Req/Día" },
  ];

  return {
    user,
    isAuthenticated: !!user,
    isSuperAdmin,
    isLoading,
    entitlements: defaultEntitlements,
    signOut,
    setDemoSession,
  };
}
