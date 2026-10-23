import React from "react";

interface ModernoButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit" | "reset";
  ariaExpanded?: boolean;
  ariaControls?: string;
  ariaLabel?: string;
}

const variantClasses = {
  primary:
    "bg-[var(--moderno-accent-strong)] text-white shadow-[0_10px_30px_rgba(36,91,219,0.22)] hover:bg-[var(--moderno-accent-hover)]",
  secondary:
    "border border-white/[0.12] bg-white/[0.035] text-[var(--moderno-text)] hover:border-white/20 hover:bg-white/[0.07]",
  ghost:
    "text-[var(--moderno-text-muted)] hover:text-[var(--moderno-text)]",
};

const sizeClasses = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-6 text-sm",
};

export const ModernoButton: React.FC<ModernoButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  icon,
  className = "",
  onClick,
  type = "button",
  ariaExpanded,
  ariaControls,
  ariaLabel,
}) => {
  const classes = `moderno-focus inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-colors duration-200 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={classes}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        aria-label={ariaLabel}
      >
        <span>{children}</span>
        {icon}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-label={ariaLabel}
    >
      <span>{children}</span>
      {icon}
    </button>
  );
};
