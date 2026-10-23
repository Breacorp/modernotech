"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ProductIcon } from "./ProductIcon";

interface EcosystemNode {
  id: string;
  name: string;
  tagline: string;
  category: string;
  icon: string;
  color: string;
  x: number; // percentage
  y: number;
  status: "DISPONIBLE" | "BETA" | "PRÓXIMAMENTE" | "BETA PRIVADA";
  url: string;
}

const NODES: EcosystemNode[] = [
  { id: "one", name: "Moderno One", tagline: "Plataforma ERP & Operaciones", category: "Empresas", icon: "building", color: "#157BFF", x: 14, y: 72, status: "DISPONIBLE", url: "https://one.moderno.com.ar" },
  { id: "access", name: "Moderno Access", tagline: "Control de Acceso & Consorcios", category: "Seguridad", icon: "shield", color: "#3B82F6", x: 84, y: 30, status: "DISPONIBLE", url: "https://access.moderno.com.ar/" },
  { id: "cloud", name: "Moderno Cloud", tagline: "Almacenamiento & Bóveda Familiar", category: "Cloud", icon: "cloud", color: "#00E5FF", x: 16, y: 30, status: "DISPONIBLE", url: "https://cloud.moderno.com.ar/" },
  { id: "ai", name: "Moderno AI", tagline: "Automatización & Agentes IA", category: "IA", icon: "sparkles", color: "#0052FF", x: 50, y: 18, status: "DISPONIBLE", url: "https://ai.moderno.com.ar" },
  { id: "play", name: "Moderno Play", tagline: "Cloud Gaming 60 FPS & Retro", category: "Gaming", icon: "gamepad", color: "#00E5FF", x: 86, y: 72, status: "DISPONIBLE", url: "https://play.moderno.com.ar/" },
  { id: "cinema", name: "Cinema Studio", tagline: "Generación Audiovisual IA", category: "IA Cine", icon: "film", color: "#157BFF", x: 68, y: 78, status: "BETA", url: "https://cinema.moderno.com.ar" },
  { id: "mercatto", name: "Mercatto", tagline: "Comercio & Marketplace Digital", category: "Comercio", icon: "credit-card", color: "#38BDF8", x: 32, y: 78, status: "DISPONIBLE", url: "https://mercatto.moderno.com.ar" },
];

