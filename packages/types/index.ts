export interface GlobalUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface ProductMetadata {
  id: string;
  name: string;
  description: string;
  subdomain: string;
  category: 'saas' | 'ai' | 'dev' | 'edu' | 'ecom' | 'erp' | 'gaming';
  isActiveByDefault: boolean;
}

export interface UserSubscription {
  productId: string;
  isActive: boolean;
  role: 'admin' | 'user' | 'billing';
  creditsRemaining?: number;
}
