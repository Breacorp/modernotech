# Auditoría y Plan de Mejora — Landing Page (`/`)

> Fecha: 2026-10-23 · Alcance: `src/app/page.tsx` y sus 14 componentes · Stack: Next.js 16.4 (Turbopack), React 19, Tailwind CSS 4, framer-motion.
> Método: revisión de código + render en dev server (`localhost:3005`) con inspección del DOM (IDs, headings, overflow, consola).
> **Estado:** Fases 0, 1 y 2 implementadas y verificadas en navegador; Fase 3 implementada salvo lazy-load bajo el fold y medición Lighthouse. `npm run build` pasa con 14 rutas estáticas.

---

## 1. Mapa de la página (post-implementación)

| # | Sección | ID | Rol |
|---|---------|----|-----|
| 1 | Hero | `#hero` | Titular, CTAs a registro/productos, métricas y visual |
| 2 | AuthenticatedEcosystemBanner | — | Solo para usuarios logueados (servicios activos) |
| 3 | ProductShowcaseInteractive | `#productos` | Demos interactivas con tabs accesibles |
| 4 | ProductEcosystem | `#ecosistema` | Catálogo completo: búsqueda, filtros, URL y "ver más" |
| 5 | WhyModernoSection | `#tecnologia` | 6 pilares de arquitectura |
| 6 | HowItWorksSection | `#como-funciona` | 3 pasos: Moderno ID → acceso → gestión |
| 7 | BuiltByModernoSection | `#nosotros` | Propuesta de ingeniería + GitHub |
| 8 | VisionSection | `#roadmap` | Roadmap (4 productos futuros) |
| 9 | FaqSection | `#faq` | FAQ nativa (6 preguntas) enlazada a `/ayuda` |
| 10 | FinalCTA | `#empezar` | CTA final auth-aware (`/registro` o `/cuenta`) |
| 11 | Footer | — | Navegación completa + estado |

Jerarquía de headings correcta (1 solo `h1`, `h2` por sección). Sin IDs duplicados. Sin errores de consola. Sin scroll horizontal global (verificado a 800 px).

---

## 2. Hallazgos

### 2.1 Bugs y problemas funcionales (prioridad alta)

1. **Ancla `#ecosistema` mal ubicada.** El navbar "Ecosistema" apunta a `id="ecosistema"`, que está en el contenedor de *pills* de filtros dentro de la sección `#productos`. Resultado: "Productos" y "Ecosistema" llevan casi al mismo lugar y el anchor no representa la sección.
2. **Tabs del showcase sin accesibilidad.** Son 6 `<button>` sin `role="tablist"/"tab"`, sin `aria-selected`, `aria-controls` ni navegación por teclado. Además están duplicados a mano (~60 líneas repetidas).
3. **Launcher de apps sin cierre contextual.** El dropdown del navbar no se cierra al hacer clic fuera ni con `Escape`; no expone `aria-expanded`/`aria-haspopup` ni gestiona foco.
4. **Menú móvil incompleto.** No bloquea el scroll del body, no cierra con `Escape` ni mueve el foco al abrir.
5. **Buscador sin semántica.** Solo tiene `placeholder` (sin `<label>`), el botón de limpiar no tiene `aria-label`, y no hay contador ni región `aria-live` con los resultados.
6. **Animación del hero desalineada.** En `HeroEcosystemVisual` las líneas usan coordenadas en `%` pero `animateMotion` usa píxeles absolutos (`node.x - 50`), por lo que el punto animado no sigue la línea en todos los anchos.
7. **CTAs sin conversión real.** Hero ofrece "Ver productos" / "Conocer Moderno"; el CTA final vuelve a `#productos`. No hay llamada a registro/demo en los puntos de mayor intención (solo en el navbar).
8. **Secciones sin ID.** Showcase, Vision y CTA final no son enlazables ni medibles (analytics/scroll depth).
9. **Anclas redundantes.** `#productos` y `#ecosistema` conviven en la misma sección.

### 2.2 Accesibilidad y legibilidad