export const HeroEcosystemVisual: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string>("access");
  const shouldReduceMotion = useReducedMotion();

  const selected = NODES.find((n) => n.id === activeNode) || NODES[0];

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-12 mb-6 h-[440px] sm:h-[500px] rounded-2xl border border-white/[0.08] bg-[var(--moderno-surface-card)]/80 backdrop-blur-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-5 sm:p-8 flex flex-col justify-between select-none">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Interconnecting SVG network */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter id="meshGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {NODES.map((node) => {
          const isCurrent = activeNode === node.id;
          return (
            <g key={node.id}>
              <line
                x1="50%"
                y1="50%"
                x2={`${node.x}%`}
                y2={`${node.y}%`}
                stroke={isCurrent ? "#00E5FF" : "rgba(255,255,255,0.1)"}
                strokeWidth={isCurrent ? "2" : "1"}
                strokeDasharray={isCurrent ? "none" : "4 4"}
                className="transition-all duration-300"
              />
              {isCurrent && !shouldReduceMotion && (
                <circle r="4" fill="#00E5FF" filter="url(#meshGlow)">
                  <animate
                    attributeName="cx"
                    values={`50%;${node.x}%`}
                    dur="1.6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    values={`50%;${node.y}%`}
                    dur="1.6s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Telemetry header */}
      <div className="relative z-10 flex items-center justify-between gap-3 border-b border-white/[0.06] pb-3 text-[11px] font-mono text-white/55">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-[var(--moderno-primary)] animate-pulse shrink-0" aria-hidden="true" />
          <span className="text-[var(--moderno-primary)] font-bold tracking-widest uppercase truncate">
            ECOSISTEMA MODERNO // RED INTEGRADA
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <span>SERVIDORES LOCALES</span>
          <span aria-hidden="true">&bull;</span>
          <span className="text-emerald-400 font-semibold">SISTEMAS OPERATIVOS</span>
        </div>
      </div>

      {/* Center hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1, 1.04, 1],
                  boxShadow: [
                    "0 0 25px rgba(0,229,255,0.3)",
                    "0 0 45px rgba(21,123,255,0.5)",
                    "0 0 25px rgba(0,229,255,0.3)",
                  ],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[var(--moderno-background-alt)] border-2 border-[var(--moderno-primary)]/50 flex flex-col items-center justify-center p-2 text-center shadow-2xl"
        >
          <span className="text-[10px] font-extrabold tracking-[0.25em] text-[var(--moderno-primary)] uppercase">
            MODERNO
          </span>
          <span className="text-sm sm:text-base font-black tracking-wider text-white uppercase font-sans">
            HUB
          </span>
          <span className="text-[10px] font-mono text-white/55 mt-0.5">SISTEMA CENTRAL</span>
        </motion.div>
      </div>

      {/* Peripheral nodes */}
      {NODES.map((node) => {
        const isSelected = activeNode === node.id;
        return (
          <button
            key={node.id}
            type="button"
            onClick={() => setActiveNode(node.id)}
            onMouseEnter={() => setActiveNode(node.id)}
            onFocus={() => setActiveNode(node.id)}
            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
            aria-pressed={isSelected}
            aria-label={`Seleccionar ${node.name}`}
            className={`moderno-focus absolute z-30 group p-2.5 sm:p-3 rounded-2xl border transition-all duration-300 flex items-center gap-2.5 cursor-pointer backdrop-blur-md ${
              isSelected
                ? "bg-[var(--moderno-surface-card)] border-[var(--moderno-primary)] shadow-[0_0_30px_rgba(0,229,255,0.35)] scale-105"
                : "bg-[var(--moderno-background-alt)]/90 border-white/[0.08] hover:border-white/20 hover:bg-[var(--moderno-surface-card)]"
            }`}
          >
            <span
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center border border-white/10 text-white font-black text-xs shadow-sm"
              style={{
                backgroundColor: isSelected ? `${node.color}33` : "rgba(255,255,255,0.04)",
                color: isSelected ? node.color : "#94A3B8",
              }}
            >
              <ProductIcon name={node.icon} className="w-4 h-4" />
            </span>
            <span className="text-left hidden sm:flex flex-col">
              <span className="text-xs font-black text-white leading-none whitespace-nowrap">
                {node.name}
              </span>
              <span className="text-[10px] font-mono text-white/55 whitespace-nowrap mt-0.5">
                {node.category}
              </span>
            </span>
          </button>
        );
      })}

      {/* Inspector */}
      <div className="relative z-40 bg-[var(--moderno-background-alt)]/95 border border-white/[0.08] rounded-xl p-3.5 sm:p-4 flex items-center justify-between gap-3 backdrop-blur-xl">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 shadow-sm shrink-0"
            style={{ backgroundColor: `${selected.color}25`, color: selected.color }}
          >
            <ProductIcon name={selected.icon} className="w-5 h-5" />
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black text-white truncate">
                {selected.name}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/[0.04] text-[var(--moderno-primary)] border border-[var(--moderno-primary)]/30 shrink-0">
                {selected.status}
              </span>
            </span>
            <span className="block text-xs text-[var(--moderno-text-muted)] font-light line-clamp-1">
              {selected.tagline}
            </span>
          </span>
        </div>

        <a
          href={selected.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Abrir ${selected.name}`}
          className="moderno-focus inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--moderno-primary)] to-[var(--moderno-primary-light)] text-black text-xs font-black tracking-wider transition-transform hover:scale-105 shadow-[0_0_15px_rgba(0,229,255,0.3)] shrink-0"
        >
          <span className="hidden sm:inline">Abrir</span>
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  );
};
