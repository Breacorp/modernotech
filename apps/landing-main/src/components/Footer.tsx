"use client";

import React from "react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050507] border-t border-white/[0.06] text-white pt-16 pb-10 select-none">
      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col gap-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-10 pb-10 border-b border-white/[0.04]">
          {/* Brand Col matching Play/Access */}
          <div className="col-span-2 md:col-span-2 flex flex-col justify-between">
            <div>
              <a className="flex items-center gap-2.5 group mb-4" href="/">
                <img
                  src="/logo.png"
                  alt="Moderno Tech Logo"
                  className="w-8 h-8 rounded-full object-contain shadow-[0_0_20px_rgba(0,122,255,0.35)] group-hover:scale-105 transition-transform duration-300"
                />
                <div className="flex flex-col leading-none">
                  <span className="text-[9px] font-extrabold tracking-[0.25em] text-white/50 uppercase">
                    MODERNO
                  </span>
                  <span className="text-base font-black tracking-wider text-white font-sans">
                    TECH
                  </span>
                </div>
              </a>
              <p className="text-xs text-[#94A3B8] font-light max-w-sm leading-relaxed mb-6">
                El Ecosystem Hub de Moderno. Conectamos software empresarial, control de accesos, inteligencia artificial, almacenamiento privado y servicios digitales bajo una sola identidad.
              </p>
            </div>

            {/* Live Service Status Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-[11px] font-mono text-emerald-400 font-semibold w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ECOSISTEMA ONLINE // SERVIDORES OPERATIVOS</span>
            </div>
          </div>

          {/* Col 1: IDENTIDAD & PORTAL */}
          <div>
            <h4 className="text-[11px] font-black text-white/50 tracking-[0.2em] uppercase mb-4 font-sans">
              MODERNO ID
            </h4>
            <nav className="flex flex-col gap-2.5 text-xs font-bold text-[#94A3B8]">
              <a href="/cuenta" className="text-[#00E5FF] hover:text-white transition-colors flex items-center gap-1.5">
                <span>🔑</span>
                <span>Mi Cuenta</span>
              </a>
              <a href="/login" className="hover:text-[#00E5FF] transition-colors">
                Iniciar Sesión
              </a>
              <a href="/registro" className="hover:text-[#00E5FF] transition-colors">
                Crear Cuenta Global
              </a>
              <a href="/pricing" className="hover:text-[#00E5FF] transition-colors">
                Planes & Precios
              </a>
              <a href="/#ecosistema" className="hover:text-[#00E5FF] transition-colors">
                Ecosistema Hub
              </a>
              <a href="/ayuda" className="hover:text-[#00E5FF] transition-colors">
                Centro de Ayuda
              </a>
            </nav>
          </div>

          {/* Col 2: SERVICIOS CLOUD & MEDIA */}
          <div>
            <h4 className="text-[11px] font-black text-white/50 tracking-[0.2em] uppercase mb-4 font-sans">
              CLOUD & MEDIA
            </h4>
            <nav className="flex flex-col gap-2.5 text-xs font-bold text-[#94A3B8]">
              <a href="https://cloud.moderno.com.ar/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#00E5FF] transition-colors font-black flex items-center gap-1">
                <span>☁️</span>
                <span>Moderno Cloud</span>
              </a>
              <a href="https://play.moderno.com.ar/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1">
                <span>🎮</span>
                <span>Moderno Play</span>
              </a>
              <a href="https://cinema.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1">
                <span>🎬</span>
                <span>Cinema Studio AI</span>
              </a>
              <a href="https://ai.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1">
                <span>✨</span>
                <span>Moderno AI</span>
              </a>
              <a href="https://voice.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1">
                <span>🎙️</span>
                <span>Voice AI</span>
              </a>
            </nav>
          </div>

          {/* Col 3: SEGURIDAD, COMERCIO & ERP */}
          <div>
            <h4 className="text-[11px] font-black text-white/50 tracking-[0.2em] uppercase mb-4 font-sans">
              ENTERPRISE & APPS
            </h4>
            <nav className="flex flex-col gap-2.5 text-xs font-bold text-[#94A3B8]">
              <a href="https://access.moderno.com.ar/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1">
                <span>🛡️</span>
                <span>Moderno Access</span>
              </a>
              <a href="https://one.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1">
                <span>🏢</span>
                <span>Moderno One</span>
              </a>
              <a href="https://mercatto.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1">
                <span>🛍️</span>
                <span>Mercatto</span>
              </a>
              <a href="https://ticket.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1">
                <span>💬</span>
                <span>WaTicket CRM</span>
              </a>
              <a href="https://cleaner.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1">
                <span>⚡</span>
                <span>AI Cleaner Pro</span>
              </a>
              <a href="https://weather.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1">
                <span>🌤️</span>
                <span>Moderno Weather</span>
              </a>
            </nav>
          </div>

          {/* Col 4: LEGAL & SOCIAL */}
          <div>
            <h4 className="text-[11px] font-black text-white/50 tracking-[0.2em] uppercase mb-4 font-sans">
              LEGAL & GITHUB
            </h4>
            <nav className="flex flex-col gap-2.5 text-xs font-bold text-[#94A3B8]">
              <a href="/privacidad" className="hover:text-[#00E5FF] transition-colors">
                Política de Privacidad
              </a>
              <a href="/terminos" className="hover:text-[#00E5FF] transition-colors">
                Términos y Condiciones
              </a>
              <a href="/seguridad" className="hover:text-[#00E5FF] transition-colors">
                Seguridad & Multi-Tenant
              </a>
              <a href="https://github.com/Breacorp" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1">
                <span>GitHub Oficial</span>
                <span className="text-[10px]">&nearr;</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Lockup */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 font-light">
          <p>&copy; {currentYear} Moderno Tech. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2 text-[11px]">
            <span>Buenos Aires, Argentina</span>
            <span>&bull;</span>
            <span className="text-[#00E5FF] font-medium">Ecosistema Unificado</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
