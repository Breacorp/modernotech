"use client";

import React, { useState } from 'react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#070d1e]/80 backdrop-blur-xl border-b border-[#0052FF]/20 shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand logo & portal title */}
        <a href="#hero" onClick={handleScroll('hero')} className="flex items-center gap-3 group">
          <img 
            src="/logo.png" 
            alt="Moderno Tech Logo" 
            className="w-6 h-6 object-contain filter drop-shadow-[0_0_10px_rgba(0,168,255,0.6)] transition-transform duration-500 group-hover:scale-110" 
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-black tracking-[0.25em] text-white">MODERNO</span>
              <span className="text-xs uppercase text-[#00a8ff] tracking-widest font-bold border-l border-white/10 pl-2">TECH</span>
            </div>
            <span className="text-[9px] uppercase text-[#9ab0d3]/60 tracking-widest font-mono hidden sm:block">Portal Ecosistémico Central</span>
          </div>
        </a>

        {/* Desktop Navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs text-[#9ab0d3] font-medium tracking-wide">
          <a href="#hero" onClick={handleScroll('hero')} className="hover:text-white transition-colors py-1 border-b-2 border-transparent hover:border-[#00a8ff]">Inicio</a>
          <a href="#ecosistema" onClick={handleScroll('ecosistema')} className="hover:text-white transition-colors py-1 border-b-2 border-transparent hover:border-[#00a8ff]">Ecosistema</a>
          <a href="#soluciones" onClick={handleScroll('soluciones')} className="hover:text-white transition-colors py-1 border-b-2 border-transparent hover:border-[#00a8ff]">Soluciones</a>
          <a href="#inteligencia-artificial" onClick={handleScroll('inteligencia-artificial')} className="hover:text-white transition-colors py-1 border-b-2 border-transparent hover:border-[#00a8ff]">Inteligencia Artificial</a>
          <a href="#servicios" onClick={handleScroll('servicios')} className="hover:text-white transition-colors py-1 border-b-2 border-transparent hover:border-[#00a8ff]">Servicios</a>
          <a href="#contacto" onClick={handleScroll('contacto')} className="hover:text-white transition-colors py-1 border-b-2 border-transparent hover:border-[#00a8ff]">Contacto</a>
        </nav>

        {/* CTA Access button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#ecosistema"
            onClick={handleScroll('ecosistema')}
            className="text-[11px] bg-[#0052FF] hover:bg-[#003ECC] text-white border border-white/10 px-5 py-2.5 rounded-full font-bold uppercase tracking-widest transition-all hover:scale-[1.03] active:scale-[0.97] shadow-[0_0_20px_rgba(0,82,255,0.4)]"
          >
            Explorar Productos
          </a>
        </div>

        {/* Mobile menu toggle button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#9ab0d3] hover:text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070d1e]/95 backdrop-blur-2xl border-b border-[#0052FF]/20 px-6 py-6 flex flex-col gap-4 text-sm text-[#9ab0d3] animate-fadeIn">
          <a href="#hero" onClick={handleScroll('hero')} className="hover:text-white py-2 border-b border-white/5">Inicio</a>
          <a href="#ecosistema" onClick={handleScroll('ecosistema')} className="hover:text-white py-2 border-b border-white/5">Ecosistema & Productos</a>
          <a href="#soluciones" onClick={handleScroll('soluciones')} className="hover:text-white py-2 border-b border-white/5">Soluciones de Negocio</a>
          <a href="#inteligencia-artificial" onClick={handleScroll('inteligencia-artificial')} className="hover:text-white py-2 border-b border-white/5">Inteligencia Artificial</a>
          <a href="#servicios" onClick={handleScroll('servicios')} className="hover:text-white py-2 border-b border-white/5">Servicios Tecnológicos</a>
          <a href="#contacto" onClick={handleScroll('contacto')} className="hover:text-white py-2">Contacto</a>
          <a
            href="#ecosistema"
            onClick={handleScroll('ecosistema')}
            className="mt-2 text-center text-xs bg-[#0052FF] text-white py-3 rounded-full font-bold uppercase tracking-widest shadow-md"
          >
            Explorar Ecosistema
          </a>
        </div>
      )}
    </header>
  );
}
