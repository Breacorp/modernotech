"use client";

import React, { useEffect, useRef } from "react";

export const ModernoBackground: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (bgRef.current) {
        bgRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
        bgRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={bgRef} className="deep-tech-bg">
      <div className="cyber-grid opacity-60" />
    </div>
  );
};
