import { ProductItem, CategoryInfo, TechnologyPillar, VisionMilestone } from '../types/products';

export const CATEGORIES: CategoryInfo[] = [
  { id: 'ALL', label: 'Todos', description: 'Visión integral del ecosistema Moderno', icon: 'layers' },
  { id: 'AI', label: 'Inteligencia Artificial', description: 'Modelos, agentes cognitivos y procesamiento neuronal', icon: 'sparkles' },
  { id: 'BUSINESS', label: 'Empresas & Finanzas', description: 'ERP, finanzas, control de acceso y pagos', icon: 'building' },
  { id: 'SOFTWARE', label: 'Software & SaaS', description: 'Plataformas operativas, CRM y gestión omnicanal', icon: 'code' },
  { id: 'ENTERTAINMENT', label: 'Entretenimiento', description: 'Gaming, streaming y experiencias interactivas', icon: 'gamepad' },
  { id: 'WEATHER', label: 'Clima & Sensores', description: 'Predicción hiperlocal y telemetría ambiental', icon: 'cloud-sun' },
  { id: 'PRODUCTIVITY', label: 'Productividad', description: 'Optimización de sistemas y automatización diaria', icon: 'cpu' },
  { id: 'HARDWARE', label: 'Hardware & IoT', description: 'Dispositivos inteligentes y diseño físico premium', icon: 'circuit' },
  { id: 'SERVICES', label: 'Servicios & Educación', description: 'Infraestructura cloud, consultoría y academia', icon: 'graduation' },
];

