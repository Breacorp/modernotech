"use client";

import React, { useState, useEffect } from "react";
import { ModernoBackground } from "../../components/ModernoBackground";
import { ModernoNavbar } from "../../components/ModernoNavbar";
import { Footer } from "../../components/Footer";
import { useModernoAuth } from "../../hooks/useModernoAuth";
import { PRODUCTS_REGISTRY } from "../../data/products";
import { supabase } from "../../lib/supabase";

export default function CuentaPage() {
  const [activeTab, setActiveTab] = useState<"services" | "billing" | "licenses" | "security">("services");
  const [mfaFactorsCount, setMfaFactorsCount] = useState<number | null>(null);
  const [passwordResetStatus, setPasswordResetStatus] = useState<string | null>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [isLoadingInvoices, setIsLoadingInvoices] = useState(false);
  const [invoicesError, setInvoicesError] = useState<string | null>(null);

  // User Software Licenses
  const [userLicenses, setUserLicenses] = useState<any[]>([]);
  const [isLoadingLicenses, setIsLoadingLicenses] = useState(false);
  const [licensesError, setLicensesError] = useState<string | null>(null);
  const [verifyKeyInput, setVerifyKeyInput] = useState("");
  const [verifyResult, setVerifyResult] = useState<{ valid: boolean; message: string } | null>(null);
  const [isVerifyingLicense, setIsVerifyingLicense] = useState(false);

  const { user, isAuthenticated, isLoading, entitlements, signOut } = useModernoAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = "/login?redirect=/cuenta";
    }
  }, [isLoading, isAuthenticated]);

  useEffect(() => {
    async function loadInvoices() {
      if (isAuthenticated && user?.id) {
        setIsLoadingInvoices(true);
        setInvoicesError(null);
        try {
          const { data, error } = await supabase
            .from("billing_invoices")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

          if (error) {
            setInvoicesError(error.message);
            setInvoices([]);
          } else {
            setInvoices(data || []);
          }
        } catch (err: any) {
          setInvoicesError(err?.message || "Error al conectar con la base de facturación.");
          setInvoices([]);
        } finally {
          setIsLoadingInvoices(false);
        }
      }
    }
    loadInvoices();
  }, [isAuthenticated, user?.id]);

  const loadUserLicenses = async () => {
    if (isAuthenticated && user?.id) {
      setIsLoadingLicenses(true);
      setLicensesError(null);
      try {
        const { data, error } = await supabase
          .from("software_licenses")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          setLicensesError(error.message);
          setUserLicenses([]);
        } else {
          setUserLicenses(data || []);
        }
      } catch (err: any) {
        setLicensesError(err?.message || "Error al conectar con la base de licencias.");
        setUserLicenses([]);
      } finally {
        setIsLoadingLicenses(false);
      }
    }
  };

  useEffect(() => {
    loadUserLicenses();
  }, [isAuthenticated, user?.id]);

  const handleValidateLicenseKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyKeyInput.trim()) return;
    setIsVerifyingLicense(true);
    setVerifyResult(null);

    try {
      const { data, error } = await supabase.rpc("verify_and_activate_license", {
        p_license_key: verifyKeyInput.trim(),
        p_hardware_id: `WEB-CLIENT-${window.navigator.userAgent.slice(0, 30)}`,
      });

      if (error) {
        setVerifyResult({ valid: false, message: error.message });
      } else if (data?.valid) {
        setVerifyResult({
          valid: true,
          message: `Licencia VÁLIDA para ${data.product_id?.toUpperCase()} (${data.tier?.toUpperCase()}). Activaciones: ${data.activations}/${data.max_activations}.`,
        });
        loadUserLicenses();
      } else {
        setVerifyResult({
          valid: false,
          message: data?.error || "Licencia inválida o revocada.",
        });
      }
    } catch (err: any) {
      setVerifyResult({ valid: false, message: err?.message || "Error al validar la licencia." });
    } finally {
      setIsVerifyingLicense(false);
    }
  };

  const [factors, setFactors] = useState<any[]>([]);
  const [enrollData, setEnrollData] = useState<{ id: string; qr_code: string; secret: string; uri: string } | null>(null);
  const [verifyCode, setVerifyCode] = useState("");
  const [mfaError, setMfaError] = useState<string | null>(null);
  const [mfaSuccess, setMfaSuccess] = useState<string | null>(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [unenrollFactorId, setUnenrollFactorId] = useState<string | null>(null);

  const loadMfaStatus = async () => {
    if (isAuthenticated) {
      try {
        const { data, error } = await supabase.auth.mfa.listFactors();
        if (!error && data?.all) {
          const verifiedFactors = data.all.filter((f) => f.status === "verified");
          setFactors(verifiedFactors);
          setMfaFactorsCount(verifiedFactors.length);
        } else {
          setFactors([]);
          setMfaFactorsCount(0);
        }
      } catch {
        setFactors([]);
        setMfaFactorsCount(0);
      }
    }
  };

  useEffect(() => {
    loadMfaStatus();
  }, [isAuthenticated]);

  const handleStartEnroll = async () => {
    setMfaError(null);
    setMfaSuccess(null);
    setIsEnrolling(true);
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: "Authenticator App (Moderno ID)",
      });

      if (error) {
        setMfaError(error.message);
      } else if (data) {
        setEnrollData({
          id: data.id,
          qr_code: data.totp.qr_code,
          secret: data.totp.secret,
          uri: data.totp.uri,
        });
      }
    } catch (err: any) {
      setMfaError(err?.message || "Error al iniciar enrolamiento MFA.");
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleVerifyEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollData || !verifyCode) return;
    setIsVerifying(true);
    setMfaError(null);
    setMfaSuccess(null);

    try {
      const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId: enrollData.id,
      });

      if (challengeError) {
        setMfaError(challengeError.message);
        setIsVerifying(false);
        return;
      }

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId: enrollData.id,
        challengeId: challengeData.id,
        code: verifyCode.trim(),
      });

      if (verifyError) {
        setMfaError(verifyError.message);
      } else {
        setMfaSuccess("Autenticación de Dos Factores (TOTP) configurada y verificada exitosamente.");
        setEnrollData(null);
        setVerifyCode("");
        await loadMfaStatus();
      }
    } catch (err: any) {
      setMfaError(err?.message || "Error al verificar código TOTP.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleUnenroll = async (factorId: string) => {
    if (!confirm("¿Estás seguro de que deseas desactivar este factor de doble autenticación?")) return;
    setUnenrollFactorId(factorId);
    setMfaError(null);
    setMfaSuccess(null);
    try {
      const { error } = await supabase.auth.mfa.unenroll({ factorId });
      if (error) {
        setMfaError(error.message);
      } else {
        setMfaSuccess("Factor MFA eliminado correctamente.");
        await loadMfaStatus();
      }
    } catch (err: any) {
      setMfaError(err?.message || "Error al desvincular factor MFA.");
    } finally {
      setUnenrollFactorId(null);
    }
  };

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
            onClick={() => setActiveTab("licenses")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "licenses"
                ? "bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30"
                : "text-white/60 hover:text-white"
            }`}
          >
            Licencias de Software ({userLicenses.length})
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

              {invoicesError && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold mb-4">
                  Error al cargar facturas: {invoicesError}
                </div>
              )}

              {isLoadingInvoices ? (
                <div className="p-8 text-center text-xs font-mono text-[#94A3B8]">
                  <span className="inline-block w-4 h-4 border-2 border-[#00E5FF] border-t-transparent rounded-full animate-spin mr-2" />
                  Consultando facturas en Supabase...
                </div>
              ) : invoices.length === 0 ? (
                <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center text-xs text-[#94A3B8]">
                  No registras facturas emitidas en tu cuenta.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/[0.08] text-[10px] font-black uppercase tracking-widest text-[#94A3B8]">
                        <th className="py-3 px-4">Comprobante</th>
                        <th className="py-3 px-4">Servicio / Plan</th>
                        <th className="py-3 px-4">Período</th>
                        <th className="py-3 px-4">Monto</th>
                        <th className="py-3 px-4">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {invoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-white/[0.02]">
                          <td className="py-3.5 px-4 font-mono text-white font-bold">
                            {inv.invoice_number}
                          </td>
                          <td className="py-3.5 px-4 text-white">
                            <span className="font-bold">{inv.product_id}</span>
                            <span className="text-[10px] text-[#94A3B8] font-mono ml-2 uppercase">({inv.tier})</span>
                          </td>
                          <td className="py-3.5 px-4 text-[#94A3B8] text-[11px]">
                            {new Date(inv.billing_period_start).toLocaleDateString("es-AR")} - {new Date(inv.billing_period_end).toLocaleDateString("es-AR")}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-white">
                            ${(inv.amount_cents / 100).toFixed(2)} {inv.currency}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                inv.status === "paid"
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                              }`}
                            >
                              {inv.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Licencias de Software */}
        {activeTab === "licenses" && (
          <div className="space-y-8 max-w-4xl">
            {/* Validador de Licencia Offline / Online */}
            <div className="p-8 rounded-2xl bg-[#0B0B10] border border-white/[0.08]">
              <h3 className="text-lg font-black text-white mb-1">Activar o Validar Licencia</h3>
              <p className="text-xs text-[#94A3B8] font-light mb-6">
                Ingresa una clave de producto para verificar su autenticidad y vincularla a tu hardware.
              </p>

              <form onSubmit={handleValidateLicenseKey} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="MOD-CLEANER-XXXX-XXXX-XXXX"
                  value={verifyKeyInput}
                  onChange={(e) => setVerifyKeyInput(e.target.value.toUpperCase())}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#00E5FF] tracking-wider"
                  required
                />
                <button
                  type="submit"
                  disabled={isVerifyingLicense || !verifyKeyInput.trim()}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider transition-transform hover:scale-105 disabled:opacity-50 cursor-pointer whitespace-nowrap shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                >
                  {isVerifyingLicense ? "Validando..." : "Validar Clave"}
                </button>
              </form>

              {verifyResult && (
                <div
                  className={`mt-4 p-4 rounded-xl text-xs font-bold border ${
                    verifyResult.valid
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : "bg-rose-500/10 border-rose-500/30 text-rose-300"
                  }`}
                >
                  {verifyResult.message}
                </div>
              )}
            </div>

            {/* Listado de Licencias Propias */}
            <div className="p-8 rounded-2xl bg-[#0B0B10] border border-white/[0.08]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-white">Mis Claves de Licencia</h3>
                <span className="text-xs font-mono text-[#00E5FF]">
                  {userLicenses.length} {userLicenses.length === 1 ? "Licencia" : "Licencias"}
                </span>
              </div>

              {licensesError && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold mb-4">
                  {licensesError}
                </div>
              )}

              {isLoadingLicenses ? (
                <div className="p-8 text-center text-xs font-mono text-[#94A3B8]">
                  <span className="inline-block w-4 h-4 border-2 border-[#00E5FF] border-t-transparent rounded-full animate-spin mr-2" />
                  Consultando licencias en Supabase...
                </div>
              ) : userLicenses.length === 0 ? (
                <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center text-xs text-[#94A3B8]">
                  No registras licencias de software vinculadas a tu cuenta.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/[0.08] text-[10px] font-black uppercase tracking-widest text-[#94A3B8]">
                        <th className="py-3 px-4">Clave</th>
                        <th className="py-3 px-4">Producto</th>
                        <th className="py-3 px-4">Activaciones</th>
                        <th className="py-3 px-4">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {userLicenses.map((lic) => (
                        <tr key={lic.id} className="hover:bg-white/[0.02]">
                          <td className="py-3.5 px-4 font-mono text-[#00E5FF] font-bold select-all">
                            {lic.license_key}
                          </td>
                          <td className="py-3.5 px-4 text-white">
                            <span className="font-bold uppercase">{lic.product_id}</span>
                            <span className="text-[10px] text-[#94A3B8] font-mono ml-2 uppercase">({lic.tier})</span>
                          </td>
                          <td className="py-3.5 px-4 text-white font-mono">
                            {lic.current_activations} / {lic.max_activations}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                lic.status === "active"
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                              }`}
                            >
                              {lic.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
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

              {mfaError && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold mb-4">
                  {mfaError}
                </div>
              )}
              {mfaSuccess && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-4">
                  {mfaSuccess}
                </div>
              )}

              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">Autenticación de Dos Factores (MFA TOTP)</span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            mfaFactorsCount && mfaFactorsCount > 0
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                              : "bg-white/[0.04] text-white/50 border border-white/10"
                          }`}
                        >
                          {mfaFactorsCount === null
                            ? "Verificando..."
                            : mfaFactorsCount > 0
                            ? `ACTIVO (${mfaFactorsCount}) ✓`
                            : "NO CONFIGURADO"}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#94A3B8] font-light mt-1 block">
                        Protege tu cuenta con Google Authenticator, 1Password o Authy mediante Supabase MFA.
                      </span>
                    </div>

                    {!enrollData && (
                      <button
                        onClick={handleStartEnroll}
                        disabled={isEnrolling}
                        className="px-4 py-2 rounded-xl bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/30 text-xs font-bold transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto disabled:opacity-50"
                      >
                        {isEnrolling ? "Iniciando..." : "+ Configurar Nuevo Factor TOTP"}
                      </button>
                    )}
                  </div>

                  {/* Formulario / QR de enrolamiento activo */}
                  {enrollData && (
                    <div className="mt-6 p-5 rounded-xl bg-black/40 border border-[#00E5FF]/30">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-black uppercase tracking-wider text-[#00E5FF]">
                          Vincular Aplicación de Autenticación
                        </h4>
                        <button
                          onClick={() => {
                            setEnrollData(null);
                            setVerifyCode("");
                          }}
                          className="text-xs text-[#94A3B8] hover:text-white"
                        >
                          Cancelar
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl">
                          {enrollData.qr_code ? (
                            <img
                              src={enrollData.qr_code}
                              alt="Código QR de autenticación"
                              className="w-44 h-44 object-contain"
                            />
                          ) : (
                            <div className="w-44 h-44 flex items-center justify-center text-xs text-black font-mono">
                              QR no disponible
                            </div>
                          )}
                          <span className="text-[10px] text-zinc-600 font-mono mt-2">
                            Escanear con tu app TOTP
                          </span>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <span className="text-[11px] text-[#94A3B8] block mb-1">
                              Clave secreta manual (si no puedes escanear el QR):
                            </span>
                            <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/10 font-mono text-xs text-[#00E5FF] break-all select-all">
                              {enrollData.secret}
                            </div>
                          </div>

                          <form onSubmit={handleVerifyEnroll} className="space-y-3">
                            <label className="text-[11px] text-white font-bold block">
                              Ingresa el código de 6 dígitos generado por tu app:
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                maxLength={6}
                                placeholder="000000"
                                value={verifyCode}
                                onChange={(e) => setVerifyCode(e.target.value)}
                                className="flex-1 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white font-mono text-center tracking-widest text-lg focus:outline-none focus:border-[#00E5FF]"
                                required
                              />
                              <button
                                type="submit"
                                disabled={isVerifying || verifyCode.trim().length < 6}
                                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black font-black text-xs transition-transform hover:scale-105 disabled:opacity-50 cursor-pointer"
                              >
                                {isVerifying ? "Verificando..." : "Confirmar"}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Factores TOTP ya activos */}
                  {factors.length > 0 && (
                    <div className="mt-5 border-t border-white/[0.06] pt-4 space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#94A3B8] block mb-2">
                        Factores Verificados Activos
                      </span>
                      {factors.map((f) => (
                        <div
                          key={f.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-base">📱</span>
                            <div>
                              <span className="text-xs font-bold text-white block">
                                {f.friendly_name || "Authenticator App"}
                              </span>
                              <span className="text-[10px] font-mono text-[#94A3B8]">
                                ID: {f.id} • Creado: {new Date(f.created_at).toLocaleDateString("es-AR")}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleUnenroll(f.id)}
                            disabled={unenrollFactorId === f.id}
                            className="px-3 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[11px] font-bold transition-all cursor-pointer disabled:opacity-50"
                          >
                            {unenrollFactorId === f.id ? "Eliminando..." : "Desactivar"}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
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
