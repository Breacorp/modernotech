import { ECOSISTEMA_PRODUCTOS } from "@moderno/config/products";
import { ProductMetadata } from "@moderno/types";

export interface ExtendedProductMetadata extends ProductMetadata {
  environmentStatus: 'alpha' | 'beta' | 'production';
  pricingTier: 'free' | 'growth' | 'enterprise';
  requiredFlags?: string[];
  dependencies?: string[];
}

export const REGISTRO_PRODUCTOS: ExtendedProductMetadata[] = ECOSISTEMA_PRODUCTOS.map(prod => {
  const extensions: Record<string, Partial<ExtendedProductMetadata>> = {
    'moderno-one': { environmentStatus: 'production', pricingTier: 'enterprise', dependencies: [] },
    'access': { environmentStatus: 'production', pricingTier: 'enterprise', dependencies: [] },
    'moderno-play': { environmentStatus: 'production', pricingTier: 'free', dependencies: [] },
    'mercato': { environmentStatus: 'beta', pricingTier: 'growth', dependencies: [] },
    'cinema': { environmentStatus: 'beta', pricingTier: 'growth', requiredFlags: ['enableCinemaStudioBeta'], dependencies: [] },
    'support': { environmentStatus: 'production', pricingTier: 'growth', dependencies: ['access'] },
    'ticket': { environmentStatus: 'production', pricingTier: 'growth', dependencies: [] },
    'hosting': { environmentStatus: 'production', pricingTier: 'free', dependencies: [] },
    'voice': { environmentStatus: 'beta', pricingTier: 'growth', requiredFlags: ['enableVoiceAI'], dependencies: [] },
    'nova-ai': { environmentStatus: 'production', pricingTier: 'growth', dependencies: [] },
    'nova-home': { environmentStatus: 'beta', pricingTier: 'growth', dependencies: [] },
    'academy': { environmentStatus: 'production', pricingTier: 'free', dependencies: [] }
  };

  const ext = extensions[prod.id] || { environmentStatus: 'beta', pricingTier: 'growth', dependencies: [] };

  return {
    ...prod,
    environmentStatus: ext.environmentStatus!,
    pricingTier: ext.pricingTier!,
    requiredFlags: ext.requiredFlags,
    dependencies: ext.dependencies
  };
});

export function getProductById(id: string): ExtendedProductMetadata | undefined {
  return REGISTRO_PRODUCTOS.find(p => p.id === id);
}

export function getProductsByCategory(category: string): ExtendedProductMetadata[] {
  return REGISTRO_PRODUCTOS.filter(p => p.category === category);
}
