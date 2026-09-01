"use client";

import React, { useState, useEffect } from "react";
import { ModernoBackground } from "../../components/ModernoBackground";
import { ModernoNavbar } from "../../components/ModernoNavbar";
import { Footer } from "../../components/Footer";

type PricingCategory = "all" | "cloud" | "play" | "access" | "suite" | "cleaner";

export default function PricingPage() {
  const [activeCategory, setActiveCategory] = useState<PricingCategory>("all");
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual");
  const [licenseKey, setLicenseKey] = useState("");
  const [activationStatus, setActivationStatus] = useState<string | null>(null);

  // Read URL query params on load (e.g. ?service=cloud)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const service = params.get("service");
      if (service === "cloud") setActiveCategory("cloud");
      if (service === "play") setActiveCategory("play");
      if (service === "access") setActiveCategory("access");
      if (service === "suite") setActiveCategory("suite");
      if (service === "cleaner") setActiveCategory("cleaner");
    }
  }, []);

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
            <span className="tracking-[0.2em] uppercase">MODERNO TECH // PLANES Y PRECIOS CENTRALIZADOS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-sans leading-tight">
            Un ecosistema unificado. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00E5FF] via-[#157BFF] to-[#3B82F6]">
              Planes transparentes.
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#94A3B8] font-light max-w-2xl mx-auto leading-relaxed">
            Elegí un servicio individual o potenciá todo tu hogar y empresa con el bundle unificado de Moderno Tech.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-2">
            {[
              { id: "all", label: "✨ Todos los Planes" },
              { id: "cloud", label: "☁️ Moderno Cloud" },
              { id: "play", label: "🎮 Moderno Play" },
              { id: "suite", label: "📦 Moderno Suite Bundle" },
              { id: "access", label: "🛡️ Moderno Access" },
              { id: "cleaner", label: "⚡ AI Cleaner Pro" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as PricingCategory)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-white/[0.1] text-white border border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.25)]"
                    : "bg-white/[0.03] text-[#94A3B8] hover:text-white border border-white/[0.06]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Billing Cycle Toggle */}
          <div className="mt-6 inline-flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                billingCycle === "annual"
                  ? "bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              Facturación Anual (-20% Ahorro)
            </button>
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              Facturación Mensual
            </button>
          </div>
        </div>

        {/* 1. SECCIÓN: MODERNO SUITE BUNDLE (DESTACADO HEROIC) */}
        {(activeCategory === "all" || activeCategory === "suite") && (
          <div className="mb-16">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0B0B10] to-[#050507] border-2 border-purple-500/50 shadow-[0_20px_70px_rgba(139,92,246,0.2)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 blur-3xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-black uppercase tracking-wider mb-3 border border-purple-500/30">
                    ECOSISTEMA TODO EN UNO // MÁXIMO VALOR
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    Moderno Suite Bundle
                  </h2>
                  <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-2 leading-relaxed">
                    Unificá tu vida digital, seguridad física y productividad bajo una sola suscripción mensual y una cuenta central de Moderno Tech.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs">
                      <span className="text-purple-400 font-bold block">☁️ Cloud Family</span>
                      <span className="text-[10px] text-white/50">2 TB Almacenamiento</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs">
                      <span className="text-[#3B82F6] font-bold block">🛡️ Access Personal</span>
                      <span className="text-[10px] text-white/50">Credenciales Móviles</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs">
                      <span className="text-[#00E5FF] font-bold block">✨ Moderno AI</span>
                      <span className="text-[10px] text-white/50">Inferencia Prioritaria</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs">
                      <span className="text-emerald-400 font-bold block">⚡ Cleaner Pro</span>
                      <span className="text-[10px] text-white/50">3 Macs Incluidas</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#050507] border border-white/[0.1] w-full lg:w-80 shrink-0 text-center flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase">PRECIO UNIFICADO</span>
                    <div className="my-2 flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-black text-white">
                        {billingCycle === "annual" ? "$15.99" : "$19.99"}
                      </span>
                      <span className="text-xs text-[#94A3B8] font-mono">/ mes</span>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-medium block mb-4">
                      Ahorrás más del 45% respecto a planes separados
                    </span>
                  </div>

                  <a
                    href="/registro?plan=suite"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-[#00E5FF] text-black text-xs font-black tracking-wider shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:scale-[1.02] transition-all inline-block"
                  >
                    Contratar Moderno Suite &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. SECCIÓN: MODERNO CLOUD (ALMACENAMIENTO & FAMILIA) */}
        {(activeCategory === "all" || activeCategory === "cloud") && (
          <div className="mb-20">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl">☁️</span>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Planes Moderno Cloud
              </h2>
              <span className="text-xs text-[#00E5FF] font-mono ml-2">Almacenamiento Privado & Espacios Familiares</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {/* Cloud Individual */}
              <div className="p-8 rounded-2xl bg-[#0B0B10] border border-white/[0.08] flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                <div>
                  <span className="text-[10px] font-black text-white/40 tracking-widest uppercase block mb-1">
                    USO PERSONAL
                  </span>
                  <h3 className="text-2xl font-black text-white mb-2">Cloud Individual</h3>
                  <p className="text-xs text-[#94A3B8] font-light mb-6">
                    Bóveda privada para tus fotos, documentos y copias de seguridad de hasta 2 dispositivos.
                  </p>

                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">
                      {billingCycle === "annual" ? "$2.99" : "$3.99"}
                    </span>
                    <span className="text-xs text-[#94A3B8] font-mono">/ mes (200 GB)</span>
                  </div>

                  <div className="space-y-3 text-xs text-[#94A3B8] font-light border-t border-white/[0.06] pt-6 mb-8">
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>200 GB de almacenamiento seguro</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>Backups automáticos para Mac, PC, iOS y Android</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>Aislamiento lógico y cifrado AES-256</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-white/30">
                      <span>✕</span>
                      <span className="line-through">Espacios familiares compartidos</span>
                    </div>
                  </div>
                </div>

                <a
                  href="/registro?plan=cloud-individual"
                  className="w-full py-3 text-center rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold text-white transition-all"
                >
                  Elegir Individual
                </a>
              </div>

              {/* Cloud Family (Destacado) */}
              <div className="relative p-8 sm:p-9 rounded-2xl bg-[#0B0B10] border-2 border-[#00E5FF] shadow-[0_15px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(0,229,255,0.25)] flex flex-col justify-between scale-[1.02] transform transition-all">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-[10px] font-black tracking-widest uppercase shadow-md">
                  RECOMENDADO // HOGARES
                </div>

                <div>
                  <span className="text-[10px] font-black text-[#00E5FF] tracking-widest uppercase block mb-1">
                    ESPACIO COMPARTIDO
                  </span>
                  <h3 className="text-2xl font-black text-white mb-2">Cloud Family</h3>
                  <p className="text-xs text-[#94A3B8] font-light mb-6">
                    Hasta 5 cuentas familiares independientes con 2 TB de espacio total y bóvedas privadas por miembro.
                  </p>

                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">
                      {billingCycle === "annual" ? "$7.99" : "$9.99"}
                    </span>
                    <span className="text-xs text-[#94A3B8] font-mono">/ mes (2 TB / 5 Miembros)</span>
                  </div>

                  <div className="space-y-3 text-xs text-white/90 font-medium border-t border-white/[0.08] pt-6 mb-8">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#00E5FF] font-bold">✓</span>
                      <span><strong>2,000 GB (2 TB)</strong> compartidos entre 5 miembros</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#00E5FF] font-bold">✓</span>
                      <span>Bóvedas 100% privadas para cada integrante</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#00E5FF] font-bold">✓</span>
                      <span>Espacio común para álbumes familiares y documentos</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#00E5FF] font-bold">✓</span>
                      <span>Gestión de cuota desde el portal de cuenta central</span>
                    </div>
                  </div>
                </div>

                <a
                  href="/registro?plan=cloud-family"
                  className="w-full py-3.5 text-center rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:scale-[1.02] transition-all inline-block"
                >
                  Contratar Plan Family &rarr;
                </a>
              </div>

              {/* Cloud Pro Studio */}
              <div className="p-8 rounded-2xl bg-[#0B0B10] border border-white/[0.08] flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                <div>
                  <span className="text-[10px] font-black text-white/40 tracking-widest uppercase block mb-1">
                    POWER USERS & ESTUDIOS
                  </span>
                  <h3 className="text-2xl font-black text-white mb-2">Cloud Pro Studio</h3>
                  <p className="text-xs text-[#94A3B8] font-light mb-6">
                    Para fotógrafos, creadores de contenido 4K y flotas de trabajo pesado.
                  </p>

                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">
                      {billingCycle === "annual" ? "$15.99" : "$19.99"}
                    </span>
                    <span className="text-xs text-[#94A3B8] font-mono">/ mes (6 TB)</span>
                  </div>

                  <div className="space-y-3 text-xs text-[#94A3B8] font-light border-t border-white/[0.06] pt-6 mb-8">
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>6,000 GB (6 TB) de almacenamiento de alta velocidad</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>Historial de versiones de archivos ilimitado</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>Enlaces de descarga personalizados y con clave</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>Soporte prioritario y SLA de disponibilidad</span>
                    </div>
                  </div>
                </div>

                <a
                  href="/registro?plan=cloud-studio"
                  className="w-full py-3 text-center rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold text-white transition-all"
                >
                  Elegir Pro Studio
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 3. SECCIÓN: MODERNO PLAY (GAMING CLOUD: FREE VS VIP PASS) */}
        {(activeCategory === "all" || activeCategory === "play") && (
          <div className="mb-20">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl">🎮</span>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Planes Moderno Play
              </h2>
              <span className="text-xs text-[#00E5FF] font-mono ml-2">Gaming Cloud & Emuladores 60 FPS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-4xl mx-auto">
              {/* Play Free */}
              <div className="p-8 rounded-2xl bg-[#0B0B10] border border-white/[0.08] flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-white/40 tracking-widest uppercase">
                      INCLUIDO CON TU CUENTA
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                      TIER FREE
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">Play Free Pass</h3>
                  <p className="text-xs text-[#94A3B8] font-light mb-6">
                    Acceso instantáneo para cualquier usuario registrado en Moderno Tech al catálogo básico de juegos.
                  </p>

                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">$0</span>
                    <span className="text-xs text-[#94A3B8] font-mono">/ gratis para siempre</span>
                  </div>

                  <div className="space-y-3 text-xs text-[#94A3B8] font-light border-t border-white/[0.06] pt-6 mb-8">
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>Acceso a títulos seleccionados arcade y clásicos</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>Servidor de streaming en Buenos Aires</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>Soporte para gamepad USB y Bluetooth</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-white/30">
                      <span>✕</span>
                      <span className="line-through">Catálogo completo de 18,900+ títulos</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://play.moderno.com.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 text-center rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold text-white transition-all block"
                >
                  Jugar Gratis Ahora &rarr;
                </a>
              </div>

              {/* Play VIP Pass */}
              <div className="relative p-8 sm:p-9 rounded-2xl bg-[#0B0B10] border-2 border-[#00E5FF] shadow-[0_15px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(0,229,255,0.25)] flex flex-col justify-between">
                <div className="absolute -top-3.5 right-6 px-4 py-1 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-[10px] font-black tracking-widest uppercase shadow-md">
                  ACCESO COMPLETO
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-[#00E5FF] tracking-widest uppercase">
                      MEMBRESÍA GAMING VIP
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">Play VIP Pass</h3>
                  <p className="text-xs text-[#94A3B8] font-light mb-6">
                    Desbloqueo total de la biblioteca, calidad 4K 60 FPS, slots prioritarios y guardado ilimitado en la nube.
                  </p>

                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">
                      {billingCycle === "annual" ? "$3.99" : "$4.99"}
                    </span>
                    <span className="text-xs text-[#94A3B8] font-mono">/ mes</span>
                  </div>

                  <div className="space-y-3 text-xs text-white/90 font-medium border-t border-white/[0.08] pt-6 mb-8">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#00E5FF] font-bold">✓</span>
                      <span><strong>Más de 18,900 juegos</strong> sin restricciones</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#00E5FF] font-bold">✓</span>
                      <span>Streaming a 60 FPS en 1080p y 4K Ultra HD</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#00E5FF] font-bold">✓</span>
                      <span>Sincronización de partidas en Moderno Cloud</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#00E5FF] font-bold">✓</span>
                      <span>Acceso instantáneo sin colas de espera</span>
                    </div>
                  </div>
                </div>

                <a
                  href="/registro?plan=play-vip"
                  className="w-full py-3.5 text-center rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:scale-[1.02] transition-all inline-block"
                >
                  Contratar Play VIP &rarr;
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 4. SECCIÓN: MODERNO ACCESS (SEGURIDAD & CONSORCIOS) */}
        {(activeCategory === "all" || activeCategory === "access") && (
          <div className="mb-20">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl">🛡️</span>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Planes Moderno Access
              </h2>
              <span className="text-xs text-[#3B82F6] font-mono ml-2">Control de Acceso & Consorcios</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {/* Access Personal */}
              <div className="p-8 rounded-2xl bg-[#0B0B10] border border-white/[0.08] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black text-white/40 tracking-widest uppercase block mb-1">
                    RESIDENTES
                  </span>
                  <h3 className="text-2xl font-black text-white mb-2">Access Personal</h3>
                  <p className="text-xs text-[#94A3B8] font-light mb-6">
                    Apertura de puertas mediante NFC/Bluetooth y recepción de invitados con códigos temporales.
                  </p>

                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">$0</span>
                    <span className="text-xs text-[#94A3B8] font-mono">/ incluido en edificio adherido</span>
                  </div>

                  <div className="space-y-3 text-xs text-[#94A3B8] font-light border-t border-white/[0.06] pt-6 mb-8">
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>Credencial virtual cifrada para smartphone</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>Generación de pases QR para visitas</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>Historial personal de entradas</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://access.moderno.com.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 text-center rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold text-white transition-all"
                >
                  Entrar a Access
                </a>
              </div>

              {/* Access Consorcios Edificios */}
              <div className="p-8 rounded-2xl bg-[#0B0B10] border border-[#3B82F6]/40 flex flex-col justify-between shadow-[0_10px_30px_rgba(59,130,246,0.15)]">
                <div>
                  <span className="text-[10px] font-black text-[#3B82F6] tracking-widest uppercase block mb-1">
                    ADMINISTRACIONES DE CONSORCIO
                  </span>
                  <h3 className="text-2xl font-black text-white mb-2">Access Edificios</h3>
                  <p className="text-xs text-[#94A3B8] font-light mb-6">
                    Panel central para administradores: gestión de llaves RFID, altas/bajas inmediatas y compatibilidad hardware.
                  </p>

                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">
                      {billingCycle === "annual" ? "$39.00" : "$49.00"}
                    </span>
                    <span className="text-xs text-[#94A3B8] font-mono">/ mes por edificio</span>
                  </div>

                  <div className="space-y-3 text-xs text-[#94A3B8] font-light border-t border-white/[0.06] pt-6 mb-8">
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>Hasta 150 unidades funcionales</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>Soporte para Hikvision, Dahua, ZKTeco y PCT</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>Aislamiento multi-tenant por consorcio con RLS</span>
                    </div>
                  </div>
                </div>

                <a
                  href="mailto:contacto@moderno.com.ar?subject=Consulta%20Moderno%20Access%20Consorcios"
                  className="w-full py-3.5 text-center rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#00E5FF] text-black text-xs font-black tracking-wider transition-all"
                >
                  Cotizar para Edificio &rarr;
                </a>
              </div>

              {/* Access Corporativo */}
              <div className="p-8 rounded-2xl bg-[#0B0B10] border border-white/[0.08] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black text-white/40 tracking-widest uppercase block mb-1">
                    GRANDES EMPRESAS
                  </span>
                  <h3 className="text-2xl font-black text-white mb-2">Access Enterprise</h3>
                  <p className="text-xs text-[#94A3B8] font-light mb-6">
                    Multi-sede, torniquetes, molinetes y control de presentismo con auditoría centralizada.
                  </p>

                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">A Medida</span>
                  </div>

                  <div className="space-y-3 text-xs text-[#94A3B8] font-light border-t border-white/[0.06] pt-6 mb-8">
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>Sedes ilimitadas y miles de colaboradores</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>Integración con ERP Moderno One y Active Directory</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>SLA 99.99% y soporte telefónico 24/7</span>
                    </div>
                  </div>
                </div>

                <a
                  href="mailto:contacto@moderno.com.ar?subject=Consulta%20Access%20Enterprise"
                  className="w-full py-3 text-center rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold text-white transition-all"
                >
                  Contactar Ventas
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 5. SECCIÓN: MODERNO AI CLEANER PRO (PRODUCTIVIDAD MACOS) */}
        {(activeCategory === "all" || activeCategory === "cleaner") && (
          <div className="mb-20">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl">⚡</span>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Planes Moderno AI Cleaner Pro
              </h2>
              <span className="text-xs text-[#00C8FF] font-mono ml-2">Diagnóstico & Optimización macOS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-12">
              {/* Cleaner Free */}
              <div className="p-8 rounded-2xl bg-[#0B0B10] border border-white/[0.07] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black text-white/40 tracking-widest uppercase block mb-1">
                    USO BÁSICO
                  </span>
                  <h3 className="text-2xl font-black text-white mb-2">Edición Estándar</h3>
                  <p className="text-xs text-[#94A3B8] font-light mb-6">
                    Diagnóstico de hardware y limpieza básica de memoria RAM.
                  </p>
                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">$0</span>
                    <span className="text-xs text-[#94A3B8] font-mono">/ gratis</span>
                  </div>
                  <div className="space-y-3 text-xs text-[#94A3B8] font-light border-t border-white/[0.06] pt-6 mb-8">
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>Limpieza rápida de RAM y CPU</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>Monitoreo de temperatura en tiempo real</span>
                    </div>
                  </div>
                </div>
                <a
                  href="https://cleaner.moderno.com.ar"
                  className="w-full py-3 text-center rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold text-white transition-all"
                >
                  Descargar Gratis
                </a>
              </div>

              {/* Cleaner Pro Lifetime */}
              <div className="p-8 rounded-2xl bg-[#0B0B10] border border-[#00E5FF]/40 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,229,255,0.2)]">
                <div>
                  <span className="text-[10px] font-black text-[#00E5FF] tracking-widest uppercase block mb-1">
                    PRO LIFETIME // PAGO ÚNICO
                  </span>
                  <h3 className="text-2xl font-black text-white mb-2">Cleaner Pro</h3>
                  <p className="text-xs text-[#94A3B8] font-light mb-6">
                    AI Optimizer, modo developer (Xcode/node_modules) y snapshots con rollback.
                  </p>
                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">$49.99</span>
                    <span className="text-xs text-[#94A3B8] font-mono">/ de por vida (5 Macs)</span>
                  </div>
                  <div className="space-y-3 text-xs text-[#94A3B8] font-light border-t border-white/[0.06] pt-6 mb-8">
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>AI Optimizer heurístico</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>Snapshots atómicos y desinstalador profundo</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>Actualizaciones continuas</span>
                    </div>
                  </div>
                </div>
                <a
                  href="/registro?plan=cleaner-pro"
                  className="w-full py-3.5 text-center rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider transition-all"
                >
                  Comprar Licencia Pro &rarr;
                </a>
              </div>

              {/* Cleaner Studio */}
              <div className="p-8 rounded-2xl bg-[#0B0B10] border border-white/[0.07] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black text-white/40 tracking-widest uppercase block mb-1">
                    ESTUDIOS & AGENCIAS
                  </span>
                  <h3 className="text-2xl font-black text-white mb-2">Team Studio</h3>
                  <p className="text-xs text-[#94A3B8] font-light mb-6">
                    Para equipos de desarrollo con hasta 15 Macs y despliegue MDM.
                  </p>
                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">$89.99</span>
                    <span className="text-xs text-[#94A3B8] font-mono">/ año</span>
                  </div>
                  <div className="space-y-3 text-xs text-[#94A3B8] font-light border-t border-white/[0.06] pt-6 mb-8">
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>Panel central de licencias</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-emerald-400">✓</span>
                      <span>Despliegue Jamf / Munki</span>
                    </div>
                  </div>
                </div>
                <a
                  href="mailto:contacto@moderno.com.ar?subject=Consulta%20Cleaner%20Team"
                  className="w-full py-3 text-center rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold text-white transition-all"
                >
                  Consultar
                </a>
              </div>
            </div>

            {/* Formulario de Activación de Clave */}
            <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-[#0B0B10] border border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <span>🔑</span>
                    <span>¿Ya compraste una licencia de Cleaner Pro?</span>
                  </h3>
                  <p className="text-xs text-[#94A3B8] font-light mt-0.5">
                    Ingresá tu clave de activación recibida por email para vincularla a tu cuenta.
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
          </div>
        )}

        {/* Security Guarantees */}
        <div className="max-w-3xl mx-auto text-center border-t border-white/[0.06] pt-10">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/50 font-light">
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400">🔒</span> Pagos Seguros con Cifrado TLS 1.3
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400">🛡️</span> Garantía de Reembolso por 30 Días
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-400">⚡</span> Facturación Centralizada Unificada
            </span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
