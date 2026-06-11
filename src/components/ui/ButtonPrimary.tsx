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
        label-nav
        inline-flex items-center justify-center
        min-h-[48px] px-8 py-3
        bg-fuchsia text-noir
        border-0
        cursor-pointer
        transition-colors duration-200 ease-out
        hover:bg-noir hover:text-fuchsia hover:outline hover:outline-1 hover:outline-fuchsia
        focus-visible:outline-2 focus-visible:outline-fuchsia focus-visible:outline-offset-2
        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-fuchsia disabled:hover:text-noir disabled:hover:outline-0
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
