import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

interface ButtonLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  const base =
    "inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 font-medium text-base tracking-wide no-underline cursor-pointer transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

  const variants = {
    primary:
      "bg-accent text-white border-0 hover:bg-accent-hover",
    secondary:
      "bg-transparent text-accent border border-accent hover:bg-accent/8",
  };

  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      style={{ borderRadius: "var(--radius-button)" }}
      {...props}
    >
      {children}
    </Link>
  );
}
