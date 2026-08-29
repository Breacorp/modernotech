"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductItem } from "../types/products";
import { ProductBadge } from "./ProductBadge";
import { ProductIcon } from "./ProductIcon";

interface FeaturedProductProps {
  product: ProductItem;
}

interface DemoScenario {
  id: string;
  label: string;
  prompt: string;
  response: string;
  moduleTarget: string;
  executionTime: string;
}

const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: "finance",
    label: "Finanzas & One",
    prompt: "Sincronizar balance financiero del mes y conciliar pagos de Moderno Pay.",
    response: "Conectado con Moderno One y Moderno Pay: 1,420 transacciones conciliadas. Crecimiento neto del 24.3%. Reporte fiscal generado y cifrado con AES-256.",
    moduleTarget: "Moderno One + Pay",
    executionTime: "38ms",
  },
  {
    id: "cinema",
    label: "Audiovisual IA",
    prompt: "Generar storyboard cinemático 4K y renderizar voz hiperrealista para lanzamiento.",
    response: "Enviado a Cinema Studio AI: 6 tomas 4K generadas en formato anamórfico. Voz sincronizada con Moderno Voice AI en español neutro a 180ms de latencia.",
    moduleTarget: "Cinema Studio + Voice AI",
    executionTime: "42ms",
  },
  {
    id: "weather",
    label: "Telemetría & Clima",
    prompt: "Consultar radar meteorológico para la zona metropolitana y emitir alerta si llueve.",
    response: "Moderno Weather reporta: Frente frío aproximándose a 34 km/h. Probabilidad de precipitación 89% a las 18:40 hs. Alerta distribuida automáticamente a los usuarios.",
    moduleTarget: "Moderno Weather",
    executionTime: "24ms",
  },
  {
    id: "access",
    label: "Control de Acceso",
    prompt: "Auditar accesos del consorcio central y verificar llaves no autorizadas.",
    response: "Moderno Access reporta: 420 accesos registrados hoy. 0 anomalías. 2 llaves RFID revocadas por expiración programada de consorcio.",
    moduleTarget: "Moderno Access",
    executionTime: "19ms",
  },
];

export const FeaturedProduct: React.FC<FeaturedProductProps> = ({ product }) => {
  const [activeScenario, setActiveScenario] = useState<DemoScenario>(DEMO_SCENARIOS[0]);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSelectScenario = (scenario: DemoScenario) => {
    setIsSimulating(true);
    setActiveScenario(scenario);
    setTimeout(() => setIsSimulating(false), 300);
  };

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-20">
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,82,255,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative rounded-3xl border border-white/15 bg-gradient-to-br from-[#0B1530]/80 via-[#070D1E]/95 to-[#02050E] p-8 sm:p-12 md:p-16 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Decorative Grid Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(0,229,255,0.1)_0%,transparent_70%)] pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#00E5FF] uppercase font-bold">
                THE FUTURE OF MODERNO
              </span>
              <span className="text-white/20">&bull;</span>
              <span className="text-[11px] font-mono tracking-widest text-[#94A3B8] uppercase">
                FLAGSHIP COGNITIVE ENGINE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white flex items-center gap-4">
              {product.name}
              <ProductBadge status={product.status} size="md" />
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#94A3B8] max-w-2xl font-light leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-[#0052FF] hover:bg-[#0041CC] text-white text-xs font-bold tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(0,82,255,0.4)] hover:scale-105 active:scale-95 text-center flex items-center justify-center gap-2"
            >
              <span>{product.ctaText}</span>
              <span className="text-[#00E5FF]">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Interactive Agent Simulator / Capabilities Demo */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Preset Prompts & Capabilities */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-[#94A3B8] uppercase block mb-3">
                PRUEBA EN VIVO LA ORQUESTACIÓN COGNITIVA:
              </span>
              <div className="flex flex-col gap-2.5">
                {DEMO_SCENARIOS.map((scenario) => {
                  const isActive = activeScenario.id === scenario.id;
                  return (
                    <button
                      key={scenario.id}
                      onClick={() => handleSelectScenario(scenario)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-center justify-between cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] ${
                        isActive
                          ? "bg-[#0052FF]/20 border-[#00E5FF] text-white shadow-[0_0_20px_rgba(0,229,255,0.2)]"
                          : "bg-white/5 border-white/5 text-[#94A3B8] hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full ${isActive ? "bg-[#00E5FF] animate-ping" : "bg-[#64748B]"}`} />
                        <span className="font-semibold">{scenario.label}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#64748B]">{scenario.moduleTarget}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Performance Metric Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] font-mono text-[#94A3B8] uppercase block">LATENCIA INFERENCIA</span>
                <span className="text-xl font-bold font-mono text-[#00E5FF]">&lt; 45ms</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] font-mono text-[#94A3B8] uppercase block">AISLAMIENTO TENANT</span>
                <span className="text-xl font-bold font-mono text-[#38BDF8]">Zero-Share</span>
              </div>
            </div>
          </div>

          {/* Right Column: Simulated Live Console */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl bg-[#040814] border border-white/10 p-6 shadow-inner">
            <div>
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5 text-[11px] font-mono text-[#64748B]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-[#94A3B8]">moderno-ai-agent-session://v3</span>
                </div>
                <span className="text-[#00E5FF]">{activeScenario.executionTime}</span>
              </div>

              {/* Terminal Body */}
              <div className="mt-6 space-y-5 font-mono text-xs">
                {/* User Prompt */}
                <div className="flex items-start gap-3">
                  <span className="text-[#00E5FF] select-none">&gt;</span>
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase block">INSTRUCCIÓN DE USUARIO:</span>
                    <p className="text-white mt-1 leading-relaxed">{activeScenario.prompt}</p>
                  </div>
                </div>

                {/* AI Agent Response */}
                <div className="flex items-start gap-3 pt-4 border-t border-white/5">
                  <div className="w-5 h-5 rounded-md bg-[#0052FF]/30 flex items-center justify-center text-[#00E5FF] mt-0.5 shrink-0">
                    <ProductIcon name="sparkles" className="w-3.5 h-3.5" />
                  </div>
                  <div className="w-full">
                    <span className="text-[10px] text-[#38BDF8] uppercase block font-bold">MODERNO AI ORCHESTRATOR:</span>
                    <AnimatePresence mode="wait">
                      {isSimulating ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2 mt-2 text-[#94A3B8]"
                        >
                          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
                          <span>Procesando nodos del ecosistema...</span>
                        </motion.div>
                      ) : (
                        <motion.p
                          key={activeScenario.id}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-[#94A3B8] mt-2 leading-relaxed text-xs"
                        >
                          {activeScenario.response}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status bar */}
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#64748B]">
              <span className="text-[#10B981] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                STREAMING COMPLETED
              </span>
              <span>MODERNO PROTOCOL v3.4</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
