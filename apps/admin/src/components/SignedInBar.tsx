"use client";

import React from "react";
import { useModernoAuth } from "../hooks/useModernoAuth";

export const SignedInBar: React.FC = () => {
  const { user, isAuthenticated, isLoading, activeServicesCount } =
    useModernoAuth();

  if (isLoading || !isAuthenticated || !user) return null;

  const displayName = user.name || user.email;
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-[11px] font-medium text-[var(--moderno-text)]">
          {initials}
        </span>
        <p className="text-sm font-light text-[var(--moderno-text-muted)]">
          Sesión iniciada como{" "}
          <span className="font-normal text-[var(--moderno-text)]">{displayName}</span>
          {activeServicesCount > 0
            ? ` · ${activeServicesCount} ${
                activeServicesCount === 1 ? "servicio activo" : "servicios activos"
              }`
            : ""}
        </p>
      </div>
      <a
        href="/cuenta"
        className="moderno-focus inline-flex w-fit items-center gap-1.5 rounded-full px-2 py-1 text-[13px] font-medium text-[var(--moderno-accent-light)] transition-colors hover:text-[var(--moderno-text)]"
      >
        Ir a mi cuenta
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M5 12h14m0 0-5-5m5 5-5 5"
          />
        </svg>
      </a>
    </div>
  );
};
