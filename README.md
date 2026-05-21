# Moderno Style & Tech - Ecosistema SaaS

Este es el monorepo oficial del ecosistema Moderno Style & Tech, impulsado por Turborepo, Next.js, y diseñado para escalar a millones de usuarios con una arquitectura Multi-Tenant totalmente desacoplada (Zero Shared Database).

## Organización del Ecosistema

El ecosistema se divide en `apps` (aplicaciones finales / frontends) y `packages` (código compartido).

### Apps (Aplicaciones)
Cada carpeta en `apps/` corresponde a un subdominio específico de la empresa:

- **`apps/landing-main`**: Corresponde a `moderno.com.ar`. Es el Hub Central y escaparate de todos los servicios. Construido con Next.js.
- **`apps/auth`**: Corresponde a `id.moderno.com.ar`. Es el portal central de **Single Sign-On (SSO)** e identidad global de los usuarios.
- **`apps/dashboard`**: Corresponde a `dashboard.moderno.com.ar`. Es el panel maestro comercial del ecosistema (Launchpad Comercial).
- **`apps/styleguide`**: Corresponde a `styleguide.moderno.com.ar`. Showroom interactivo y catálogo del Design System de Moderno.
- **`apps/admin`**: Corresponderá a `admin.moderno.com.ar`. Backoffice global para el equipo de Moderno.

### Packages (Librerías Compartidas)
- **`packages/theme`**: Tokens globales de diseño (colores, border radius, glassmorphism, sombras) y motor de branding por producto.
- **`packages/ui`**: Biblioteca central de componentes reutilizables con soporte de Theme Engine.
- **`packages/auth`**: Contiene los helpers y la lógica simulada del OIDC (OpenID Connect).
- **`packages/billing`**: Módulo de precios, planes, consumos y add-ons simulados.
- **`packages/dashboard`**: Métodos y agregadores comerciales para el Launchpad de control centralizado.
- **`packages/config`**: Metadatos centralizados del ecosistema (configuración de subdominios, categorías, etc).
- **`packages/types`**: Interfaces y tipos globales de TypeScript.
- **`packages/database`**: Modelos Prisma conceptuales y esquemas centralizados de identidad.

---

## Demos Técnicas / Vista Previa de Desarrollo

Este monorepo cuenta con una suite interactiva de desarrollo para validar la experiencia de extremo a extremo sin comprometer tus aplicaciones productivas reales.

### ¿Cómo correr el ecosistema completo?
1. En la raíz del proyecto, ejecuta:
   ```bash
   npm install
   npm run dev
   ```
2. Abre los subdominios locales simulados en tu navegador:
   * **Landing Page:** `http://localhost:3000` (Apps / `landing-main`)
   * **Portal Moderno ID:** `http://localhost:3001` (Apps / `auth`)
   * **Dashboard Maestro:** `http://localhost:3002` (Apps / `dashboard`)
   * **Design System Showroom:** `http://localhost:3003` (Apps / `styleguide`)

---

## Instrucciones de Uso de las Aplicaciones

### 🎨 Design System Showroom (`http://localhost:3003`)
*   Inspecciona las variantes de componentes: `Button`, `Card`, `Modal`, `Table`, `Input` y más.
*   Interactúa con el **Branding Selector** en el menú superior para ver cómo cambia dinámicamente todo el diseño de los componentes de acuerdo al producto seleccionado (*Cinema Studio*, *Moderno Access*, *Nova AI*, *Game Studio*).
*   Visualiza cómo el **Theme Engine** inyecta variables CSS dinámicas en la pestaña "Theme Engine & Colores".

### 📊 Dashboard Maestro (`http://localhost:3002`)
*   Visualiza todos tus módulos contratados (13 en total, alimentados desde el archivo de configuración central).
*   Revisa la pestaña **Consumos** para observar cuotas de procesamiento IA representadas con barras de progreso animadas.
*   Accede a la pestaña **Facturación** para simular la consolidación de recibos e historial (con advertencias claras de no-producción).
*   Consulta la pestaña **Recomendaciones** para interactuar con el copiloto comercial de cross-selling automático.

---

## Comandos Principales

- `npm run dev`: Levanta todo el monorepo en desarrollo de forma paralela.
- `npm run build`: Compila y optimiza todas las aplicaciones del monorepo.
