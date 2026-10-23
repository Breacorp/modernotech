import React from "react";
import Image from "next/image";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[var(--moderno-background-alt)] border-t border-white/[0.06] text-white pt-16 pb-10 select-none">
      <div className="max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col gap-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-10 pb-10 border-b border-white/[0.04]">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2 flex flex-col justify-between">
            <div>
              <a
                className="moderno-focus flex items-center gap-2.5 group mb-4 w-fit rounded-lg"
                href="/"
                aria-label="Moderno Tech — Inicio"
              >
                <Image
                  src="/logo.png"
                  alt="Moderno Tech"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-contain shadow-[0_0_20px_rgba(0,122,255,0.35)] group-hover:scale-105 transition-transform duration-300"
                />
                <span className="flex flex-col leading-none">
                  <span className="text-[10px] font-extrabold tracking-[0.25em] text-white/55 uppercase">
                    MODERNO
                  </span>
                  <span className="text-base font-black tracking-wider text-white font-sans">
                    TECH
                  </span>
                </span>
              </a>
              <p className="text-sm text-[var(--moderno-text-muted)] font-light max-w-sm leading-relaxed mb-6">
                El Ecosystem Hub de Moderno. Conectamos software empresarial, control de accesos, inteligencia artificial, almacenamiento privado y servicios digitales bajo una sola identidad.
              </p>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-[11px] font-mono text-emerald-400 font-semibold w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              <span>ECOSISTEMA ONLINE // SERVIDORES OPERATIVOS</span>
            </div>
          </div>

          {/* Moderno ID */}
          <div>
            <h4 className="text-[11px] font-black text-white/60 tracking-[0.2em] uppercase mb-4 font-sans">
              MODERNO ID
            </h4>
            <nav className="flex flex-col gap-2.5 text-xs font-bold text-[var(--moderno-text-muted)]">
              <a href="/cuenta" className="moderno-focus text-[var(--moderno-primary)] hover:text-white transition-colors flex items-center gap-1.5 rounded">
                <span aria-hidden="true">🔑</span>
                <span>Mi Cuenta</span>
              </a>
              <a href="/login" className="moderno-focus hover:text-[var(--moderno-primary)] transition-colors rounded">
                Iniciar Sesión
              </a>
              <a href="/registro" className="moderno-focus hover:text-[var(--moderno-primary)] transition-colors rounded">
                Crear Cuenta Global
              </a>
              <a href="/pricing" className="moderno-focus hover:text-[var(--moderno-primary)] transition-colors rounded">
                Planes &amp; Precios
              </a>
              <a href="/#como-funciona" className="moderno-focus hover:text-[var(--moderno-primary)] transition-colors rounded">
                Cómo funciona
              </a>
              <a href="/#tecnologia" className="moderno-focus hover:text-[var(--moderno-primary)] transition-colors rounded">
                Tecnología
              </a>
              <a href="/#faq" className="moderno-focus hover:text-[var(--moderno-primary)] transition-colors rounded">
                Preguntas frecuentes
              </a>
              <a href="/ayuda" className="moderno-focus hover:text-[var(--moderno-primary)] transition-colors rounded">
                Centro de Ayuda
              </a>
            </nav>
          </div>

          {/* Cloud & Media */}
          <div>
            <h4 className="text-[11px] font-black text-white/60 tracking-[0.2em] uppercase mb-4 font-sans">
              CLOUD &amp; MEDIA
            </h4>
            <nav className="flex flex-col gap-2.5 text-xs font-bold text-[var(--moderno-text-muted)]">
              <a href="https://cloud.moderno.com.ar/" target="_blank" rel="noopener noreferrer" className="moderno-focus text-white hover:text-[var(--moderno-primary)] transition-colors font-black flex items-center gap-1 rounded">
                <span aria-hidden="true">☁️</span>
                <span>Moderno Cloud</span>
              </a>
              <a href="https://play.moderno.com.ar/" target="_blank" rel="noopener noreferrer" className="moderno-focus hover:text-[var(--moderno-primary)] transition-colors flex items-center gap-1 rounded">
                <span aria-hidden="true">🎮</span>
                <span>Moderno Play</span>
              </a>
              <a href="https://cinema.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="moderno-focus hover:text-[var(--moderno-primary)] transition-colors flex items-center gap-1 rounded">
                <span aria-hidden="true">🎬</span>
                <span>Cinema Studio AI</span>
              </a>
              <a href="https://ai.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="moderno-focus hover:text-[var(--moderno-primary)] transition-colors flex items-center gap-1 rounded">
                <span aria-hidden="true">✨</span>
                <span>Moderno AI</span>
              </a>
              <a href="https://voice.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="moderno-focus hover:text-[var(--moderno-primary)] transition-colors flex items-center gap-1 rounded">
                <span aria-hidden="true">🎙️</span>
                <span>Voice AI</span>
              </a>
            </nav>
          </div>

          {/* Enterprise & Apps */}
          <div>
            <h4 className="text-[11px] font-black text-white/60 tracking-[0.2em] uppercase mb-4 font-sans">
              ENTERPRISE &amp; APPS
            </h4>
            <nav className="flex flex-col gap-2.5 text-xs font-bold text-[var(--moderno-text-muted)]">
              <a href="https://access.moderno.com.ar/" target="_blank" rel="noopener noreferrer" className="moderno-focus hover:text-[var(--moderno-primary)] transition-colors flex items-center gap-1 rounded">
                <span aria-hidden="true">🛡️</span>
                <span>Moderno Access</span>
              </a>
              <a href="https://one.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="moderno-focus hover:text-[var(--moderno-primary)] transition-colors flex items-center gap-1 rounded">
                <span aria-hidden="true">🏢</span>
                <span>Moderno One</span>
              </a>
              <a href="https://mercatto.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="moderno-focus hover:text-[var(--moderno-primary)] transition-colors flex items-center gap-1 rounded">
                <span aria-hidden="true">🛍️</span>
                <span>Mercatto</span>
              </a>
              <a href="https://ticket.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="moderno-focus hover:text-[var(--moderno-primary)] transition-colors flex items-center gap-1 rounded">
                <span aria-hidden="true">💬</span>
                <span>WaTicket CRM</span>
              </a>
              <a href="https://cleaner.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="moderno-focus hover:text-[var(--moderno-primary)] transition-colors flex items-center gap-1 rounded">
                <span aria-hidden="true">⚡</span>
                <span>AI Cleaner Pro</span>
              </a>
              <a href="https://weather.moderno.com.ar" target="_blank" rel="noopener noreferrer" className="moderno-focus hover:text-[var(--moderno-primary)] transition-colors flex items-center gap-1 rounded">
                <span aria-hidden="true">🌤️</span>
                <span>Moderno Weather</span>
              </a>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[11px] font-black text-white/60 tracking-[0.2em] uppercase mb-4 font-sans">
              LEGAL &amp; GITHUB
            </h4>
            <nav className="flex flex-col gap-2.5 text-xs font-bold text-[var(--moderno-text-muted)]">
              <a href="/privacidad" className="moderno-focus hover:text-[var(--moderno-primary)] transition-colors rounded">
                Política de Privacidad
              </a>
              <a href="/terminos" className="moderno-focus hover:text-[var(--moderno-primary)] transition-colors rounded">
                Términos y Condiciones
              </a>
              <a href="/seguridad" className="moderno-focus hover:text-[var(--moderno-primary)] transition-colors rounded">
                Seguridad &amp; Multi-Tenant
              </a>
              <a href="https://github.com/Breacorp" target="_blank" rel="noopener noreferrer" className="moderno-focus hover:text-[var(--moderno-primary)] transition-colors flex items-center gap-1 rounded">
                <span>GitHub Oficial</span>
                <span className="text-[10px]" aria-hidden="true">&nearr;</span>
              </a>
            </nav>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-light">
          <p>&copy; {currentYear} Moderno Tech. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2 text-[11px]">
            <span>Buenos Aires, Argentina</span>
            <span aria-hidden="true">&bull;</span>
            <span className="text-[var(--moderno-primary)] font-medium">Ecosistema Unificado</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
