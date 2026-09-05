import { REGISTRO_PRODUCTOS, ExtendedProductMetadata } from "@moderno/product-registry";
import { supabase } from "@moderno/auth-helpers";

export interface ActiveProductView extends ExtendedProductMetadata {
  isSubscribed: boolean;
  tier?: string;
  status?: string;
}

export interface BillingSummaryView {
  totalCost: number;
  activePlans: Array<{
    productId: string;
    productName: string;
    planName: string;
    monthlyCost: number;
  }>;
}

export interface UsageMetricView {
  metricName: string;
  used: number;
  limit: number;
  unit: string;
}

export interface ProductRecommendationView {
  product: ExtendedProductMetadata;
  reason: string;
}

/**
 * Retorna todos los productos del ecosistema enriquecidos con el estado de suscripción real del usuario.
 * @param userId UUID del usuario
 * @param entitlements Lista opcional de entitlements ya cargados desde Supabase
 */
export function getActiveProducts(userId?: string, entitlements: any[] = []): ActiveProductView[] {
  const activeProductIds = new Set(
    entitlements
      .filter((e) => e.status === "active")
      .map((e) => e.product_id || e.productId)
  );

  return REGISTRO_PRODUCTOS.map((product) => {
    const isSubscribed = activeProductIds.has(product.id) || product.pricingTier === "free";
    const userEntitlement = entitlements.find(
      (e) => (e.product_id || e.productId) === product.id
    );

    return {
      ...product,
      isSubscribed,
      tier: userEntitlement?.tier || (product.pricingTier === "free" ? "free" : undefined),
      status: userEntitlement?.status || (product.pricingTier === "free" ? "active" : "inactive"),
    };
  });
}

/**
 * Calcula el resumen de facturación basado en los productos contratados reales.
 */
export function getBillingSummary(userId?: string, entitlements: any[] = []): BillingSummaryView {
  const activePlans: Array<{
    productId: string;
    productName: string;
    planName: string;
    monthlyCost: number;
  }> = [];

  let totalCost = 0;

  entitlements
    .filter((e) => e.status === "active" && e.tier !== "free")
    .forEach((e) => {
      const prodId = e.product_id || e.productId;
      const prod = REGISTRO_PRODUCTOS.find((p) => p.id === prodId);
      const cost = e.tier === "enterprise" ? 49.0 : e.tier === "pro" ? 19.0 : 9.0;
      totalCost += cost;

      activePlans.push({
        productId: prodId,
        productName: prod?.name || prodId,
        planName: `Plan ${(e.tier || "Pro").toUpperCase()}`,
        monthlyCost: cost,
      });
    });

  return {
    totalCost,
    activePlans,
  };
}

/**
 * Retorna las métricas de uso reales o limpias (no simulaciones inventadas).
 */
export function getUsageSummary(userId?: string, entitlements: any[] = []): UsageMetricView[] {
  const hasCloud = entitlements.some(
    (e) => (e.product_id || e.productId) === "cloud" || (e.product_id || e.productId) === "hosting"
  );
  const hasAI = entitlements.some(
    (e) => (e.product_id || e.productId) === "ai" || (e.product_id || e.productId) === "cinema"
  );

  const metrics: UsageMetricView[] = [];

  if (hasCloud) {
    metrics.push({
      metricName: "Almacenamiento Cloud",
      used: 0,
      limit: 15,
      unit: "GB",
    });
  }

  if (hasAI) {
    metrics.push({
      metricName: "Créditos de Procesamiento IA",
      used: 0,
      limit: 100,
      unit: "Créditos",
    });
  }

  return metrics;
}

/**
 * Sugerencias de productos complementarios basadas en lo que el usuario aún no tiene contratado.
 */
export function getRecommendedProducts(userId?: string, entitlements: any[] = []): ProductRecommendationView[] {
  const subscribedIds = new Set(
    entitlements
      .filter((e) => e.status === "active")
      .map((e) => e.product_id || e.productId)
  );

  const candidates = REGISTRO_PRODUCTOS.filter(
    (p) => !subscribedIds.has(p.id) && p.pricingTier !== "free"
  );

  return candidates.slice(0, 3).map((product) => ({
    product,
    reason: `Mejora tu flujo de trabajo añadiendo ${product.name} a tu ecosistema corporativo.`,
  }));
}
