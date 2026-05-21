export interface FeatureFlags {
  enableVoiceAI: boolean;
  enableCinemaStudioBeta: boolean;
  enableOIDC: boolean;
  enableBilling: boolean;
  enableExperimentalModels: boolean;
  [key: string]: boolean;
}

// Configuración por defecto para desarrollo local
export const DEFAULT_FLAGS: FeatureFlags = {
  enableVoiceAI: true,
  enableCinemaStudioBeta: true,
  enableOIDC: false, // Desactivado por defecto hasta fase final
  enableBilling: false, // Desactivado por defecto en staging/dev
  enableExperimentalModels: false
};

export class FeatureFlagsService {
  private flags: FeatureFlags;

  constructor(initialFlags: FeatureFlags = DEFAULT_FLAGS) {
    this.flags = { ...initialFlags };
  }

  public isEnabled(flagName: keyof FeatureFlags): boolean {
    return this.flags[flagName] ?? false;
  }

  public setFlag(flagName: keyof FeatureFlags, value: boolean): void {
    this.flags[flagName] = value;
    console.log(`🚩 [Feature Flags] Bandera modificada: [${flagName}] = ${value}`);
  }

  public getAllFlags(): FeatureFlags {
    return { ...this.flags };
  }
}

export const flags = new FeatureFlagsService();
