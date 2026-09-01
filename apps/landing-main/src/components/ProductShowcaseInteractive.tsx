"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ProductShowcaseInteractive: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"cloud" | "access" | "play" | "cinema" | "mercatto" | "cleaner">("cloud");

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
          Explorá las interfaces reales de nuestras plataformas insignia: almacenamiento en la nube, control de accesos corporativo, cloud gaming, IA cinemática, e-commerce y diagnóstico.
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
              {activeTab === "cloud" && "https://cloud.moderno.com.ar — Private Storage & Family Vault Hub"}
              {activeTab === "access" && "https://access.moderno.com.ar — Security & Access Control Mesh"}
              {activeTab === "play" && "https://play.moderno.com.ar — Cloud Gaming Console 60 FPS"}
              {activeTab === "cinema" && "https://cinema.moderno.com.ar — Cinema Studio AI Generation Suite"}
              {activeTab === "mercatto" && "https://mercatto.moderno.com.ar — Unified Digital Commerce Marketplace"}
              {activeTab === "cleaner" && "Moderno AI Cleaner Pro v2.4 (macOS Native Suite)"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="text-[10px] font-mono text-[#00E5FF] font-bold">ECOSISTEMA ACTIVO</span>
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
                      Abrir Moderno Cloud &rarr;
                    </a>
                    <a
                      href="/pricing?service=cloud"
                      className="px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-xs font-bold transition-all text-center"
                    >
                      Comparar Planes
                    </a>
                  </div>
                </div>

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
                      <p className="text-[10px] text-[#94A3B8] font-light mt-0.5">2 TB compartidos con carpetas privadas aisladas para cada miembro.</p>
                    </div>
                    <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#00E5FF] to-[#157BFF] h-full w-4/5 rounded-full" />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08] flex flex-col justify-between h-44 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xl">📱</span>
                      <span className="text-[10px] font-mono text-white/40">iOS & Android</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">Copia Móvil en Vivo</h4>
                      <p className="text-[10px] text-[#94A3B8] font-light mt-0.5">Backup continuo de fotos y videos en segundo plano sin comprimir.</p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400">Última copia: hace 3 min</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08] flex flex-col justify-between h-44 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xl">🔐</span>
                      <span className="text-[10px] font-mono text-purple-400">ZERO-KNOWLEDGE</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">Bóveda Cifrada</h4>
                      <p className="text-[10px] text-[#94A3B8] font-light mt-0.5">Cifrado de extremo a extremo donde solo tú posees las claves.</p>
                    </div>
                    <span className="text-[10px] font-mono text-white/50">Cifrado Cuántico Listo</span>
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
                      <span>SEGURIDAD EDILICIA & CONSORCIOS</span>
                      <span>&bull;</span>
                      <span className="text-emerald-400">Hardware Mesh Conectado</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-sans">
                      Moderno Access Enterprise
                    </h3>
                    <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-1 max-w-xl">
                      Control de acceso para consorcios y edificios corporativos con hardware Hikvision/RFID, invitaciones temporales por WhatsApp y auditoría en tiempo real.
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
                      Pases temporales enviados por WhatsApp con caducidad exacta.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">📹</div>
                    <h4 className="text-xs font-bold text-white mb-1">Integración Hikvision</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Conexión nativa con molinetes, cerraduras biométricas y lectores RFID.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">📊</div>
                    <h4 className="text-xs font-bold text-white mb-1">Auditoría en Tiempo Real</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Registro de ingresos y egresos cifrados e inmutables por segundo.
                    </p>
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
                      <span className="text-emerald-400">Baja Latencia Edge</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-sans">
                      Moderno Play Gaming Console
                    </h3>
                    <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-1 max-w-xl">
                      Catálogo de títulos retro, emuladores directos en el navegador y streaming a 60 FPS sin descargas ni configuraciones.
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
                      Ver VIP Pass
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">🕹️</div>
                    <h4 className="text-xs font-bold text-white mb-1">Catálogo Freemium</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Juegos arcade y retro clásicos accesibles sin costo con tu Moderno ID.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">⚡</div>
                    <h4 className="text-xs font-bold text-white mb-1">Ultra Baja Latencia</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Servidores de transmisión en Buenos Aires con respuesta sub-15ms.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">🎮</div>
                    <h4 className="text-xs font-bold text-white mb-1">Soporte Mandos Dual</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Compatible con controles PlayStation, Xbox, Switch y Bluetooth directo.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">💾</div>
                    <h4 className="text-xs font-bold text-white mb-1">Cloud Saves Globales</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Tus partidas guardadas se sincronizan automáticamente con Moderno Cloud.
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
                      <span className="text-emerald-400">Google Veo & Render 4K</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-sans">
                      Cinema Studio AI
                    </h3>
                    <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-1 max-w-xl">
                      Plataforma de generación cinemática, creación de storyboards, renderizado de tomas realistas y edición asistida por inteligencia artificial.
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
                    <h4 className="text-xs font-bold text-white mb-1">Generación de Video HD/4K</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Escenas cinematográficas consistentes impulsadas por modelos de video avanzados.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">🎞️</div>
                    <h4 className="text-xs font-bold text-white mb-1">Storyboarding Automático</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Transformación de guiones y textos en secuencias visuales coherentes.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">🎨</div>
                    <h4 className="text-xs font-bold text-white mb-1">Consistencia de Personajes</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Mapeo de rostros e iluminación continua a través de todas las tomas.
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
                      <span className="text-emerald-400">Checkout Unificado 1-Click</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-sans">
                      Mercatto Marketplace
                    </h3>
                    <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-1 max-w-xl">
                      E-commerce con autenticación global de Moderno ID, inventario sincronizado en tiempo real y pagos instantáneos con tarjeta y transferencias.
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
                    <h4 className="text-xs font-bold text-white mb-1">Checkout en 1 Clic</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Tus direcciones de entrega y pagos guardados en Moderno ID.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">🏪</div>
                    <h4 className="text-xs font-bold text-white mb-1">Tiendas Vendedoras</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Panel para publicar productos, gestionar envíos y recibir pagos.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">📦</div>
                    <h4 className="text-xs font-bold text-white mb-1">Tracking en Vivo</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Seguimiento satelital y notificaciones automáticas en cada estado.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#050507] border border-white/[0.08]">
                    <div className="text-xl mb-2">🛡️</div>
                    <h4 className="text-xs font-bold text-white mb-1">Garantía Protegida</h4>
                    <p className="text-[11px] text-[#94A3B8] font-light leading-relaxed">
                      Protección contra fraudes con liberación segura tras entrega.
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
                      Planes de limpieza heurísticos basados en telemetría de hardware, modo developer y snapshots atómicos.
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
