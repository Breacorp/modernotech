"use client";

import React, { useState, useMemo } from "react";
import { ModernoBackground } from "../../components/ModernoBackground";
import { ModernoNavbar } from "../../components/ModernoNavbar";
import { Footer } from "../../components/Footer";
import { useModernoAuth, GlobalUserRecord, INITIAL_GLOBAL_USERS_MOCK, UserEntitlement } from "../../hooks/useModernoAuth";

export default function SuperAdminPage() {
  const { user, isSuperAdmin, isAuthenticated } = useModernoAuth();

  // Database of all ecosystem users
  const [users, setUsers] = useState<GlobalUserRecord[]>(INITIAL_GLOBAL_USERS_MOCK);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "active" | "suspended">("ALL");
  const [productFilter, setProductFilter] = useState<string>("ALL");

  // Modals state
  const [selectedUserForPerk, setSelectedUserForPerk] = useState<GlobalUserRecord | null>(null);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Form states for granting perks
  const [selectedProductForGrant, setSelectedProductForGrant] = useState("play");
  const [selectedTierForGrant, setSelectedTierForGrant] = useState<"free" | "vip" | "pro" | "family" | "enterprise">("vip");
  const [grantNote, setGrantNote] = useState("Cortesía de SuperAdmin");

  // Form states for creating new user
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserCompany, setNewUserCompany] = useState("");
  const [newUserInitialProduct, setNewUserInitialProduct] = useState("access");
  const [newUserInitialTier, setNewUserInitialTier] = useState<"free" | "vip" | "pro" | "family" | "enterprise">("pro");

  // Filtered users list
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.company && u.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
        u.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "ALL" || u.status === statusFilter;

      const matchesProduct =
        productFilter === "ALL" ||
        u.entitlements.some((e) => e.productId === productFilter && e.status === "active");

      return matchesSearch && matchesStatus && matchesProduct;
    });
  }, [users, searchQuery, statusFilter, productFilter]);

  // KPIs
  const totalUsersCount = users.length;
  const activeUsersCount = users.filter((u) => u.status === "active").length;
  const suspendedUsersCount = users.filter((u) => u.status === "suspended").length;
  const proVipEntitlementsCount = users.reduce((acc, u) => {
    return acc + u.entitlements.filter((e) => e.tier !== "free" && e.status === "active").length;
  }, 0);

  // Quick Action: Toggle User Suspension
  const handleToggleSuspension = (targetUser: GlobalUserRecord) => {
    const newStatus = targetUser.status === "active" ? "suspended" : "active";
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === targetUser.id) {
          return {
            ...u,
            status: newStatus,
            entitlements: u.entitlements.map((e) => ({
              ...e,
              status: newStatus,
            })),
          };
        }
        return u;
      })
    );

    setActionSuccessMessage(
      `Cuenta ${targetUser.email} ${newStatus === "suspended" ? "suspendida en todos los sitios" : "reactivada exitosamente"}.`
    );
    setTimeout(() => setActionSuccessMessage(null), 4000);
  };

  // Quick Action: Apply Grant / Upgrade Perk
  const handleApplyGrant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserForPerk) return;

    const productNames: Record<string, string> = {
      access: "Moderno Access",
      cloud: "Moderno Cloud",
      play: "Moderno Play",
      one: "Moderno One",
      ai: "Moderno AI",
      cleaner: "AI Cleaner Pro",
      crm: "Moderno CRM",
      cinema: "Cinema Studio AI",
      weather: "Moderno Weather",
      mercatto: "Mercatto",
      academy: "Moderno Academy",
    };

    const quotaLabels: Record<string, string> = {
      free: "Capa Gratuita",
      vip: "VIP Pass 4K 60FPS",
      pro: "Plan Pro Studio",
      family: "Bóveda Familiar 2 TB",
      enterprise: "Acceso Corporativo Ilimitado",
    };

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === selectedUserForPerk.id) {
          const existing = u.entitlements.find((e) => e.productId === selectedProductForGrant);
          let updatedEntitlements: UserEntitlement[];

          if (existing) {
            updatedEntitlements = u.entitlements.map((e) => {
              if (e.productId === selectedProductForGrant) {
                return {
                  ...e,
                  tier: selectedTierForGrant,
                  status: "active",
                  quotaLabel: quotaLabels[selectedTierForGrant] || selectedTierForGrant.toUpperCase(),
                  grantNotes: grantNote,
                  grantedBy: "SuperAdmin (Gonzo)",
                };
              }
              return e;
            });
          } else {
            updatedEntitlements = [
              ...u.entitlements,
              {
                productId: selectedProductForGrant,
                productName: productNames[selectedProductForGrant] || selectedProductForGrant,
                tier: selectedTierForGrant,
                status: "active",
                quotaLabel: quotaLabels[selectedTierForGrant] || selectedTierForGrant.toUpperCase(),
                grantNotes: grantNote,
                grantedBy: "SuperAdmin (Gonzo)",
              },
            ];
          }

          return { ...u, entitlements: updatedEntitlements };
        }
        return u;
      })
    );

    setActionSuccessMessage(
      `Beneficio otorgado con éxito a ${selectedUserForPerk.email}: ${productNames[selectedProductForGrant]} (${selectedTierForGrant.toUpperCase()}).`
    );
    setSelectedUserForPerk(null);
    setTimeout(() => setActionSuccessMessage(null), 4500);
  };

  // Quick Action: Create / Invite User
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserEmail.trim()) return;

    const productNames: Record<string, string> = {
      access: "Moderno Access",
      cloud: "Moderno Cloud",
      play: "Moderno Play",
      one: "Moderno One",
      ai: "Moderno AI",
      cleaner: "AI Cleaner Pro",
    };

    const quotaLabels: Record<string, string> = {
      free: "Capa Gratuita",
      vip: "VIP Pass 4K 60FPS",
      pro: "Plan Pro Studio",
      family: "Bóveda Familiar 2 TB",
      enterprise: "Acceso Corporativo Ilimitado",
    };

    const newRecord: GlobalUserRecord = {
      id: `usr_${Date.now().toString(36)}`,
      email: newUserEmail.trim(),
      name: newUserName.trim() || newUserEmail.split("@")[0],
      company: newUserCompany.trim() || "Particular",
      role: "user",
      status: "active",
      createdAt: new Date().toISOString(),
      lastLogin: "Invitación creada",
      entitlements: [
        {
          productId: newUserInitialProduct,
          productName: productNames[newUserInitialProduct] || newUserInitialProduct,
          tier: newUserInitialTier,
          status: "active",
          quotaLabel: quotaLabels[newUserInitialTier] || newUserInitialTier.toUpperCase(),
          grantedBy: "SuperAdmin (Gonzo)",
        },
        { productId: "cloud", productName: "Moderno Cloud", tier: "free", status: "active", quotaLabel: "5 GB Free" },
        { productId: "play", productName: "Moderno Play", tier: "free", status: "active", quotaLabel: "Catálogo Free" },
        { productId: "ai", productName: "Moderno AI", tier: "free", status: "active", quotaLabel: "50 Req/Día" },
      ],
    };

    setUsers((prev) => [newRecord, ...prev]);
    setShowNewUserModal(false);
    setNewUserEmail("");
    setNewUserName("");
    setNewUserCompany("");
    setActionSuccessMessage(`Usuario ${newRecord.email} dado de alta y activado en la base central.`);
    setTimeout(() => setActionSuccessMessage(null), 4500);
  };

  // Quick Action: Delete User
  const handleDeleteUser = (targetUser: GlobalUserRecord) => {
    if (window.confirm(`¿Confirmás la eliminación permanente de la cuenta ${targetUser.email} en todo el ecosistema?`)) {
      setUsers((prev) => prev.filter((u) => u.id !== targetUser.id));
      setActionSuccessMessage(`Cuenta ${targetUser.email} eliminada del sistema central.`);
      setTimeout(() => setActionSuccessMessage(null), 4000);
    }
  };

  const satelliteConsoles = [
    { name: "Moderno Access Console", icon: "🛡️", url: "https://access.moderno.com.ar", desc: "Consorcios, puertas y hardware RFID/NFC", color: "#3B82F6" },
    { name: "Moderno One ERP", icon: "🏢", url: "https://one.moderno.com.ar", desc: "Ventas, inventario y facturación multi-empresa", color: "#157BFF" },
    { name: "Moderno Cloud Storage", icon: "☁️", url: "https://cloud.moderno.com.ar", desc: "Bóvedas familiares y cuotas de almacenamiento", color: "#00E5FF" },
    { name: "Moderno Play Gaming", icon: "🎮", url: "https://play.moderno.com.ar", desc: "Servidores 60 FPS y catálogo de emulación", color: "#EC4899" },
    { name: "Moderno CRM (WaTicket)", icon: "💬", url: "https://ticket.moderno.com.ar", desc: "Bandeja WhatsApp API y atención multiagente", color: "#10B981" },
    { name: "AI Cleaner Pro", icon: "⚡", url: "https://cleaner.moderno.com.ar", desc: "Licencias de activación y diagnóstico macOS", color: "#00C8FF" },
  ];

  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
      <ModernoBackground />
      <ModernoNavbar />

      <main className="relative z-10 max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 pt-32 sm:pt-36 pb-24 select-none">
        {/* Top Notification Toast */}
        {actionSuccessMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-between shadow-[0_0_30px_rgba(16,185,129,0.2)] animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{actionSuccessMessage}</span>
            </div>
            <button onClick={() => setActionSuccessMessage(null)} className="text-white/50 hover:text-white text-sm">
              &times;
            </button>
          </div>
        )}

        {/* SuperAdmin Header */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0B0B10]/95 border border-white/[0.08] shadow-[0_25px_80px_rgba(0,0,0,0.95)] backdrop-blur-2xl mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-[10px] font-black px-3 py-1 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black tracking-widest uppercase shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                SUPERADMIN COMMAND CENTER
              </span>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>SUPABASE CENTRAL CONECTADO // rcskjdksimcfkdjzxara</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-sans">
              Gestión Global del Ecosistema Moderno Tech
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-1 max-w-2xl">
              Panel central de administración para Gonzo. Control unificado de usuarios, permisos por producto, suspensión de cuentas y asignación directa de beneficios para todos los sitios.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setShowNewUserModal(true)}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider transition-all hover:scale-105 shadow-[0_0_25px_rgba(0,229,255,0.4)] flex items-center gap-2 cursor-pointer"
            >
              <span>+</span>
              <span>Dar de Alta Usuario</span>
            </button>
            <a
              href="https://supabase.com/dashboard/project/rcskjdksimcfkdjzxara"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-xs font-bold transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 19.5h20L12 2zm0 4.5l6.5 11h-13L12 6.5z" />
              </svg>
              <span>Consola Supabase SQL</span>
            </a>
          </div>
        </div>

        {/* Real-time KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.08] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest block mb-1">
                TOTAL CUENTAS ECOSISTEMA
              </span>
              <div className="text-3xl font-black text-white">{totalUsersCount}</div>
              <span className="text-[10px] text-emerald-400 font-mono mt-1 block">Unificadas en Supabase ID</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 flex items-center justify-center text-xl font-bold">
              👥
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.08] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest block mb-1">
                USUARIOS ACTIVOS
              </span>
              <div className="text-3xl font-black text-emerald-400">{activeUsersCount}</div>
              <span className="text-[10px] text-white/50 font-mono mt-1 block">Acceso pleno a productos</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xl font-bold">
              ✅
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.08] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest block mb-1">
                CUENTAS SUSPENDIDAS
              </span>
              <div className="text-3xl font-black text-rose-400">{suspendedUsersCount}</div>
              <span className="text-[10px] text-white/50 font-mono mt-1 block">Bloqueadas globalmente</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center justify-center text-xl font-bold">
              ⛔
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.08] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest block mb-1">
                TIERS PAGOS / BENEFICIOS
              </span>
              <div className="text-3xl font-black text-[#00E5FF]">{proVipEntitlementsCount}</div>
              <span className="text-[10px] text-[#00E5FF]/80 font-mono mt-1 block">VIP / Pro / Enterprise</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#0052FF]/20 text-[#00E5FF] border border-[#0052FF]/40 flex items-center justify-center text-xl font-bold">
              💎
            </div>
          </div>
        </div>

        {/* Deep-Tech Satellite Consoles Router */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black text-[#00E5FF] tracking-widest uppercase">
              CONSOLAS OPERATIVAS PROFUNDAS (ACCESOS SATÉLITE DIRECTOS)
            </span>
            <span className="text-[10px] text-[#94A3B8] font-mono">Autenticación SSO Global con Moderno ID</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {satelliteConsoles.map((c) => (
              <a
                key={c.name}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#0B0B10] border border-white/[0.06] hover:border-[#00E5FF]/40 hover:bg-white/[0.02] transition-all group flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{c.icon}</span>
                  <div>
                    <h3 className="text-xs font-bold text-white group-hover:text-[#00E5FF] transition-colors">{c.name}</h3>
                    <p className="text-[10px] text-[#94A3B8] font-light">{c.desc}</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity">
                  Abrir &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Global Users Management Table */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0B0B10]/95 border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          {/* Table Filters & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/[0.06]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-black text-[#00E5FF] uppercase tracking-wider mr-2">
                FILTRAR POR:
              </span>

              {/* Status Filter */}
              <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <button
                  onClick={() => setStatusFilter("ALL")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    statusFilter === "ALL" ? "bg-[#00E5FF] text-black" : "text-[#94A3B8] hover:text-white"
                  }`}
                >
                  Todos ({totalUsersCount})
                </button>
                <button
                  onClick={() => setStatusFilter("active")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    statusFilter === "active" ? "bg-emerald-500 text-black" : "text-[#94A3B8] hover:text-white"
                  }`}
                >
                  Activos ({activeUsersCount})
                </button>
                <button
                  onClick={() => setStatusFilter("suspended")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    statusFilter === "suspended" ? "bg-rose-500 text-white" : "text-[#94A3B8] hover:text-white"
                  }`}
                >
                  Suspendidos ({suspendedUsersCount})
                </button>
              </div>

              {/* Product Filter */}
              <select
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-xs font-bold focus:outline-none focus:border-[#00E5FF]"
              >
                <option value="ALL" className="bg-[#050507]">Todos los Productos</option>
                <option value="access" className="bg-[#050507]">Moderno Access</option>
                <option value="cloud" className="bg-[#050507]">Moderno Cloud</option>
                <option value="play" className="bg-[#050507]">Moderno Play</option>
                <option value="one" className="bg-[#050507]">Moderno One</option>
                <option value="ai" className="bg-[#050507]">Moderno AI</option>
                <option value="cleaner" className="bg-[#050507]">AI Cleaner Pro</option>
                <option value="crm" className="bg-[#050507]">Moderno CRM</option>
              </select>
            </div>

            {/* Search Input */}
            <div className="w-full md:w-80 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por usuario, email o ID..."
                className="w-full px-4 py-2 pl-9 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-[#64748B] text-xs font-medium focus:outline-none focus:border-[#00E5FF]"
              />
              <svg className="w-4 h-4 text-[#00E5FF] absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] text-[10px] font-black uppercase tracking-widest text-[#94A3B8]">
                  <th className="py-3.5 px-4">Usuario & Entidad</th>
                  <th className="py-3.5 px-4">Identidad & ID</th>
                  <th className="py-3.5 px-4">Estado Global</th>
                  <th className="py-3.5 px-4">Servicios & Tiers Habilitados</th>
                  <th className="py-3.5 px-4">Registro</th>
                  <th className="py-3.5 px-4 text-right">Acciones de SuperAdmin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02] transition-colors group">
                    {/* User & Company */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00E5FF]/20 to-[#157BFF]/20 border border-white/10 flex items-center justify-center font-bold text-white text-xs">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <span>{u.name}</span>
                            {u.role === "superadmin" && (
                              <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-[#00E5FF] text-black">
                                DUEÑO
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#94A3B8] font-light">{u.company || "Particular"}</span>
                        </div>
                      </div>
                    </td>

                    {/* Email & ID */}
                    <td className="py-4 px-4 font-mono text-[11px] text-white/80">
                      <div>{u.email}</div>
                      <div className="text-[9px] text-[#64748B]">{u.id}</div>
                    </td>

                    {/* Global Status */}
                    <td className="py-4 px-4">
                      {u.status === "active" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          ACTIVO
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                          SUSPENDIDO
                        </span>
                      )}
                    </td>

                    {/* Entitlements Badges */}
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1.5 max-w-md">
                        {u.entitlements.map((e) => (
                          <span
                            key={e.productId}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold border ${
                              e.status === "suspended"
                                ? "bg-rose-500/10 text-rose-400 border-rose-500/20 line-through"
                                : e.tier === "enterprise" || e.tier === "pro" || e.tier === "vip"
                                ? "bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/30 shadow-[0_0_10px_rgba(0,229,255,0.15)]"
                                : e.tier === "family"
                                ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                                : "bg-white/[0.04] text-white/60 border-white/[0.06]"
                            }`}
                            title={`${e.productName || e.productId}: ${e.quotaLabel || e.tier}`}
                          >
                            <span className="uppercase">{e.productId}:</span>
                            <span>{e.tier.toUpperCase()}</span>
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Registration Date */}
                    <td className="py-4 px-4 text-[#94A3B8] text-[11px] whitespace-nowrap">
                      <div>{new Date(u.createdAt).toLocaleDateString("es-AR")}</div>
                      <div className="text-[9px] text-[#64748B]">{u.lastLogin || "Online"}</div>
                    </td>

                    {/* Admin Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Grant Perk / Change Plan */}
                        <button
                          onClick={() => setSelectedUserForPerk(u)}
                          title="Otorgar Beneficio / Cambiar Plan"
                          className="px-2.5 py-1.5 rounded-lg bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/30 text-[#00E5FF] text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
                        >
                          <span>🎁</span>
                          <span>Dar Plan</span>
                        </button>

                        {/* Toggle Suspend */}
                        {u.role !== "superadmin" && (
                          <button
                            onClick={() => handleToggleSuspension(u)}
                            title={u.status === "active" ? "Suspender cuenta globalmente" : "Reactivar cuenta"}
                            className={`px-2 py-1.5 rounded-lg border text-[10px] font-bold transition-all cursor-pointer ${
                              u.status === "active"
                                ? "bg-rose-500/10 hover:bg-rose-500/20 border-rose-500/30 text-rose-300"
                                : "bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 text-emerald-300"
                            }`}
                          >
                            {u.status === "active" ? "Suspender" : "Reactivar"}
                          </button>
                        )}

                        {/* Delete User */}
                        {u.role !== "superadmin" && (
                          <button
                            onClick={() => handleDeleteUser(u)}
                            title="Eliminar cuenta permanentemente"
                            className="p-1.5 rounded-lg bg-white/[0.02] hover:bg-rose-500/20 text-white/40 hover:text-rose-400 border border-transparent hover:border-rose-500/30 transition-all cursor-pointer"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Otorgar Beneficio / Cambiar Plan */}
        {selectedUserForPerk && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#0B0B10] border border-[#00E5FF]/40 shadow-[0_20px_70px_rgba(0,229,255,0.25)] relative animate-fade-in">
              <button
                onClick={() => setSelectedUserForPerk(null)}
                className="absolute top-5 right-5 text-white/50 hover:text-white text-lg font-bold"
              >
                &times;
              </button>

              <div className="flex items-center gap-2 text-[10px] font-black text-[#00E5FF] uppercase tracking-widest mb-1">
                <span>GESTIÓN DE ENTITLEMENTS & BENEFICIOS</span>
              </div>
              <h3 className="text-xl font-black text-white font-sans mb-1">
                Asignar Plan o Beneficio
              </h3>
              <p className="text-xs text-[#94A3B8] font-light mb-6">
                Otorgar acceso gratuito o promocional a <strong className="text-white">{selectedUserForPerk.email}</strong>.
              </p>

              <form onSubmit={handleApplyGrant} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1.5">
                    Seleccionar Producto del Ecosistema
                  </label>
                  <select
                    value={selectedProductForGrant}
                    onChange={(e) => setSelectedProductForGrant(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-[#00E5FF]"
                  >
                    <option value="play" className="bg-[#050507]">Moderno Play (Cloud Gaming & Emulación)</option>
                    <option value="cloud" className="bg-[#050507]">Moderno Cloud (Almacenamiento & Bóvedas)</option>
                    <option value="access" className="bg-[#050507]">Moderno Access (Control de Acceso & Consorcios)</option>
                    <option value="one" className="bg-[#050507]">Moderno One (ERP Modular)</option>
                    <option value="ai" className="bg-[#050507]">Moderno AI (Modelos & Agentes)</option>
                    <option value="cleaner" className="bg-[#050507]">Moderno AI Cleaner Pro (Licencias macOS)</option>
                    <option value="cinema" className="bg-[#050507]">Cinema Studio AI (Generación 4K)</option>
                    <option value="crm" className="bg-[#050507]">Moderno CRM (WaTicket WhatsApp API)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1.5">
                    Nivel de Acceso / Plan a Otorgar
                  </label>
                  <select
                    value={selectedTierForGrant}
                    onChange={(e) => setSelectedTierForGrant(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-[#00E5FF]"
                  >
                    <option value="vip" className="bg-[#050507]">VIP Pass (Desbloqueo total / 60 FPS)</option>
                    <option value="pro" className="bg-[#050507]">Plan Pro Studio (Máxima cuota / Multi-usuario)</option>
                    <option value="family" className="bg-[#050507]">Plan Family 2 TB (Bóveda compartida)</option>
                    <option value="enterprise" className="bg-[#050507]">Plan Enterprise Ilimitado (Consorcios / Empresas)</option>
                    <option value="free" className="bg-[#050507]">Volver a Capa Gratuita (Free Tier)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1.5">
                    Motivo / Nota del Beneficio
                  </label>
                  <input
                    type="text"
                    value={grantNote}
                    onChange={(e) => setGrantNote(e.target.value)}
                    placeholder="Ej. Cortesía SuperAdmin, Beta Tester VIP, Demo comercial"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedUserForPerk(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-bold transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider shadow-[0_0_20px_rgba(0,229,255,0.35)] transition-transform hover:scale-105"
                  >
                    Confirmar y Aplicar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Dar de Alta Usuario */}
        {showNewUserModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#0B0B10] border border-white/15 shadow-[0_20px_70px_rgba(0,0,0,0.9)] relative animate-fade-in">
              <button
                onClick={() => setShowNewUserModal(false)}
                className="absolute top-5 right-5 text-white/50 hover:text-white text-lg font-bold"
              >
                &times;
              </button>

              <div className="flex items-center gap-2 text-[10px] font-black text-[#00E5FF] uppercase tracking-widest mb-1">
                <span>NUEVA CUENTA GLOBAL</span>
              </div>
              <h3 className="text-xl font-black text-white font-sans mb-1">
                Dar de Alta Usuario
              </h3>
              <p className="text-xs text-[#94A3B8] font-light mb-6">
                Crea una cuenta en Supabase Central con acceso al ecosistema.
              </p>

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1">
                    Correo Electrónico (Obligatorio)
                  </label>
                  <input
                    type="email"
                    required
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="usuario@empresa.com.ar"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="Ej. Roberto Benítez"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1">
                    Empresa / Organización
                  </label>
                  <input
                    type="text"
                    value={newUserCompany}
                    onChange={(e) => setNewUserCompany(e.target.value)}
                    placeholder="Ej. Consorcio Los Pinos o Particular"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1">
                      Producto Inicial
                    </label>
                    <select
                      value={newUserInitialProduct}
                      onChange={(e) => setNewUserInitialProduct(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-[#00E5FF]"
                    >
                      <option value="access" className="bg-[#050507]">Moderno Access</option>
                      <option value="cloud" className="bg-[#050507]">Moderno Cloud</option>
                      <option value="play" className="bg-[#050507]">Moderno Play</option>
                      <option value="one" className="bg-[#050507]">Moderno One</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-1">
                      Tier Asignado
                    </label>
                    <select
                      value={newUserInitialTier}
                      onChange={(e) => setNewUserInitialTier(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-[#00E5FF]"
                    >
                      <option value="pro" className="bg-[#050507]">Plan Pro</option>
                      <option value="vip" className="bg-[#050507]">VIP Pass</option>
                      <option value="family" className="bg-[#050507]">Plan Family</option>
                      <option value="enterprise" className="bg-[#050507]">Enterprise</option>
                      <option value="free" className="bg-[#050507]">Free Tier</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowNewUserModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-bold transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider shadow-[0_0_20px_rgba(0,229,255,0.35)] transition-transform hover:scale-105"
                  >
                    Crear y Activar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
