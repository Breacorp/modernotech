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

