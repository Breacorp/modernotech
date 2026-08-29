"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
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
    { label: "Tecnología", href: "#tecnologia" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Contacto", href: "#contacto" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-[#060B18]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "py-5 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleSmoothScroll(e, "#hero")}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]"
            aria-label="Moderno Tech - Inicio"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0052FF] via-[#0070F3] to-[#00E5FF] p-[1px] flex items-center justify-center shadow-[0_0_15px_rgba(0,82,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,82,255,0.6)] transition-all">
              <div className="w-full h-full bg-[#060B18] rounded-[7px] flex items-center justify-center">
                <span className="font-mono font-black text-xs text-white tracking-tighter">MT</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-[0.2em] text-white uppercase group-hover:text-[#38BDF8] transition-colors">
                MODERNO <span className="text-[#00E5FF]">TECH</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#94A3B8] uppercase">
                ECOSISTEMA CENTRAL
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wider uppercase text-[#94A3B8]" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="hover:text-white transition-colors relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] rounded"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#productos"
              onClick={(e) => handleSmoothScroll(e, "#productos")}
              className="px-5 py-2 rounded-full bg-[#0052FF] hover:bg-[#0041CC] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,82,255,0.35)] hover:shadow-[0_0_30px_rgba(0,82,255,0.5)] active:scale-95 border border-white/10"
            >
              Explorar
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-[#94A3B8] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF]"
            aria-expanded={mobileMenuOpen}
            aria-label="Abrir menú de navegación"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-[#060B18]/95 backdrop-blur-2xl border-b border-white/10 p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-base font-medium text-[#94A3B8] hover:text-white py-2 border-b border-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#productos"
                onClick={(e) => handleSmoothScroll(e, "#productos")}
                className="mt-2 w-full text-center py-3 rounded-xl bg-[#0052FF] text-white text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(0,82,255,0.4)]"
              >
                Explorar Ecosistema
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
