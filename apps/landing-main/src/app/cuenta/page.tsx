"use client";

import React, { useState, useEffect } from "react";
import { ModernoBackground } from "../../components/ModernoBackground";
import { ModernoNavbar } from "../../components/ModernoNavbar";
import { Footer } from "../../components/Footer";
import { useModernoAuth } from "../../hooks/useModernoAuth";
import { PRODUCTS_REGISTRY } from "../../data/products";
import { supabase } from "../../lib/supabase";

export default function CuentaPage() {
  const [activeTab, setActiveTab] = useState<"services" | "billing" | "security">("services");
  const [mfaFactorsCount, setMfaFactorsCount] = useState<number | null>(null);
  const [passwordResetStatus, setPasswordResetStatus] = useState<string | null>(null);
  const { user, isAuthenticated, isLoading, entitlements, signOut } = useModernoAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = "/login?redirect=/cuenta";
    }
  }, [isLoading, isAuthenticated]);

  useEffect(() => {
    async function loadMfaStatus() {
      if (isAuthenticated) {
        try {
          const { data, error } = await supabase.auth.mfa.listFactors();
          if (!error && data?.totp) {
            setMfaFactorsCount(data.totp.length);
          } else {
            setMfaFactorsCount(0);
          }
        } catch {
          setMfaFactorsCount(0);
        }
      }
    }
    loadMfaStatus();
  }, [isAuthenticated]);

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    setPasswordResetStatus("Enviando enlace...");
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/login`,
      });
      if (error) {
        setPasswordResetStatus(`Error: ${error.message}`);
      } else {
        setPasswordResetStatus("Se ha enviado un enlace seguro a tu correo.");
      }
    } catch (err: any) {
      setPasswordResetStatus(err?.message || "Error al solicitar restablecimiento.");
    }
  };

  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center text-sm font-mono">
        <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse mr-3" />
        Verificando sesión segura en Supabase...
      </div>
    );
  }

  const userName = user.name || user.email.split("@")[0];
  const userEmail = user.email;
  const userInitials = userName.slice(0, 2).toUpperCase();
  const userIdDisplay = user.id ? `MOD-${user.id.slice(0, 8).toUpperCase()}` : "MOD-USER";

  const activeEntitlements = entitlements.filter((e) => e.status === "active");
  const paidEntitlements = activeEntitlements.filter((e) => e.tier !== "free");
  const freeEntitlements = activeEntitlements.filter((e) => e.tier === "free");

  const getProductMeta = (productId: string) => {
    const found = PRODUCTS_REGISTRY.find((p) => p.id === productId);
    if (found) return found;
    return {
      id: productId,
      name: productId.charAt(0).toUpperCase() + productId.slice(1),
      tagline: "Servicio oficial del ecosistema Moderno",
      description: "Servicio integrado mediante Moderno ID centralizado.",
      url: `https://${productId}.moderno.com.ar`,
      accentColor: "#00E5FF",
    };
  };

  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
      <ModernoBackground />
      <ModernoNavbar />

      <main className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 pt-32 sm:pt-36 pb-24">
        {/* Header Profile Summary */}
        <div className="mb-8 p-8 rounded-3xl bg-[#0B0B10]/90 border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#157BFF] p-0.5 shadow-[0_0_30px_rgba(0,229,255,0.3)] shrink-0">
              <div className="w-full h-full bg-[#050507] rounded-[14px] flex items-center justify-center text-2xl font-black text-white font-sans">
                {userInitials}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-black text-white font-sans">{userName}</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  SESIÓN SUPABASE ACTIVA
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] font-mono">{userEmail} &bull; ID: {userIdDisplay}</p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] text-white/50 mt-2">
                <span>Ecosistema: <strong className="text-white">{activeEntitlements.length} Productos Conectados</strong></span>
                <span>&bull;</span>
                <span>Membresías Pagas: <strong className="text-[#00E5FF]">{paidEntitlements.length} Activas</strong></span>
                <span>&bull;</span>
                <span>Capas Gratuitas: <strong className="text-emerald-400">{freeEntitlements.length} Habilitadas</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={signOut}
              className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold text-white transition-all cursor-pointer"
            >
              Cerrar Sesión
            </button>
            <a
              href="/pricing"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider transition-transform hover:scale-105 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
            >
              Explorar Planes & Mejoras
            </a>
          </div>
        </div>

        {/* Global Entitlement Callout Banner */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#00E5FF]/10 via-[#157BFF]/10 to-purple-500/10 border border-[#00E5FF]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <span className="text-2xl">🏛️</span>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white">
                Cuenta Universal de Ecosistema (Base de Datos Supabase Central)
              </h3>
              <p className="text-[11px] text-[#94A3B8] font-light">
                Los accesos a tus servicios se validan en tiempo real contra los registros de la base de datos de identidad.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-white/[0.06] pb-4">
          <button
            onClick={() => setActiveTab("services")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "services"
                ? "bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30"
                : "text-white/60 hover:text-white"
            }`}
          >
            Servicios & Membresías ({activeEntitlements.length})
          </button>
          <button
            onClick={() => setActiveTab("billing")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "billing"
                ? "bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30"
                : "text-white/60 hover:text-white"
            }`}
          >
            Facturación & Pagos
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "security"
                ? "bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30"
                : "text-white/60 hover:text-white"
            }`}
          >
            Seguridad & Sesión
          </button>
        </div>

        {/* Tab 1: Servicios */}
        {activeTab === "services" && (
          <div className="space-y-10">
            {/* Membresías Pagas Activas */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-black text-white/50 tracking-widest uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00E5FF]" />
                  <span>Membresías & Planes Contratados</span>
                </h2>
                <span className="text-[11px] text-[#00E5FF] font-mono">
                  {paidEntitlements.length} {paidEntitlements.length === 1 ? "Suscripción Activa" : "Suscripciones Activas"}
                </span>
              </div>

              {paidEntitlements.length === 0 ? (
                <div className="p-8 rounded-2xl bg-[#0B0B10] border border-white/[0.06] text-center max-w-xl">
                  <p className="text-sm text-[#94A3B8] mb-4">
                    No posees planes o membresías de pago activas en este momento.
                  </p>
                  <a
                    href="/pricing"
                    className="inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider transition-transform hover:scale-105"
                  >
                    Explorar Catálogo de Planes &rarr;
                  </a>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paidEntitlements.map((ent) => {
                    const meta = getProductMeta(ent.productId);
                    return (
                      <div
                        key={ent.productId}
                        className="p-7 rounded-2xl bg-[#0B0B10] border border-[#00E5FF]/40 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between relative overflow-hidden"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-black text-white">{meta.name}</h3>
                              <span className="text-[10px] font-mono text-[#00E5FF]">{meta.url}</span>
                            </div>
                            <span className="px-2.5 py-1 rounded-full bg-[#00E5FF]/15 text-[#00E5FF] text-[10px] font-black border border-[#00E5FF]/40">
                              TIER: {ent.tier.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-xs text-[#94A3B8] font-light mb-5">{meta.tagline}</p>
                          {ent.quotaLabel && (
                            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] mb-5 text-xs text-white/70">
                              Cuota Asignada: <strong className="text-white">{ent.quotaLabel}</strong>
                            </div>
                          )}
                          {ent.grantNotes && (
                            <div className="text-[11px] text-emerald-400 font-mono mb-4">
                              Nota de suscripción: {ent.grantNotes}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                          <a
                            href={meta.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2.5 text-center rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider transition-transform hover:scale-[1.02]"
                          >
                            Abrir {meta.name} &rarr;
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Productos con Acceso Gratuito Activo */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-black text-white/50 tracking-widest uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Productos con Capa Gratuita Habilitada</span>
                </h2>
                <span className="text-[11px] text-emerald-400 font-mono">
                  {freeEntitlements.length} {freeEntitlements.length === 1 ? "Disponible" : "Disponibles"}
                </span>
              </div>

              {freeEntitlements.length === 0 ? (
                <div className="p-8 rounded-2xl bg-[#0B0B10] border border-white/[0.06] text-center max-w-xl">
                  <p className="text-sm text-[#94A3B8]">
                    No posees servicios gratuitos asignados en tu cuenta.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {freeEntitlements.map((ent) => {
                    const meta = getProductMeta(ent.productId);
                    return (
                      <div
                        key={ent.productId}
                        className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.08] flex flex-col justify-between hover:border-white/20 transition-all"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              PLAN GRATUITO ACTIVO
                            </span>
                          </div>
                          <h3 className="text-base font-black text-white mb-1">{meta.name}</h3>
                          <p className="text-xs text-[#94A3B8] font-light mb-4">{meta.tagline}</p>
                        </div>

                        <div className="space-y-2">
                          <a
                            href={meta.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 text-center rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-bold text-white transition-all block"
                          >
                            Entrar a {meta.name} &rarr;
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Facturación */}
        {activeTab === "billing" && (
          <div className="space-y-6 max-w-4xl">
            <div className="p-8 rounded-2xl bg-[#0B0B10] border border-white/[0.08]">
              <h3 className="text-lg font-black text-white mb-1">Método de Pago</h3>
              <p className="text-xs text-[#94A3B8] font-light mb-6">
                Gestión de pagos y medios de cobro asociados a tu cuenta.
              </p>

              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center mb-6">
                <p className="text-xs text-[#94A3B8]">
                  No posees métodos de pago guardados actualmente.
                </p>
                <p className="text-[11px] text-white/40 mt-1">
                  Tu método de pago se asociará de forma segura cuando contrates un plan en la plataforma.
                </p>
              </div>

              <a
                href="/pricing"
                className="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider transition-transform hover:scale-105"
              >
                Ver Planes Disponibles
              </a>
            </div>

            {/* Facturas Recientes */}
            <div className="p-8 rounded-2xl bg-[#0B0B10] border border-white/[0.08]">
              <h3 className="text-lg font-black text-white mb-2">Historial de Facturas & Recibos</h3>
              <p className="text-xs text-[#94A3B8] font-light mb-6">
                Comprobantes oficiales emitidos por tus suscripciones y servicios.
              </p>

              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center text-xs text-[#94A3B8]">
                No registras facturas emitidas en tu cuenta.
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Seguridad */}
        {activeTab === "security" && (
          <div className="space-y-6 max-w-4xl">
            <div className="p-8 rounded-2xl bg-[#0B0B10] border border-white/[0.08]">
              <h3 className="text-lg font-black text-white mb-1">Credenciales & Autenticación</h3>
              <p className="text-xs text-[#94A3B8] font-light mb-6">
                Configuración de seguridad administrada mediante Supabase Auth central.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Autenticación de Dos Factores (MFA)</span>
                    <span className="text-[11px] text-[#94A3B8] font-light">Código TOTP desde Google Authenticator o 1Password</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-xl text-xs font-bold ${
                      mfaFactorsCount && mfaFactorsCount > 0
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : "bg-white/[0.04] text-white/50 border border-white/10"
                    }`}
                  >
                    {mfaFactorsCount === null
                      ? "Verificando..."
                      : mfaFactorsCount > 0
                      ? `ACTIVADO (${mfaFactorsCount} TOTP) ✓`
                      : "NO CONFIGURADO"}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-white block">Contraseña de Cuenta</span>
                    <span className="text-[11px] text-[#94A3B8] font-light">
                      Protegida y cifrada en los servidores de autenticación central.
                    </span>
                    {passwordResetStatus && (
                      <span className="text-[11px] text-[#00E5FF] block mt-1">
                        {passwordResetStatus}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handlePasswordReset}
                    className="px-4 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold text-white cursor-pointer self-start sm:self-auto"
                  >
                    Restablecer Contraseña
                  </button>
                </div>
              </div>
            </div>

            {/* Sesión Activa */}
            <div className="p-8 rounded-2xl bg-[#0B0B10] border border-white/[0.08]">
              <h3 className="text-lg font-black text-white mb-4">Sesión Activa</h3>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🔐</span>
                  <div>
                    <span className="font-bold text-white block">Sesión Central Supabase</span>
                    <span className="text-[10px] font-mono text-emerald-400">
                      Usuario ID: {user.id}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-400">ACTIVA AHORA</span>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
