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
      <div className="min-h-screen bg-[#f5f7fa] text-slate-900 flex items-center justify-center text-sm font-mono">
        <span className="w-2 h-2 rounded-full bg-[#4c8dff] animate-pulse mr-3" />
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

  const ownedProductIds = new Set(entitlements.map((e) => e.productId));
  const discoverableProducts = PRODUCTS_REGISTRY
    .filter((product) => !ownedProductIds.has(product.id))
    .sort((a, b) => a.order - b.order);
  const paidProducts = paidEntitlements;
  const freeProducts = freeEntitlements;

  const getProductMeta = (productId: string) => {
    const found = PRODUCTS_REGISTRY.find((p) => p.id === productId);
    if (found) return found;
    return {
      id: productId,
      name: productId.charAt(0).toUpperCase() + productId.slice(1),
      tagline: "Servicio oficial del ecosistema Moderno",
      description: "Servicio integrado mediante Moderno ID centralizado.",
      url: `https://${productId}.moderno.com.ar`,
      accentColor: "#4c8dff",
    };
  };

  return (
    <div className="relative min-h-screen bg-[#f5f7fa] text-slate-900 selection:bg-[#4c8dff] selection:text-black overflow-x-hidden">
      <ModernoBackground />
      <ModernoNavbar />

      <main className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 pt-32 sm:pt-36 pb-24">
        {/* Header Profile Summary */}
        <div className="mb-8 p-8 rounded-3xl bg-white/80 border border-slate-200/70 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#4c8dff] to-[#2f6bff] p-0.5 shadow-[0_0_30px_rgba(0,229,255,0.3)] shrink-0">
              <div className="w-full h-full bg-[#f5f7fa] rounded-[14px] flex items-center justify-center text-2xl font-black text-slate-900 font-sans">
                {userInitials}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-[#4c8dff]/80">Mi Moderno</span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-sans">{userName}</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  SESIÓN SUPABASE ACTIVA
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">{userEmail} &bull; ID: {userIdDisplay}</p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] text-slate-400 mt-2">
                <span>Ecosistema: <strong className="text-slate-900">{activeEntitlements.length} Productos Conectados</strong></span>
                <span>&bull;</span>
                <span>Membresías Pagas: <strong className="text-[#4c8dff]">{paidEntitlements.length} Activas</strong></span>
                <span>&bull;</span>
                <span>Capas Gratuitas: <strong className="text-emerald-400">{freeEntitlements.length} Habilitadas</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={signOut}
              className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-slate-200 text-xs font-bold text-slate-900 transition-all cursor-pointer"
            >
              Cerrar Sesión
            </button>
            <a
              href="/pricing"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#4c8dff] to-[#2f6bff] text-black text-xs font-black tracking-wider transition-transform hover:scale-105 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
            >
              Explorar Planes & Mejoras
            </a>
          </div>
        </div>

        {/* Global Entitlement Callout Banner */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#4c8dff]/10 via-[#2f6bff]/10 to-purple-500/10 border border-[#4c8dff]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <span className="text-2xl">🏛️</span>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Cuenta Universal de Ecosistema (Base de Datos Supabase Central)
              </h3>
              <p className="text-[11px] text-slate-500 font-light">
                Los accesos a tus servicios se validan en tiempo real contra los registros de la base de datos de identidad.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-slate-200/70 pb-4">
          <button
            onClick={() => setActiveTab("services")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "services"
                ? "bg-[#4c8dff]/15 text-[#4c8dff] border border-[#4c8dff]/30"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Mis Productos ({activeEntitlements.length})
          </button>
          <button
            onClick={() => setActiveTab("billing")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "billing"
                ? "bg-[#4c8dff]/15 text-[#4c8dff] border border-[#4c8dff]/30"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Facturación & Pagos
          </button>
          <button
            onClick={() => setActiveTab("licenses")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "licenses"
                ? "bg-[#4c8dff]/15 text-[#4c8dff] border border-[#4c8dff]/30"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Licencias de Software ({userLicenses.length})
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "security"
                ? "bg-[#4c8dff]/15 text-[#4c8dff] border border-[#4c8dff]/30"
                : "text-slate-500 hover:text-slate-900"
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
                <h2 className="text-xs font-black text-slate-400 tracking-widest uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4c8dff]" />
                  <span>Membresías & Planes Contratados</span>
                </h2>
                <span className="text-[11px] text-[#4c8dff] font-mono">
                  {paidEntitlements.length} {paidEntitlements.length === 1 ? "Suscripción Activa" : "Suscripciones Activas"}
                </span>
              </div>

              {paidEntitlements.length === 0 ? (
                <div className="p-8 rounded-2xl bg-white/80 border border-slate-200/70 text-center max-w-xl">
                  <p className="text-sm text-slate-500 mb-4">
                    No posees planes o membresías de pago activas en este momento.
                  </p>
                  <a
                    href="/pricing"
                    className="inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4c8dff] to-[#2f6bff] text-black text-xs font-black tracking-wider transition-transform hover:scale-105"
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
                        className="p-7 rounded-2xl bg-white/80 border border-[#4c8dff]/40 shadow-[0_10px_30px_rgba(15,23,42,0.12)] flex flex-col justify-between relative overflow-hidden"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-black text-slate-900">{meta.name}</h3>
                              <span className="text-[10px] font-mono text-[#4c8dff]">{meta.url}</span>
                            </div>
                            <span className="px-2.5 py-1 rounded-full bg-[#4c8dff]/15 text-[#4c8dff] text-[10px] font-black border border-[#4c8dff]/40">
                              TIER: {ent.tier.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-light mb-5">{meta.tagline}</p>
                          {ent.quotaLabel && (
                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 mb-5 text-xs text-slate-600">
                              Cuota Asignada: <strong className="text-slate-900">{ent.quotaLabel}</strong>
                            </div>
                          )}
                          {ent.grantNotes && (
                            <div className="text-[11px] text-emerald-400 font-mono mb-4">
                              Nota de suscripción: {ent.grantNotes}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-slate-200/70">
                          <a
                            href={meta.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2.5 text-center rounded-xl bg-gradient-to-r from-[#4c8dff] to-[#2f6bff] text-black text-xs font-black tracking-wider transition-transform hover:scale-[1.02]"
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
                <h2 className="text-xs font-black text-slate-400 tracking-widest uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Productos con Capa Gratuita Habilitada</span>
                </h2>
                <span className="text-[11px] text-emerald-400 font-mono">
                  {freeEntitlements.length} {freeEntitlements.length === 1 ? "Disponible" : "Disponibles"}
                </span>
              </div>

              {freeEntitlements.length === 0 ? (
                <div className="p-8 rounded-2xl bg-white/80 border border-slate-200/70 text-center max-w-xl">
                  <p className="text-sm text-slate-500">
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
                        className="p-6 rounded-2xl bg-white/80 border border-slate-200/70 flex flex-col justify-between hover:border-white/20 transition-all"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              PLAN GRATUITO ACTIVO
                            </span>
                          </div>
                          <h3 className="text-base font-black text-slate-900 mb-1">{meta.name}</h3>
                          <p className="text-xs text-slate-500 font-light mb-4">{meta.tagline}</p>
                        </div>

                        <div className="space-y-2">
                          <a
                            href={meta.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 text-center rounded-xl bg-slate-100 hover:bg-white/[0.12] border border-slate-200 text-xs font-bold text-slate-900 transition-all block"
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

        {/* Discoverable products / update paths */}
        {activeTab === "services" && discoverableProducts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200/70">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-black text-slate-400 tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>Descubrir y Contratar Servicios</span>
              </h2>
              <span className="text-[11px] text-purple-300 font-mono">
                {discoverableProducts.length} {discoverableProducts.length === 1 ? "Disponible" : "Disponibles"}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {discoverableProducts.map((product) => (
                <div key={product.id} className="p-6 rounded-2xl bg-white/80 border border-slate-200/70 flex flex-col justify-between hover:border-white/20 transition-all">
                  <div>
                    <h3 className="text-base font-black text-slate-900 mb-1">{product.name}</h3>
                    <p className="text-xs text-slate-500 font-light mb-3">{product.tagline}</p>
                    <span className="inline-flex px-2.5 py-1 rounded-full bg-white/[0.04] text-slate-500 text-[10px] font-bold border border-slate-200">
                      {product.status === "AVAILABLE" ? "Disponible" : product.status}
                    </span>
                  </div>
                  <div className="mt-4 space-y-2">
                    {product.status === "AVAILABLE" ? (
                      <a href="https://pay.moderno.com.ar/" target="_blank" rel="noopener noreferrer" className="block w-full py-2.5 text-center rounded-xl bg-slate-100 hover:bg-white/[0.12] border border-slate-200 text-xs font-bold text-slate-900 transition-all">
                        Contratar en Moderno Pay →
                      </a>
                    ) : (
                      <a href={product.url} target="_blank" rel="noopener noreferrer" className="block w-full py-2.5 text-center rounded-xl bg-slate-100 hover:bg-white/[0.12] border border-slate-200 text-xs font-bold text-slate-900 transition-all">
                        Ver Estado del Proyecto →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Facturación */}
        {activeTab === "billing" && (
          <div className="space-y-6 max-w-4xl">
            <div className="p-8 rounded-2xl bg-white/80 border border-slate-200/70">
              <h3 className="text-lg font-black text-slate-900 mb-1">Método de Pago</h3>
              <p className="text-xs text-slate-500 font-light mb-6">
                Gestión de pagos y medios de cobro asociados a tu cuenta.
              </p>

              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/70 text-center mb-6">
                <p className="text-xs text-slate-500">
                  No posees métodos de pago guardados actualmente.
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Tu método de pago se asociará de forma segura cuando contrates un plan en la plataforma.
                </p>
              </div>

              <a 
                href="https://pay.moderno.com.ar/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-[#4c8dff] to-[#2f6bff] text-black text-xs font-black tracking-wider transition-transform hover:scale-105"
              >
                Administrar Planes en Moderno Pay →
              </a>
            </div>

            {/* Facturas Recientes */}
            <div className="p-8 rounded-2xl bg-white/80 border border-slate-200/70">
              <h3 className="text-lg font-black text-slate-900 mb-2">Historial de Facturas & Recibos</h3>
              <p className="text-xs text-slate-500 font-light mb-6">
                Comprobantes oficiales emitidos por tus suscripciones y servicios.
              </p>

              {invoicesError && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold mb-4">
                  Error al cargar facturas: {invoicesError}
                </div>
              )}

              {isLoadingInvoices ? (
                <div className="p-8 text-center text-xs font-mono text-slate-500">
                  <span className="inline-block w-4 h-4 border-2 border-[#4c8dff] border-t-transparent rounded-full animate-spin mr-2" />
                  Consultando facturas en Supabase...
                </div>
              ) : invoices.length === 0 ? (
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/70 text-center text-xs text-slate-500">
                  No registras facturas emitidas en tu cuenta.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200/70 text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <th className="py-3 px-4">Comprobante</th>
                        <th className="py-3 px-4">Servicio / Plan</th>
                        <th className="py-3 px-4">Período</th>
                        <th className="py-3 px-4">Monto</th>
                        <th className="py-3 px-4">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {invoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-slate-50">
                          <td className="py-3.5 px-4 font-mono text-slate-900 font-bold">
                            {inv.invoice_number}
                          </td>
                          <td className="py-3.5 px-4 text-slate-900">
                            <span className="font-bold">{inv.product_id}</span>
                            <span className="text-[10px] text-slate-500 font-mono ml-2 uppercase">({inv.tier})</span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                            {new Date(inv.billing_period_start).toLocaleDateString("es-AR")} - {new Date(inv.billing_period_end).toLocaleDateString("es-AR")}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-900">
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
            <div className="p-8 rounded-2xl bg-white/80 border border-slate-200/70">
              <h3 className="text-lg font-black text-slate-900 mb-1">Activar o Validar Licencia</h3>
              <p className="text-xs text-slate-500 font-light mb-6">
                Ingresa una clave de producto para verificar su autenticidad y vincularla a tu hardware.
              </p>

              <form onSubmit={handleValidateLicenseKey} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="MOD-CLEANER-XXXX-XXXX-XXXX"
                  value={verifyKeyInput}
                  onChange={(e) => setVerifyKeyInput(e.target.value.toUpperCase())}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-slate-200 text-slate-900 font-mono text-xs focus:outline-none focus:border-[#4c8dff] tracking-wider"
                  required
                />
                <button
                  type="submit"
                  disabled={isVerifyingLicense || !verifyKeyInput.trim()}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#4c8dff] to-[#2f6bff] text-black text-xs font-black tracking-wider transition-transform hover:scale-105 disabled:opacity-50 cursor-pointer whitespace-nowrap shadow-[0_0_20px_rgba(0,229,255,0.3)]"
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
            <div className="p-8 rounded-2xl bg-white/80 border border-slate-200/70">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-slate-900">Mis Claves de Licencia</h3>
                <span className="text-xs font-mono text-[#4c8dff]">
                  {userLicenses.length} {userLicenses.length === 1 ? "Licencia" : "Licencias"}
                </span>
              </div>

              {licensesError && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold mb-4">
                  {licensesError}
                </div>
              )}

              {isLoadingLicenses ? (
                <div className="p-8 text-center text-xs font-mono text-slate-500">
                  <span className="inline-block w-4 h-4 border-2 border-[#4c8dff] border-t-transparent rounded-full animate-spin mr-2" />
                  Consultando licencias en Supabase...
                </div>
              ) : userLicenses.length === 0 ? (
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/70 text-center text-xs text-slate-500">
                  No registras licencias de software vinculadas a tu cuenta.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200/70 text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <th className="py-3 px-4">Clave</th>
                        <th className="py-3 px-4">Producto</th>
                        <th className="py-3 px-4">Activaciones</th>
                        <th className="py-3 px-4">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {userLicenses.map((lic) => (
                        <tr key={lic.id} className="hover:bg-slate-50">
                          <td className="py-3.5 px-4 font-mono text-[#4c8dff] font-bold select-all">
                            {lic.license_key}
                          </td>
                          <td className="py-3.5 px-4 text-slate-900">
                            <span className="font-bold uppercase">{lic.product_id}</span>
                            <span className="text-[10px] text-slate-500 font-mono ml-2 uppercase">({lic.tier})</span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-900 font-mono">
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
            <div className="p-8 rounded-2xl bg-white/80 border border-slate-200/70">
              <h3 className="text-lg font-black text-slate-900 mb-1">Credenciales & Autenticación</h3>
              <p className="text-xs text-slate-500 font-light mb-6">
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
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">Autenticación de Dos Factores (MFA TOTP)</span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            mfaFactorsCount && mfaFactorsCount > 0
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                              : "bg-white/[0.04] text-slate-400 border border-slate-200"
                          }`}
                        >
                          {mfaFactorsCount === null
                            ? "Verificando..."
                            : mfaFactorsCount > 0
                            ? `ACTIVO (${mfaFactorsCount}) ✓`
                            : "NO CONFIGURADO"}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-light mt-1 block">
                        Protege tu cuenta con Google Authenticator, 1Password o Authy mediante Supabase MFA.
                      </span>
                    </div>

                    {!enrollData && (
                      <button
                        onClick={handleStartEnroll}
                        disabled={isEnrolling}
                        className="px-4 py-2 rounded-xl bg-[#4c8dff]/10 hover:bg-[#4c8dff]/20 text-[#4c8dff] border border-[#4c8dff]/30 text-xs font-bold transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto disabled:opacity-50"
                      >
                        {isEnrolling ? "Iniciando..." : "+ Configurar Nuevo Factor TOTP"}
                      </button>
                    )}
                  </div>

                  {/* Formulario / QR de enrolamiento activo */}
                  {enrollData && (
                    <div className="mt-6 p-5 rounded-xl bg-black/40 border border-[#4c8dff]/30">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-black uppercase tracking-wider text-[#4c8dff]">
                          Vincular Aplicación de Autenticación
                        </h4>
                        <button
                          onClick={() => {
                            setEnrollData(null);
                            setVerifyCode("");
                          }}
                          className="text-xs text-slate-500 hover:text-slate-900"
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
                            <span className="text-[11px] text-slate-500 block mb-1">
                              Clave secreta manual (si no puedes escanear el QR):
                            </span>
                            <div className="p-2.5 rounded-lg bg-white/[0.04] border border-slate-200 font-mono text-xs text-[#4c8dff] break-all select-all">
                              {enrollData.secret}
                            </div>
                          </div>

                          <form onSubmit={handleVerifyEnroll} className="space-y-3">
                            <label className="text-[11px] text-slate-900 font-bold block">
                              Ingresa el código de 6 dígitos generado por tu app:
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                maxLength={6}
                                placeholder="000000"
                                value={verifyCode}
                                onChange={(e) => setVerifyCode(e.target.value)}
                                className="flex-1 px-3 py-2 rounded-xl bg-white/[0.05] border border-slate-200 text-slate-900 font-mono text-center tracking-widest text-lg focus:outline-none focus:border-[#4c8dff]"
                                required
                              />
                              <button
                                type="submit"
                                disabled={isVerifying || verifyCode.trim().length < 6}
                                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#4c8dff] to-[#2f6bff] text-black font-black text-xs transition-transform hover:scale-105 disabled:opacity-50 cursor-pointer"
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
                    <div className="mt-5 border-t border-slate-200/70 pt-4 space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-2">
                        Factores Verificados Activos
                      </span>
                      {factors.map((f) => (
                        <div
                          key={f.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200/70"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-base">📱</span>
                            <div>
                              <span className="text-xs font-bold text-slate-900 block">
                                {f.friendly_name || "Authenticator App"}
                              </span>
                              <span className="text-[10px] font-mono text-slate-500">
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

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Contraseña de Cuenta</span>
                    <span className="text-[11px] text-slate-500 font-light">
                      Protegida y cifrada en los servidores de autenticación central.
                    </span>
                    {passwordResetStatus && (
                      <span className="text-[11px] text-[#4c8dff] block mt-1">
                        {passwordResetStatus}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handlePasswordReset}
                    className="px-4 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-slate-200 text-xs font-bold text-slate-900 cursor-pointer self-start sm:self-auto"
                  >
                    Restablecer Contraseña
                  </button>
                </div>
              </div>
            </div>

            {/* Sesión Activa */}
            <div className="p-8 rounded-2xl bg-white/80 border border-slate-200/70">
              <h3 className="text-lg font-black text-slate-900 mb-4">Sesión Activa</h3>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🔐</span>
                  <div>
                    <span className="font-bold text-slate-900 block">Sesión Central Supabase</span>
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
