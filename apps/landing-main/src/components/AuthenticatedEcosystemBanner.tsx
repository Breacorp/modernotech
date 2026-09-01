"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModernoAuth } from "../hooks/useModernoAuth";

export const AuthenticatedEcosystemBanner: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useModernoAuth();

  if (isLoading || !isAuthenticated || !user) {
    return null;
  }

  const productsDisplay = [
    {
      id: "access",
      name: "Moderno Access",
      icon: "🛡️",
      url: "https://access.moderno.com.ar",
      tierLabel: "Consorcio Premium",
      isPremium: true,
    },
    {
      id: "cloud",
      name: "Moderno Cloud",
      icon: "☁️",
      url: "https://cloud.moderno.com.ar",
      tierLabel: "5 GB Free Vault",
      isPremium: false,
    },
    {
      id: "play",
      name: "Moderno Play",
      icon: "🎮",
      url: "https://play.moderno.com.ar",
      tierLabel: "Catálogo Free",
      isPremium: false,
    },
    {
      id: "cinema",
      name: "Cinema Studio",
      icon: "🎬",
      url: "https://cinema.moderno.com.ar",
      tierLabel: "Tier Free",
      isPremium: false,
    },
    {
      id: "mercatto",
      name: "Mercatto",
      icon: "🛍️",
      url: "https://mercatto.moderno.com.ar",
      tierLabel: "Tier Free",
      isPremium: false,
    },
    {
      id: "ai",
      name: "Moderno AI",
      icon: "✨",
      url: "https://ai.moderno.com.ar",
      tierLabel: "50 Req / Día",
      isPremium: false,
    },
  ];

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 -mt-6 mb-12 select-none"
      >
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B0B10]/95 via-[#0d1117]/95 to-[#0B0B10]/95 border border-[#00E5FF]/30 shadow-[0_15px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00E5FF]/10 blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#157BFF] p-0.5 shadow-[0_0_20px_rgba(0,229,255,0.3)] shrink-0">
                <div className="w-full h-full bg-[#050507] rounded-[14px] flex items-center justify-center font-bold text-white text-sm">
                  {user.name ? user.name.slice(0, 2).toUpperCase() : "ID"}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-black text-white font-sans">
                    Bienvenido, {user.name || user.email}
                  </h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    MODERNO ID CONECTADO
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8] font-light">
                  Tu pase unificado al ecosistema digital de Moderno Tech.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/cuenta"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider transition-transform hover:scale-105 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
              >
                Administrar Mi Cuenta &rarr;
              </a>
            </div>
          </div>

          {/* Entitlements Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 pt-6 relative z-10">
            {productsDisplay.map((prod) => (
              <a
                key={prod.id}
                href={prod.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-[#00E5FF]/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg group-hover:scale-110 transition-transform">
                      {prod.icon}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        prod.isPremium
                          ? "bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30"
                          : "bg-white/[0.06] text-white/50"
                      }`}
                    >
                      {prod.isPremium ? "PREMIUM" : "FREE"}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-white block truncate mb-0.5">
                    {prod.name}
                  </span>
                  <span className="text-[10px] text-[#94A3B8] font-mono block truncate">
                    {prod.tierLabel}
                  </span>
                </div>

                <div className="pt-2 mt-2 border-t border-white/[0.04] text-[10px] text-[#00E5FF] font-bold flex items-center justify-between group-hover:translate-x-0.5 transition-transform">
                  <span>Abrir App</span>
                  <span>&rarr;</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};
