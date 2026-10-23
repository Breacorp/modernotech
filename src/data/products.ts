import { ProductAreaInfo, ProductItem } from "../types/products";

export const PRODUCT_AREAS: ProductAreaInfo[] = [
  {
    id: "business",
    label: "Empresas",
    description: "Gestión, ventas, finanzas y operaciones.",
    icon: "building",
  },
  {
    id: "security",
    label: "Seguridad",
    description: "Accesos, usuarios y control para espacios físicos.",
    icon: "shield",
  },
  {
    id: "ai",
    label: "IA & creatividad",
    description: "Asistentes, generación visual y nuevas formas de interacción.",
    icon: "sparkles",
  },
  {
    id: "cloud",
    label: "Cloud & entretenimiento",
    description: "Almacenamiento, gaming y contenido en la nube.",
    icon: "cloud",
  },
  {
    id: "productivity",
    label: "Productividad",
    description: "Herramientas para el trabajo, el aprendizaje y el hogar.",
    icon: "cpu",
  },
];

export const PRODUCTS_REGISTRY: ProductItem[] = [
  {
    id: "access",
    name: "Moderno Access",
    tagline: "Control de acceso para consorcios y empresas.",
    description:
      "Gestión de accesos, usuarios y dispositivos para consorcios y organizaciones, con administración remota.",
    area: "security",
    status: "AVAILABLE",
    url: "https://access.moderno.com.ar/",
    icon: "shield",
    order: 1,
  },
  {
    id: "one",
    name: "Moderno One",
    tagline: "ERP modular para gestionar toda la operación.",
    description:
      "Ventas, finanzas, inventario, clientes y proyectos en una sola plataforma empresarial.",
    area: "business",
    status: "AVAILABLE",
    url: "https://one.moderno.com.ar",
    icon: "building",
    order: 2,
  },
  {
    id: "cloud",
    name: "Moderno Cloud",
    tagline: "Almacenamiento privado para tu familia.",
    description:
      "Archivos, copias de seguridad y espacios compartidos, accesibles desde cualquier dispositivo.",
    area: "cloud",
    status: "AVAILABLE",
    url: "https://cloud.moderno.com.ar/",
    icon: "cloud",
    order: 3,
  },
  {
    id: "play",
    name: "Moderno Play",
    tagline: "Juegos en la nube y emulación retro.",
    description:
      "Entretenimiento en el navegador con transmisión optimizada y servidores locales.",
    area: "cloud",
    status: "AVAILABLE",
    url: "https://play.moderno.com.ar/",
    icon: "gamepad",
    order: 4,
  },
  {
    id: "ai",
    name: "Moderno AI",
    tagline: "Inteligencia artificial aplicada.",
    description:
      "Asistentes y automatización para resolver tareas y acelerar procesos.",
    area: "ai",
    status: "AVAILABLE",
    url: "https://ai.moderno.com.ar",
    icon: "sparkles",
    order: 5,
  },
  {
    id: "air-gesture",
    name: "Air Gesture",
    tagline: "Control gestual para tu computadora.",
    description:
      "Interactuá con tu equipo usando las manos, sin tocarlo. Interacción espacial dentro del ecosistema Moderno.",
    area: "ai",
    status: "AVAILABLE",
    url: "https://air-gesture.moderno.com.ar",
    icon: "hand",
    order: 6,
  },
  {
    id: "crm",
    name: "WaTicket CRM",
    tagline: "Conversaciones y soporte en un solo lugar.",
    description:
      "WhatsApp, Instagram y Messenger en una bandeja multiagente con tickets y seguimiento.",
    area: "business",
    status: "AVAILABLE",
    url: "https://ticket.moderno.com.ar",
    icon: "message-square",
    order: 7,
  },
  {
    id: "cleaner",
    name: "Moderno AI Cleaner Pro",
    tagline: "Diagnóstico y optimización para macOS.",
    description:
      "Limpieza de cachés, gestión de memoria y diagnóstico de hardware.",
    area: "productivity",
    status: "AVAILABLE",
    url: "https://cleaner.moderno.com.ar",
    icon: "cpu",
    order: 8,
  },
  {
    id: "weather",
    name: "Moderno Weather",
    tagline: "Clima hiperlocal y telemetría.",
    description:
      "Radar, sensores y modelos predictivos para seguir el clima en tiempo real.",
    area: "productivity",
    status: "BETA",
    url: "https://weather.moderno.com.ar",
    icon: "cloud-sun",
    order: 9,
  },
  {
    id: "cinema",
    name: "Cinema Studio AI",
    tagline: "Producción audiovisual asistida por IA.",
    description:
      "Generación de imagen y video para storyboards, previsualización y contenido creativo.",
    area: "ai",
    status: "BETA",
    url: "https://cinema.moderno.com.ar",
    icon: "film",
    order: 10,
  },
  {
    id: "voice",
    name: "Moderno Voice AI",
    tagline: "Agentes de voz para atención telefónica.",
    description:
      "Automatización de llamadas, consultas y turnos con voz sintética.",
    area: "ai",
    status: "BETA",
    url: "https://voice.moderno.com.ar",
    icon: "mic",
    order: 11,
  },
  {
    id: "mercatto",
    name: "Mercatto",
    tagline: "Comercio digital dentro del ecosistema.",
    description:
      "Catálogo, pedidos y checkout con integración con Moderno ID.",
    area: "business",
    status: "AVAILABLE",
    url: "https://mercatto.moderno.com.ar",
    icon: "credit-card",
    order: 12,
  },
  {
    id: "academy",
    name: "Moderno Academy",
    tagline: "Formación técnica aplicada.",
    description:
      "Cursos de desarrollo, inteligencia artificial y cloud con laboratorios prácticos.",
    area: "productivity",
    status: "AVAILABLE",
    url: "https://academy.moderno.com.ar",
    icon: "graduation",
    order: 13,
  },
  {
    id: "pay",
    name: "Moderno Pay",
    tagline: "Cobros y suscripciones digitales.",
    description:
      "Infraestructura de pagos para productos y servicios del ecosistema.",
    area: "business",
    status: "COMING SOON",
    url: "https://pay.moderno.com.ar",
    icon: "credit-card",
    order: 14,
  },
  {
    id: "home",
    name: "Nova Home",
    tagline: "Automatización para el hogar.",
    description:
      "Control de climatización, iluminación y seguridad integrado con Moderno Access.",
    area: "productivity",
    status: "COMING SOON",
    url: "https://home.moderno.com.ar",
    icon: "home",
    order: 15,
  },
  {
    id: "style",
    name: "Moderno Style & Tech",
    tagline: "Hardware y accesorios de precisión.",
    description:
      "Diseño industrial y accesorios físicos con terminaciones cuidadas.",
    area: "productivity",
    status: "PRIVATE BETA",
    url: "https://style.moderno.com.ar",
    icon: "circuit",
    order: 16,
  },
  {
    id: "diffusion",
    name: "Moderno Diffusion",
    tagline: "Creación visual con IA.",
    description:
      "Nueva herramienta de generación de imágenes del ecosistema. Aún en desarrollo.",
    area: "ai",
    status: "COMING SOON",
    url: "https://diffusion.moderno.com.ar",
    icon: "image",
    order: 17,
  },
  {
    id: "faceswap",
    name: "Moderno FaceSwap AI",
    tagline: "Edición de rostros con IA.",
    description:
      "Herramienta de intercambio de rostros asistida por inteligencia artificial. Aún en desarrollo.",
    area: "ai",
    status: "COMING SOON",
    url: "https://faceswap.moderno.com.ar",
    icon: "scan-face",
    order: 18,
  },
];

const byOrder = (a: ProductItem, b: ProductItem) => a.order - b.order;

export const CATALOG_PRODUCTS = PRODUCTS_REGISTRY.filter(
  (product) => product.status === "AVAILABLE" || product.status === "BETA"
).sort(byOrder);

export const ROADMAP_PRODUCTS = PRODUCTS_REGISTRY.filter(
  (product) =>
    product.status === "PRIVATE BETA" || product.status === "COMING SOON"
).sort(byOrder);

export const getProductArea = (areaId: ProductItem["area"]) =>
  PRODUCT_AREAS.find((area) => area.id === areaId);
