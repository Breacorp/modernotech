export type ProductStatus = 'AVAILABLE' | 'BETA' | 'PRIVATE BETA' | 'COMING SOON' | 'DEPRECATED';

export type ProductCategory = 
  | 'ALL'
  | 'security'
  | 'entertainment'
  | 'ai'
  | 'business'
  | 'weather'
  | 'productivity'
  | 'fintech'
  | 'software'
  | 'hardware'
  | 'services';

export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  categoryLabel: string;
  status: ProductStatus;
  url: string;
  ctaText: string;
  icon: string;
  featured: boolean;
  order: number;
  bentoSpan?: 'normal' | 'wide' | 'tall' | 'heroic';
  accentColor: string;
  tags: string[];
  metrics?: {
    label: string;
    value: string;
  };
  highlightFeature?: string;
}

export interface CategoryInfo {
  id: ProductCategory;
  label: string;
  description: string;
  icon: string;
}

export interface WhyModernoItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  icon: string;
  badge: string;
}
