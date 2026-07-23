import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonPrimaryProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function ButtonPrimary({
  children,
  className = "",
  disabled,
  ...props
}: ButtonPrimaryProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center
        min-h-[44px] px-6 py-2.5
        bg-accent text-white
        font-semibold text-lg tracking-wide
        cursor-pointer
        transition-all duration-200 ease-out
        hover:bg-accent-hover
        focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2
        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-accent
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
