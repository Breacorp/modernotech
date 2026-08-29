"use client";

import React from "react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050507] border-t border-white/[0.06] text-white pt-16 pb-10 select-none">
      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col gap-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-10 border-b border-white/[0.04]">
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
                El portal central del ecosistema tecnológico Moderno. Software empresarial, control de accesos, inteligencia artificial, entretenimiento cloud e infraestructura unificada.
              </p>
            </div>

            {/* Live Service Status Pill matching Play & Access */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-[11px] font-mono text-emerald-400 font-semibold w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ESTADO DEL SERVICIO: ONLINE</span>
            </div>
          </div>

          {/* Col 1: MODERNO */}
          <div>
            <h4 className="text-[11px] font-black text-white/50 tracking-[0.2em] uppercase mb-4 font-sans">
              MODERNO
            </h4>
            <nav className="flex flex-col gap-2.5 text-xs font-bold text-[#94A3B8]">
              <a href="#nosotros" className="hover:text-[#00E5FF] transition-colors">
                Nosotros
              </a>
              <a href="#tecnologia" className="hover:text-[#00E5FF] transition-colors">
                Tecnología
              </a>
              <a href="#ecosistema" className="hover:text-[#00E5FF] transition-colors">
                Ecosistema
              </a>
              <a href="mailto:contacto@moderno.com.ar" className="hover:text-[#00E5FF] transition-colors">
                Contacto
              </a>
            </nav>
          </div>

          {/* Col 2: PRODUCTOS */}
          <div>
            <h4 className="text-[11px] font-black text-white/50 tracking-[0.2em] uppercase mb-4 font-sans">
              PRODUCTOS
            </h4>
            <nav className="flex flex-col gap-2.5 text-xs font-bold text-[#94A3B8]">
              <a href="https://access.moderno.com.ar/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5FF] transition-colors">
                Moderno Access
              </a>
              <a href="https://play.moderno.com.ar/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5FF] transition-colors">
                Moderno Play
              </a>
              <a href="https://ai.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5FF] transition-colors">
                Moderno AI
              </a>
              <a href="https://weather.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5FF] transition-colors">
                Moderno Weather
              </a>
              <a href="https://one.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5FF] transition-colors">
                Moderno One
              </a>
              <a href="https://pay.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5FF] transition-colors">
                Moderno Pay
              </a>
              <a href="https://ticket.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E5FF] transition-colors">
                Moderno CRM
              </a>
            </nav>
          </div>

          {/* Col 3: LEGAL & SOCIAL */}
          <div>
            <h4 className="text-[11px] font-black text-white/50 tracking-[0.2em] uppercase mb-4 font-sans">
              LEGAL & SOCIAL
            </h4>
            <nav className="flex flex-col gap-2.5 text-xs font-bold text-[#94A3B8]">
              <a href="#privacidad" className="hover:text-[#00E5FF] transition-colors">
                Privacidad
              </a>
              <a href="#terminos" className="hover:text-[#00E5FF] transition-colors">
                Términos de Servicio
              </a>
              <a href="#seguridad" className="hover:text-[#00E5FF] transition-colors">
                Seguridad Zero-Trust
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
