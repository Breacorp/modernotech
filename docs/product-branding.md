# Plan de Personalidad de Marca por Producto
## Dinamismo de Temas y Coherencia en la Suite Moderno

El **Theme Engine** de Moderno Style & Tech permite que cada producto del ecosistema mantenga su propia personalidad visual sin romper la estructura unificada (ADN Moderno). 

En lugar de crear layouts o estilos estructurales distintos para cada aplicación, **la personalidad de cada producto se define estrictamente alterando su paleta de colores de acento y fondos locales**, inyectados de forma dinámica mediante variables CSS personalizadas (`--primary`, `--accent`, `--bg`).

---

## 1. Personalidades Visuales de los Productos Clave

### 🛡️ Moderno Access (Enterprise & Security)
*   **Enfoque:** Transmitir solidez corporativa, seguridad física e institucionalidad de nivel militar.
*   **Acento Primario (`--primary`):** `#0052FF` (Azul Seguridad Intenso).
*   **Detalle (`--accent`):** `#00a8ff`.
*   **Uso:** Oficinas, control de puertas, consorcios y edificios de departamentos corporativos.

### 🎬 Cinema Studio AI (Charcoal & Premium Gold)
*   **Enfoque:** Evocar la atmósfera de una sala de cine oscura de lujo, sofisticación cinematográfica y creatividad.
*   **Fondo Local (`--bg`):** `#020202` (Oscuridad cinematográfica absoluta).
*   **Acento Primario (`--primary`):** `#FFB800` (Oro Amber Studio).
*   **Detalle (`--accent`):** `#ffffff` (Blanco puro para contrastes finos).
*   **Uso:** Edición de video, LipSync con Inteligencia Artificial, y generadores de imagen fotorrealistas.

### 🧠 Nova AI (Futuristic Intelligence)
*   **Enfoque:** Inteligencia Artificial futurista, análisis de datos rápido y ciencia de frontera.
*   **Acento Primario (`--primary`):** `#00F0FF` (Cian Holográfico Eléctrico).
*   **Detalle (`--accent`):** `#007AFF` (Azul Eléctrico oficial).
*   **Uso:** Chatbots de datos inteligentes, copilotos y suites de análisis predictivo.

### 🎮 Game Studio (Cyberpunk Dev Environment)
*   **Enfoque:** Gaming, desarrollo, herramientas de baja latencia y alta interactividad.
*   **Acento Primario (`--primary`):** `#FF3B30` (Naranja-Rojo Eléctrico Cyberpunk).
*   **Detalle (`--accent`):** `#00F0FF` (Cian de contraste).
*   **Uso:** Renderizadores WebGL en la nube, compiladores locales y modeladores 3D.

---

## 2. Reglas de Oro para Mantener Coherencia Visual

Para evitar que el ecosistema de 14 productos se vuelva caótico o pierda coherencia de marca, los desarrolladores de Moderno deben seguir estrictamente estas tres reglas:

### Regla 1: Modificar Colores de Acento, Nunca la Estructura
Está terminantemente prohibido alterar:
*   La escala de espaciados y paddings.
*   La escala de curvaturas (Border Radius).
*   La tipografía oficial (**Outfit** / **Inter**).
*   La estructura de vidrio esmerilado de las tarjetas.
*   *Solo se cambian las variables de color: `--primary`, `--primary-hover` y `--accent`.*

### Regla 2: Mantener Fondos Oscuros y Minimalistas
*   Ninguna aplicación debe usar fondos claros saturados.
*   El fondo siempre debe ser `#050505`, `#020202` o escalas de grises ultra oscuras.
*   El color se utiliza con moderación: para resaltar botones, badges, barras de progreso y bordes interactivos.

### Regla 3: Prohibición de Tonos Saturados Infantiles
*   **NO usar violetas**, rosas chillones o combinaciones infantiles (arcoiris).
*   Las interfaces de Moderno deben sentirse premium y profesionales en todo momento, similares al acabado de un panel de instrumentos de un vehículo Tesla o la sobriedad del dashboard de Apple Developer.
