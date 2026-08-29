"use client";

import React from 'react';

export function Footer() {
  const handleScroll = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contacto" className="relative z-10 border-t border-white/10 bg-[#050a15]/95 pt-20 pb-12 text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col items-start pr-6">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/logo.png" 
                alt="Moderno Tech Logo" 
                className="w-6 h-6 object-contain filter drop-shadow-[0_0_10px_rgba(0,168,255,0.5)]" 
              />
              <div className="flex items-center gap-2">
                <span className="text-base font-black tracking-[0.25em] text-white">MODERNO</span>
                <span className="text-xs uppercase text-[#00a8ff] tracking-widest font-bold border-l border-white/10 pl-2">TECH</span>
              </div>
            </div>

            <p className="text-xs text-[#9ab0d3] leading-relaxed mb-6 font-light max-w-sm">
              Ecosistema tecnológico integral. Una sola marca, múltiples plataformas y soluciones desarrolladas para crear, gestionar, automatizar y transformar.
            </p>

            <div className="text-[11px] font-mono text-[#00a8ff] bg-[#0052FF]/10 border border-[#0052FF]/20 px-3.5 py-1.5 rounded-lg mb-6">
              Portal Central: <span className="text-white">https://moderno.com.ar</span>
            </div>

            <div className="flex items-center gap-4 text-[#9ab0d3]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#9ab0d3]/60">Soporte técnico directo:</span>
              <a href="https://hosting.moderno.com.ar" className="text-xs font-semibold text-white hover:text-[#00a8ff] transition-colors">
                support.moderno.com.ar
              </a>
            </div>
          </div>

          {/* Productos Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#00a8ff] mb-4 font-mono">
              Productos
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-[#9ab0d3]">
              <li><a href="https://one.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Moderno One</a></li>
              <li><a href="https://access.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Moderno Access</a></li>
              <li><a href="https://play.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Moderno Play</a></li>
              <li><a href="https://mercato.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Mercato</a></li>
              <li><a href="https://support.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Soporte ML</a></li>
              <li><a href="https://ticket.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WaTicket</a></li>
              <li><a href="https://home.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Nova Home</a></li>
              <li><a href="https://nova.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Nova AI</a></li>
              <li><a href="https://cinema.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Cinema Studio</a></li>
              <li><a href="https://voice.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Voice AI</a></li>
            </ul>
          </div>

          {/* Soluciones Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#00a8ff] mb-4 font-mono">
              Soluciones
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-[#9ab0d3]">
              <li><a href="#soluciones" onClick={handleScroll('soluciones')} className="hover:text-white transition-colors">Empresas & ERP</a></li>
              <li><a href="#inteligencia-artificial" onClick={handleScroll('inteligencia-artificial')} className="hover:text-white transition-colors">Inteligencia Artificial</a></li>
              <li><a href="#soluciones" onClick={handleScroll('soluciones')} className="hover:text-white transition-colors">Automatización & CRM</a></li>
              <li><a href="#soluciones" onClick={handleScroll('soluciones')} className="hover:text-white transition-colors">Seguridad & Accesos</a></li>
              <li><a href="#soluciones" onClick={handleScroll('soluciones')} className="hover:text-white transition-colors">Comercio Digital</a></li>
            </ul>
          </div>

          {/* Moderno Tech & Legal Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#00a8ff] mb-4 font-mono">
              Moderno Tech
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-[#9ab0d3] mb-6">
              <li><a href="#hero" onClick={handleScroll('hero')} className="hover:text-white transition-colors">Sobre Nosotros</a></li>
              <li><a href="#servicios" onClick={handleScroll('servicios')} className="hover:text-white transition-colors">Servicios Técnicos</a></li>
              <li><a href="https://hosting.moderno.com.ar" className="hover:text-white transition-colors">Infraestructura Cloud</a></li>
              <li><a href="https://academy.moderno.com.ar" className="hover:text-white transition-colors">Academia Online</a></li>
            </ul>

            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#00a8ff] mb-3 font-mono">
              Legal
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-[#9ab0d3]">
              <li><a href="#legal" className="hover:text-white transition-colors">Privacidad</a></li>
              <li><a href="#legal" className="hover:text-white transition-colors">Términos de Servicio</a></li>
              <li><a href="#legal" className="hover:text-white transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8" />

        {/* Copyright notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#9ab0d3]/60 font-mono tracking-widest uppercase">
          <div>
            &copy; {new Date().getFullYear()} MODERNO TECH. TODOS LOS DERECHOS RESERVADOS.
          </div>
          <div>
            UNA SOLA MARCA. UN ECOSISTEMA. MÚLTIPLES SOLUCIONES.
          </div>
        </div>
      </div>
    </footer>
  );
}