export const PRODUCTS_REGISTRY: ProductItem[] = [
  {
    id: 'moderno-ai',
    name: 'Moderno AI',
    tagline: 'Inteligencia artificial para potenciar tu día a día.',
    description: 'Motor multimodal de razonamiento avanzado y agentes autónomos. Integra análisis de datos, visión computacional, síntesis de código y orquestación inteligente.',
    category: 'AI',
    status: 'AVAILABLE',
    url: 'https://ai.moderno.com.ar',
    ctaText: 'Explorar Moderno AI',
    icon: 'sparkles',
    featured: true,
    bentoSpan: 'heroic',
    accentColor: '#0052FF',
    tags: ['Multimodal', 'Agentes Autónomos', 'Baja Latencia', 'Edge Processing'],
    metrics: { label: 'Inferencia Sub-segundo', value: '<45ms' },
    highlightFeature: 'Inferencia Neuronal Continua'
  },
  {
    id: 'moderno-one',
    name: 'Moderno One',
    tagline: 'Plataforma empresarial modular y unificada.',
    description: 'Gestión integral para corporaciones: ventas, clientes, finanzas, inventario, proyectos, recursos humanos y operaciones en una arquitectura zero-latency.',
    category: 'BUSINESS',
    status: 'AVAILABLE',
    url: 'https://one.moderno.com.ar',
    ctaText: 'Acceder a Moderno One',
    icon: 'building',
    featured: false,
    bentoSpan: 'wide',
    accentColor: '#0070F3',
    tags: ['ERP Modular', 'Multi-tenant', 'Finanzas en Tiempo Real', 'RRHH'],
    metrics: { label: 'Módulos Integrados', value: '14+' },
    highlightFeature: 'Zero Shared Database Architecture'
  },
  {
    id: 'moderno-play',
    name: 'Moderno Play',
    tagline: 'Ecosistema de entretenimiento interactivo y gaming.',
    description: 'Hub digital para videojuegos, experiencias inmersivas, streaming de baja latencia y torneos comunitarios dentro de la red Moderno.',
    category: 'ENTERTAINMENT',
    status: 'AVAILABLE',
    url: 'https://play.moderno.com.ar',
    ctaText: 'Entrar a Moderno Play',
    icon: 'gamepad',
    featured: false,
    bentoSpan: 'normal',
    accentColor: '#00E5FF',
    tags: ['Cloud Gaming', 'Comunidad', 'Low-Latency Streaming'],
    metrics: { label: 'Tickrate', value: '128Hz' },
    highlightFeature: 'Matchmaking Ultrarrápido'
  },
  {
    id: 'moderno-weather',
    name: 'Moderno Weather',
    tagline: 'Inteligencia meteorológica y telemetría hiperlocal.',
    description: 'Modelos de predicción climática asistidos por satélites y sensores terrestres en tiempo real. Alertas predictivas y mapas térmicos de alta resolución.',
    category: 'WEATHER',
    status: 'BETA',
    url: 'https://weather.moderno.com.ar',
    ctaText: 'Ver Radar Meteorológico',
    icon: 'cloud-sun',
    featured: false,
    bentoSpan: 'wide',
    accentColor: '#00C8FF',
    tags: ['Radar Doppler', 'Predicción IA', 'Sensor Mesh', 'Mapas HD'],
    metrics: { label: 'Precisión Barométrica', value: '99.4%' },
    highlightFeature: 'Radar Doppler Cuántico'
  },
  {
    id: 'moderno-cleaner-pro',
    name: 'Moderno AI Cleaner Pro',
    tagline: 'Optimización de hardware y limpieza asistida por IA.',
    description: 'Diagnóstico profundo de rendimiento del sistema operativo, descarte de residuos invisibles, optimización de memoria RAM y aceleración de almacenamiento.',
    category: 'PRODUCTIVITY',
    status: 'AVAILABLE',
    url: 'https://cleaner.moderno.com.ar',
    ctaText: 'Optimizar Dispositivo',
    icon: 'cpu',
    featured: false,
    bentoSpan: 'normal',
    accentColor: '#38BDF8',
    tags: ['Disk Optimizer', 'RAM Booster', 'Zero-Risk Cleaning'],
    metrics: { label: 'Aumento de Rendimiento', value: '+35%' },
    highlightFeature: 'Algoritmo de Purga Inteligente'
  },
  {
    id: 'moderno-pay',
    name: 'Moderno Pay',
    tagline: 'Infraestructura de pagos inteligentes y checkout unificado.',
    description: 'Pasarela financiera para procesar cobros transfronterizos, suscripciones recurrentes, billeteras virtuales y liquidaciones automáticas con cifrado biométrico.',
    category: 'BUSINESS',
    status: 'COMING SOON',
    url: 'https://pay.moderno.com.ar',
    ctaText: 'Solicitar Acceso Anticipado',
    icon: 'credit-card',
    featured: false,
    bentoSpan: 'normal',
    accentColor: '#6366F1',
    tags: ['Fintech', 'Checkout 1-Click', 'Smart Routing', 'Tokenización'],
    metrics: { label: 'SLA de Aprobación', value: '99.98%' },
    highlightFeature: 'Enrutamiento Inteligente de Pagos'
  },
  {
    id: 'moderno-crm',
    name: 'Moderno CRM (WaTicket)',
    tagline: 'Centralización de mensajería omnicanal y agentes de soporte.',
    description: 'Unifica WhatsApp Business API, Instagram Direct y Facebook Messenger en un panel multiagente con bots automatizados y flujos de conversión de ventas.',
    category: 'SOFTWARE',
    status: 'AVAILABLE',
    url: 'https://ticket.moderno.com.ar',
    ctaText: 'Conectar Canales',
    icon: 'message-square',
    featured: false,
    bentoSpan: 'wide',
    accentColor: '#10B981',
    tags: ['WhatsApp Multiagente', 'Chatbots Inteligentes', 'Inbox Unificado'],
    metrics: { label: 'Canales Simultáneos', value: 'Ilimitados' },
    highlightFeature: 'Bandeja Omnicanal 24/7'
  },
  {
    id: 'moderno-access',
    name: 'Moderno Access',
    tagline: 'Control de acceso seguro para edificios y corporativos.',
    description: 'Administración de cerraduras inteligentes, llaveros encriptados RFID/NFC, control de portería y auditoría de accesos en tiempo real para consorcios y oficinas.',
    category: 'BUSINESS',
    status: 'AVAILABLE',
    url: 'https://access.moderno.com.ar',
    ctaText: 'Gestionar Accesos',
    icon: 'shield',
    featured: false,
    bentoSpan: 'normal',
    accentColor: '#3B82F6',
    tags: ['Seguridad Física', 'NFC / RFID', 'Consorcios', 'Auditoría en Vivo'],
    metrics: { label: 'Cifrado de Llaves', value: 'AES-256' },
    highlightFeature: 'Sincronización Off-grid & Cloud'
  },
  {
    id: 'cinema-studio-ai',
    name: 'Cinema Studio AI',
    tagline: 'Dirección cinematográfica y generación de video con IA.',
    description: 'Suite creativa impulsada por modelos generativos de video de última generación (Veo / Imagen). Storyboards, síntesis de voz sincronizada y renderizado 4K.',
    category: 'AI',
    status: 'BETA',
    url: 'https://cinema.moderno.com.ar',
    ctaText: 'Crear Producción',
    icon: 'film',
    featured: false,
    bentoSpan: 'normal',
    accentColor: '#EC4899',
    tags: ['Gen-Video', 'Text-to-Film', 'Render 4K', 'Audio Neuronal'],
    metrics: { label: 'Resolución de Render', value: '4K Ultra HD' },
    highlightFeature: 'Motor de Dirección Multitoma'
  },
  {
    id: 'moderno-voice-ai',
    name: 'Moderno Voice AI',
    tagline: 'Agentes conversacionales de voz con latencia humana.',
    description: 'Telefonía y asistencia por voz hiperrealista. Capaz de sostener conversaciones telefónicas fluidas, agendar citas y resolver consultas complejas en tiempo real.',
    category: 'AI',
    status: 'BETA',
    url: 'https://voice.moderno.com.ar',
    ctaText: 'Probar Agente de Voz',
    icon: 'mic',
    featured: false,
    bentoSpan: 'normal',
    accentColor: '#8B5CF6',
    tags: ['Voz Hiperrealista', 'Telefonía IP', 'Latencia Humana'],
    metrics: { label: 'Latencia de Respuesta', value: '180ms' },
    highlightFeature: 'Detección de Emociones & Tono'
  },
  {
    id: 'nova-home',
    name: 'Nova Home',
    tagline: 'Automatización inteligente y domótica para el hogar moderno.',
    description: 'Sistema operativo para casas inteligentes. Control predictivo de iluminación, climatización, seguridad perimetral y ahorro energético mediante algoritmos de contexto.',
    category: 'HARDWARE',
    status: 'COMING SOON',
    url: 'https://home.moderno.com.ar',
    ctaText: 'Ver Ecosistema Home',
    icon: 'home',
    featured: false,
    bentoSpan: 'normal',
    accentColor: '#F59E0B',
    tags: ['Domótica IA', 'Matter / Thread', 'Ahorro Energético'],
    metrics: { label: 'Ahorro Eléctrico', value: '-28%' },
    highlightFeature: 'Climatización Predictiva'
  },
  {
    id: 'moderno-style-tech',
    name: 'Moderno Style & Tech',
    tagline: 'Diseño de hardware, accesorios de autor y estilo de vida.',
    description: 'La división de diseño industrial y productos físicos de Moderno Tech. Minimalismo funcional, materiales de alta durabilidad y tecnología tangible integrada.',
    category: 'HARDWARE',
    status: 'PRIVATE BETA',
    url: 'https://style.moderno.com.ar',
    ctaText: 'Explorar Colección',
    icon: 'circuit',
    featured: false,
    bentoSpan: 'wide',
    accentColor: '#64748B',
    tags: ['Diseño Industrial', 'Hardware Premium', 'Materiales Nobres'],
    metrics: { label: 'Materiales Reciclados', value: '100%' },
    highlightFeature: 'Ingeniería de Precisión'
  },
  {
    id: 'moderno-academy',
    name: 'Moderno Academy',
    tagline: 'Formación continua en tecnología, IA y desarrollo de producto.',
    description: 'Programas de capacitación especializados dictados por los ingenieros del ecosistema Moderno. Cursos de inteligencia artificial aplicada, desarrollo fullstack y ciberseguridad.',
    category: 'SERVICES',
    status: 'AVAILABLE',
    url: 'https://academy.moderno.com.ar',
    ctaText: 'Comenzar Formación',
    icon: 'graduation',
    featured: false,
    bentoSpan: 'normal',
    accentColor: '#14B8A6',
    tags: ['Workshops Prácticos', 'Certificaciones', 'Masterclasses'],
    metrics: { label: 'Estudiantes Activos', value: '2.5k+' },
    highlightFeature: 'Laboratorios en la Nube'
  }
];