1. **Texto muy pequeño.** Badges, tags y metadata usan `text-[9px]` y `text-[10px]` incluso para información funcional (estado, métricas, categorías).
2. **Contraste insuficiente en labels.** `text-white/40` sobre `#0B0B10` ronda 3.7:1 (falla AA para texto normal); `text-white/50` queda ~5.3:1 (pasa justo). Los tags `text-white/60` están bien. `text-[#94A3B8]` (~7.6:1) pasa.
3. **Falta skip link** ("Saltar al contenido") y landmarks explícitos.
4. **Sin `prefers-reduced-motion`.** Orbes del fondo, pulso del badge y `framer-motion` siguen animando aunque el usuario pida reducir movimiento.
5. **Foco visible inconsistente.** Algunos interactivos tienen `focus-visible:ring`, otros no (navbar, dropdown, tabs, chips móviles).

### 2.3 Estética y consistencia

1. **Acentos fuera de sistema.** Los productos usan rosa (`#EC4899`), verde (`#10B981`), violeta (`#8B5CF6`), ámbar (`#F59E0B`), etc., mientras la identidad define cyan/cobalt/deep-blue. Rompe la unidad del "ADN Moderno".
2. **Dos fuentes de tokens.** `globals.css` define `--bg/--panel/--primary` y `design-tokens.css` define `--moderno-*`; los componentes no usan ninguna: todo va con hex literales. Riesgo alto de deriva visual.
3. **Ritmo vertical monótono.** Todas las secciones usan `py-20`; no hay contraste de densidad entre bloques.
4. **Botones con jerarquías distintas.** `.moderno-btn-*` usa 12px + uppercase + tracking; varios CTAs sobreescriben con `text-xs font-black` y paddings propios.
5. **Página muy larga.** En la medición a 800 px de ancho, el catálogo ocupa ~4.500 px y la página total ~11.000 px. El showcase (tabs) y el catálogo repiten la misma información de producto.
6. **Telemetría sin respaldo.** "ONLINE", "SERVIDORES LOCALES", "SISTEMAS OPERATIVOS" se muestran como estado vivo sin conexión a datos reales.
7. **CTA del hero visual oculto en móvil.** El botón "Abrir" del inspector es `hidden sm:inline-flex`.
8. **Banner autenticado duplicado.** Repite "Mi Cuenta" del navbar; podría aportar más (consumo, cuotas, accesos rápidos).

### 2.4 Rendimiento y arquitectura

1. **Todo es Client Component.** `page.tsx` y todos los bloques llevan `"use client"`; se pierde el render en servidor para una landing mayormente estática.
2. **Auth duplicada.** `useModernoAuth` se monta en el navbar y en el banner; cada instancia hace `getSession()` + 2 consultas a Supabase (≈4 consultas por carga).
3. **framer-motion en todo el árbol.** Suma bundle; el fondo y varios hovers podrían resolverse con CSS.
4. **Logo sin `next/image`** ni dimensiones explícitas.

---

## 3. Plan de mejora

### Fase 0 — Quick wins (1–2 días) — COMPLETA

Objetivo: corregir bugs y accesibilidad sin rediseñar.

- [x] `#productos` = showcase interactivo; `#ecosistema` = catálogo completo. IDs nuevos: `#roadmap`, `#faq`, `#empezar`, `#como-funciona`. Navbar actualizado.
- [x] Tabs extraídos a `TABS` + `role="tablist"/"tab"`, `aria-selected`, `aria-controls`, roving `tabindex`, flechas ←/→/Home/End.
- [x] Dropdown de apps: cierre por clic fuera + `Escape`, `aria-expanded`/`aria-haspopup`, retorno de foco.
- [x] Buscador con `<label class="sr-only">`, `aria-label` en limpiar, contador `role="status"` + `aria-live`.
- [x] Skip link en la landing + `useReducedMotion` en Hero/tabs/visual + bloque CSS `prefers-reduced-motion`.
- [x] Animación del hero corregida: `animate` porcentual sobre `cx`/`cy`, alineado con líneas en `%`.
- [x] CTA "Abrir" del inspector visible en móvil (icono + texto desde `sm`).
- [x] Tipografía funcional mínima 11 px (9→10, 10→11 en componentes de la landing).
- [x] `white/40` → `white/55` en labels funcionales.

### Fase 1 — Consolidación visual (3–4 días) — COMPLETA

