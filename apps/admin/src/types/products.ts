export type ProductStatus =
  | "AVAILABLE"
  | "BETA"
  | "PRIVATE BETA"
  | "COMING SOON"
  | "UNAVAILABLE"
  | "DEPRECATED";

export type ProductArea =
  | "business"
  | "security"
  | "ai"
  | "cloud"
  | "productivity";

export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  area: ProductArea;
  status: ProductStatus;
  url: string;
  icon: string;
  order: number;
}

export interface ProductAreaInfo {
  id: ProductArea;
  label: string;
  description: string;
  icon: string;
}
