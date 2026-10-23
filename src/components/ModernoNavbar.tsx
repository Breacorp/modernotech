"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ModernoButton } from "./ModernoButton";
import { useModernoAuth } from "../hooks/useModernoAuth";

const NAV_LINKS = [
  { label: "Ecosistema", href: "/#ecosistema" },
  { label: "Compañía", href: "/#compania" },
  { label: "Ayuda", href: "/ayuda" },
];

export const ModernoNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const mobileCloseRef = useRef<HTMLButtonElement>(null);
  const { isAuthenticated, signOut } = useModernoAuth();

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        mobileToggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const menu = document.getElementById("mobile-menu");
      const focusable = menu?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    mobileCloseRef.current?.focus();
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    mobileToggleRef.current?.focus();
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[var(--moderno-background-alt)]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
          <a
            href="/"
            className="moderno-focus flex shrink-0 items-center gap-2.5 rounded-full"
            aria-label="Moderno Tech — Inicio"
          >
            <Image
              src="/logo-mark.png"
              alt=""
              width={30}
              height={30}
              priority
              className="h-[30px] w-[30px] rounded-full object-contain"
            />
            <span className="text-[15px] font-semibold tracking-[-0.02em] text-[var(--moderno-text)]">
              Moderno <span className="font-normal text-[var(--moderno-text-muted)]">Tech</span>
            </span>
          </a>

          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-1 lg:flex"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="moderno-focus rounded-full px-3.5 py-2 text-[13px] font-medium text-[var(--moderno-text-muted)] transition-colors hover:text-[var(--moderno-text)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            {isAuthenticated ? (
              <>
                <a
                  href="/cuenta"
                  className="moderno-focus rounded-full px-3.5 py-2 text-[13px] font-medium text-[var(--moderno-text)] transition-colors hover:text-[var(--moderno-accent-light)]"
                >
                  Mi cuenta
                </a>
                <button
                  type="button"
                  onClick={signOut}
                  className="moderno-focus rounded-full px-3 py-2 text-[13px] font-medium text-[var(--moderno-text-muted)] transition-colors hover:text-[var(--moderno-text)]"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="moderno-focus rounded-full px-3.5 py-2 text-[13px] font-medium text-[var(--moderno-text-muted)] transition-colors hover:text-[var(--moderno-text)]"
                >
                  Ingresar
                </a>
                <ModernoButton href="/registro" size="sm">
                  Crear cuenta
                </ModernoButton>
              </>
            )}
          </div>

          <button
            ref={mobileToggleRef}
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="moderno-focus flex h-10 w-10 items-center justify-center rounded-full text-[var(--moderno-text)] transition-colors hover:bg-white/[0.06] lg:hidden"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Abrir menú"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M4 7h16M4 12h16M4 17h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          className="fixed inset-0 z-[60] bg-[var(--moderno-background-alt)] lg:hidden"
        >
          <div className="flex h-16 items-center justify-between px-5 sm:px-8">
            <a
              href="/"
              onClick={closeMobileMenu}
              className="moderno-focus flex items-center gap-2.5 rounded-full"
              aria-label="Moderno Tech — Inicio"
            >
              <Image
                src="/logo-mark.png"
                alt=""
                width={30}
                height={30}
                className="h-[30px] w-[30px] rounded-full object-contain"
              />
              <span className="text-[15px] font-semibold tracking-[-0.02em] text-[var(--moderno-text)]">
                Moderno <span className="font-normal text-[var(--moderno-text-muted)]">Tech</span>
              </span>
            </a>
            <button
              ref={mobileCloseRef}
              type="button"
              onClick={closeMobileMenu}
              className="moderno-focus flex h-10 w-10 items-center justify-center rounded-full text-[var(--moderno-text)] transition-colors hover:bg-white/[0.06]"
              aria-label="Cerrar menú"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav
            aria-label="Navegación móvil"
            className="flex flex-col px-5 pt-8 sm:px-8"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobileMenu}
                className="moderno-focus border-b border-white/[0.07] py-5 text-2xl font-medium tracking-[-0.03em] text-[var(--moderno-text)]"
              >
                {link.label}
              </a>
            ))}

            <div className="mt-10 flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <ModernoButton href="/cuenta" size="lg" className="w-full">
                    Mi cuenta
                  </ModernoButton>
                  <button
                    type="button"
                    onClick={() => {
                      signOut();
                      closeMobileMenu();
                    }}
                    className="moderno-focus h-12 w-full rounded-full border border-white/[0.12] text-sm font-medium text-[var(--moderno-text-muted)] transition-colors hover:text-[var(--moderno-text)]"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <ModernoButton href="/registro" size="lg" className="w-full">
                    Crear cuenta
                  </ModernoButton>
                  <a
                    href="/login"
                    onClick={closeMobileMenu}
                    className="moderno-focus flex h-12 w-full items-center justify-center rounded-full border border-white/[0.12] text-sm font-medium text-[var(--moderno-text)] transition-colors hover:bg-white/[0.05]"
                  >
                    Ingresar
                  </a>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};
