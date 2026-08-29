"use client";

import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative glossy-panel p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[#00a8ff]/40 hover:shadow-[0_25px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(0,82,255,0.15)] ${className}`}
    >
      {/* Glossy inner glow spotlight follow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 group-hover:opacity-100 transition duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              340px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 168, 255, 0.12),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </motion.article>
  );
}