export const TECHNOLOGY_PILLARS: TechnologyPillar[] = [
  {
    id: 'ai-engine',
    title: 'Motor de Inteligencia Artificial',
    tag: 'Cognitive Engine',
    icon: 'sparkles',
    description: 'Arquitecturas de modelos neuronales híbridos ejecutados en el borde (edge) y en la nube privada para latencia casi imperceptible y máxima privacidad.',
    details: [
      'Procesamiento local y federado',
      'Orquestación dinámica de agentes autónomos',
      'Inferencia contextual multimodal'
    ]
  },
  {
    id: 'cloud-edge',
    title: 'Infraestructura Global Edge',
    tag: 'High Availability',
    icon: 'server',
    description: 'Red distribuida con nodos en múltiples centros de datos para garantizar que cada producto responda en menos de 50 milisegundos en cualquier región.',
    details: [
      'SLA garantizado de 99.99% uptime',
      'Borde Anycast distribuido',
      'Aislamiento de recursos por tenant'
    ]
  },
  {
    id: 'zero-trust',
    title: 'Seguridad Zero-Trust',
    tag: 'Bank-Grade Security',
    icon: 'shield',
    description: 'Cifrado de extremo a extremo en tránsito y en reposo (AES-256 + TLS 1.3), autenticación biométrica y políticas de cero confianza predeterminadas.',
    details: [
      'Criptografía post-cuántica experimental',
      'Cumplimiento SOC2 Type II y RGPD',
      'Auditoría inmutable de accesos'
    ]
  },
  {
    id: 'realtime-mesh',
    title: 'Automatización & Event Mesh',
    tag: 'Real-time Sync',
    icon: 'zap',
    description: 'Bus de eventos reactivo que comunica todos los productos de Moderno al instante: si ocurre una venta en One, se refleja en Pay, CRM y Analytics.',
    details: [
      'WebSockets y gRPC bidireccional',
      'Sincronización atómica multi-dispositivo',
      'Zero polling, 100% reactive'
    ]
  },
  {
    id: 'hardware-iot',
    title: 'Hardware & Conectividad IoT',
    tag: 'Physical Integration',
    icon: 'circuit',
    description: 'Protocolos de comunicación con bajo consumo energético (Matter, Thread, BLE) para enlazar llaves físicas, sensores ambientales y domótica.',
    details: [
      'Actualizaciones firmware OTA seguras',
      'Compatibilidad de espectro universal',
      'Consumo energético ultra-optimizado'
    ]
  },
  {
    id: 'data-pipelines',
    title: 'Telemetría & Pipelines de Datos',
    tag: 'Predictive Data',
    icon: 'bar-chart',
    description: 'Procesamiento en streaming de métricas y datos climáticos/operacionales para generar insights predictivos y preventivos en segundos.',
    details: [
      'Procesamiento vectorial en tiempo real',
      'Detección automática de anomalías',
      'Retención y privacidad configurable'
    ]
  }
];

