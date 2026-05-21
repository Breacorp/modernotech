export interface RequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export class ApiError extends Error {
  status: number;
  statusText: string;
  data?: unknown;

  constructor(status: number, statusText: string, data?: unknown) {
    super(`HTTP Error: ${status} ${statusText}`);
    this.status = status;
    this.statusText = statusText;
    this.data = data;
    this.name = 'ApiError';
  }
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { timeout = 8000, retries = 3, retryDelay = 1000, ...fetchOptions } = options;
    const url = `${this.baseUrl}${path}`;
    
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= retries; attempt++) {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);
      
      try {
        const response = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal
        });
        
        clearTimeout(id);
        
        if (!response.ok) {
          let data;
          try {
            data = await response.json();
          } catch {
            data = null;
          }
          throw new ApiError(response.status, response.statusText, data);
        }
        
        return (await response.json()) as T;
      } catch (err: any) {
        clearTimeout(id);
        lastError = err;
        
        if (err.name === 'AbortError') {
          console.warn(`⏳ [Api Client] Request Timeout en intento ${attempt}/${retries} para ${url}`);
        } else {
          console.warn(`⚠️ [Api Client] Error en intento ${attempt}/${retries} para ${url}: ${err.message}`);
        }

        if (attempt < retries) {
          await this.delay(retryDelay * attempt); // Backoff exponencial básico
        }
      }
    }
    
    throw lastError || new Error(`Failed to fetch ${url} after ${retries} attempts`);
  }

  public get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: 'GET' });
  }

  public post<T>(path: string, body: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      },
      body: JSON.stringify(body)
    });
  }
}

export const api = new ApiClient();
