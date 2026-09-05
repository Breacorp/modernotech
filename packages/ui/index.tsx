import React, { createContext, useContext, useState } from "react";
import { ThemeTokens, DEFAULT_THEME, PRODUCT_THEMES } from "@moderno/theme";

// 1. Theme Engine Context
const ThemeContext = createContext<{
  theme: ThemeTokens;
  setTheme: (themeName: string) => void;
}>({
  theme: DEFAULT_THEME,
  setTheme: () => {}
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setSelectedTheme] = useState<ThemeTokens>(DEFAULT_THEME);

  const setTheme = (themeName: string) => {
    if (PRODUCT_THEMES[themeName]) {
      setSelectedTheme(PRODUCT_THEMES[themeName]);
    } else {
      setSelectedTheme(DEFAULT_THEME);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div style={getThemeStyles(theme)} className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-500">
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export function getThemeStyles(theme: ThemeTokens) {
  return {
    "--bg": theme.colors.bg,
    "--panel": theme.colors.panel,
    "--border": theme.colors.border,
    "--text": theme.colors.text,
    "--text-muted": theme.colors.textMuted,
    "--primary": theme.colors.primary,
    "--primary-hover": theme.colors.primaryHover,
    "--accent": theme.colors.accent,
    "--success": theme.colors.success,
    "--warning": theme.colors.warning,
    "--danger": theme.colors.danger,
    "--radius-xs": theme.radius.xs,
    "--radius-sm": theme.radius.sm,
    "--radius-md": theme.radius.md,
    "--radius-lg": theme.radius.lg,
    "--radius-xl": theme.radius.xl,
    "--glass-bg": theme.glass.bg,
    "--glass-border": theme.glass.border,
    "--glass-blur": theme.glass.blur,
    "--glass-shadow": theme.glass.shadow,
  } as React.CSSProperties;
}

// 2. Component: Button
export const Button: React.FC<{
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}> = ({ children, variant = "primary", onClick, className = "", disabled = false, type = "button" }) => {
  const baseStyles = "px-4 py-2.5 text-xs font-semibold tracking-wide rounded-[var(--radius-sm)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white shadow-[0_4px_14px_rgba(0,122,255,0.2)]",
    secondary: "bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] border border-[var(--border)] text-[var(--text)]",
    danger: "bg-[var(--danger)] hover:opacity-90 text-white shadow-[0_4px_14px_rgba(239,68,68,0.2)]",
    ghost: "bg-transparent hover:bg-[rgba(255,255,255,0.03)] text-[var(--text-muted)] hover:text-white"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// 3. Component: Card
export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <div className={`bg-[var(--panel)] border border-[var(--border)] p-6 rounded-[var(--radius-md)] ${className}`}>
      {children}
    </div>
  );
};

// 4. Component: GlassPanel
export const GlassPanel: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <div
      style={{
        backdropFilter: "var(--glass-blur)",
        WebkitBackdropFilter: "var(--glass-blur)",
        backgroundColor: "var(--glass-bg)",
        borderColor: "var(--glass-border)",
        boxShadow: "var(--glass-shadow)"
      }}
      className={`border rounded-[var(--radius-lg)] p-8 ${className}`}
    >
      {children}
    </div>
  );
};

// 5. Component: Modal
export const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[4px]">
      <div className="w-full max-w-[500px] bg-[rgba(13,13,13,0.9)] border border-[var(--border)] p-8 rounded-[var(--radius-lg)] shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-fade-in relative z-55">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
          <button onClick={onClose} className="text-[var(--text-muted)] hover:text-white text-base">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

