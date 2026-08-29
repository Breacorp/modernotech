"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function AIHighlightSection() {
  const aiProducts = [
    {
      id: 'nova-ai',
      name: 'Nova AI',
      subtitle: 'Copiloto & Inteligencia Conversacional',
      description: 'Plataforma central de inteligencia artificial conversacional, copilotos predictivos y automatizaciones de flujos de trabajo.',
      url: 'https://nova.moderno.com.ar',
      status: 'Disponible',
      statusClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      badge: 'Core Engine'
    },
    {
      id: 'cinema-studio',
      name: 'Cinema Studio',
      subtitle: 'Generación Audiovisual con IA',
      description: 'Suite creativa asistida por IA para la generación y posproducción cinematográfica de imágenes y video fotorrealista.',
      url: 'https://cinema.moderno.com.ar',
      status: 'En desarrollo',
      statusClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      badge: 'Visual AI'
    },
    {
      id: 'voice-ai',
      name: 'Voice AI',
      subtitle: 'Agentes Telefónicos Inteligentes',
      description: 'Agentes de voz hiperrealistas capaces de atender llamadas telefónicas, agendar citas y realizar gestión comercial 24/7.',
      url: 'https://voice.moderno.com.ar',
      status: 'En desarrollo',
      statusClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      badge: 'Voice AI'
    },
    {
      id: 'nova-home',
      name: 'Nova Home',
      subtitle: 'Inteligencia para Espacios y Hogar',
      description: 'Solución independiente de inteligencia artificial para la automatización, monitoreo y gestión inteligente del entorno.',
      url: 'https://home.moderno.com.ar',
      status: 'En desarrollo',
      statusClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      badge: 'Smart Home'
    }
  ];

  return (
    <section id="inteligencia-artificial" className="relative z-10 py-28 border-t border-white/5 bg-gradient-to-b from-[#070d1e] via-[#0b1633] to-[#070d1e] overflow-hidden">
      {/* Background neon blur accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#0052FF]/20 via-[#00a8ff]/20 to-[#0052FF]/20 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#00a8ff] font-bold bg-[#00a8ff]/10 border border-[#00a8ff]/20 px-4 py-1.5 rounded-full inline-block mb-4">
              Área Estratégica
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Inteligencia Artificial de Moderno Tech
            </h2>
            <p className="text-base text-[#9ab0d3] mt-4 leading-relaxed font-light">
              Desarrollamos y conectamos aplicaciones de vanguardia en IA conversacional, síntesis de voz, generación audiovisual y entornos inteligentes.
            </p>
          </div>

          <div className="glossy-panel p-4 flex items-center gap-4 border-[#00a8ff]/30">
            <div className="h-10 w-10 rounded-lg bg-[#00a8ff]/15 flex items-center justify-center text-[#00a8ff]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Innovación Continua</span>
              <span className="text-[10px] text-[#9ab0d3] font-mono uppercase">Multi-Model AI Infrastructure</span>
            </div>
          </div>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {aiProducts.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glossy-panel p-8 relative overflow-hidden group hover:border-[#00a8ff]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#00a8ff] tracking-wider uppercase bg-[#00a8ff]/10 px-3 py-1 rounded-full border border-[#00a8ff]/20">
                    {item.badge}
                  </span>
                  <span className={`text-[10px] font-semibold border px-2.5 py-1 rounded-full uppercase tracking-wider ${item.statusClass}`}>
                    {item.status}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white group-hover:text-[#00f0ff] transition-colors mb-1">
                  {item.name}
                </h3>
                <span className="text-xs text-[#9ab0d3] font-mono block mb-4">
                  {item.subtitle}
                </span>

                <p className="text-xs text-[#9ab0d3] leading-relaxed font-light mb-8">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <a
                  href={item.url}
                  target={item.url.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-white group-hover:text-[#00f0ff] flex items-center gap-2 transition-colors"
                >
                  <span>Conocer {item.name}</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <span className="text-[10px] text-white/30 font-mono">
                  {item.url.replace('https://', '')}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
