import React from "react";
import { ModernoButton } from "./ModernoButton";
import { HeroVisual } from "./HeroVisual";

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-32 sm:px-8 sm:pt-36 lg:px-10 lg:pb-28 lg:pt-40"
    >
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:gap-12">
        <div className="max-w-2xl">
          <h1 className="text-balance text-5xl font-medium leading-[0.98] tracking-[-0.055em] text-[var(--moderno-text)] sm:text-6xl lg:text-7xl">
            Tecnología para un mundo{" "}
            <span className="bg-gradient-to-r from-[#F4F7FA] via-[#DCE8FF] to-[#9CC0FF] bg-clip-text text-transparent">
              más moderno.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-pretty text-base font-light leading-relaxed text-[var(--moderno-text-muted)] sm:text-lg">
            Diseñamos software, inteligencia artificial y herramientas
            conectadas para personas y empresas.
          </p>

          <div className="mt-9">
            <ModernoButton
              href="#ecosistema"
              size="lg"
              icon={
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M12 5v14m0 0-6-6m6 6 6-6"
                  />
                </svg>
              }
            >
              Explorar el ecosistema
            </ModernoButton>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
};
