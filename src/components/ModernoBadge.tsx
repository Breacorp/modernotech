import React from "react";
import { ProductStatus } from "../types/products";

interface ModernoBadgeProps {
  status: ProductStatus;
  className?: string;
  size?: "sm" | "md";
}

const statusConfig: Record<
  Exclude<ProductStatus, "DEPRECATED">,
  { label: string; dot: string; tone: string }
> = {
  AVAILABLE: {
    label: "Disponible",
    dot: "bg-emerald-400",
    tone: "text-emerald-200/90",
  },
  BETA: {
    label: "Beta",
    dot: "bg-sky-400",
    tone: "text-sky-200/90",
  },
  "PRIVATE BETA": {
    label: "Beta privada",
    dot: "bg-amber-300",
    tone: "text-amber-200/90",
  },
  "COMING SOON": {
    label: "En desarrollo",
    dot: "bg-white/35",
    tone: "text-white/60",
  },
};

export const ModernoBadge: React.FC<ModernoBadgeProps> = ({
  status,
  className = "",
  size = "md",
}) => {
  if (status === "DEPRECATED") return null;

  const config = statusConfig[status];
  const sizeClasses =
    size === "sm"
      ? "px-2.5 py-1 text-[11px]"
      : "px-3 py-1.5 text-xs";

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.035] font-medium ${sizeClasses} ${config.tone} ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${config.dot}`}
        aria-hidden="true"
      />
      {config.label}
    </span>
  );
};
