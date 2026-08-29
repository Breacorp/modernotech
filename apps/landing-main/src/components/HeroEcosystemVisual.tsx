"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ProductIcon } from "./ProductIcon";

interface NodeData {
  id: string;
  name: string;
  tagline: string;
  category: string;
  icon: string;
  color: string;
  x: number; // percentage in grid
  y: number;
  status: string;
}

const NODES: NodeData[] = [
  { id: "ai", name: "Moderno AI", tagline: "Inferencia Cognitiva", category: "AI", icon: "sparkles", color: "#0052FF", x: 22, y: 22, status: "AVAILABLE" },
  { id: "one", name: "Moderno One", tagline: "Core ERP & Finanzas", category: "BUSINESS", icon: "building", color: "#0070F3", x: 78, y: 20, status: "AVAILABLE" },
  { id: "play", name: "Moderno Play", tagline: "Gaming & Streaming", category: "ENTERTAINMENT", icon: "gamepad", color: "#00E5FF", x: 84, y: 72, status: "AVAILABLE" },
  { id: "weather", name: "Moderno Weather", tagline: "Radar & Clima", category: "WEATHER", icon: "cloud-sun", color: "#38BDF8", x: 16, y: 75, status: "BETA" },
  { id: "pay", name: "Moderno Pay", tagline: "Checkout & Pagos", category: "BUSINESS", icon: "credit-card", color: "#6366F1", x: 50, y: 88, status: "COMING SOON" },
  { id: "crm", name: "Moderno CRM", tagline: "WaTicket Omnicanal", category: "SOFTWARE", icon: "message-square", color: "#10B981", x: 50, y: 8, status: "AVAILABLE" },
];

export const HeroEcosystemVisual: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>("ai");

  const selectedNode = NODES.find((n) => n.id === activeNode) || NODES[0];

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-12 mb-6 h-[460px] sm:h-[520px] rounded-3xl border border-white/10 bg-gradient-to-b from-[#0B1530]/60 via-[#070D1E]/80 to-[#03060F]/90 backdrop-blur-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-6 flex flex-col justify-between select-none">
      {/* Background radial gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,82,255,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Interactive Network Connecting Canvas / SVG Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0052FF" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0052FF" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Lines connecting center core (50, 50) to each peripheral node */}
        {NODES.map((node) => {
          const isCurrent = activeNode === node.id;
          return (
            <g key={node.id}>
              <line
                x1="50%"
                y1="50%"
                x2={`${node.x}%`}
                y2={`${node.y}%`}
                stroke={isCurrent ? "#00E5FF" : "rgba(255,255,255,0.12)"}
                strokeWidth={isCurrent ? "2" : "1"}
                strokeDasharray={isCurrent ? "none" : "4 4"}
                className="transition-all duration-300"
              />
              {isCurrent && (
                <circle
                  r="3.5"
                  fill="#00E5FF"
                  filter="url(#glow)"
                >
                  <animateMotion
                    path={`M 0 0 L ${node.x - 50} ${node.y - 50}`}
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase">
            ECOSYSTEM MESH // ALL NODES SYNCHRONIZED
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[10px] font-mono text-[#64748B]">
          <span>LATENCY: &lt;12ms</span>
          <span>&bull;</span>
          <span>STATUS: OPERATIONAL</span>
        </div>
      </div>

      {/* Central Interactive Hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              "0 0 30px rgba(0,82,255,0.3)",
              "0 0 50px rgba(0,229,255,0.5)",
              "0 0 30px rgba(0,82,255,0.3)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#060B18] border-2 border-[#0052FF]/60 flex flex-col items-center justify-center p-2 text-center"
        >
          <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
            MODERNO
          </span>
          <span className="text-xs sm:text-sm font-black tracking-wider text-white uppercase">
            CORE
          </span>
          <span className="text-[8px] font-mono text-[#94A3B8] mt-0.5">HUB UNIFICADO</span>
        </motion.div>
      </div>

      {/* Peripheral Interactive Product Nodes */}
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
                ? "bg-[#0052FF]/30 border-[#00E5FF] shadow-[0_0_30px_rgba(0,229,255,0.4)] scale-110"
                : "bg-[#060B18]/80 border-white/10 hover:border-white/30 hover:bg-[#0A1329] scale-100"
            }`}
            aria-label={`Ver información de ${node.name}`}
          >
            <div
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center transition-colors"
              style={{
                backgroundColor: isSelected ? "rgba(0, 229, 255, 0.2)" : "rgba(255, 255, 255, 0.05)",
                color: isSelected ? "#00E5FF" : "#94A3B8",
              }}
            >
              <ProductIcon name={node.icon} className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
            <div className="text-left hidden sm:flex flex-col">
              <span className="text-xs font-bold text-white leading-none whitespace-nowrap">
                {node.name}
              </span>
              <span className="text-[9px] font-mono text-[#94A3B8] whitespace-nowrap mt-0.5">
                {node.category}
              </span>
            </div>
          </button>
        );
      })}

      {/* Active Node Detail Card Overlay (Bottom bar) */}
      <div className="relative z-10 bg-[#060B18]/90 border border-white/10 rounded-2xl p-3 sm:p-4 flex items-center justify-between backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "rgba(0, 82, 255, 0.2)", color: "#00E5FF" }}
          >
            <ProductIcon name={selectedNode.icon} className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white">{selectedNode.name}</h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#0052FF]/20 text-[#38BDF8] border border-[#0052FF]/30">
                {selectedNode.status}
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] line-clamp-1">{selectedNode.tagline}</p>
          </div>
        </div>
        <a
          href="#productos"
          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold tracking-wider transition-colors border border-white/10"
        >
          <span>Explorar</span>
          <span className="text-[#00E5FF]">&rarr;</span>
        </a>
      </div>
    </div>
  );
};
