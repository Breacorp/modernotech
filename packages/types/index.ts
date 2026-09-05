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

export interface AuditLogEntry {
  id: string;
  created_at: string;
  actor_user_id: string | null;
  actor_email: string | null;
  action: string;
  resource_type: string;
  resource_id: string;
  status: 'success' | 'failure';
  metadata: Record<string, any>;
  before_data?: Record<string, any> | null;
  after_data?: Record<string, any> | null;
  ip_address?: string | null;
  user_agent?: string | null;
  error_message?: string | null;
}

