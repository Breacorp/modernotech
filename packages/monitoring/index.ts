export interface MonitoringConfig {
  sentryDsn?: string;
  posthogToken?: string;
  posthogHost?: string;
  openTelemetryUrl?: string;
  environment: 'development' | 'staging' | 'production';
}

export class MonitoringService {
  private config: MonitoringConfig;
  private isInitialized = false;

  constructor(config: MonitoringConfig) {
    this.config = config;
  }

  public init(): void {
    if (this.isInitialized) return;
    
    console.log(`📊 [Monitoring] Inicializando wrappers de observabilidad en entorno [${this.config.environment}]`);
    
    if (this.config.sentryDsn) {
      console.log('📌 [Monitoring] Sentry Wrapper preparado para telemetría de errores.');
    }
    
    if (this.config.posthogToken) {
      console.log('📌 [Monitoring] PostHog Wrapper preparado para analíticas de comportamiento.');
    }

    if (this.config.openTelemetryUrl) {
      console.log('📌 [Monitoring] OpenTelemetry Tracer cargado para trazas distribuidas.');
    }

    this.isInitialized = true;
  }

  public captureError(error: Error, extraContext?: Record<string, unknown>): void {
    console.warn(`🚨 [Monitoring - Sentry Simulated] Capturando excepción: ${error.message}`, extraContext);
  }

  public captureEvent(event: string, properties?: Record<string, unknown>): void {
    console.log(`📈 [Monitoring - PostHog Simulated] Evento capturado: [${event}]`, properties);
  }

  public startTrace(name: string): { end: () => void } {
    const startTime = Date.now();
    console.log(`⏱️ [Monitoring - OpenTelemetry] Iniciando traza de rendimiento: [${name}]`);
    return {
      end: () => {
        const duration = Date.now() - startTime;
        console.log(`⏱️ [Monitoring - OpenTelemetry] Finalizando traza: [${name}] - Duración: ${duration}ms`);
      }
    };
  }
}

export const monitor = new MonitoringService({
  environment: 'development',
  sentryDsn: 'https://demo-sentry-dsn.ingest.sentry.io/123456',
  posthogToken: 'phc_demo_posthog_token_123',
  posthogHost: 'https://app.posthog.com',
  openTelemetryUrl: 'http://localhost:4318/v1/traces'
});