- [x] `design-tokens.css` como única fuente; `globals.css` usa alias `--bg → var(--moderno-background-alt)`, etc.; componentes migrados a `var(--moderno-*)`.
- [x] Escala tipográfica y de espaciado aplicada; botones comparten `moderno-btn-*` + focus ring.
- [x] Acentos de producto armonizados en una familia cyan/cobalt (5 tonos: cyan, sky, blue, cobalt, deep). Se eliminaron rosa, verde y violeta.
- [x] Densidad vertical alternada (`py-20` / `py-24`) y divisores sutiles.
- [x] Hover/focus unificados (`scale`, `ring`, `border`) en cards, chips, tabs, CTAs y links.
- [x] Hero visual: altura fluida, nodos reposicionados (sin solapamiento con inspector) y CTA móvil.

### Fase 2 — Conversión y contenido (≈1 semana) — COMPLETA

- [x] Hero: primario "Crear cuenta gratis" → `/registro`; secundario "Ver productos" → `#productos`; link "Conocer Moderno".
- [x] Franja de métricas verificables derivada de `PRODUCTS_REGISTRY` (15 plataformas, 11 verticales, 1 identidad, 100 % cloud).
- [x] Sección "Cómo funciona" en 3 pasos (Moderno ID → acceso unificado → gestión central).
- [x] FAQ de 6 preguntas con `<details>` nativo y enlace a `/ayuda`.
- [x] FinalCTA auth-aware: `/cuenta` si hay sesión, `/registro` si no.
- [x] Catálogo: contador, chips de filtros activos, limpiar filtros y "ver más" progresivo (+9).
- [x] Sincronización de filtros con URL (`?cat=…&q=…`) vía `history.replaceState` + soporte `popstate`, preservando el hash.
- [x] Showcase vs. catálogo diferenciados por copy, CTA "Ver catálogo completo" y catálogo filtrable (se conservaron las 6 demos en lugar de recortar a 3).

### Fase 3 — Arquitectura y performance (paralelo) — PARCIAL

- [x] `page.tsx` convertido a Server Component con islas client (navbar, hero visual, tabs, catálogo, banner, CTA).
- [x] `ModernoAuthProvider` único en el layout raíz: una suscripción y una carga de perfil/entitlements para toda la app.
- [x] `next/image` para el logo en navbar y footer, con dimensiones.
- [ ] Lazy-load de secciones bajo el fold (evaluar `next/dynamic` por isla).
- [ ] Medir Lighthouse antes/después y documentar.

---

## 4. Métricas de éxito

| Métrica | Objetivo |
|---------|----------|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse SEO | 100 |
| LCP | < 2.0 s |
| CLS | < 0.1 |
| INP | < 200 ms |
| Clics CTA hero → `/registro` | +30 % vs. baseline |
| Profundidad de scroll media | > 50 % |

---

## 5. Archivos a tocar (mapa)

| Archivo | Cambios |
|---------|---------|
| `src/app/page.tsx` | Server Component + IDs de secciones |
| `src/app/layout.tsx` | Skip link, provider de auth |
| `src/components/ModernoNavbar.tsx` | Dropdown accesible, memo de links, `aria-expanded` |
| `src/components/Hero.tsx` | CTA a registro, motion reducido |
| `src/components/HeroEcosystemVisual.tsx` | `animateMotion` corregido, CTA móvil |
| `src/components/ProductShowcaseInteractive.tsx` | Tabs con datos + ARIA + teclado |
| `src/components/ProductEcosystem.tsx` | Contador, chips, URL sync, label de búsqueda |
| `src/components/CategoryFilter.tsx` | Teclado y foco |
| `src/components/ModernoProductCard.tsx` | Tokens y tipografía |
| `src/components/AuthenticatedEcosystemBanner.tsx` | Contenido de valor (consumo/cuotas) |
| `src/components/Footer.tsx` | Tokens y contrastes |
| `src/styles/design-tokens.css` + `src/app/globals.css` | Unificación de tokens |
| `src/hooks/useModernoAuth.ts` | Provider único / cache |

---

## 6. Orden recomendado

1. **Fase 0** (bugs + a11y) → impacto inmediato y bajo riesgo.
2. **Fase 1** (sistema visual) → base para todo lo demás.
3. **Fase 2** (conversión) → crecimiento medible.
4. **Fase 3** (arquitectura) → sostiene las anteriores y reduce deuda.
