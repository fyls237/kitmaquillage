import type { InputHTMLAttributes } from "react";

interface UnderlineInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "dark" | "light";
}

export function UnderlineInput({
  variant = "dark",
  className = "",
  ...props
}: UnderlineInputProps) {
  const borderColor =
    variant === "dark"
      ? "border-blanc/40 focus:border-blanc"
      : "border-noir/30 focus:border-noir";

  const textColor = variant === "dark" ? "text-blanc" : "text-noir";

  const placeholderColor =
    variant === "dark"
      ? "placeholder:text-blanc/50"
      : "placeholder:text-noir/40";

  return (
    <input
      className={`
        w-full
        bg-transparent
        border-0 border-b border-solid ${borderColor}
        ${textColor}
        ${placeholderColor}
        py-3 px-0
        text-sm leading-normal
        font-[var(--font-body)]
        outline-none
        transition-colors duration-200
        focus-visible:outline-none focus-visible:border-b-2
        ${className}
      `}
      {...props}
    />
  );
}
