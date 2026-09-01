"use client";

import React, { useState } from "react";
import { ModernoBackground } from "../../components/ModernoBackground";
import { ModernoNavbar } from "../../components/ModernoNavbar";
import { Footer } from "../../components/Footer";
import { useModernoAuth } from "../../hooks/useModernoAuth";

export default function CuentaPage() {
  const [activeTab, setActiveTab] = useState<"services" | "billing" | "security">("services");
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const { user, isAuthenticated, signOut } = useModernoAuth();

  const userName = user?.name || "Juan Pérez";
  const userEmail = user?.email || "juan@moderno.com.ar";
  const userInitials = userName.slice(0, 2).toUpperCase();

  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
      <ModernoBackground />
      <ModernoNavbar />

      <main className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 pt-32 sm:pt-36 pb-24 select-none">
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
                  MODERNO ID SUPABASE ACTIVO
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] font-mono">{userEmail} &bull; ID: MOD-8849-2026</p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] text-white/50 mt-2">
                <span>Ecosistema: <strong className="text-white">8 Productos Conectados</strong></span>
                <span>&bull;</span>
                <span>Membresías Pagas: <strong className="text-[#00E5FF]">2 Activas</strong></span>
                <span>&bull;</span>
                <span>Capas Gratuitas: <strong className="text-emerald-400">6 Habilitadas</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={signOut}
                className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold text-white transition-all cursor-pointer"
              >
                Cerrar Sesión
              </button>
            ) : (
              <a
                href="/login"
                className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold text-white transition-all"
              >
                Iniciar Sesión
              </a>
            )}
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
                Tu registro en Moderno Tech te habilita acceso inmediato a las capas gratuitas de todos los productos. Las membresías pagas desbloquean catálogos VIP, más almacenamiento y potencia dedicada.
              </p>
            </div>
          </div>
          <a
            href="/pricing?service=suite"
            className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 text-xs font-bold text-white whitespace-nowrap text-center transition-all"
          >
            Ver Moderno Suite (Todo en Uno) &rarr;
          </a>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("services")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "services"
                ? "bg-white/[0.08] text-white border border-[#00E5FF]/40 shadow-sm"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <span>✨</span>
            <span>Servicios & Derechos de Acceso</span>
          </button>
          <button
            onClick={() => setActiveTab("billing")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "billing"
                ? "bg-white/[0.08] text-white border border-[#00E5FF]/40 shadow-sm"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <span>💳</span>
            <span>Facturación Centralizada</span>
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "security"
                ? "bg-white/[0.08] text-white border border-[#00E5FF]/40 shadow-sm"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <span>🛡️</span>
            <span>Seguridad & Sesiones Globales</span>
          </button>
        </div>

        {/* Tab 1: Mis Servicios y Entitlements */}
        {activeTab === "services" && (
          <div className="space-y-8">
            {/* Grid 1: Membresías Pagas Activas */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-black text-white/50 tracking-widest uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00E5FF]" />
                  <span>Membresías & Planes Contratados</span>
                </h2>
                <span className="text-[11px] text-[#00E5FF] font-mono">1 Suscripción Activa</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Moderno Cloud - Plan Family Activo */}
                <div className="p-7 rounded-2xl bg-[#0B0B10] border border-[#00E5FF]/40 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/10 blur-2xl pointer-events-none" />
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20 flex items-center justify-center font-bold text-lg">
                          ☁️
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-white">Moderno Cloud</h3>
                          <span className="text-[10px] font-mono text-[#00E5FF]">cloud.moderno.com.ar</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#00E5FF]/15 text-[#00E5FF] text-[10px] font-black border border-[#00E5FF]/40">
                        PLAN FAMILY (2 TB)
                      </span>
                    </div>

                    <p className="text-xs text-[#94A3B8] font-light mb-5">
                      Almacenamiento privado, copias de seguridad de dispositivos y espacio familiar compartido con aislamiento lógico.
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-xs font-mono text-white/70">
                        <span>Uso de Almacenamiento:</span>
                        <span className="text-white font-bold">842 GB / 2,000 GB (42%)</span>
                      </div>
                      <div className="w-full bg-white/[0.06] rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-[#00E5FF] to-[#157BFF] h-full w-[42%] rounded-full" />
                      </div>
                      <div className="flex justify-between text-[11px] text-[#94A3B8] pt-1">
                        <span>4 Miembros en Familia</span>
                        <span className="text-emerald-400 font-mono">3 Backups Activos</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                    <a
                      href="https://cloud.moderno.com.ar/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 text-center rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider transition-transform hover:scale-[1.02] shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                    >
                      Abrir Moderno Cloud &rarr;
                    </a>
                    <a
                      href="/pricing?service=cloud"
                      className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold text-white transition-all text-center"
                    >
                      Gestionar Plan
                    </a>
                  </div>
                </div>

                {/* Moderno Access - Plan Consorcio Activo */}
                <div className="p-7 rounded-2xl bg-[#0B0B10] border border-[#3B82F6]/40 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/10 blur-2xl pointer-events-none" />
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20 flex items-center justify-center font-bold text-lg">
                          🛡️
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-white">Moderno Access</h3>
                          <span className="text-[10px] font-mono text-[#3B82F6]">access.moderno.com.ar</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#3B82F6]/15 text-[#3B82F6] text-[10px] font-black border border-[#3B82F6]/40">
                        ADMINISTRADOR CONSORCIO
                      </span>
                    </div>

                    <p className="text-xs text-[#94A3B8] font-light mb-5">
                      Control de accesos con credenciales seguras, registro en tiempo real de entradas y compatibilidad con lectores RFID/Hikvision.
                    </p>

                    <div className="space-y-3 mb-6 text-xs text-[#94A3B8]">
                      <div className="flex justify-between pb-2 border-b border-white/[0.04]">
                        <span>Consorcio Asignado:</span>
                        <span className="text-white font-bold">Torre Libertador 4200</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-white/[0.04]">
                        <span>Rol en Edificio:</span>
                        <span className="text-emerald-400 font-bold">Administrador General</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Nodos Conectados:</span>
                        <span className="text-[#00E5FF] font-mono">Puerta Principal + Cocheras</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                    <a
                      href="https://access.moderno.com.ar/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 text-center rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#00E5FF] text-black text-xs font-black tracking-wider transition-transform hover:scale-[1.02] shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    >
                      Abrir Moderno Access &rarr;
                    </a>
                    <a
                      href="https://access.moderno.com.ar/dashboard"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold text-white transition-all text-center"
                    >
                      Panel Edificio
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid 2: Productos con Acceso Gratuito Activo (Freemium Universal) */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-black text-white/50 tracking-widest uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Productos con Capa Gratuita Habilitada (Freemium Ecosistema)</span>
                </h2>
                <span className="text-[11px] text-emerald-400 font-mono">Disponibles con tu Moderno ID</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Moderno Play - Plan Free */}
                <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.08] flex flex-col justify-between hover:border-white/20 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl">🎮</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        PLAN GRATUITO ACTIVO
                      </span>
                    </div>
                    <h3 className="text-base font-black text-white mb-1">Moderno Play</h3>
                    <p className="text-xs text-[#94A3B8] font-light mb-4">
                      Acceso al catálogo de juegos gratuitos y emuladores arcade sin costo.
                    </p>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] mb-4 text-[11px] text-white/70">
                      <span>Catálogo Gratuito: <strong>Habilitado ✓</strong></span> <br />
                      <span className="text-white/40">Títulos VIP & 60 FPS: Requiere Membresía</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <a
                      href="https://play.moderno.com.ar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 text-center rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-bold text-white transition-all block"
                    >
                      Jugar Juegos Gratis &rarr;
                    </a>
                    <a
                      href="/pricing?service=play"
                      className="w-full py-2 text-center rounded-xl bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/30 text-xs font-bold text-[#00E5FF] transition-all block"
                    >
                      Desbloquear Play VIP
                    </a>
                  </div>
                </div>

                {/* Moderno AI - Tier Free */}
                <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.08] flex flex-col justify-between hover:border-white/20 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl">✨</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        TIER FREE (50 REQ/DÍA)
                      </span>
                    </div>
                    <h3 className="text-base font-black text-white mb-1">Moderno AI</h3>
                    <p className="text-xs text-[#94A3B8] font-light mb-4">
                      Inferencia y consultas de lenguaje con cuota gratuita diaria.
                    </p>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] mb-4 text-[11px] text-white/70">
                      <span>Cuota Diaria: <strong>38 / 50 disponibles</strong></span> <br />
                      <span className="text-white/40">Modelos Pro Ilimitados: Membresía AI</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <a
                      href="https://ai.moderno.com.ar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 text-center rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-bold text-white transition-all block"
                    >
                      Usar Moderno AI &rarr;
                    </a>
                    <a
                      href="/pricing"
                      className="w-full py-2 text-center rounded-xl bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/30 text-xs font-bold text-[#00E5FF] transition-all block"
                    >
                      Mejorar a AI Pro
                    </a>
                  </div>
                </div>

                {/* Moderno AI Cleaner Pro - Edición Estándar Free */}
                <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.08] flex flex-col justify-between hover:border-white/20 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl">⚡</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        VERSIÓN ESTÁNDAR
                      </span>
                    </div>
                    <h3 className="text-base font-black text-white mb-1">AI Cleaner Pro (macOS)</h3>
                    <p className="text-xs text-[#94A3B8] font-light mb-4">
                      Diagnóstico de hardware y monitoreo de memoria para Mac.
                    </p>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] mb-4 text-[11px] text-white/70">
                      <span>Limpieza Básica: <strong>Habilitada ✓</strong></span> <br />
                      <span className="text-white/40">AI Optimizer & Snapshots: Licencia Pro</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <a
                      href="https://cleaner.moderno.com.ar"
                      className="w-full py-2.5 text-center rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-bold text-white transition-all block"
                    >
                      Descargar Gratis &rarr;
                    </a>
                    <a
                      href="/pricing?service=cleaner"
                      className="w-full py-2 text-center rounded-xl bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/30 text-xs font-bold text-[#00E5FF] transition-all block"
                    >
                      Comprar Licencia Pro
                    </a>
                  </div>
                </div>

                {/* Cinema Studio AI - Tier Free */}
                <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.08] flex flex-col justify-between hover:border-white/20 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl">🎬</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        TIER FREE HABILITADO
                      </span>
                    </div>
                    <h3 className="text-base font-black text-white mb-1">Cinema Studio AI</h3>
                    <p className="text-xs text-[#94A3B8] font-light mb-4">
                      Generación de escenas cinemáticas, storyboards y renderizado asistido.
                    </p>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] mb-4 text-[11px] text-white/70">
                      <span>Renderizado 1080p: <strong>Habilitado ✓</strong></span> <br />
                      <span className="text-white/40">Render 4K Ultra & Veo: Requiere Pro</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <a
                      href="https://cinema.moderno.com.ar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 text-center rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-bold text-white transition-all block"
                    >
                      Abrir Cinema Studio &rarr;
                    </a>
                    <a
                      href="/pricing"
                      className="w-full py-2 text-center rounded-xl bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/30 text-xs font-bold text-[#00E5FF] transition-all block"
                    >
                      Ver Planes Cinema Pro
                    </a>
                  </div>
                </div>

                {/* Mercatto - Tier Free */}
                <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.08] flex flex-col justify-between hover:border-white/20 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl">🛍️</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        CUENTA CLIENTE ACTIVA
                      </span>
                    </div>
                    <h3 className="text-base font-black text-white mb-1">Mercatto</h3>
                    <p className="text-xs text-[#94A3B8] font-light mb-4">
                      Marketplace digital y compras inteligentes con checkout en 1 clic.
                    </p>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] mb-4 text-[11px] text-white/70">
                      <span>Checkout Global: <strong>Habilitado ✓</strong></span> <br />
                      <span className="text-white/40">Tienda Vendedora Pro: Plan Mercatto Seller</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <a
                      href="https://mercatto.moderno.com.ar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 text-center rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-bold text-white transition-all block"
                    >
                      Entrar a Mercatto &rarr;
                    </a>
                    <a
                      href="/pricing"
                      className="w-full py-2 text-center rounded-xl bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/30 text-xs font-bold text-[#00E5FF] transition-all block"
                    >
                      Abrir Tienda Mercatto
                    </a>
                  </div>
                </div>

                {/* Moderno Weather - Tier Free */}
                <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.08] flex flex-col justify-between hover:border-white/20 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl">🌤️</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        ACCESO ABIERTO
                      </span>
                    </div>
                    <h3 className="text-base font-black text-white mb-1">Moderno Weather</h3>
                    <p className="text-xs text-[#94A3B8] font-light mb-4">
                      Radar Doppler satelital y alertas climáticas hiperlocales en tiempo real.
                    </p>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] mb-4 text-[11px] text-white/70">
                      <span>Radar Doppler: <strong>Habilitado ✓</strong></span> <br />
                      <span className="text-white/40">Telemetría IoT de precisión: Sensor Mesh</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <a
                      href="https://weather.moderno.com.ar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 text-center rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-bold text-white transition-all block"
                    >
                      Ver Radar Doppler &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Facturación */}
        {activeTab === "billing" && (
          <div className="space-y-6 max-w-4xl">
            <div className="p-8 rounded-2xl bg-[#0B0B10] border border-white/[0.08]">
              <h3 className="text-lg font-black text-white mb-1">Método de Pago Predeterminado</h3>
              <p className="text-xs text-[#94A3B8] font-light mb-6">
                Todas las suscripciones de Moderno Cloud, Access y Cleaner se unifican bajo una sola facturación central.
              </p>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 rounded bg-white/[0.08] border border-white/10 flex items-center justify-center font-bold text-xs">
                    💳 VISA
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Visa terminada en 4819</span>
                    <span className="text-[10px] text-white/40 font-mono">Vence 09/2028</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                  PRINCIPAL
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold text-white transition-all cursor-pointer">
                  Cambiar Tarjeta
                </button>
                <a
                  href="/pricing"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider transition-transform hover:scale-105"
                >
                  Ver Planes Disponibles
                </a>
              </div>
            </div>

            {/* Facturas Recientes */}
            <div className="p-8 rounded-2xl bg-[#0B0B10] border border-white/[0.08]">
              <h3 className="text-lg font-black text-white mb-4">Historial de Facturas & Recibos</h3>
              <div className="space-y-3">
                {[
                  { date: "01/08/2026", concept: "Moderno Cloud Family (2 TB)", amount: "$9.99 USD", id: "INV-2026-081" },
                  { date: "01/07/2026", concept: "Moderno Cloud Family (2 TB)", amount: "$9.99 USD", id: "INV-2026-071" },
                  { date: "15/06/2026", concept: "Moderno AI Cleaner Pro (Lifetime)", amount: "$49.99 USD", id: "INV-2026-062" },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white block">{item.concept}</span>
                      <span className="text-[10px] font-mono text-white/40">{item.date} &bull; {item.id}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono font-bold text-white">{item.amount}</span>
                      <button className="px-3 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] font-bold text-[#00E5FF] cursor-pointer">
                        Descargar PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Seguridad */}
        {activeTab === "security" && (
          <div className="space-y-6 max-w-4xl">
            <div className="p-8 rounded-2xl bg-[#0B0B10] border border-white/[0.08]">
              <h3 className="text-lg font-black text-white mb-1">Autenticación & Acceso Central</h3>
              <p className="text-xs text-[#94A3B8] font-light mb-6">
                Tu identidad en Moderno Tech protege el acceso a Cloud, Access, AI, One y tus pagos.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Autenticación de Dos Factores (MFA)</span>
                    <span className="text-[11px] text-[#94A3B8] font-light">Código TOTP desde Google Authenticator o 1Password</span>
                  </div>
                  <button
                    onClick={() => setMfaEnabled(!mfaEnabled)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      mfaEnabled
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : "bg-white/[0.04] text-white/50 border border-white/10"
                    }`}
                  >
                    {mfaEnabled ? "ACTIVADO ✓" : "DESACTIVADO"}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Contraseña Global</span>
                    <span className="text-[11px] text-[#94A3B8] font-light">Actualizada hace 42 días</span>
                  </div>
                  <button className="px-4 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold text-white cursor-pointer">
                    Cambiar Contraseña
                  </button>
                </div>
              </div>
            </div>

            {/* Sesiones Activas */}
            <div className="p-8 rounded-2xl bg-[#0B0B10] border border-white/[0.08]">
              <h3 className="text-lg font-black text-white mb-4">Sesiones Activas en el Ecosistema</h3>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">💻</span>
                    <div>
                      <span className="font-bold text-white block">MacBook Pro 16" (macOS Tahoe)</span>
                      <span className="text-[10px] font-mono text-emerald-400">Esta sesión &bull; Buenos Aires, Argentina</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400">ACTIVA AHORA</span>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📱</span>
                    <div>
                      <span className="font-bold text-white block">iPhone 16 Pro (iOS 19)</span>
                      <span className="text-[10px] font-mono text-white/40">Moderno Cloud Sync &bull; Hace 12 minutos</span>
                    </div>
                  </div>
                  <button className="text-[11px] text-rose-400 hover:underline cursor-pointer">
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
