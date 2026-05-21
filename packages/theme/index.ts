export interface ThemeColors {
  bg: string;
  panel: string;
  border: string;
  text: string;
  textMuted: string;
  primary: string;
  primaryHover: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
}

export interface ThemeTokens {
  name: string;
  colors: ThemeColors;
  radius: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  glass: {
    bg: string;
    border: string;
    blur: string;
    shadow: string;
  };
}

export const DEFAULT_THEME: ThemeTokens = {
  name: 'Moderno Standard (Dark)',
  colors: {
    bg: '#050505',
    panel: 'rgba(17, 17, 17, 0.65)',
    border: 'rgba(255, 255, 255, 0.06)',
    text: '#f8fafc',
    textMuted: '#8e8e93',
    primary: '#007AFF', // Azul Eléctrico oficial
    primaryHover: '#005BCB',
    accent: '#00d2ff',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444'
  },
  radius: {
    xs: '6px',
    sm: '10px',
    md: '14px',
    lg: '18px',
    xl: '26px',
    full: '9999px'
  },
  glass: {
    bg: 'rgba(17, 17, 17, 0.4)',
    border: 'rgba(255, 255, 255, 0.05)',
    blur: 'blur(20px)',
    shadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
  }
};

export const PRODUCT_THEMES: Record<string, ThemeTokens> = {
  default: DEFAULT_THEME,
  access: {
    ...DEFAULT_THEME,
    name: 'Moderno Access (Enterprise)',
    colors: {
      ...DEFAULT_THEME.colors,
      primary: '#0052FF', // Azul corporativo de seguridad profunda
      primaryHover: '#003ECC',
      accent: '#00a8ff'
    }
  },
  cinema: {
    ...DEFAULT_THEME,
    name: 'Cinema Studio AI (Charcoal & Amber Gold)',
    colors: {
      ...DEFAULT_THEME.colors,
      bg: '#020202',
      panel: 'rgba(10, 10, 10, 0.8)',
      primary: '#FFB800', // Oro cinematográfico brillante
      primaryHover: '#D49B00',
      accent: '#ffffff'
    }
  },
  nova: {
    ...DEFAULT_THEME,
    name: 'Nova AI (Futurism)',
    colors: {
      ...DEFAULT_THEME.colors,
      primary: '#00F0FF', // Holographic Cyan
      primaryHover: '#00B8C4',
      accent: '#007AFF'
    }
  },
  gamestudio: {
    ...DEFAULT_THEME,
    name: 'Game Studio (Cyberpunk Dev)',
    colors: {
      ...DEFAULT_THEME.colors,
      primary: '#FF3B30', // Cyberpunk Electric Orange-Red
      primaryHover: '#D32F2F',
      accent: '#00F0FF'
    }
  }
};
