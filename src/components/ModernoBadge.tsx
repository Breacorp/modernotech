import React from "react";
import { ProductStatus } from "../types/products";

interface ModernoBadgeProps {
  status: ProductStatus;
  className?: string;
  size?: "sm" | "md";
}

export const ModernoBadge: React.FC<ModernoBadgeProps> = ({
  status,
  className = "",
  size = "md",
}) => {
  const sizeClasses =
    size === "sm"
      ? "px-2 py-0.5 text-[10px] tracking-wider"
      : "px-2.5 py-1 text-[11px] tracking-widest";

  switch (status) {
    case "AVAILABLE":
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full font-bold uppercase bg-white/[0.04] border border-white/[0.08] text-white/85 shadow-sm ${sizeClasses} ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--moderno-primary)] animate-pulse" />
          DISPONIBLE
        </span>
      );
    case "BETA":
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full font-bold uppercase bg-white/[0.04] border border-[var(--moderno-secondary)]/30 text-[var(--moderno-accent-sky)] ${sizeClasses} ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--moderno-accent-sky)]" />
          BETA
        </span>
      );
    case "PRIVATE BETA":
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full font-bold uppercase bg-white/[0.04] border border-amber-500/30 text-amber-300 ${sizeClasses} ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          BETA PRIVADA
        </span>
      );
    case "COMING SOON":
      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full font-bold uppercase bg-white/[0.02] border border-white/[0.06] text-white/55 ${sizeClasses} ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
          PRÓXIMAMENTE
        </span>
      );
    default:
      return null;
  }
};
