"use client";

import React, { useState } from "react";
import { ModernoBackground } from "../../components/ModernoBackground";
import { ModernoNavbar } from "../../components/ModernoNavbar";
import { Footer } from "../../components/Footer";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"annual" | "lifetime">("annual");
  const [licenseKey, setLicenseKey] = useState("");
  const [activationStatus, setActivationStatus] = useState<string | null>(null);

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseKey.trim()) return;
    if (licenseKey.toUpperCase().startsWith("MODERNO-")) {
      setActivationStatus("valid");
    } else {
      setActivationStatus("invalid");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
      <ModernoBackground />
      <ModernoNavbar />

      <main className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 pt-32 sm:pt-36 pb-24 select-none">
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-bold text-[#00E5FF] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="tracking-[0.2em] uppercase">MODERNO AI CLEANER PRO // PLANES Y LICENCIAS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-sans leading-tight">
            Desbloqueá la máxima potencia <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00E5FF] via-[#157BFF] to-[#3B82F6]">
              para tu Mac.
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#94A3B8] font-light max-w-xl mx-auto leading-relaxed">
            Optimización heurística con IA, herramientas para developers, snapshots atómicos con rollback y desinstalador profundo.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                billingCycle === "annual"
                  ? "bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              Suscripción Anual (-40%)
            </button>
            <button
              onClick={() => setBillingCycle("lifetime")}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                billingCycle === "lifetime"
                  ? "bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              Licencia Lifetime (Pago Único)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20 items-stretch">
          {/* 1. Plan Gratuito */}
          <div className="p-8 rounded-2xl bg-[#0B0B10] border border-white/[0.07] flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
            <div>
              <span className="text-[10px] font-black text-white/40 tracking-widest uppercase block mb-1">
                USO BÁSICO
              </span>
              <h3 className="text-2xl font-black text-white mb-2">Edición Estándar</h3>
              <p className="text-xs text-[#94A3B8] font-light mb-6">
                Diagnóstico de hardware y limpieza básica de archivos temporales del sistema.
              </p>

              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">$0</span>
                <span className="text-xs text-[#94A3B8] font-mono">/ gratis para siempre</span>
              </div>

              <div className="space-y-3 text-xs text-[#94A3B8] font-light border-t border-white/[0.06] pt-6 mb-8">
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-400">✓</span>
                  <span>Limpieza rápida de memoria RAM</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-400">✓</span>
                  <span>Monitoreo de CPU, temperatura y disco</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-400">✓</span>
                  <span>Purga manual de archivos temporales</span>
                </div>
                <div className="flex items-center gap-2.5 text-white/30">
                  <span>✕</span>
                  <span className="line-through">AI Optimizer & Doctor heurístico</span>
                </div>
                <div className="flex items-center gap-2.5 text-white/30">
                  <span>✕</span>
                  <span className="line-through">Entorno Developer Pro</span>
                </div>
                <div className="flex items-center gap-2.5 text-white/30">
                  <span>✕</span>
                  <span className="line-through">Rollback Center & Snapshots</span>
                </div>
              </div>
            </div>

            <a
              href="https://cleaner.moderno.com.ar"
              className="w-full py-3 text-center rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-bold text-white transition-all cursor-pointer"
            >
              Descargar Versión Gratuita
            </a>
          </div>

          {/* 2. Plan Pro (Destacado) */}
          <div className="relative p-8 sm:p-9 rounded-2xl bg-[#0B0B10] border-2 border-[#00E5FF] shadow-[0_15px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(0,229,255,0.25)] flex flex-col justify-between scale-[1.02] transform transition-all">
            {/* Top Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-[10px] font-black tracking-widest uppercase shadow-md">
              MÁS POPULAR // RECOMENDADO
            </div>

            <div>
              <span className="text-[10px] font-black text-[#00E5FF] tracking-widest uppercase block mb-1">
                SUITE PROFESIONAL
              </span>
              <h3 className="text-2xl font-black text-white mb-2">Moderno AI Cleaner Pro</h3>
              <p className="text-xs text-[#94A3B8] font-light mb-6">
                Todas las herramientas avanzadas con inteligencia de hardware, modo developer y snapshots atómicos.
              </p>

              <div className="mb-6 flex items-baseline gap-1">
                {billingCycle === "annual" ? (
                  <>
                    <span className="text-4xl font-black text-white">$19.99</span>
                    <span className="text-xs text-[#94A3B8] font-mono">/ año (3 Macs)</span>
                  </>
                ) : (
                  <>
                    <span className="text-4xl font-black text-white">$49.99</span>
                    <span className="text-xs text-[#94A3B8] font-mono">/ de por vida (5 Macs)</span>
                  </>
                )}
              </div>

              <div className="space-y-3 text-xs text-white/90 font-medium border-t border-white/[0.08] pt-6 mb-8">
                <div className="flex items-center gap-2.5">
                  <span className="text-[#00E5FF] font-bold">✓</span>
                  <span><strong>AI Optimizer & Doctor:</strong> Limpieza heurística</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#00E5FF] font-bold">✓</span>
                  <span><strong>Entorno Developer Pro:</strong> DerivedData, node_modules, Rust, Gradle</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#00E5FF] font-bold">✓</span>
                  <span><strong>Rollback Center Total:</strong> Snapshots atómicos 1-clic</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#00E5FF] font-bold">✓</span>
                  <span><strong>Desinstalador Completo:</strong> Mapeo de Containers & Caches</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#00E5FF] font-bold">✓</span>
                  <span>Soporte prioritario 24/7 & Actualizaciones inmediatas</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#00E5FF] font-bold">✓</span>
                  <span>7 Días de Prueba Gratuita sin compromiso</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href="#checkout"
                className="w-full py-3.5 text-center rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-xs font-black text-black tracking-wider shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:scale-[1.02] transition-all inline-block cursor-pointer"
              >
                Comprar Licencia Pro
              </a>
              <a
                href="#trial"
                className="w-full py-2.5 text-center rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold text-white transition-all inline-block cursor-pointer"
              >
                Iniciar Prueba de 7 Días
              </a>
            </div>
          </div>

          {/* 3. Plan Empresas / Multi-Seat */}
          <div className="p-8 rounded-2xl bg-[#0B0B10] border border-white/[0.07] flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
            <div>
              <span className="text-[10px] font-black text-white/40 tracking-widest uppercase block mb-1">
                EQUIPOS & EMPRESAS
              </span>
              <h3 className="text-2xl font-black text-white mb-2">Moderno Team / Studio</h3>
              <p className="text-xs text-[#94A3B8] font-light mb-6">
                Para estudios creativos, agencias de software y flotas corporativas de macOS.
              </p>

              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">$89.99</span>
                <span className="text-xs text-[#94A3B8] font-mono">/ año (Hasta 15 Macs)</span>
              </div>

              <div className="space-y-3 text-xs text-[#94A3B8] font-light border-t border-white/[0.06] pt-6 mb-8">
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-400">✓</span>
                  <span>Todas las funciones Pro incluidas</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-400">✓</span>
                  <span>Panel central de administración de licencias</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-400">✓</span>
                  <span>Despliegue silencioso vía MDM / Jamf / Munki</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-400">✓</span>
                  <span>Facturación corporativa con IVA / Tax Invoice</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-400">✓</span>
                  <span>Account Manager dedicado</span>
                </div>
              </div>
            </div>

            <a
              href="mailto:contacto@moderno.com.ar?subject=Consulta%20Plan%20Team%20Cleaner%20Pro"
              className="w-full py-3 text-center rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-bold text-white transition-all cursor-pointer"
            >
              Contactar Ventas Corporativas
            </a>
          </div>
        </div>

        {/* License Activation Form Bar */}
        <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-[#0B0B10] border border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <span>🔑</span>
                <span>¿Ya tenés una clave de licencia?</span>
              </h3>
              <p className="text-xs text-[#94A3B8] font-light mt-0.5">
                Ingresá tu clave de activación recibida por email tras tu compra.
              </p>
            </div>
            <span className="text-[10px] font-mono text-white/40 uppercase">
              FORMATO: MODERNO-XXXX-XXXX-XXXX
            </span>
          </div>

          <form onSubmit={handleActivate} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={licenseKey}
              onChange={(e) => setLicenseKey(e.target.value.toUpperCase())}
              placeholder="MODERNO-XXXX-XXXX-XXXX"
              className="flex-1 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-white/20 font-mono text-xs focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] uppercase"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider transition-transform hover:scale-105 shadow-[0_0_15px_rgba(0,229,255,0.3)] cursor-pointer"
            >
              Activar Licencia
            </button>
          </form>

          {activationStatus === "valid" && (
            <p className="text-xs text-emerald-400 font-bold mt-3">
              ✓ Clave registrada correctamente. Abrí tu app Moderno AI Cleaner Pro para sincronizar la activación.
            </p>
          )}
          {activationStatus === "invalid" && (
            <p className="text-xs text-rose-400 font-medium mt-3">
              ✕ El formato de la clave no es válido. Debe iniciar con MODERNO- seguido de 12 caracteres alfanuméricos.
            </p>
          )}
        </div>

        {/* Feature Pillars Detailed Matrix */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-8">
            <span className="text-[10px] font-black text-[#00E5FF] tracking-widest uppercase">
              POTENCIA MÁXIMA PARA MACOS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              ¿Por qué elegir Moderno AI Cleaner Pro?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.06]">
              <div className="text-2xl mb-2">💡</div>
              <h4 className="text-sm font-black text-white mb-1">AI Optimizer & Doctor</h4>
              <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
                Planes de limpieza heurísticos que analizan la telemetría del procesador M-Series o Intel para evitar ralentizaciones.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.06]">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="text-sm font-black text-white mb-1">Entorno Developer Pro</h4>
              <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
                Limpieza inteligente de DerivedData en Xcode, gigabytes de node_modules huérfanos, builds de Rust y Gradle.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.06]">
              <div className="text-2xl mb-2">🛡️</div>
              <h4 className="text-sm font-black text-white mb-1">Rollback Center Total</h4>
              <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
                Snapshots atómicos del sistema antes de cada purga para garantizar restauración de cualquier archivo con un solo clic.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.06]">
              <div className="text-2xl mb-2">🛑</div>
              <h4 className="text-sm font-black text-white mb-1">Desinstalador Completo</h4>
              <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
                Eliminación profunda de apps rastreando todos sus Containers, Caches, Daemons y Application Support asociados.
              </p>
            </div>
          </div>
        </div>

        {/* Security & Guarantees */}
        <div className="max-w-3xl mx-auto text-center border-t border-white/[0.06] pt-10">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/50 font-light">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400">🔒</span> Cifrado de Pago 256-bit
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400">🛡️</span> Garantía de Reembolso por 30 Días
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400">⚡</span> Compatible con Apple Silicon & Intel
            </span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
