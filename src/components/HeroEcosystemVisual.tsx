"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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
  status: string;
  url: string;
}

const NODES: EcosystemNode[] = [
  { id: "cloud", name: "Moderno Cloud", tagline: "Almacenamiento & Bóveda Familiar", category: "Cloud", icon: "cloud", color: "#00E5FF", x: 18, y: 22, status: "AVAILABLE", url: "https://cloud.moderno.com.ar/" },
  { id: "access", name: "Moderno Access", tagline: "Control de Acceso & Consorcios", category: "Seguridad", icon: "shield", color: "#3B82F6", x: 82, y: 22, status: "AVAILABLE", url: "https://access.moderno.com.ar/" },
  { id: "play", name: "Moderno Play", tagline: "Cloud Gaming 60 FPS", category: "Gaming", icon: "gamepad", color: "#00E5FF", x: 84, y: 74, status: "AVAILABLE", url: "https://play.moderno.com.ar/" },
  { id: "ai", name: "Moderno AI", tagline: "Motor Cognitivo & Agentes", category: "IA", icon: "sparkles", color: "#0052FF", x: 50, y: 10, status: "AVAILABLE", url: "https://ai.moderno.com.ar" },
  { id: "one", name: "Moderno One", tagline: "ERP & Operaciones", category: "Empresas", icon: "building", color: "#157BFF", x: 16, y: 76, status: "AVAILABLE", url: "https://one.moderno.com.ar" },
  { id: "cleaner", name: "Moderno Cleaner", tagline: "Optimización de Hardware", category: "Productividad", icon: "cpu", color: "#00C8FF", x: 50, y: 88, status: "AVAILABLE", url: "https://cleaner.moderno.com.ar" },
];

export const HeroEcosystemVisual: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string>("access");

  const selected = NODES.find((n) => n.id === activeNode) || NODES[0];

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-12 mb-6 h-[460px] sm:h-[500px] rounded-2xl border border-white/[0.08] bg-[#0B0B10]/80 backdrop-blur-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-6 sm:p-8 flex flex-col justify-between select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Interconnecting SVG Network */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="meshGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dynamic Lines connecting Central Core to Nodes */}
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
              {isCurrent && (
                <circle r="4" fill="#00E5FF" filter="url(#meshGlow)">
                  <animateMotion
                    path={`M 0 0 L ${node.x - 50} ${node.y - 50}`}
                    dur="1.6s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.06] pb-3 text-[11px] font-mono text-white/50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
          <span className="text-[#00E5FF] font-bold tracking-widest uppercase">
            MODERNO MESH // RED SINÉRGICA
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span>BUENOS AIRES (12ms)</span>
          <span>&bull;</span>
          <span className="text-emerald-400 font-semibold">ALL SYSTEMS ONLINE</span>
        </div>
      </div>

      {/* Center Moderno Core Hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.04, 1],
            boxShadow: [
              "0 0 25px rgba(0,229,255,0.3)",
              "0 0 45px rgba(21,123,255,0.5)",
              "0 0 25px rgba(0,229,255,0.3)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#050507] border-2 border-[#00E5FF]/50 flex flex-col items-center justify-center p-2 text-center shadow-2xl"
        >
          <span className="text-[9px] font-extrabold tracking-[0.25em] text-[#00E5FF] uppercase">
            MODERNO
          </span>
          <span className="text-sm sm:text-base font-black tracking-wider text-white uppercase font-sans">
            HUB
          </span>
          <span className="text-[8px] font-mono text-white/40 mt-0.5">SISTEMA CENTRAL</span>
        </motion.div>
      </div>

      {/* Interactive Peripheral Product Nodes */}
      {NODES.map((node) => {
        const isSelected = activeNode === node.id;
        return (
          <button
            key={node.id}
            onClick={() => setActiveNode(node.id)}
            onMouseEnter={() => setActiveNode(node.id)}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            className={`absolute z-30 group p-2.5 sm:p-3 rounded-2xl border transition-all duration-300 flex items-center gap-2.5 cursor-pointer backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] ${
              isSelected
                ? "bg-[#0B0B10] border-[#00E5FF] shadow-[0_0_30px_rgba(0,229,255,0.35)] scale-105"
                : "bg-[#050507]/90 border-white/[0.08] hover:border-white/20 hover:bg-[#0B0B10]"
            }`}
            aria-label={`Seleccionar ${node.name}`}
          >
            <div
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center border border-white/10 text-white font-black text-xs shadow-sm"
              style={{
                backgroundColor: isSelected ? `${node.color}33` : "rgba(255,255,255,0.04)",
                color: isSelected ? node.color : "#94A3B8",
              }}
            >
              <ProductIcon name={node.icon} className="w-4 h-4" />
            </div>
            <div className="text-left hidden sm:flex flex-col">
              <span className="text-xs font-black text-white leading-none whitespace-nowrap">
                {node.name}
              </span>
              <span className="text-[9px] font-mono text-white/40 whitespace-nowrap mt-0.5">
                {node.category}
              </span>
            </div>
          </button>
        );
      })}

      {/* Bottom Live Inspector Detail Bar */}
      <div className="relative z-10 bg-[#050507]/95 border border-white/[0.08] rounded-xl p-3.5 sm:p-4 flex items-center justify-between backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 shadow-sm"
            style={{ backgroundColor: `${selected.color}25`, color: selected.color }}
          >
            <ProductIcon name={selected.icon} className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs sm:text-sm font-black text-white">{selected.name}</h4>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/[0.04] text-[#00E5FF] border border-[#00E5FF]/30">
                {selected.status}
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] font-light line-clamp-1">{selected.tagline}</p>
          </div>
        </div>

        <a
          href={selected.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider transition-transform hover:scale-105 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
        >
          <span>Abrir</span>
          <span>&rarr;</span>
        </a>
      </div>
    </div>
  );
};
