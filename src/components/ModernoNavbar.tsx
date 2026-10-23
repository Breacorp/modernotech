"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ModernoButton } from "./ModernoButton";
import { useModernoAuth } from "../hooks/useModernoAuth";

const ECOSYSTEM_APPS = [
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

const NAV_LINKS = [
  { label: "Productos", href: "/#productos" },
  { label: "Ecosistema", href: "/#ecosistema" },
  { label: "Cómo funciona", href: "/#como-funciona" },
  { label: "Precios", href: "/pricing" },
  { label: "Ayuda", href: "/ayuda" },
];

export const ModernoNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);

  const appsButtonRef = useRef<HTMLButtonElement>(null);
  const appsMenuRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  const { user, isAuthenticated, signOut } = useModernoAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the app launcher on outside click or Escape.
  useEffect(() => {
    if (!appsOpen) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        !appsMenuRef.current?.contains(target) &&
        !appsButtonRef.current?.contains(target)
      ) {
        setAppsOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAppsOpen(false);
        appsButtonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [appsOpen]);

  // Mobile drawer: Escape to close + lock background scroll.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        mobileToggleRef.current?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLElement>, href: string) => {
      setMobileMenuOpen(false);
      setAppsOpen(false);

      if (typeof window === "undefined" || window.location.pathname !== "/") {
        return; // Let the browser navigate to /#section
      }

      if (href.startsWith("/#") || href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.startsWith("/#") ? href.replace("/", "") : href;
        const target = document.querySelector(targetId);
        target?.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    mobileToggleRef.current?.focus();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 select-none ${
          scrolled
            ? "bg-[var(--moderno-background-alt)]/90 backdrop-blur-xl border-b border-white/[0.08] py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "bg-gradient-to-b from-[var(--moderno-background-alt)]/90 via-[var(--moderno-background-alt)]/40 to-transparent py-4"
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between gap-6">
          {/* Brand lockup */}
          <div className="flex items-center gap-6 lg:gap-8">
            <a
              href="#hero"
              onClick={(e) => handleSmoothScroll(e, "#hero")}
              className="moderno-focus flex items-center gap-2.5 group shrink-0 rounded-lg"
              aria-label="Moderno Tech — Inicio"
            >
              <Image
                src="/logo.png"
                alt="Moderno Tech"
                width={32}
                height={32}
                priority
                className="w-8 h-8 rounded-full object-contain shadow-[0_0_20px_rgba(0,122,255,0.4)] group-hover:scale-105 transition-transform duration-300"
              />
              <span className="flex flex-col leading-none">
                <span className="text-[10px] font-extrabold tracking-[0.25em] text-white/55 uppercase">
                  MODERNO
                </span>
                <span className="text-base sm:text-lg font-black tracking-wider text-white flex items-center gap-1 font-sans">
                  TECH
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--moderno-primary)] animate-pulse" />
                </span>
              </span>
            </a>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="moderno-focus px-3 py-2 rounded-xl text-xs font-bold text-[var(--moderno-text-muted)] hover:text-white hover:bg-white/[0.04] transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Ecosystem app launcher */}
            <div className="relative">
              <button
                ref={appsButtonRef}
                type="button"
                onClick={() => setAppsOpen((open) => !open)}
                aria-haspopup="true"
                aria-expanded={appsOpen}
                aria-controls="ecosystem-apps-menu"
                title="Lanzador de apps del ecosistema"
                className={`moderno-focus p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                  appsOpen
                    ? "bg-[var(--moderno-primary)]/20 text-[var(--moderno-primary)] border border-[var(--moderno-primary)]/50 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                    : "bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[var(--moderno-text-muted)] hover:text-white"
                }`}
                aria-label="Abrir lanzador de apps del ecosistema"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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

              <AnimatePresence>
                {appsOpen && (
                  <motion.div
                    ref={appsMenuRef}
                    id="ecosystem-apps-menu"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 w-80 p-4 rounded-2xl bg-[var(--moderno-surface-card)]/98 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl z-50"
                  >
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                      <span className="text-[11px] font-black text-[var(--moderno-primary)] tracking-widest uppercase">
                        ECOSISTEMA MODERNO
                      </span>
                      <span className="text-[11px] font-mono text-white/55">Hub Central</span>
                    </div>
                    <nav aria-label="Apps del ecosistema" className="grid grid-cols-3 gap-2">
                      {ECOSYSTEM_APPS.map((app) => (
                        <a
                          key={app.name}
                          href={app.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="moderno-focus p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.04] hover:border-[var(--moderno-primary)]/40 transition-all flex flex-col items-center text-center group"
                        >
                          <span className="text-xl mb-1 group-hover:scale-110 transition-transform" aria-hidden="true">
                            {app.icon}
                          </span>
                          <span className="text-[11px] font-bold text-white block truncate w-full">
                            {app.name.replace("Moderno ", "")}
                          </span>
                          <span className="text-[10px] text-[var(--moderno-text-muted)] font-light block truncate w-full">
                            {app.desc}
                          </span>
                        </a>
                      ))}
                    </nav>
                    <div className="mt-3 pt-2.5 border-t border-white/[0.06] text-center">
                      <a
                        href="/cuenta"
                        className="moderno-focus w-full py-1.5 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] font-bold text-white block transition-all"
                      >
                        Gestionar Servicios &rarr;
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Live status pill */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-[11px] font-mono text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              <span>ONLINE</span>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <a
                  href="/cuenta"
                  className="moderno-focus px-4 py-1.5 rounded-xl bg-[var(--moderno-primary)]/10 hover:bg-[var(--moderno-primary)]/20 border border-[var(--moderno-primary)]/40 text-xs font-bold text-white transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
                  <span>Mi Cuenta</span>
                  {user?.name && (
                    <span className="text-white/65 font-normal hidden xl:inline">
                      ({user.name})
                    </span>
                  )}
                </a>
                <button
                  type="button"
                  onClick={signOut}
                  title="Cerrar sesión"
                  aria-label="Cerrar sesión"
                  className="moderno-focus p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white text-xs transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <a
                  href="/login"
                  className="moderno-focus px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold text-white transition-all flex items-center gap-1.5 hover:border-[var(--moderno-primary)]/40"
                >
                  <svg className="w-3.5 h-3.5 text-[var(--moderno-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Iniciar Sesión</span>
                </a>
                <ModernoButton variant="primary" href="/registro">
                  Crear Cuenta
                </ModernoButton>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            ref={mobileToggleRef}
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="moderno-focus lg:hidden p-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[68px] z-40 max-h-[calc(100dvh-68px)] overflow-y-auto bg-[var(--moderno-background-alt)]/98 backdrop-blur-2xl border-b border-white/10 p-6 lg:hidden shadow-2xl"
          >
            <nav aria-label="Navegación móvil" className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="moderno-focus text-sm font-bold text-[var(--moderno-text-muted)] hover:text-white py-2 border-b border-white/[0.04] transition-colors rounded"
                >
                  {link.label}
                </a>
              ))}

              {isAuthenticated ? (
                <>
                  <a
                    href="/cuenta"
                    className="moderno-focus text-sm font-bold text-[var(--moderno-primary)] hover:text-white py-2 border-b border-white/[0.04] transition-colors flex items-center justify-between rounded"
                  >
                    <span className="flex items-center gap-2">
                      <span aria-hidden="true">🔑</span>
                      <span>Mi Cuenta ({user?.name || "Activa"})</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                      ONLINE
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      signOut();
                      closeMobileMenu();
                    }}
                    className="moderno-focus text-left text-xs font-bold text-rose-400 hover:text-white py-2 border-b border-white/[0.04] transition-colors rounded"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/login"
                    className="moderno-focus text-sm font-bold text-white hover:text-[var(--moderno-primary)] py-2 border-b border-white/[0.04] transition-colors flex items-center gap-2 rounded"
                  >
                    <span aria-hidden="true">🔑</span>
                    <span>Iniciar Sesión (Moderno ID)</span>
                  </a>
                  <a
                    href="/registro"
                    className="moderno-focus text-sm font-bold text-[var(--moderno-primary)] hover:text-white py-2 border-b border-white/[0.04] transition-colors flex items-center gap-2 rounded"
                  >
                    <span aria-hidden="true">✨</span>
                    <span>Crear Cuenta Global</span>
                  </a>
                </>
              )}
            </nav>

            <div className="pt-4">
              <ModernoButton
                variant="primary"
                href="/#ecosistema"
                className="w-full text-center"
                onClick={(e: React.MouseEvent<HTMLElement>) =>
                  handleSmoothScroll(e, "/#ecosistema")
                }
              >
                Explorar Ecosistema
              </ModernoButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
