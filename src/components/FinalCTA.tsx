"use client";

import React from "react";
import { useModernoAuth } from "../hooks/useModernoAuth";
import { ModernoButton } from "./ModernoButton";

export const FinalCTA: React.FC = () => {
  const { isAuthenticated } = useModernoAuth();

  return (
    <section
      id="empezar"
      aria-labelledby="final-cta-heading"
      className="relative z-10 mx-auto max-w-6xl scroll-mt-24 px-5 pb-24 pt-8 sm:px-8 lg:px-10 lg:pb-32"
    >
      <div className="relative overflow-hidden border-t border-white/[0.06] pt-16 text-center sm:pt-20">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-56 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-[var(--moderno-accent)]/[0.055] blur-3xl"
          aria-hidden="true"
        />
        <div className="relative">
          <h2
            id="final-cta-heading"
            className="mx-auto max-w-2xl text-balance text-3xl font-medium leading-[1.06] tracking-[-0.04em] text-[var(--moderno-text)] sm:text-4xl md:text-5xl"
          >
            Una cuenta. Todo el ecosistema.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-pretty text-sm font-light leading-relaxed text-[var(--moderno-text-muted)] sm:text-base">
            Accedé a tus servicios, planes y datos desde un solo lugar.
          </p>
          <div className="mt-8 flex justify-center">
            <ModernoButton
              href={isAuthenticated ? "/cuenta" : "/registro"}
              size="lg"
            >
              {isAuthenticated ? "Ir a mi cuenta" : "Crear cuenta"}
            </ModernoButton>
          </div>
        </div>
      </div>
    </section>
  );
};
