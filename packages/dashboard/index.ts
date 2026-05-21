import { ECOSISTEMA_PRODUCTOS } from '@moderno/config/products';
import { MOCK_SUBSCRIPTIONS } from '@moderno/auth-helpers';
import { MOCK_PLANS, MOCK_USAGE_METRICS, UsageMetric, BillingPlan } from '@moderno/billing-helpers';
import { ProductMetadata, UserSubscription } from '@moderno/types';

export interface RecommendedProduct {
  product: ProductMetadata;
  reason: string;
}

export interface BillingSummary {
  activePlans: (BillingPlan & { productName: string })[];
  totalCost: number;
}

// 1. Obtener listado de productos con su estado para un usuario
export function getActiveProducts(userId: string): (ProductMetadata & { isSubscribed: boolean; role?: string })[] {
  const userSubs = MOCK_SUBSCRIPTIONS[userId] || [];
  
  return ECOSISTEMA_PRODUCTOS.map(product => {
    const sub = userSubs.find(s => s.productId === product.id);
    return {
      ...product,
      isSubscribed: sub ? sub.isActive : product.isActiveByDefault,
      role: sub?.role
    };
  });
}

// 2. Recomendador inteligente simulado
export function getRecommendedProducts(userId: string): RecommendedProduct[] {
  const activeProducts = getActiveProducts(userId).filter(p => p.isSubscribed);
  const activeIds = activeProducts.map(p => p.id);
  const recommendations: RecommendedProduct[] = [];

  // Regla 1: Si usa Soporte ML, sugerir Ticket CRM
  if (activeIds.includes('support') && !activeIds.includes('ticket')) {
    const prod = ECOSISTEMA_PRODUCTOS.find(p => p.id === 'ticket');
    if (prod) {
      recommendations.push({
        product: prod,
        reason: 'Ya utilizas Soporte ML. Te conviene activar Ticket CRM para centralizar las conversaciones de soporte post-venta de todos tus canales.'
      });
    }
  }

  // Regla 2: Si usa Ecommerce/Catalog, sugerir Voice AI para llamadas
  if (activeIds.includes('catalog') && !activeIds.includes('voice')) {
    const prod = ECOSISTEMA_PRODUCTOS.find(p => p.id === 'voice');
    if (prod) {
      recommendations.push({
        product: prod,
        reason: 'Al gestionar catálogos, automatiza tu atención al cliente telefónica y confirmación de pedidos con Voice AI.'
      });
    }
  }

  // Regla 3: Si usa Cinema Studio, sugerir Nova AI para copys comerciales
  if (activeIds.includes('cinema') && !activeIds.includes('nova-ai')) {
    const prod = ECOSISTEMA_PRODUCTOS.find(p => p.id === 'nova-ai');
    if (prod) {
      recommendations.push({
        product: prod,
        reason: 'Ya creas videos espectaculares con Cinema Studio. Integra Nova AI como copiloto para redactar los guiones y copys automáticos de tus campañas.'
      });
    }
  }

  // Si no hay ninguna recomendación específica, sugerir la Academia Online
  if (recommendations.length === 0 && !activeIds.includes('academy')) {
    const prod = ECOSISTEMA_PRODUCTOS.find(p => p.id === 'academy');
    if (prod) {
      recommendations.push({
        product: prod,
        reason: 'Empieza a capacitar a tu equipo en las habilidades de inteligencia artificial con nuestra Academia Online.'
      });
    }
  }

  return recommendations;
}

// 3. Obtener resumen de facturación agregada
export function getBillingSummary(userId: string): BillingSummary {
  const activeProducts = getActiveProducts(userId).filter(p => p.isSubscribed);
  const activeIds = activeProducts.map(p => p.id);

  const activePlans = MOCK_PLANS
    .filter(plan => activeIds.includes(plan.productId))
    .map(plan => {
      const prod = ECOSISTEMA_PRODUCTOS.find(p => p.id === plan.productId);
      return {
        ...plan,
        productName: prod ? prod.name : plan.productId
      };
    });

  const totalCost = activePlans.reduce((sum, plan) => sum + plan.monthlyCost, 0);

  return { activePlans, totalCost };
}

// 4. Obtener métricas agregadas de consumo
export function getUsageSummary(userId: string): UsageMetric[] {
  const activeProducts = getActiveProducts(userId).filter(p => p.isSubscribed);
  const activeIds = activeProducts.map(p => p.id);

  return MOCK_USAGE_METRICS.filter(metric => activeIds.includes(metric.productId));
}
