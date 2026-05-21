"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";

interface ServiceMetadata {
  id: string;
  name: string;
  subdomain: string;
  description: string;
  icon: React.ReactNode;
  url: string;
}

// Spotlight Card component utilizing Framer Motion's high-speed reactive CSS variables
function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative glossy-panel p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[#00a8ff]/40 hover:shadow-[0_25px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(0,82,255,0.1)] ${className}`}
    >
      {/* Glossy inner glow spotlight follow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 group-hover:opacity-100 transition duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              320px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 168, 255, 0.08),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </motion.article>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Global mouse coordinates for the viewport glow spotlight
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        containerRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
        containerRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, []);

  // Subtle Hero Parallax scroll transformations
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, 60]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const services: ServiceMetadata[] = [
    {
      id: "hosting",
      name: "Hosting Premium",
      subdomain: "hosting.moderno.com.ar",
      description: "Infraestructura cloud ultrarrápida y hosting reseller SSD diseñado para máxima disponibilidad y velocidad de respuesta.",
      url: "https://hosting.moderno.com.ar",
      icon: (
        <svg className="w-6 h-6 text-[#00a8ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      )
    },
    {
      id: "access",
      name: "Moderno Access",
      subdomain: "access.moderno.com.ar",
      description: "Control de accesos inteligentes, seguridad y registros de actividad para condominios e infraestructura corporativa.",
      url: "https://access.moderno.com.ar",
      icon: (
        <svg className="w-6 h-6 text-[#0052FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: "cinema",
      name: "Cinema Studio AI",
      subdomain: "cinema.moderno.com.ar",
      description: "Suite creativa premium para generación y posproducción cinematográfica de imágenes y video fotorrealista con Inteligencia Artificial.",
      url: "https://cinema.moderno.com.ar",
      icon: (
        <svg className="w-6 h-6 text-[#00a8ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: "voice",
      name: "Voice AI",
      subdomain: "voice.moderno.com.ar",
      description: "Agentes de conversación telefónica por voz hiperrealistas que atienden y gestionan procesos comerciales 24/7 sin latencia.",
      url: "https://voice.moderno.com.ar",
      icon: (
        <svg className="w-6 h-6 text-[#0052FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      )
    },
    {
      id: "nova",
      name: "Nova AI",
      subdomain: "nova.moderno.com.ar",
      description: "Plataforma central de inteligencia artificial conversacional, copilotos predictivos y automatizaciones de flujos de trabajo.",
      url: "https://nova.moderno.com.ar",
      icon: (
        <svg className="w-6 h-6 text-[#00a8ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 .364l-.707 .707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      id: "code",
      name: "Moderno AI Code",
      subdomain: "code.moderno.com.ar",
      description: "Entorno de desarrollo inteligente asistido por IA para compilación rápida de código y refactorización de software empresarial.",
      url: "https://code.moderno.com.ar",
      icon: (
        <svg className="w-6 h-6 text-[#0052FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      id: "gamestudio",
      name: "Game Studio",
      subdomain: "gamestudio.moderno.com.ar",
      description: "Plataforma de compilación, hosting y renderizado de experiencias WebGL interactivas de alta frecuencia y baja latencia.",
      url: "https://gamestudio.moderno.com.ar",
      icon: (
        <svg className="w-6 h-6 text-[#00a8ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    },
    {
      id: "academy",
      name: "Academy",
      subdomain: "academy.moderno.com.ar",
      description: "Academia virtual interactiva con programas de especialización técnica en Inteligencia Artificial, arquitectura cloud y desarrollo.",
      url: "https://academy.moderno.com.ar",
      icon: (
        <svg className="w-6 h-6 text-[#0052FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479L12 20l-6.825-3.943a12.083 12.083 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      )
    },
    {
      id: "catalog",
      name: "Catalog Cloner",
      subdomain: "catalog.moderno.com.ar",
      description: "Sincronizador automático y clonador inteligente de catálogos comerciales y bases de datos ecommerce en tiempo real.",
      url: "https://catalog.moderno.com.ar",
      icon: (
        <svg className="w-6 h-6 text-[#00a8ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      )
    },
    {
      id: "support",
      name: "Soporte ML",
      subdomain: "support.moderno.com.ar",
      description: "Motor de automatización y gestión de respuestas inteligentes optimizadas para tiendas de comercio electrónico y Mercado Libre.",
      url: "https://support.moderno.com.ar",
      icon: (
        <svg className="w-6 h-6 text-[#0052FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: "ticket",
      name: "Ticket CRM",
      subdomain: "ticket.moderno.com.ar",
      description: "CRM omnicanal para centralizar chats, organizar soporte y automatizar asignaciones de tickets de clientes.",
      url: "https://ticket.moderno.com.ar",
      icon: (
        <svg className="w-6 h-6 text-[#00a8ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      id: "tienda",
      name: "Ecommerce / Tienda",
      subdomain: "tienda.moderno.com.ar",
      description: "Portal de comercio electrónico de gadgets exclusivos, hardware avanzado y lifestyle tecnológico en Tienda Nube.",
      url: "https://tienda.moderno.com.ar",
      icon: (
        <svg className="w-6 h-6 text-[#0052FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    }
  ];

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("ecosistema-grid");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen selection:bg-[#0052FF] selection:text-white overflow-hidden bg-[#070d1e]"
    >
      {/* 3D Active Layered Backgrounds */}
      <div className="ambient-container">
        <div className="orb-1" />
        <div className="orb-2" />
        <div className="orb-3" />
        <div className="cyber-grid" />
      </div>

      {/* Global Mouse Tracking Spotlight */}
      <div className="mouse-spotlight-global" />

      {/* Glossy Header Access Style */}
      <header className="sticky top-0 z-50 w-full bg-[#070d1e]/65 backdrop-blur-xl border-b border-[#0052FF]/20 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Moderno Logo" 
              className="w-5 h-5 object-contain filter drop-shadow-[0_0_8px_rgba(0,168,255,0.45)] transition-transform duration-500 hover:scale-105" 
            />
            <div className="flex items-center gap-2">
              <span className="text-sm font-black tracking-[0.25em] text-white">MODERNO</span>
              <span className="text-[10px] uppercase text-[#9ab0d3] tracking-widest font-semibold border-l border-white/10 pl-2">Style & Tech</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs text-[#9ab0d3] font-medium">
            <a href="#ecosistema-grid" onClick={handleExploreClick} className="hover:text-white transition-colors">Ecosistema</a>
            <a href="https://hosting.moderno.com.ar" className="hover:text-white transition-colors">Hosting</a>
            <a href="https://access.moderno.com.ar" className="hover:text-white transition-colors">Security</a>
            <a href="https://cinema.moderno.com.ar" className="hover:text-white transition-colors">Cinema AI</a>
          </nav>

          <div>
            <a
              href="#ecosistema-grid"
              onClick={handleExploreClick}
              className="text-[11px] bg-[#0052FF]/15 hover:bg-[#0052FF]/25 text-white border border-[#0052FF]/30 px-5 py-2 rounded-full font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_15px_rgba(0,82,255,0.2)]"
            >
              Conectarse
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section with Dimensional Halo & Floating Glass Tiles */}
      <motion.section 
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 text-center flex flex-col items-center justify-center min-h-[80vh] overflow-visible"
      >
        {/* Decorative dimensional elements to feel like a visual portal */}
        <div className="hidden lg:block absolute -left-12 top-1/4 glossy-panel p-6 opacity-25 text-[9px] font-mono tracking-widest text-[#00a8ff] border-[#0052FF]/20 -rotate-12 transform scale-90">
          <p>SYS.SEC.GATEWAYS: ACTIVE</p>
          <p className="mt-1 text-white/50">SECURE CONNECT PROTOCOL</p>
        </div>
        <div className="hidden lg:block absolute -right-12 bottom-1/4 glossy-panel p-6 opacity-25 text-[9px] font-mono tracking-widest text-[#00a8ff] border-[#0052FF]/20 rotate-12 transform scale-90">
          <p>MODERNOACCESS: LAUNCHED</p>
          <p className="mt-1 text-white/50">PORT: 3009 // EDGE NODE</p>
        </div>

        {/* Luminous Title Halo behind MODERNO */}
        <div className="relative">
          <div className="title-halo" />
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-7xl sm:text-9xl font-black tracking-[0.2em] text-white leading-none pl-[0.2em] drop-shadow-[0_0_35px_rgba(0,82,255,0.2)]"
          >
            MODERNO
          </motion.h1>
        </div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="text-xs sm:text-base md:text-lg font-light text-[#9ab0d3] tracking-[0.2em] uppercase mt-10 mb-16"
        >
          “Tecnología diseñada para destacar.”
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#ecosistema-grid"
            onClick={handleExploreClick}
            className="w-full sm:w-auto px-10 py-4 bg-[#0052FF] hover:bg-[#003ECC] text-white text-xs uppercase tracking-widest font-bold rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#0052FF]/30 border border-white/5"
          >
            Explorar Ecosistema
          </a>
          <a
            href="https://hosting.moderno.com.ar"
            className="w-full sm:w-auto px-10 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs uppercase tracking-widest font-bold rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Soporte Técnico
          </a>
        </motion.div>
      </motion.section>

      {/* Grid de Servicios Section */}
      <section id="ecosistema-grid" className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-white/5 bg-[#070d1e]/40">
        <div className="text-center max-w-xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.2em] text-[#00a8ff] font-bold">Nuestra Suite</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">Plataformas y Soluciones</h2>
          <p className="text-sm text-[#9ab0d3] mt-3">Selecciona el módulo del ecosistema que deseas lanzar. Serás redirigido al instante de forma segura.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <SpotlightCard key={service.id}>
              <div>
                <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:border-[#00a8ff]/30">
                  {service.icon}
                </div>
                
                <span className="text-[10px] font-mono font-bold text-[#9ab0d3] tracking-wider uppercase">{service.subdomain}</span>
                <h3 className="text-lg font-bold text-white mt-1 mb-3 transition-colors duration-300 group-hover:text-[#00f0ff]">{service.name}</h3>
                <p className="text-xs text-[#9ab0d3] leading-relaxed mb-6">{service.description}</p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <a
                  href={service.url}
                  className="text-xs font-bold text-white hover:text-[#00f0ff] flex items-center gap-1 transition-colors"
                >
                  Entrar 
                  <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <span className="text-[9px] bg-white/5 border border-white/10 text-white/50 px-2 py-0.5 rounded uppercase font-mono">Redirect</span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Signature Minimalist Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-[#050a15]/95 py-24 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-8">
          <img 
            src="/logo.png" 
            alt="Moderno Logo" 
            className="w-8 h-8 object-contain filter drop-shadow-[0_0_12px_rgba(0,168,255,0.3)] opacity-80" 
          />
          
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 justify-center">
              <span className="text-sm font-extrabold tracking-[0.3em] text-white">MODERNO</span>
              <span className="text-xs uppercase text-[#9ab0d3] tracking-widest font-light border-l border-white/10 pl-2">Style & Tech</span>
            </div>
            
            <p className="text-xs font-light text-[#9ab0d3]/60 tracking-[0.15em] uppercase mt-2">
              “Tecnología diseñada para destacar.”
            </p>
          </div>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#0052FF]/20 to-transparent my-2" />

          <div className="text-[9px] text-white/20 font-mono tracking-widest uppercase">
            &copy; 2026 MODERNO STYLE & TECH. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
