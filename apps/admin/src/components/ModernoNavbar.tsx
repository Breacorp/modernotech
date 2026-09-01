"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModernoButton } from "./ModernoButton";
import { useModernoAuth } from "../hooks/useModernoAuth";

export const ModernoNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useModernoAuth();

  const ecosystemApps = [
    { name: "Moderno Cloud", icon: "☁️", url: "https://cloud.moderno.com.ar", desc: "Almacenamiento & Vault" },
    { name: "Moderno Access", icon: "🛡️", url: "https://access.moderno.com.ar", desc: "Control de Acceso" },
    { name: "Moderno Play", icon: "🎮", url: "https://play.moderno.com.ar", desc: "Cloud Gaming 60 FPS" },
    { name: "Cinema Studio", icon: "🎬", url: "https://cinema.moderno.com.ar", desc: "Generación Video AI" },
    { name: "Mercatto", icon: "🛍️", url: "https://mercatto.moderno.com.ar", desc: "E-Commerce 1-Click" },
    { name: "Moderno AI", icon: "✨", url: "https://ai.moderno.com.ar", desc: "Motor Cognitivo" },
    { name: "Moderno One", icon: "🏢", url: "https://one.moderno.com.ar", desc: "ERP Modular" },
    { name: "AI Cleaner Pro", icon: "⚡", url: "https://cleaner.moderno.com.ar", desc: "Optimización macOS" },
    { name: "Moderno Weather", icon: "🌤️", url: "https://weather.moderno.com.ar", desc: "Radar Meteorológico" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Productos", href: "/#productos" },
    { label: "Ecosistema", href: "/#ecosistema" },
    { label: "Precios", href: "/pricing" },
    { label: "Tecnología", href: "/#tecnologia" },
    { label: "Ayuda", href: "/ayuda" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLElement>, href: string) => {
    if (href.startsWith("/#") && window.location.pathname === "/") {
      e.preventDefault();
      setMobileMenuOpen(false);
      const targetId = href.replace("/", "");
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else if (href.startsWith("#")) {
      e.preventDefault();
      setMobileMenuOpen(false);
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 select-none ${
          scrolled
            ? "bg-[#050507]/90 backdrop-blur-xl border-b border-white/[0.08] py-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "bg-gradient-to-b from-[#050507]/90 via-[#050507]/40 to-transparent py-5"
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between gap-6">
          {/* Logo Brand Lockup matching Play & Access */}
          <div className="flex items-center gap-8 lg:gap-10">
            <a
              href="#hero"
              onClick={(e) => handleSmoothScroll(e, "#hero")}
              className="flex items-center gap-2.5 group shrink-0 focus:outline-none"
              aria-label="Moderno Tech - Home"
            >
              <img
                src="/logo.png"
                alt="Moderno Tech Logo"
                className="w-8 h-8 rounded-full object-contain shadow-[0_0_20px_rgba(0,122,255,0.4)] group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col leading-none">
                <span className="text-[9px] font-extrabold tracking-[0.25em] text-white/50 uppercase">
                  MODERNO
                </span>
                <span className="text-base sm:text-lg font-black tracking-wider text-white flex items-center gap-1 font-sans">
                  TECH
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#94A3B8] hover:text-white hover:bg-white/[0.04] transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Ecosystem App Launcher Button */}
            <div className="relative">
              <button
                onClick={() => setAppsOpen(!appsOpen)}
                title="Lanzador de Apps del Ecosistema"
                className={`p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                  appsOpen
                    ? "bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/50 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                    : "bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[#94A3B8] hover:text-white"
                }`}
                aria-label="Lanzador de Apps"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="5" cy="5" r="2" />
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="19" cy="5" r="2" />
                  <circle cx="5" cy="12" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="19" cy="12" r="2" />
                  <circle cx="5" cy="19" r="2" />
                  <circle cx="12" cy="19" r="2" />
                  <circle cx="19" cy="19" r="2" />
                </svg>
              </button>

              {/* App Launcher Dropdown */}
              <AnimatePresence>
                {appsOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 w-80 p-4 rounded-2xl bg-[#0B0B10]/98 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl z-50"
                  >
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                      <span className="text-[10px] font-black text-[#00E5FF] tracking-widest uppercase">
                        ECOSISTEMA MODERNO
                      </span>
                      <a href="/pricing" className="text-[10px] text-[#94A3B8] hover:text-white">
                        Ver Planes &rarr;
                      </a>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {ecosystemApps.map((app) => (
                        <a
                          key={app.name}
                          href={app.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.04] hover:border-[#00E5FF]/40 transition-all flex flex-col items-center text-center group"
                        >
                          <span className="text-xl mb-1 group-hover:scale-110 transition-transform">
                            {app.icon}
                          </span>
                          <span className="text-[11px] font-bold text-white block truncate w-full">
                            {app.name.replace("Moderno ", "")}
                          </span>
                          <span className="text-[9px] text-[#94A3B8] font-light block truncate w-full">
                            {app.desc}
                          </span>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Live Status Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-[11px] font-mono text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ONLINE</span>
            </div>

            {/* Moderno ID Conditional Action */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <a
                  href="/cuenta"
                  className="px-4 py-1.5 rounded-xl bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/40 text-xs font-bold text-white transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Mi Cuenta</span>
                  {user?.name && <span className="text-white/60 font-normal">({user.name})</span>}
                </a>
                <button
                  onClick={signOut}
                  title="Cerrar sesión"
                  className="p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/50 hover:text-white text-xs transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <a
                  href="/login"
                  className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold text-white transition-all flex items-center gap-1.5 hover:border-[#00E5FF]/40"
                >
                  <svg className="w-3.5 h-3.5 text-[#00E5FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Iniciar Sesión</span>
                </a>
                <ModernoButton
                  variant="primary"
                  href="/registro"
                >
                  Crear Cuenta
                </ModernoButton>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
            aria-expanded={mobileMenuOpen}
            aria-label="Abrir menú"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[68px] z-40 bg-[#050507]/98 backdrop-blur-2xl border-b border-white/10 p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-sm font-bold text-[#94A3B8] hover:text-white py-2 border-b border-white/[0.04] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              {isAuthenticated ? (
                <>
                  <a
                    href="/cuenta"
                    className="text-sm font-bold text-[#00E5FF] hover:text-white py-2 border-b border-white/[0.04] transition-colors flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <span>🔑</span>
                      <span>Mi Cuenta ({user?.name || "Activa"})</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                      ONLINE
                    </span>
                  </a>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left text-xs font-bold text-rose-400 hover:text-white py-2 border-b border-white/[0.04] transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/login"
                    className="text-sm font-bold text-white hover:text-[#00E5FF] py-2 border-b border-white/[0.04] transition-colors flex items-center gap-2"
                  >
                    <span>🔑</span>
                    <span>Iniciar Sesión (Moderno ID)</span>
                  </a>
                  <a
                    href="/registro"
                    className="text-sm font-bold text-[#00E5FF] hover:text-white py-2 border-b border-white/[0.04] transition-colors flex items-center gap-2"
                  >
                    <span>✨</span>
                    <span>Crear Cuenta Global</span>
                  </a>
                </>
              )}
              <div className="pt-2">
                <ModernoButton
                  variant="primary"
                  href="#productos"
                  className="w-full text-center"
                  onClick={(e: React.MouseEvent<HTMLElement>) => handleSmoothScroll(e, "#productos")}
                >
                  Explorar Ecosistema
                </ModernoButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
