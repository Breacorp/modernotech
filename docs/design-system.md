# Sistema de Diseño Global: Moderno Style & Tech
## Identidad Visual y Consistencia de Marca

El **Design System de Moderno** (`@moderno/ui`) ha sido diseñado para unificar la experiencia visual de todos los productos y subdominios de la empresa. Su filosofía visual combina el minimalismo de Apple y Stripe, el futurismo tecnológico de OpenAI y la estética de desarrolladores de Linear y Vercel.

---

## 1. Filosofía Visual (ADN Moderno)

Nuestra identidad se basa en tres principios de diseño fundamentales:

1. **Acento sobre Oscuridad (Dark Mode por Defecto):** El fondo primario de las interfaces es negro absoluto (`#050505`) o gris de bajo brillo. Los elementos visuales se definen a través de luz proyectada (gradientes y bordes neon de baja intensidad).
2. **Glassmorphism Elegante:** Los paneles principales utilizan fondos translúcidos con desenfoque de fondo (*backdrop-filter: blur(20px)*) y bordes ultra finos con opacidad reducida. Esto añade una sensación física de profundidad y capas tridimensionales en la pantalla.
3. **Tipografía Minimalista y Espaciado Generoso:** Priorizamos la legibilidad con la tipografía **Outfit** o **Inter**, eliminando ruidos visuales o decoraciones innecesarias.

---

## 2. Sistema de Colores (Theme Tokens)

Nuestra paleta oficial de colores está construida para evitar tonos planos, infantiles o violetas genéricos:

*   **Fondo Central (`--bg`):** `#050505` (Negro OLED premium).
*   **Fondo de Paneles (`--panel`):** `rgba(17, 17, 17, 0.65)` con bordes de opacidad `0.06`.
*   **Azul Eléctrico Moderno (`--primary`):** `#007AFF` (El color principal de la suite).
*   **Azul Eléctrico Hover (`--primary-hover`):** `#005BCB` (Variación oscurecida de transición).
*   **Acento Cían / Neón (`--accent`):** `#00d2ff`.

---

## 3. Spacing y Border Radius

El sistema de espaciados y curvaturas es rígido para asegurar consistencia a lo largo de las 14 aplicaciones:

### Curvatura (Border Radius)
*   `--radius-xs` (curvatura pequeña: `6px`): Botones compactos, inputs y badges.
*   `--radius-sm` (curvatura media: `10px`): Botones normales, selectores y formularios.
*   `--radius-md` (curvatura grande: `14px`): Tarjetas de productos (`Card`), métricas y tablas.
*   `--radius-lg` (curvatura extra grande: `18px`): Paneles de cristal principales (`GlassPanel`) y modales.
*   `--radius-xl` (curvatura máxima: `26px`): Banners, headers de página y menús flotantes.

---

## 4. Componentes Disponibles en la Suite (`@moderno/ui`)

La librería exporta componentes puros de React tipados listos para integrarse en Next.js:

1.  **`ThemeProvider`:** Wrapper de aplicación que inyecta los tokens de diseño como propiedades CSS personalizadas (`--primary`, `--radius-md`, etc).
2.  **`Button`:** Botón versátil con variantes `primary`, `secondary`, `danger` y `ghost`.
3.  **`Card`:** Contenedor básico gris oscuro con borde fino.
4.  **`GlassPanel`:** Contenedor con efecto de cristal esmerilado translúcido (*glassmorphism*).
5.  **`Modal`:** Cuadro de diálogo interactivo centrado con overlay oscuro de fondo.
6.  **`Sidebar` & `Navbar`:** Componentes estructurales para layouts de aplicaciones corporativas.
7.  **`Input` & `Select`:** Controles de formulario con soporte para estilos del sistema.
8.  **`Badge`:** Etiquetas de estado (`success`, `warning`, `danger`, `neutral`).
9.  **`Table`:** Tabla tabular optimizada para mostrar analíticas y listados comerciales.
10. **`AIUsageCard`:** Tarjeta especializada que muestra porcentajes de consumo de Inteligencia Artificial con barras de progreso estilizadas.
11. **`PricingCard`:** Tarjeta de contratación de planes para el Billing central.
12. **`ProductLauncher` & `ProductCard`:** Tarjetas dinámicas para visualizar subdominios y disparar inicios de sesión mediante federación SSO.

---

## 5. Motion y Animaciones

El ecosistema Moderno no utiliza animaciones abruptas o lentas. Todos los componentes reactivos a eventos del ratón (hover) o clics siguen estas reglas de movimiento:
*   **Transiciones Suaves:** Todos los estados interactivos utilizan `transition-all duration-300 ease-out` o `duration-200`.
*   **Efecto de Clic Físico:** Los botones y tarjetas se reducen en escala sutilmente en el estado activo: `active:scale-[0.98]`.
*   **Efecto de Aparición (Fade In):** La entrada de modales y tabs se suaviza con la animación de opacidad: `animate-fade-in` (`keyframes: opacity 0 to 1`).
