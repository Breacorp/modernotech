import React from "react";
import Image from "next/image";

const FOOTER_GROUPS = [
  {
    title: "Productos",
    links: [
      { label: "Explorar ecosistema", href: "/#ecosistema" },
      { label: "Catálogo completo", href: "/#productos" },
      { label: "En desarrollo", href: "/#roadmap" },
      { label: "Precios", href: "/pricing" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Compañía", href: "/#compania" },
      {
        label: "GitHub",
        href: "https://github.com/Breacorp",
        external: true,
      },
    ],
  },
  {
    title: "Cuenta y soporte",
    links: [
      { label: "Mi cuenta", href: "/cuenta" },
      { label: "Ingresar", href: "/login" },
      { label: "Crear cuenta", href: "/registro" },
      { label: "Ayuda", href: "/ayuda" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacidad", href: "/privacidad" },
      { label: "Términos", href: "/terminos" },
      { label: "Seguridad", href: "/seguridad" },
    ],
  },
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/[0.07] bg-[var(--moderno-background-alt)]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))] lg:gap-10">
          <div className="max-w-xs">
            <a
              href="/"
              className="moderno-focus inline-flex items-center gap-2.5 rounded-full"
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
            <p className="mt-5 text-sm font-light leading-relaxed text-[var(--moderno-text-muted)]">
              Software, inteligencia artificial y herramientas conectadas para
              personas y empresas.
            </p>
            <p className="mt-5 text-xs text-[var(--moderno-text-subtle)]">
              Buenos Aires, Argentina
            </p>
          </div>

          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <h2 className="text-[13px] font-medium text-[var(--moderno-text)]">
                {group.title}
              </h2>
              <nav
                aria-label={group.title}
                className="mt-4 flex flex-col gap-2.5"
              >
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    {...("external" in link && link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="moderno-focus w-fit rounded text-[13px] font-light text-[var(--moderno-text-muted)] transition-colors hover:text-[var(--moderno-text)]"
                  >
                    {link.label}
                    {"external" in link && link.external && (
                      <span className="sr-only"> (abre en una nueva pestaña)</span>
                    )}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-xs font-light text-[var(--moderno-text-subtle)] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {currentYear} Moderno Tech. Todos los derechos reservados.</p>
          <p>Tecnología para un mundo más moderno.</p>
        </div>
      </div>
    </footer>
  );
};
