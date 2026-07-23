import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonSecondaryProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function ButtonSecondary({
  children,
  className = "",
  disabled,
  ...props
}: ButtonSecondaryProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center
        min-h-[44px] px-6 py-2.5
        bg-transparent text-accent
        border border-accent
        font-medium text-base tracking-wide
        cursor-pointer
        transition-all duration-200 ease-out
        hover:bg-accent/8
        focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2
        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent
        ${className}
      `}
      style={{ borderRadius: "var(--radius-button)" }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
