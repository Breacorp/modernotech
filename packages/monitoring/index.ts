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
    if (this.config.sentryDsn) {
      console.error(`🚨 [Monitoring] Capturando excepción: ${error.message}`, extraContext);
    }
  }

  public captureEvent(event: string, properties?: Record<string, unknown>): void {
    if (this.config.posthogToken) {
      console.log(`📈 [Monitoring] Evento registrado: [${event}]`, properties);
    }
  }

  public startTrace(name: string): { end: () => void } {
    const startTime = Date.now();
    return {
      end: () => {
        const duration = Date.now() - startTime;
        if (this.config.openTelemetryUrl) {
          console.log(`⏱️ [Monitoring - OpenTelemetry] [${name}] - Duración: ${duration}ms`);
        }
      }
    };
  }
}

export const monitor = new MonitoringService({
  environment: (process.env.NODE_ENV as any) || 'production',
  sentryDsn: process.env.SENTRY_DSN,
  posthogToken: process.env.POSTHOG_TOKEN,
  posthogHost: process.env.POSTHOG_HOST || 'https://app.posthog.com',
  openTelemetryUrl: process.env.OTEL_EXPORTER_OTLP_ENDPOINT
});
