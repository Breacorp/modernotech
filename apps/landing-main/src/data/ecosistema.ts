export type ProductStatus = 'disponible' | 'desarrollo' | 'proximamente';

export interface EcosystemProduct {
  id: string;
  name: string;
  subdomain: string;
  category: 'empresas' | 'ai' | 'comercio' | 'gaming' | 'servicios';
  categoryLabel: string;
  description: string;
  url: string;
  ctaText: string;
  status: ProductStatus;
  statusLabel: string;
  iconName: string;
  featured?: boolean;
  badge?: string;
}

export interface EcosystemCategory {
  id: 'todos' | 'empresas' | 'ai' | 'comercio' | 'gaming' | 'servicios';
  name: string;
  description: string;
}

export interface EcosystemSolution {
  id: string;
  title: string;
  category: string;
  description: string;
  includedProducts: string[];
  iconName: string;
  ctaText: string;
  targetId: string;
}

export interface EcosystemService {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const CATEGORIAS_ECOSISTEMA: EcosystemCategory[] = [
  { id: 'todos', name: 'Todos los productos', description: 'Explora el ecosistema completo' },
  { id: 'empresas', name: 'Empresas & Operaciones', description: 'ERP, CRM, Control de Acceso y Gestión' },
  { id: 'ai', name: 'Inteligencia Artificial', description: 'Agentes de voz, audiovisual y modelos IA' },
  { id: 'comercio', name: 'Comercio & E-commerce', description: 'Venta digital y automatización MercadoLibre' },
  { id: 'gaming', name: 'Gaming & Entretenimiento', description: 'Plataformas interactivas y videojuegos' },
  { id: 'servicios', name: 'Infraestructura & Servicios', description: 'Cloud, hosting y capacitación técnica' }
];

export const PRODUCTOS_ECOSISTEMA: EcosystemProduct[] = [
  {
    id: 'moderno-one',
    name: 'Moderno One',
    subdomain: 'one.moderno.com.ar',
    category: 'empresas',
    categoryLabel: 'Empresas / ERP / CRM',
    description: 'Plataforma empresarial modular para gestionar ventas, clientes, finanzas, inventario, proyectos, recursos humanos, productividad y operaciones.',
    url: 'https://one.moderno.com.ar',
    ctaText: 'Conocer Moderno One',
    status: 'disponible',
    statusLabel: 'Disponible',
    iconName: 'building',
    featured: true,
    badge: 'Flagship ERP'
  },
  {
    id: 'moderno-access',
    name: 'Moderno Access',
    subdomain: 'access.moderno.com.ar',
    category: 'empresas',
    categoryLabel: 'Seguridad / Control de acceso',
    description: 'Plataforma de gestión de control de acceso para cerrajerías, edificios y consorcios. Administra usuarios, llaveros, registros de entrada/salida y dispositivos.',
    url: 'https://access.moderno.com.ar',
    ctaText: 'Conocer Moderno Access',
    status: 'disponible',
    statusLabel: 'Disponible',
    iconName: 'shield',
    featured: true,
    badge: 'Security Suite'
  },
  {
    id: 'moderno-play',
    name: 'Moderno Play',
    subdomain: 'play.moderno.com.ar',
    category: 'gaming',
    categoryLabel: 'Gaming / Entretenimiento',
    description: 'Ecosistema de entretenimiento interactivo y videojuegos de Moderno Tech.',
    url: 'https://play.moderno.com.ar',
    ctaText: 'Entrar a Moderno Play',
    status: 'disponible',
    statusLabel: 'Disponible',
    iconName: 'gamepad',
    badge: 'Gaming Portal'
  },
  {
    id: 'mercato',
    name: 'Mercato',
    subdomain: 'mercato.moderno.com.ar',
    category: 'comercio',
    categoryLabel: 'Comercio / E-commerce',
    description: 'Solución integral de comercio digital y tiendas online dentro del ecosistema Moderno Tech.',
    url: 'https://mercato.moderno.com.ar',
    ctaText: 'Conocer Mercato',
    status: 'desarrollo',
    statusLabel: 'En desarrollo',
    iconName: 'shopping-cart',
    badge: 'E-commerce'
  },
  {
    id: 'soporte-ml',
    name: 'Soporte ML',
    subdomain: 'support.moderno.com.ar',
    category: 'comercio',
    categoryLabel: 'MercadoLibre / Automatización',
    description: 'Herramientas avanzadas para gestionar y automatizar respuestas, ventas y operaciones en MercadoLibre.',
    url: 'https://support.moderno.com.ar',
    ctaText: 'Conocer Soporte ML',
    status: 'disponible',
    statusLabel: 'Disponible',
    iconName: 'zap',
    badge: 'MercadoLibre Automation'
  },
  {
    id: 'nova-home',
    name: 'Nova Home',
    subdomain: 'home.moderno.com.ar',
    category: 'ai',
    categoryLabel: 'Inteligencia Artificial',
    description: 'Solución de inteligencia artificial para la automatización, monitoreo y gestión inteligente en espacios y hogares.',
    url: 'https://home.moderno.com.ar',
    ctaText: 'Conocer Nova Home',
    status: 'desarrollo',
    statusLabel: 'En desarrollo',
    iconName: 'home-ai',
    badge: 'Smart Home AI'
  },
  {
    id: 'nova-ai',
    name: 'Nova AI',
    subdomain: 'nova.moderno.com.ar',
    category: 'ai',
    categoryLabel: 'Inteligencia Artificial',
    description: 'Plataforma central de inteligencia artificial conversacional, copilotos predictivos y automatización inteligente de procesos.',
    url: 'https://nova.moderno.com.ar',
    ctaText: 'Conocer Nova AI',
    status: 'disponible',
    statusLabel: 'Disponible',
    iconName: 'brain',
    featured: true,
    badge: 'AI Core Engine'
  },
  {
    id: 'waticket',
    name: 'WaTicket',
    subdomain: 'ticket.moderno.com.ar',
    category: 'empresas',
    categoryLabel: 'Comunicación / Atención',
    description: 'Plataforma de comunicación empresarial por WhatsApp con múltiples operadores, tickets, asignación de conversaciones e historial.',
    url: 'https://ticket.moderno.com.ar',
    ctaText: 'Conocer WaTicket',
    status: 'disponible',
    statusLabel: 'Disponible',
    iconName: 'message-square',
    badge: 'WhatsApp CRM'
  },
  {
    id: 'cinema-studio',
    name: 'Cinema Studio',
    subdomain: 'cinema.moderno.com.ar',
    category: 'ai',
    categoryLabel: 'IA / Producción Audiovisual',
    description: 'Suite creativa asistida por IA para la generación y posproducción cinematográfica de imágenes, video fotorrealista y contenido creativo.',
    url: 'https://cinema.moderno.com.ar',
    ctaText: 'Conocer Cinema Studio',
    status: 'desarrollo',
    statusLabel: 'En desarrollo',
    iconName: 'video',
    featured: true,
    badge: 'Generative Video AI'
  },
  {
    id: 'voice-ai',
    name: 'Voice AI',
    subdomain: 'voice.moderno.com.ar',
    category: 'ai',
    categoryLabel: 'IA / Telefonía',
    description: 'Agentes de voz hiperrealistas basados en IA para atención de llamadas telefónicas, reservas y calificación comercial 24/7.',
    url: 'https://voice.moderno.com.ar',
    ctaText: 'Conocer Voice AI',
    status: 'desarrollo',
    statusLabel: 'En desarrollo',
    iconName: 'mic',
    badge: 'Voice AI Agents'
  },
  {
    id: 'hosting-premium',
    name: 'Hosting Premium',
    subdomain: 'hosting.moderno.com.ar',
    category: 'servicios',
    categoryLabel: 'Infraestructura / Hosting',
    description: 'Infraestructura cloud ultrarrápida, servidores dedicados y hosting reseller SSD diseñado para máxima disponibilidad.',
    url: 'https://hosting.moderno.com.ar',
    ctaText: 'Conocer Hosting',
    status: 'disponible',
    statusLabel: 'Disponible',
    iconName: 'server',
    badge: 'Cloud Infrastructure'
  },
  {
    id: 'academia-online',
    name: 'Academia Online',
    subdomain: 'academy.moderno.com.ar',
    category: 'servicios',
    categoryLabel: 'Educación / Capacitación',
    description: 'Academia virtual interactiva con capacitación técnica especializada en Inteligencia Artificial, cloud y desarrollo.',
    url: 'https://academy.moderno.com.ar',
    ctaText: 'Conocer Academia',
    status: 'disponible',
    statusLabel: 'Disponible',
    iconName: 'academic-cap',
    badge: 'Tech Academy'
  }
];

export const SOLUCIONES_ECOSISTEMA: EcosystemSolution[] = [
  {
    id: 'gestion-empresarial',
    title: 'Gestión Empresarial',
    category: 'Empresas & Operaciones',
    description: 'Optimiza la operación completa de tu empresa centralizando ventas, finanzas, inventario y seguridad en una infraestructura unificada.',
    includedProducts: ['Moderno One', 'Moderno Access', 'WaTicket'],
    iconName: 'building',
    ctaText: 'Ver Solución Empresarial',
    targetId: 'moderno-one'
  },
  {
    id: 'atencion-cliente',
    title: 'Atención al Cliente & CRM',
    category: 'Comunicación',
    description: 'Centraliza todos tus canales de comunicación en WhatsApp, gestiona tickets multiagente y automatiza la atención con agentes de IA.',
    includedProducts: ['WaTicket', 'Voice AI', 'Nova AI'],
    iconName: 'message-square',
    ctaText: 'Ver Solución de Atención',
    targetId: 'waticket'
  },
  {
    id: 'seguridad-edificios',
    title: 'Seguridad & Control de Acceso',
    category: 'Seguridad Corporativa',
    description: 'Administración inteligente de llaveros, dispositivos, usuarios y registros de acceso para cerrajerías, consorcios y oficinas.',
    includedProducts: ['Moderno Access', 'Hosting Premium'],
    iconName: 'shield',
    ctaText: 'Ver Solución de Seguridad',
    targetId: 'moderno-access'
  },
  {
    id: 'inteligencia-artificial',
    title: 'Inteligencia Artificial Ecosistémica',
    category: 'Transformación Digital',
    description: 'Implementa copilotos de negocio, creación audiovisual automatizada y agentes telefónicos inteligentes adaptados a tu industria.',
    includedProducts: ['Nova AI', 'Nova Home', 'Cinema Studio', 'Voice AI'],
    iconName: 'brain',
    ctaText: 'Explorar Soluciones de IA',
    targetId: 'nova-ai'
  },
  {
    id: 'comercio-digital',
    title: 'Comercio Digital & Ecommerce',
    category: 'Ventas Digitales',
    description: 'Conecta tu tienda online con herramientas automáticas para MercadoLibre y sistemas de facturación en tiempo real.',
    includedProducts: ['Mercato', 'Soporte ML', 'Moderno One'],
    iconName: 'shopping-cart',
    ctaText: 'Ver Solución E-commerce',
    targetId: 'soporte-ml'
  }
];

export const SERVICIOS_ECOSISTEMA: EcosystemService[] = [
  {
    id: 'desarrollo-software',
    title: 'Desarrollo de Software a Medida',
    description: 'Construcción de aplicaciones web, plataformas empresariales y arquitecturas cloud de alta disponibilidad.',
    iconName: 'code'
  },
  {
    id: 'integracion-apis',
    title: 'Integración de APIs & Automatización',
    description: 'Conexión de sistemas heterogéneos, automatización de flujos operativos y APIs de alta performance.',
    iconName: 'cpu'
  },
  {
    id: 'infraestructura-hosting',
    title: 'Infraestructura & Hosting Dedicated',
    description: 'Servidores optimizados, redes privadas, backup continuo y almacenamiento cloud de velocidad ultrarrápida.',
    iconName: 'server'
  },
  {
    id: 'implementacion-ia',
    title: 'Implementación de IA & Telefonía',
    description: 'Despliegue e integración personalizada de agentes conversacionales, modelos LLM y telefonía automatizada.',
    iconName: 'mic'
  },
  {
    id: 'soporte-tecnico',
    title: 'Consultoría & Soporte Técnico 24/7',
    description: 'Acompañamiento especializado, resolución de incidentes y mantenimiento continuo de plataformas.',
    iconName: 'headphones'
  }
];
