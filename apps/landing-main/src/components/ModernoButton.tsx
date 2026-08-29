import React from "react";

interface ModernoButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<any>) => void;
  type?: "button" | "submit" | "reset";
}

export const ModernoButton: React.FC<ModernoButtonProps> = ({
  children,
  variant = "primary",
  href,
  target,
  rel,
  icon,
  className = "",
  onClick,
  type = "button",
}) => {
  const baseClasses = variant === "primary"
    ? "moderno-btn-primary"
    : variant === "secondary"
    ? "moderno-btn-secondary"
    : "px-4 py-2 text-xs font-bold text-[#94A3B8] hover:text-white transition-colors cursor-pointer inline-flex items-center gap-2";

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={`${baseClasses} ${className}`}
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
      className={`${baseClasses} ${className}`}
    >
      <span>{children}</span>
      {icon}
    </button>
  );
};
