"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ProductShowcaseInteractive: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"cloud" | "access" | "play" | "cleaner">("cloud");

  return (
    <section className="relative z-10 max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 py-20 select-none">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-bold text-[#00E5FF] mb-3">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
          <span className="tracking-[0.2em] uppercase">EXPERIENCIA VISUAL & PRODUCT SHOWCASE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
          Diseñado para el mundo real.
        </h2>
        <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-2 max-w-xl mx-auto">
          Explorá las interfaces reales de nuestras plataformas insignia: almacenamiento en la nube, control de accesos corporativo, cloud gaming y diagnóstico de hardware.
        </p>

        {/* Tab Switcher */}
        <div className="mt-8 inline-flex flex-wrap justify-center items-center p-1.5 rounded-2xl bg-[#0B0B10] border border-white/[0.08] backdrop-blur-xl shadow-xl gap-1">
          <button
            onClick={() => setActiveTab("cloud")}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "cloud"
                ? "bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <span>☁️</span>
            <span>Moderno Cloud</span>
          </button>
          <button
            onClick={() => setActiveTab("access")}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "access"
                ? "bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <span>🛡️</span>
            <span>Moderno Access</span>
          </button>
          <button
            onClick={() => setActiveTab("play")}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "play"
                ? "bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <span>🎮</span>
            <span>Moderno Play</span>
          </button>
          <button
            onClick={() => setActiveTab("cleaner")}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "cleaner"
                ? "bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <span>⚡</span>
            <span>AI Cleaner Pro</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Mockup Container */}
      <div className="max-w-6xl mx-auto rounded-3xl bg-[#0B0B10]/95 border border-white/[0.08] shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden">
        {/* macOS Window Title Bar */}
        <div className="px-6 py-4 bg-[#050507] border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-4 text-[11px] font-mono text-white/40">
              {activeTab === "cloud" && "https://cloud.moderno.com.ar — Private Storage & Family Vault Hub"}
              {activeTab === "access" && "https://access.moderno.com.ar — Security & Access Control Mesh"}
              {activeTab === "play" && "https://play.moderno.com.ar — Cloud Gaming Console 60 FPS"}
              {activeTab === "cleaner" && "Moderno AI Cleaner Pro v2.4 (macOS Native Suite)"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="text-[10px] font-mono text-[#00E5FF] font-bold">LIVE TELEMETRY</span>
          </div>
        </div>

        {/* Tab Content Panes */}
        <div className="p-6 sm:p-10 min-h-[480px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {/* 1. MODERNO CLOUD SHOWCASE */}
            {activeTab === "cloud" && (
              <motion.div
                key="cloud"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.06]">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#00E5FF] font-bold mb-1">
                      <span>ALMACENAMIENTO PRIVADO & MULTI-DISPOSITIVO</span>
                      <span>&bull;</span>
                      <span className="text-emerald-400">Backups Automáticos Activos</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-sans">
                      Moderno Cloud Family & Pro
                    </h3>
                    <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-1 max-w-xl">
                      Almacenamiento privado, copias de seguridad y espacios familiares en una sola nube con aislamiento lógico multi-tenant y sincronización instantánea.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <a
                      href="https://cloud.moderno.com.ar/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider transition-transform hover:scale-105 shadow-[0_0_20px_rgba(0,229,255,0.4)] text-center"
                    >
                      Ver Moderno Cloud &rarr;
                    </a>
                    <a
                      href="/pricing?service=cloud"
                      className="px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-xs font-bold transition-all text-center"
                    >
                      Comparar Planes
                    </a>
                  </div>
                </div>

                {/* Cloud Vault & Storage Simulator */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08] flex flex-col justify-between h-44 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xl">📁</span>
                      <span className="text-[10px] font-mono text-emerald-400">SYNC OK</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">Bóveda Personal</h4>
                      <p className="text-[10px] text-[#94A3B8] font-light mt-0.5">Documentos, claves y fotos personales con cifrado AES-256.</p>
                    </div>
                    <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                      <div className="bg-[#00E5FF] h-full w-2/5 rounded-full" />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#050507] border border-[#00E5FF]/30 bg-gradient-to-b from-[#00E5FF]/5 to-transparent flex flex-col justify-between h-44 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xl">👨‍👩‍👧‍👦</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00E5FF]/20 text-[#00E5FF]">5 MIEMBROS</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">Espacio Familiar</h4>
                      <p className="text-[10px] text-[#94A3B8] font-light mt-0.5">Álbumes compartidos y archivos comunes sin mezclar datos privados.</p>
                    </div>
                    <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                      <div className="bg-[#157BFF] h-full w-3/5 rounded-full" />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08] flex flex-col justify-between h-44 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xl">📱</span>
                      <span className="text-[10px] font-mono text-[#00E5FF]">3 DISPOSITIVOS</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">Backups Continuos</h4>
                      <p className="text-[10px] text-[#94A3B8] font-light mt-0.5">Copia automática de iPhone, Mac, Windows y Android en segundo plano.</p>
                    </div>
                    <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-400 h-full w-1/4 rounded-full" />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08] flex flex-col justify-between h-44 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xl">🔐</span>
                      <span className="text-[10px] font-mono text-purple-400">MULTI-TENANT</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">Aislamiento RLS</h4>
                      <p className="text-[10px] text-[#94A3B8] font-light mt-0.5">Permisos independientes por usuario integrados al portal de cuenta central.</p>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#00E5FF]">
                      <span>CUOTA: 2 TB</span>
                      <span>&rarr;</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. MODERNO ACCESS SHOWCASE */}
            {activeTab === "access" && (
              <motion.div
                key="access"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.06]">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#3B82F6] font-bold mb-1">
                      <span>CONTROL DE ACCESOS Y EDIFICIOS</span>
                      <span>&bull;</span>
                      <span className="text-emerald-400">Multi-Hardware Support</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-sans">
                      Moderno Access Enterprise
                    </h3>
                    <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-1 max-w-xl">
                      Aislamiento lógico por consorcio, compatibilidad con torniquetes y molinetes Hikvision, Dahua, ZKTeco y PCT con cifrado AES-256.
                    </p>
                  </div>

                  <a
                    href="https://access.moderno.com.ar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#00E5FF] text-black text-xs font-black tracking-wider transition-transform hover:scale-105 shadow-[0_0_20px_rgba(59,130,246,0.4)] shrink-0 text-center"
                  >
                    Entrar a Moderno Access &rarr;
                  </a>
                </div>

                {/* Telemetry Access Nodes Stream */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <span className="text-[10px] text-white/40 font-mono block mb-1">NODO PRINCIPAL</span>
                    <h4 className="text-base font-bold text-white mb-3">Puerta Principal Torre A</h4>
                    <div className="space-y-2 text-xs text-[#94A3B8]">
                      <div className="flex justify-between">
                        <span>Lector RFID/NFC:</span>
                        <span className="text-emerald-400 font-mono">ONLINE</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Aperturas Hoy:</span>
                        <span className="text-white font-mono font-bold">1,248</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Latencia E2E:</span>
                        <span className="text-[#00E5FF] font-mono">8ms</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <span className="text-[10px] text-white/40 font-mono block mb-1">BARRERA VEHICULAR</span>
                    <h4 className="text-base font-bold text-white mb-3">Acceso Cocheras Subsuelo</h4>
                    <div className="space-y-2 text-xs text-[#94A3B8]">
                      <div className="flex justify-between">
                        <span>Cámara LPR Hikvision:</span>
                        <span className="text-emerald-400 font-mono">ACTIVA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Vehículos Registrados:</span>
                        <span className="text-white font-mono font-bold">342</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Modo Autónomo:</span>
                        <span className="text-emerald-400 font-mono">HABILITADO</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <span className="text-[10px] text-white/40 font-mono block mb-1">SEGURIDAD ESTRUCTURAL</span>
                    <h4 className="text-base font-bold text-white mb-3">Aislamiento Lógico & RLS</h4>
                    <div className="space-y-2 text-xs text-[#94A3B8]">
                      <div className="flex justify-between">
                        <span>Cifrado:</span>
                        <span className="text-white font-mono font-bold">AES-256 TLS 1.3</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Políticas:</span>
                        <span className="text-[#00E5FF] font-mono">Multi-Tenant RLS</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Auditoría de Logs:</span>
                        <span className="text-emerald-400 font-mono">IMMUTABLE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. MODERNO AI CLEANER PRO SHOWCASE */}
            {activeTab === "cleaner" && (
              <motion.div
                key="cleaner"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.06]">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#00C8FF] font-bold mb-1">
                      <span>MACOS SYSTEM INTELLIGENCE</span>
                      <span>&bull;</span>
                      <span className="text-emerald-400">Apple Silicon & Intel</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-sans">
                      Moderno AI Cleaner Pro
                    </h3>
                    <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-1 max-w-xl">
                      Planes de limpieza heurísticos basados en telemetría de hardware, modo developer y snapshots atómicos.
                    </p>
                  </div>

                  <a
                    href="/pricing"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider transition-transform hover:scale-105 shadow-[0_0_20px_rgba(0,229,255,0.4)] shrink-0 text-center"
                  >
                    Ver Planes & Licencias &rarr;
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">💡</div>
                    <h4 className="text-xs font-bold text-white mb-1">AI Optimizer & Doctor</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Telemetría predictiva de RAM y CPU en tiempo real.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">⚡</div>
                    <h4 className="text-xs font-bold text-white mb-1">Entorno Developer Pro</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Purga de DerivedData, node_modules, Rust y Gradle.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">🛡️</div>
                    <h4 className="text-xs font-bold text-white mb-1">Rollback Center Total</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Snapshots atómicos para revertir con 1 clic.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">🛑</div>
                    <h4 className="text-xs font-bold text-white mb-1">Desinstalador Completo</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Eliminación con mapeo de Containers y Caches.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
