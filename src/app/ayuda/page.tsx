"use client";

import React, { useState } from "react";
import { ModernoBackground } from "../../components/ModernoBackground";
import { ModernoNavbar } from "../../components/ModernoNavbar";
import { Footer } from "../../components/Footer";

interface FAQItem {
  q: string;
  a: string;
  category: "licencias" | "cleaner" | "play" | "access" | "general";
}

const FAQS: FAQItem[] = [
  {
    category: "licencias",
    q: "¿Cómo activo mi clave de licencia de Moderno AI Cleaner Pro?",
    a: "Tras completar tu compra, recibirás un correo con tu clave en formato MODERNO-XXXX-XXXX-XXXX. Podés ingresarla directamente en la aplicación de escritorio en el botón 'Activar Licencia' o en nuestra web en la sección /pricing."
  },
  {
    category: "licencias",
    q: "¿En cuántas computadoras Mac puedo usar mi licencia?",
    a: "La Licencia Anual incluye activación simultánea en hasta 3 Macs personales. La Licencia Lifetime permite hasta 5 Macs. Para empresas y estudios con más de 5 equipos, disponemos del plan Team / Studio."
  },
  {
    category: "cleaner",
    q: "¿Qué sucede si borro un archivo por error con AI Cleaner Pro?",
    a: "Moderno AI Cleaner Pro cuenta con el 'Rollback Center Total'. Antes de cualquier purga o desinstalación, el sistema genera un snapshot atómico. Podés restaurar cualquier archivo o estado anterior con 1 solo clic desde el panel de Rollback."
  },
  {
    category: "cleaner",
    q: "¿Es compatible con procesadores Apple Silicon M1, M2, M3 y M4?",
    a: "Sí. Moderno AI Cleaner Pro es una aplicación binaria universal nativa optimizada tanto para Apple Silicon (M1, M2, M3, M4) como para equipos con procesadores Intel."
  },
  {
    category: "play",
    q: "¿Qué requisitos de conexión necesito para jugar en Moderno Play a 60 FPS?",
    a: "Moderno Play corre en nuestros servidores de baja latencia en Buenos Aires. Con una conexión de banda ancha de al menos 15 Mbps obtenés una experiencia fluida a 60 FPS con ~12ms de respuesta."
  },
  {
    category: "access",
    q: "¿Qué marcas de molinetes y cerraduras soporta Moderno Access?",
    a: "Moderno Access es compatible de forma nativa con hardware de Hikvision, Dahua, ZKTeco y PCT, soportando lectores RFID, NFC, reconocimiento facial y aperturas por código QR dinámico con cifrado E2E."
  },
  {
    category: "general",
    q: "¿Cómo funciona la garantía de reembolso?",
    a: "Ofrecemos una garantía incondicional de devolución de dinero por 30 días en todas las licencias de software de Moderno Tech. Si no estás 100% satisfecho, contactanos y te reembolsamos el total de tu compra."
  }
];

export default function AyudaPage() {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = FAQS.filter(item => {
    const matchesCat = selectedCat === "all" || item.category === selectedCat;
    const matchesSearch = search === "" || item.q.toLowerCase().includes(search.toLowerCase()) || item.a.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
      <ModernoBackground />
      <ModernoNavbar />

      <main className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 pt-32 sm:pt-36 pb-24 select-none">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-bold text-[#00E5FF] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="tracking-[0.2em] uppercase">CENTRO DE AYUDA // SOPORTE OFICIAL</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white font-sans tracking-tight">
            ¿Cómo podemos ayudarte?
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-2">
            Encontrá respuestas rápidas sobre licencias, activación, Moderno Play, Access y facturación.
          </p>

          {/* Search Box */}
          <div className="mt-8 relative max-w-lg mx-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar pregunta o tema..."
              className="w-full px-5 py-3 pl-11 rounded-2xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-[#64748B] text-xs font-medium focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all backdrop-blur-md"
            />
            <svg
              className="w-4 h-4 text-[#00E5FF] absolute left-4 top-1/2 -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "Todas las preguntas" },
              { id: "licencias", label: "Licencias & Claves" },
              { id: "cleaner", label: "AI Cleaner Pro" },
              { id: "play", label: "Moderno Play" },
              { id: "access", label: "Moderno Access" },
              { id: "general", label: "Facturación & Garantía" }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCat === cat.id
                    ? "bg-white/[0.12] text-white border border-[#00E5FF]/40 shadow-sm"
                    : "bg-white/[0.03] text-[#94A3B8] hover:text-white border border-transparent"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-[#0B0B10] border border-white/[0.08] overflow-hidden transition-colors hover:border-white/[0.15]"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-sm font-bold text-white/90">{faq.q}</span>
                  <span className={`text-base text-[#00E5FF] transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs text-[#94A3B8] font-light leading-relaxed border-t border-white/[0.04]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Support Direct Card */}
        <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-[#0B0B10] border border-white/[0.08] text-center flex flex-col items-center justify-center">
          <div className="text-3xl mb-3">💬</div>
          <h3 className="text-lg font-black text-white mb-1">¿No encontraste lo que buscabas?</h3>
          <p className="text-xs text-[#94A3B8] font-light max-w-md mb-6">
            Nuestro equipo de soporte técnico responde en menos de 4 horas hábiles.
          </p>
          <a
            href="mailto:contacto@moderno.com.ar?subject=Consulta%20Soporte%20Moderno%20Tech"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider transition-transform hover:scale-105 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
          >
            Enviar Mensaje a Soporte &rarr;
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
