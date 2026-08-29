"use client";

import React from "react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#040711] pt-16 pb-12 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-16 border-b border-white/5">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#0052FF] to-[#00E5FF] flex items-center justify-center font-mono font-bold text-[10px] text-white">
                  MT
                </div>
                <span className="font-bold text-sm tracking-wider uppercase">MODERNO TECH</span>
              </div>
              <p className="text-xs text-[#94A3B8] font-light leading-relaxed mb-6">
                Ecosistema integrado de software empresarial, inteligencia artificial, entretenimiento y servicios cloud.
              </p>
            </div>

            {/* Live Status Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#38BDF8] w-fit">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>SISTEMAS OPERATIVOS</span>
            </div>
          </div>

          {/* Col 1: MODERNO */}
          <div>
            <h4 className="text-xs font-mono font-bold text-[#94A3B8] tracking-widest uppercase mb-4">
              MODERNO
            </h4>
            <ul className="space-y-2.5 text-xs text-[#94A3B8]">
              <li>
                <a href="#nosotros" className="hover:text-white transition-colors">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#tecnologia" className="hover:text-white transition-colors">
                  Tecnología
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="https://moderno.com.ar" className="hover:text-white transition-colors">
                  Hub Principal
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: PRODUCTOS */}
          <div>
            <h4 className="text-xs font-mono font-bold text-[#94A3B8] tracking-widest uppercase mb-4">
              PRODUCTOS
            </h4>
            <ul className="space-y-2.5 text-xs text-[#94A3B8]">
              <li>
                <a href="https://ai.moderno.com.ar" className="hover:text-white transition-colors">
                  Moderno AI
                </a>
              </li>
              <li>
                <a href="https://one.moderno.com.ar" className="hover:text-white transition-colors">
                  Moderno One
                </a>
              </li>
              <li>
                <a href="https://play.moderno.com.ar" className="hover:text-white transition-colors">
                  Moderno Play
                </a>
              </li>
              <li>
                <a href="https://weather.moderno.com.ar" className="hover:text-white transition-colors">
                  Moderno Weather
                </a>
              </li>
              <li>
                <a href="https://ticket.moderno.com.ar" className="hover:text-white transition-colors">
                  Moderno CRM (WaTicket)
                </a>
              </li>
              <li>
                <a href="https://access.moderno.com.ar" className="hover:text-white transition-colors">
                  Moderno Access
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: EMPRESA */}
          <div>
            <h4 className="text-xs font-mono font-bold text-[#94A3B8] tracking-widest uppercase mb-4">
              EMPRESA
            </h4>
            <ul className="space-y-2.5 text-xs text-[#94A3B8]">
              <li>
                <a href="#privacidad" className="hover:text-white transition-colors">
                  Privacidad
                </a>
              </li>
              <li>
                <a href="#terminos" className="hover:text-white transition-colors">
                  Términos & Condiciones
                </a>
              </li>
              <li>
                <a href="#seguridad" className="hover:text-white transition-colors">
                  Seguridad Zero-Trust
                </a>
              </li>
              <li>
                <a href="mailto:soporte@moderno.com.ar" className="hover:text-white transition-colors">
                  Soporte Técnico
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: SOCIAL */}
          <div>
            <h4 className="text-xs font-mono font-bold text-[#94A3B8] tracking-widest uppercase mb-4">
              SOCIAL & CÓDIGO
            </h4>
            <ul className="space-y-2.5 text-xs text-[#94A3B8]">
              <li>
                <a
                  href="https://github.com/Breacorp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>GitHub</span>
                  <span className="text-[10px] text-[#64748B]">&nearr;</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/modernotech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Instagram</span>
                  <span className="text-[10px] text-[#64748B]">&nearr;</span>
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@modernotech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>TikTok</span>
                  <span className="text-[10px] text-[#64748B]">&nearr;</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/modernotech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>LinkedIn</span>
                  <span className="text-[10px] text-[#64748B]">&nearr;</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#64748B]">
          <p>&copy; {currentYear} Moderno Tech. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <span>MODERNO ECOSYSTEM OS v4.2</span>
            <span>BUILT WITH PRECISION</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