// 6. Component: Sidebar
export const Sidebar: React.FC<{
  logo: React.ReactNode;
  navItems: { id: string; label: string; icon: string }[];
  activeId: string;
  onSelect: (id: any) => void;
  footer?: React.ReactNode;
}> = ({ logo, navItems, activeId, onSelect, footer }) => {
  return (
    <aside className="w-64 bg-[rgba(13,13,13,0.8)] border-r border-[var(--border)] p-6 flex flex-col justify-between hidden md:flex h-full">
      <div>
        <div className="mb-10 px-2">{logo}</div>
        <nav className="space-y-1.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-[var(--radius-sm)] text-xs font-semibold tracking-wide transition-all ${
                activeId === item.id
                  ? "bg-[rgba(255,255,255,0.03)] border border-[var(--border)] text-white"
                  : "text-[var(--text-muted)] hover:text-white hover:bg-[rgba(255,255,255,0.02)] border border-transparent"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      {footer && <div className="border-t border-[var(--border)] pt-6">{footer}</div>}
    </aside>
  );
};

// 7. Component: Navbar
export const Navbar: React.FC<{
  title: string;
  actions?: React.ReactNode;
}> = ({ title, actions }) => {
  return (
    <header className="flex justify-between items-center border-b border-[var(--border)] pb-6 mb-8">
      <div>
        <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-muted)]">Moderno Platform</span>
        <h2 className="text-xl font-bold tracking-tight text-white mt-0.5">{title}</h2>
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </header>
  );
};

