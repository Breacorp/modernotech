"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModernoButton } from "./ModernoButton";

export const ModernoNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Productos", href: "#productos" },
    { label: "Ecosistema", href: "#ecosistema" },
    { label: "Tecnología", href: "#tecnologia" },
    { label: "Nosotros", href: "#nosotros" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
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
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00E5FF] to-[#157BFF] flex items-center justify-center text-black font-black text-xs shadow-[0_0_20px_rgba(0,229,255,0.4)] group-hover:scale-105 transition-transform duration-300">
                MT
              </div>
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
            {/* Live Status Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-[11px] font-mono text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ONLINE</span>
            </div>

            <ModernoButton
              variant="primary"
              href="#productos"
              onClick={(e: React.MouseEvent<HTMLElement>) => handleSmoothScroll(e, "#productos")}
            >
              Explorar
            </ModernoButton>
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
