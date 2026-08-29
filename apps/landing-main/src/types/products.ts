export type ProductStatus = 'AVAILABLE' | 'BETA' | 'COMING SOON' | 'PRIVATE BETA' | 'DEPRECATED';

export type ProductCategory = 
  | 'ALL'
  | 'AI'
  | 'SOFTWARE'
  | 'BUSINESS'
  | 'ENTERTAINMENT'
  | 'WEATHER'
  | 'PRODUCTIVITY'
  | 'HARDWARE'
  | 'SERVICES';

export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  status: ProductStatus;
  url: string;
  ctaText: string;
  icon: string;
  featured?: boolean;
  bentoSpan?: 'normal' | 'wide' | 'tall' | 'heroic';
  accentColor?: string;
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

export interface TechnologyPillar {
  id: string;
  title: string;
  description: string;
  icon: string;
  tag: string;
  details: string[];
}

export interface VisionMilestone {
  phase: string;
  title: string;
  status: 'ACTIVE' | 'DEPLOYING' | 'UPCOMING';
  description: string;
  items: string[];
}