// 8. Component: Tabs
export const Tabs: React.FC<{
  items: { id: string; label: string }[];
  activeId: string;
  onSelect: (id: string) => void;
}> = ({ items, activeId, onSelect }) => {
  return (
    <div className="flex border-b border-[var(--border)] mb-6 overflow-x-auto gap-6">
      {items.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          className={`pb-3 text-xs font-semibold tracking-wide border-b-2 transition-all ${
            activeId === tab.id
              ? "border-[var(--primary)] text-white"
              : "border-transparent text-[var(--text-muted)] hover:text-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

// 9. Component: Input
export const Input: React.FC<{
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}> = ({ label, type = "text", placeholder = "", value, onChange, className = "" }) => {
  return (
    <div className="space-y-2 w-full">
      {label && <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-[#0d0d0d] border border-[var(--border)] px-4 py-3 rounded-[var(--radius-sm)] text-xs focus:outline-none focus:border-[var(--primary)] transition-all ${className}`}
      />
    </div>
  );
};

// 10. Component: Select
export const Select: React.FC<{
  label?: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}> = ({ label, options, value, onChange, className = "" }) => {
  return (
    <div className="space-y-2 w-full">
      {label && <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className={`w-full bg-[#0d0d0d] border border-[var(--border)] px-4 py-3 rounded-[var(--radius-sm)] text-xs focus:outline-none focus:border-[var(--primary)] text-white transition-all ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#111]">{opt.label}</option>
        ))}
      </select>
    </div>
  );
};

// 11. Component: Badge
export const Badge: React.FC<{
  children: React.ReactNode;
  variant?: "success" | "warning" | "danger" | "neutral";
}> = ({ children, variant = "neutral" }) => {
  const bgStyles = {
    success: "bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20",
    warning: "bg-[var(--warning)]/10 text-[var(--warning)] border-[var(--warning)]/20",
    danger: "bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/20",
    neutral: "bg-[rgba(255,255,255,0.03)] text-[var(--text-muted)] border-[var(--border)]"
  };

  return (
    <span className={`px-2 py-0.5 border text-[9px] font-bold uppercase tracking-wider rounded-full ${bgStyles[variant]}`}>
      {children}
    </span>
  );
};

// 12. Component: Tooltip
export const Tooltip: React.FC<{
  text: string;
  children: React.ReactNode;
}> = ({ text, children }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#111] border border-[var(--border)] text-white text-[9px] tracking-wide font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 shadow-xl whitespace-nowrap z-40">
        {text}
      </div>
    </div>
  );
};

// 13. Component: Dialog (Alert Box)
export const Dialog: React.FC<{
  type?: "info" | "warning" | "error";
  children: React.ReactNode;
}> = ({ type = "info", children }) => {
  const styles = {
    info: "bg-[var(--primary)]/5 border-[var(--primary)]/20 text-[var(--primary)]",
    warning: "bg-[var(--warning)]/5 border-[var(--warning)]/20 text-[var(--warning)]",
    error: "bg-[var(--danger)]/5 border-[var(--danger)]/20 text-[var(--danger)]"
  };

  return (
    <div className={`border p-4 rounded-[var(--radius-sm)] text-xs leading-relaxed ${styles[type]}`}>
      {children}
    </div>
  );
};

// 14. Component: Dropdown
export const Dropdown: React.FC<{
  label: React.ReactNode;
  items: { label: string; onClick: () => void }[];
}> = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">{label}</button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-[#0d0d0d] border border-[var(--border)] rounded-[var(--radius-sm)] shadow-2xl py-1.5 z-40 animate-fade-in">
            {items.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-[11px] font-semibold text-[var(--text-muted)] hover:text-white hover:bg-[rgba(255,255,255,0.03)]"
              >
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// 15. Component: Table
export const Table: React.FC<{
  headers: string[];
  rows: React.ReactNode[][];
}> = ({ headers, rows }) => {
  return (
    <div className="overflow-x-auto w-full border border-[var(--border)] rounded-[var(--radius-md)] bg-[rgba(13,13,13,0.3)]">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-[var(--border)] bg-[rgba(255,255,255,0.01)] text-[var(--text-muted)] font-semibold uppercase tracking-wider">
            {headers.map((h, i) => (
              <th key={i} className="p-4">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {rows.map((row, idx) => (
            <tr key={idx} className="hover:bg-[rgba(255,255,255,0.01)] text-[var(--text)]">
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="p-4">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 16. Component: PricingCard
export const PricingCard: React.FC<{
  planName: string;
  price: string;
  features: string[];
  ctaText: string;
  onCtaClick?: () => void;
  isPopular?: boolean;
}> = ({ planName, price, features, ctaText, onCtaClick, isPopular = false }) => {
  return (
    <div className={`bg-[var(--panel)] border p-6 rounded-[var(--radius-md)] flex flex-col justify-between transition-all ${
      isPopular ? 'border-[var(--primary)] shadow-[0_8px_32px_rgba(0,122,255,0.1)]' : 'border-[var(--border)]'
    }`}>
      <div>
        {isPopular && (
          <span className="text-[8px] font-bold uppercase tracking-widest bg-[var(--primary)] text-white px-2 py-0.5 rounded-full mb-4 inline-block">
            Popular
          </span>
        )}
        <h4 className="font-bold text-sm text-[var(--text-muted)] uppercase tracking-wide">{planName}</h4>
        <div className="text-2xl font-extrabold text-white mt-2 mb-6">{price}</div>
        <ul className="space-y-2.5 text-xs text-[var(--text-muted)] mb-8">
          {features.map((f, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="text-[var(--primary)]">✓</span>
              {f}
            </li>
          ))}
        </ul>
      </div>
      <Button variant={isPopular ? "primary" : "secondary"} onClick={onCtaClick} className="w-full">
        {ctaText}
      </Button>
    </div>
  );
};

// 17. Component: ProductCard
export const ProductCard: React.FC<{
  name: string;
  description: string;
  subdomain: string;
  status: "activo" | "disponible" | "proximamente";
  onLaunch?: () => void;
}> = ({ name, description, subdomain, status, onLaunch }) => {
  const badgeVariants = {
    activo: "success" as const,
    disponible: "neutral" as const,
    proximamente: "warning" as const
  };

  return (
    <Card className="hover:border-[var(--primary)]/30 transition-all flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-3">
          <span className="text-[9px] font-bold text-[var(--text-muted)] font-mono">{subdomain}</span>
          <Badge variant={badgeVariants[status]}>{status}</Badge>
        </div>
        <h4 className="font-bold text-sm text-white">{name}</h4>
        <p className="text-[11px] text-[var(--text-muted)] mt-2 leading-relaxed line-clamp-3">{description}</p>
      </div>
      <div className="mt-6 pt-4 border-t border-[var(--border)] flex justify-end">
        {status === "activo" && (
          <Button variant="primary" onClick={onLaunch} className="px-3.5 py-1.5 text-[10px]">
            Entrar →
          </Button>
        )}
        {status === "disponible" && (
          <Button variant="secondary" onClick={onLaunch} className="px-3.5 py-1.5 text-[10px]">
            Activar
          </Button>
        )}
        {status === "proximamente" && (
          <span className="text-[10px] text-[var(--text-muted)] font-semibold py-1 px-3 bg-[rgba(255,255,255,0.02)] border border-[var(--border)] rounded-lg">
            Próximamente
          </span>
        )}
      </div>
    </Card>
  );
};

// 18. Component: DashboardShell (App Layout Shell)
export const DashboardShell: React.FC<{
  sidebar: React.ReactNode;
  children: React.ReactNode;
}> = ({ sidebar, children }) => {
  return (
    <div className="min-h-screen flex overflow-hidden">
      {sidebar}
      <div className="flex-1 overflow-y-auto p-8">{children}</div>
    </div>
  );
};

// 19. Component: MetricCard
export const MetricCard: React.FC<{
  title: string;
  value: string;
  description: string;
}> = ({ title, value, description }) => {
  return (
    <Card>
      <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">{title}</span>
      <div className="text-2xl font-extrabold text-white mt-1">{value}</div>
      <p className="text-[10px] text-[var(--text-muted)] mt-2">{description}</p>
    </Card>
  );
};

// 20. Component: AIUsageCard (Progress metrics card)
export const AIUsageCard: React.FC<{
  title: string;
  used: number;
  limit: number;
  unit: string;
}> = ({ title, used, limit, unit }) => {
  const percentage = Math.min(100, Math.floor((used / limit) * 100));
  return (
    <Card className="w-full">
      <div className="flex justify-between text-xs mb-2">
        <span className="font-semibold text-white">{title}</span>
        <span className="text-[var(--text-muted)]">
          {used} / {limit} {unit} ({percentage}%)
        </span>
      </div>
      <div className="h-2 w-full bg-[#0d0d0d] rounded-full overflow-hidden border border-[var(--border)]">
        <div
          className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </Card>
  );
};

// 21. Component: BillingCard
export const BillingCard: React.FC<{
  activePlans: { productName: string; planName: string; cost: number }[];
  totalCost: number;
}> = ({ activePlans, totalCost }) => {
  return (
    <Card className="space-y-4">
      <h3 className="text-sm font-bold text-white mb-4">Planes Contratados</h3>
      <div className="divide-y divide-[var(--border)]">
        {activePlans.map((plan, idx) => (
          <div key={idx} className="py-3 flex justify-between items-center text-xs">
            <div>
              <h4 className="font-bold text-white">{plan.productName}</h4>
              <span className="text-[var(--text-muted)] text-[9px]">{plan.planName}</span>
            </div>
            <span className="font-semibold text-white">USD ${plan.cost.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-[var(--border)] flex justify-between items-center">
        <span className="text-xs font-bold text-white">Total Mensual Estimado</span>
        <span className="text-base font-extrabold text-[var(--primary)]">USD ${totalCost.toFixed(2)}</span>
      </div>
    </Card>
  );
};

// 22. Component: ProductLauncher
export const ProductLauncher: React.FC<{
  productName: string;
  subdomain: string;
  onClose: () => void;
}> = ({ productName, subdomain, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-[4px]">
      <div className="w-full max-w-[550px] bg-[#0d0d0d] border border-[var(--border)] p-8 rounded-[var(--radius-lg)] shadow-2xl relative z-55">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white tracking-tight">Acceso Directo: {productName}</h3>
          <button onClick={onClose} className="text-[var(--text-muted)] hover:text-white">✕</button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Subdominio Federado</span>
            <div className="text-sm font-bold text-[var(--primary)] mt-0.5">{subdomain}</div>
          </div>

          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed border-t border-[var(--border)] pt-4">
            Tu sesión autenticada se propaga de manera transparente mediante cookies de dominio unificado (<code className="text-[#00E5FF]">.moderno.com.ar</code>).
          </p>

          <div className="pt-2 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/[0.04] text-white text-xs font-bold"
            >
              Cerrar
            </button>
            <a
              href={`https://${subdomain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-xl bg-[var(--primary)] text-black text-xs font-black tracking-wider shadow-lg"
            >
              Abrir Plataforma &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
