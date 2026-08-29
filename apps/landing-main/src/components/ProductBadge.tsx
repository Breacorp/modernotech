import React from "react";
import { ProductStatus } from "../types/products";

interface ProductBadgeProps {
  status: ProductStatus;
  className?: string;
  size?: "sm" | "md";
}

export const ProductBadge: React.FC<ProductBadgeProps> = ({ status, className = "", size = "md" }) => {
  const sizeClasses = size === "sm" 
    ? "px-2 py-0.5 text-[10px] gap-1" 
    : "px-2.5 py-1 text-[11px] gap-1.5";

  switch (status) {
    case "AVAILABLE":
      return (
        <span
          className={`inline-flex items-center rounded-full font-mono font-medium tracking-wider uppercase bg-[#0052FF]/15 text-[#38BDF8] border border-[#0052FF]/30 shadow-[0_0_12px_rgba(0,82,255,0.2)] ${sizeClasses} ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
          AVAILABLE
        </span>
      );
    case "BETA":
      return (
        <span
          className={`inline-flex items-center rounded-full font-mono font-medium tracking-wider uppercase bg-[#8B5CF6]/15 text-[#C084FC] border border-[#8B5CF6]/30 shadow-[0_0_12px_rgba(139,92,246,0.2)] ${sizeClasses} ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C084FC]" />
          BETA
        </span>
      );
    case "PRIVATE BETA":
      return (
        <span
          className={`inline-flex items-center rounded-full font-mono font-medium tracking-wider uppercase bg-[#F59E0B]/15 text-[#FCD34D] border border-[#F59E0B]/30 shadow-[0_0_12px_rgba(245,158,11,0.15)] ${sizeClasses} ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FCD34D]" />
          PRIVATE BETA
        </span>
      );
    case "COMING SOON":
      return (
        <span
          className={`inline-flex items-center rounded-full font-mono font-medium tracking-wider uppercase bg-white/5 text-[#94A3B8] border border-white/10 ${sizeClasses} ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#64748B]" />
          COMING SOON
        </span>
      );
    case "DEPRECATED":
      return (
        <span
          className={`inline-flex items-center rounded-full font-mono font-medium tracking-wider uppercase bg-red-500/10 text-red-400 border border-red-500/20 ${sizeClasses} ${className}`}
        >
          DEPRECATED
        </span>
      );
    default:
      return null;
  }
};
