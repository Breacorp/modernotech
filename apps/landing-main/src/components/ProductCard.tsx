"use client";

import React, { useRef, useState } from "react";
import { ProductItem } from "../types/products";
import { ProductBadge } from "./ProductBadge";
import { ProductIcon } from "./ProductIcon";

interface ProductCardProps {
  product: ProductItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Bento span classes
  const getSpanClasses = (span?: string) => {
    switch (span) {
      case "wide":
        return "col-span-1 md:col-span-2";
      case "tall":
        return "col-span-1 md:row-span-2";
      case "heroic":
        return "col-span-1 md:col-span-2 lg:col-span-2";
      default:
        return "col-span-1";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-3xl border border-white/10 bg-[#070D1E]/70 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-white/25 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] ${getSpanClasses(
        product.bentoSpan
      )}`}
    >
      {/* Dynamic Cursor Proximity Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 168, 255, 0.08), transparent 70%)`,
        }}
      />

      {/* Top Section: Icon, Category & Status */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg transition-transform duration-300 group-hover:scale-110"
              style={{
                backgroundColor: "rgba(6, 11, 24, 0.9)",
                color: product.accentColor || "#00E5FF",
              }}
            >
              <ProductIcon name={product.icon} className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase block">
                {product.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-[#38BDF8] transition-colors">
                {product.name}
              </h3>
            </div>
          </div>
          <ProductBadge status={product.status} size="sm" />
        </div>

        {/* Tagline & Description */}
        <p className="text-sm font-semibold text-[#E2E8F0] mb-2">{product.tagline}</p>
        <p className="text-xs text-[#94A3B8] leading-relaxed font-light mb-6 line-clamp-3">
          {product.description}
        </p>

        {/* Feature / Metric highlight pill */}
        {product.metrics && (
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[11px] font-mono text-[#38BDF8]">
            <span className="text-[#94A3B8]">{product.metrics.label}:</span>
            <span className="font-bold text-white">{product.metrics.value}</span>
          </div>
        )}
      </div>

      {/* Bottom Section: Tags & Action Button */}
      <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-[#94A3B8] border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white/5 hover:bg-[#0052FF] text-white text-xs font-semibold tracking-wider transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,82,255,0.4)] border border-white/10 hover:border-transparent shrink-0 text-center"
        >
          <span>{product.ctaText}</span>
          <span className="text-[#00E5FF] group-hover:text-white transition-colors">&rarr;</span>
        </a>
      </div>
    </div>
  );
};