export const VISION_ROADMAP: VisionMilestone[] = [
  {
    phase: 'Fase 01',
    title: 'Infraestructura Cloud & Motores de IA',
    status: 'ACTIVE',
    description: 'Lanzamiento del core de Moderno AI, Moderno One y la plataforma de identidad unificada con soporte multi-tenant.',
    items: ['Moderno AI Multimodal', 'Moderno One Core ERP', 'Moderno Access v1', 'Moderno CRM WaTicket']
  },
  {
    phase: 'Fase 02',
    title: 'Expansión de Ecosistema & Servicios Conectados',
    status: 'DEPLOYING',
    description: 'Despliegue de inteligencia meteorológica, optimizadores de sistema, suite creativa audiovisual y pagos unificados.',
    items: ['Moderno Weather Radar', 'Moderno AI Cleaner Pro', 'Cinema Studio AI', 'Moderno Pay Gateway']
  },
  {
    phase: 'Fase 03',
    title: 'Hardware Inteligente & Espacio Conectado',
    status: 'UPCOMING',
    description: 'Integración de dispositivos físicos, domótica residencial autónoma, computación espacial y síntesis sensorial.',
    items: ['Nova Home Autonomous OS', 'Moderno Style & Tech Devices', 'Spatial AI Assistants', 'Sensor Mesh Global']
  }
];
