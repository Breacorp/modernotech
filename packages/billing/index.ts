export interface BillingPlan {
  productId: string;
  planName: string;
  monthlyCost: number;
}

export interface BillingHistoryItem {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
}

export interface UsageMetric {
  productId: string;
  metricName: string;
  used: number;
  limit: number;
  unit: string;
}

export const MOCK_PLANS: BillingPlan[] = [
  { productId: 'access', planName: 'Plan Consorcio Pro', monthlyCost: 49.00 },
  { productId: 'hosting', planName: 'Hosting Reseller SSD', monthlyCost: 29.00 },
  { productId: 'academy', planName: 'Acceso Anual Premium', monthlyCost: 19.00 },
  { productId: 'cinema', planName: 'Creador IA Studio', monthlyCost: 39.00 },
  { productId: 'support', planName: 'Soporte Automático Pro', monthlyCost: 49.00 },
  { productId: 'ticket', planName: 'CRM Waticket Multiagente', monthlyCost: 59.00 },
  { productId: 'voice', planName: 'Agentes de Voz Starter', monthlyCost: 79.00 }
];

export const MOCK_BILLING_HISTORY: BillingHistoryItem[] = [
  { id: 'INV-2026-001', date: '2026-05-01', description: 'Moderno Ecosistema - Suscripción Mensual (Access + Hosting)', amount: 78.00, status: 'paid' },
  { id: 'INV-2026-002', date: '2026-04-01', description: 'Moderno Ecosistema - Suscripción Mensual (Access + Hosting)', amount: 78.00, status: 'paid' },
  { id: 'INV-2026-003', date: '2026-03-01', description: 'Moderno Ecosistema - Suscripción Mensual (Access)', amount: 49.00, status: 'paid' }
];

export const MOCK_USAGE_METRICS: UsageMetric[] = [
  { productId: 'cinema', metricName: 'Créditos IA Usados', used: 450, limit: 1000, unit: 'créditos' },
  { productId: 'cinema', metricName: 'Imágenes Generadas', used: 120, limit: 300, unit: 'imgs' },
  { productId: 'cinema', metricName: 'Videos Renderizados', used: 8, limit: 20, unit: 'vids' },
  { productId: 'support', metricName: 'Preguntas Respondidas', used: 1450, limit: 5000, unit: 'respuestas' },
  { productId: 'voice', metricName: 'Minutos de Voz Procesados', used: 85, limit: 200, unit: 'mins' },
  { productId: 'access', metricName: 'Usuarios Activos en Puertas', used: 48, limit: 100, unit: 'usuarios' }
];
