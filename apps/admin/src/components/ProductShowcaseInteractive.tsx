"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ProductShowcaseInteractive: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"access" | "cloud" | "play" | "cinema" | "mercatto" | "cleaner">("access");

  return (
    <section className="relative z-10 max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 py-20 select-none">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-bold text-[#00E5FF] mb-3">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
          <span className="tracking-[0.2em] uppercase">DEMOSTRACIÓN INTERACTIVA & PLATAFORMAS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
          Diseñado para el mundo real.
        </h2>
        <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-2 max-w-xl mx-auto">
          Explorá las interfaces y capacidades de nuestras plataformas: control de accesos, almacenamiento privado, cloud gaming, IA audiovisual, comercio electrónico y diagnóstico.
        </p>

        {/* Tab Switcher */}
        <div className="mt-8 inline-flex flex-wrap justify-center items-center p-1.5 rounded-2xl bg-[#0B0B10] border border-white/[0.08] backdrop-blur-xl shadow-xl gap-1">
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
            onClick={() => setActiveTab("cinema")}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "cinema"
                ? "bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <span>🎬</span>
            <span>Cinema Studio</span>
          </button>
          <button
            onClick={() => setActiveTab("mercatto")}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "mercatto"
                ? "bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <span>🛍️</span>
            <span>Mercatto</span>
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
              {activeTab === "access" && "https://access.moderno.com.ar — Control de Acceso & Consorcios"}
              {activeTab === "cloud" && "https://cloud.moderno.com.ar — Almacenamiento & Bóveda Familiar"}
              {activeTab === "play" && "https://play.moderno.com.ar — Moderno Play Cloud Gaming"}
              {activeTab === "cinema" && "https://cinema.moderno.com.ar — Cinema Studio AI Suite"}
              {activeTab === "mercatto" && "https://mercatto.moderno.com.ar — Mercatto Comercio Digital"}
              {activeTab === "cleaner" && "Moderno AI Cleaner Pro (macOS Native Suite)"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="text-[10px] font-mono text-[#00E5FF] font-bold">ECOSISTEMA CONECTADO</span>
          </div>
        </div>

        {/* Tab Content Panes */}
        <div className="p-6 sm:p-10 min-h-[480px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {/* 1. MODERNO ACCESS SHOWCASE */}
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
                      <span>SEGURIDAD EDILICIA & CONSORCIOS</span>
                      <span>&bull;</span>
                      <span className="text-emerald-400">Hardware Compatible Conectado</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-sans">
                      Moderno Access Enterprise
                    </h3>
                    <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-1 max-w-xl">
                      Control de acceso para consorcios y edificios corporativos con hardware estándar (Hikvision, Dahua, ZKTeco), invitaciones por WhatsApp y auditoría en tiempo real.
                    </p>
                  </div>

                  <a
                    href="https://access.moderno.com.ar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#00E5FF] text-black text-xs font-black tracking-wider transition-transform hover:scale-105 shadow-[0_0_20px_rgba(59,130,246,0.4)] shrink-0 text-center"
                  >
                    Abrir Moderno Access &rarr;
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">🏢</div>
                    <h4 className="text-xs font-bold text-white mb-1">Gestión de Consorcios</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Múltiples unidades funcionales, propietarios y cocheras en un solo panel.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">📲</div>
                    <h4 className="text-xs font-bold text-white mb-1">Invitaciones QR Dinámicas</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Pases temporales enviados por WhatsApp con caducidad programada.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">📹</div>
                    <h4 className="text-xs font-bold text-white mb-1">Compatibilidad Multi-Hardware</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Conexión con molinetes, cerraduras biométricas y lectores RFID estándar.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">📊</div>
                    <h4 className="text-xs font-bold text-white mb-1">Auditoría en Tiempo Real</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Registro de ingresos y egresos con aislamiento y trazabilidad por cuenta.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. MODERNO CLOUD SHOWCASE */}
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
                      <span className="text-emerald-400">Copias de Seguridad Activas</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-sans">
                      Moderno Cloud Family & Pro
                    </h3>
                    <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-1 max-w-xl">
                      Almacenamiento privado, copias de seguridad continuas y espacios familiares con aislamiento lógico multi-tenant y sincronización rápida.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <a
                      href="https://cloud.moderno.com.ar/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider transition-transform hover:scale-105 shadow-[0_0_20px_rgba(0,229,255,0.4)] text-center"
                    >
                      Abrir Moderno Cloud &rarr;
                    </a>
                    <a
                      href="/pricing?service=cloud"
                      className="px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-xs font-bold transition-all text-center"
                    >
                      Ver Planes
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08] flex flex-col justify-between h-44 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xl">📁</span>
                      <span className="text-[10px] font-mono text-emerald-400">SYNC ACTIVO</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">Bóveda Personal</h4>
                      <p className="text-[10px] text-[#94A3B8] font-light mt-0.5">Documentos y archivos personales protegidos con cifrado seguro.</p>
                    </div>
                    <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                      <div className="bg-[#00E5FF] h-full w-2/5 rounded-full" />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#050507] border border-[#00E5FF]/30 bg-gradient-to-b from-[#00E5FF]/5 to-transparent flex flex-col justify-between h-44 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xl">👨‍👩‍👧‍👦</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00E5FF]/20 text-[#00E5FF]">ESPACIO FAMILIAR</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">Carpetas Compartidas</h4>
                      <p className="text-[10px] text-[#94A3B8] font-light mt-0.5">Espacio compartido con carpetas privadas y aisladas para cada miembro.</p>
                    </div>
                    <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#00E5FF] to-[#157BFF] h-full w-4/5 rounded-full" />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08] flex flex-col justify-between h-44 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xl">📱</span>
                      <span className="text-[10px] font-mono text-white/40">Multi-Dispositivo</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">Copia Móvil Continua</h4>
                      <p className="text-[10px] text-[#94A3B8] font-light mt-0.5">Sincronización de fotos y archivos en segundo plano con tu almacenamiento.</p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400">Sincronización al día</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08] flex flex-col justify-between h-44 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xl">🔐</span>
                      <span className="text-[10px] font-mono text-purple-400">AES-256</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">Bóveda Cifrada</h4>
                      <p className="text-[10px] text-[#94A3B8] font-light mt-0.5">Cifrado de datos en reposo y tránsito con políticas de acceso estricto.</p>
                    </div>
                    <span className="text-[10px] font-mono text-white/50">Aislamiento por Fila (RLS)</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. MODERNO PLAY SHOWCASE */}
            {activeTab === "play" && (
              <motion.div
                key="play"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.06]">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#00E5FF] font-bold mb-1">
                      <span>CLOUD GAMING & EMULACIÓN ARCADE</span>
                      <span>&bull;</span>
                      <span className="text-emerald-400">Servidores Locales</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-sans">
                      Moderno Play Gaming Console
                    </h3>
                    <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-1 max-w-xl">
                      Catálogo de títulos retro, emuladores directos en el navegador y streaming a 60 FPS optimizado para baja latencia.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <a
                      href="https://play.moderno.com.ar/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider transition-transform hover:scale-105 shadow-[0_0_20px_rgba(0,229,255,0.4)] text-center"
                    >
                      Abrir Moderno Play &rarr;
                    </a>
                    <a
                      href="/pricing?service=play"
                      className="px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-xs font-bold transition-all text-center"
                    >
                      Ver Planes
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">🕹️</div>
                    <h4 className="text-xs font-bold text-white mb-1">Emulación en Navegador</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Juegos arcade y retro clásicos accesibles sin descargas con tu Moderno ID.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">⚡</div>
                    <h4 className="text-xs font-bold text-white mb-1">Transmisión 60 FPS</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Infraestructura con servidores de proximidad para respuesta fluida y continua.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">🎮</div>
                    <h4 className="text-xs font-bold text-white mb-1">Soporte de Mandos</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Compatible con mandos USB y Bluetooth (PlayStation, Xbox, controles estándar).
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">💾</div>
                    <h4 className="text-xs font-bold text-white mb-1">Sincronización Cloud</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Guardado de estados y partidas sincronizado con tu cuenta de Moderno.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4. CINEMA STUDIO AI SHOWCASE */}
            {activeTab === "cinema" && (
              <motion.div
                key="cinema"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.06]">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-pink-400 font-bold mb-1">
                      <span>PRODUCCIÓN AUDIOVISUAL & GENERACIÓN IA</span>
                      <span>&bull;</span>
                      <span className="text-emerald-400">Modelos Generativos</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-sans">
                      Cinema Studio AI
                    </h3>
                    <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-1 max-w-xl">
                      Plataforma creativa para generación de video, creación de storyboards y asistencia en flujos de posproducción audiovisual.
                    </p>
                  </div>

                  <a
                    href="https://cinema.moderno.com.ar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-[#00E5FF] text-black text-xs font-black tracking-wider transition-transform hover:scale-105 shadow-[0_0_20px_rgba(236,72,153,0.4)] shrink-0 text-center"
                  >
                    Abrir Cinema Studio &rarr;
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">🎥</div>
                    <h4 className="text-xs font-bold text-white mb-1">Generación de Tomas</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Escenas cinematográficas consistentes impulsadas por modelos de video avanzados.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">🎞️</div>
                    <h4 className="text-xs font-bold text-white mb-1">Storyboards Guiados</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Transformación de guiones e ideas en secuencias visuales organizadas.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">🎨</div>
                    <h4 className="text-xs font-bold text-white mb-1">Consistencia Visual</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Mantenimiento de estilo e iluminación continua a través de diferentes planos.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">☁️</div>
                    <h4 className="text-xs font-bold text-white mb-1">Exportación Cloud</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Almacenamiento directo de proyectos en tu cuenta de Moderno Cloud.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 5. MERCATTO SHOWCASE */}
            {activeTab === "mercatto" && (
              <motion.div
                key="mercatto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.06]">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold mb-1">
                      <span>COMERCIO DIGITAL & MARKETPLACE</span>
                      <span>&bull;</span>
                      <span className="text-emerald-400">Checkout Unificado</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-sans">
                      Mercatto Marketplace
                    </h3>
                    <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-1 max-w-xl">
                      E-commerce con autenticación global de Moderno ID, inventario sincronizado en tiempo real y pagos digitales seguros.
                    </p>
                  </div>

                  <a
                    href="https://mercatto.moderno.com.ar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-[#00E5FF] text-black text-xs font-black tracking-wider transition-transform hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.4)] shrink-0 text-center"
                  >
                    Abrir Mercatto &rarr;
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">🛍️</div>
                    <h4 className="text-xs font-bold text-white mb-1">Checkout Rápido</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Direcciones de entrega y preferencias guardadas en tu perfil de Moderno ID.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">🏪</div>
                    <h4 className="text-xs font-bold text-white mb-1">Tiendas & Catálogo</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Panel para publicar productos, gestionar stock y seguir pedidos.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">📦</div>
                    <h4 className="text-xs font-bold text-white mb-1">Seguimiento de Envíos</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Trazabilidad y notificaciones automáticas en cada etapa de la entrega.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">🛡️</div>
                    <h4 className="text-xs font-bold text-white mb-1">Operaciones Protegidas</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Protección en transacciones y verificación en cada compra.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 6. MODERNO CLEANER SHOWCASE */}
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
                      Diagnóstico de hardware, gestión de memoria, modo developer y snapshots de seguridad para optimizar sistemas macOS.
                    </p>
                  </div>

                  <a
                    href="/pricing?service=cleaner"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider transition-transform hover:scale-105 shadow-[0_0_20px_rgba(0,229,255,0.4)] shrink-0 text-center"
                  >
                    Ver Licencias &rarr;
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">💡</div>
                    <h4 className="text-xs font-bold text-white mb-1">Diagnóstico del Sistema</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Telemetría y análisis de uso de memoria RAM y almacenamiento.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">⚡</div>
                    <h4 className="text-xs font-bold text-white mb-1">Entorno Developer</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Limpieza de cachés de compilación (DerivedData, node_modules, caches).
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">🛡️</div>
                    <h4 className="text-xs font-bold text-white mb-1">Centro de Rollback</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Snapshots de seguridad para restaurar estados ante cualquier cambio.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">🛑</div>
                    <h4 className="text-xs font-bold text-white mb-1">Desinstalador Completo</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Eliminación ordenada con mapeo de contenedores y archivos residuales.
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
