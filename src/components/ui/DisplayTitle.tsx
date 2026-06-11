import type { ReactNode } from "react";

interface DisplayTitleProps {
  children: ReactNode;
  accent?: string;
  accentPosition?: "above" | "below";
  highlightDot?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
  size?: "large" | "medium" | "small";
}

export function DisplayTitle({
  children,
  accent,
  accentPosition = "above",
  highlightDot = false,
  as: Tag = "h1",
  className = "",
  size = "large",
}: DisplayTitleProps) {
  
  let fontSizeStyle = "clamp(40px, 8vw, 96px)";
  if (size === "medium") fontSizeStyle = "clamp(32px, 5vw, 64px)";
  if (size === "small") fontSizeStyle = "clamp(24px, 4vw, 48px)";

  return (
    <div className={`relative flex flex-col items-center text-center ${className}`}>
      {accent && accentPosition === "above" && (
        <span
          className="accent-script block text-fuchsia mb-2"
          style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
          aria-hidden="true"
        >
          {accent}
        </span>
      )}

      <Tag
        className="text-blanc font-light tracking-wide m-0 text-center"
        style={{
          fontSize: fontSizeStyle,
          lineHeight: 1.1,
        }}
      >
        {highlightDot ? (
          <>
            {String(children).replace(/\.$/, "")}
            <span className="text-fuchsia">.</span>
          </>
        ) : (
          children
        )}
      </Tag>

      {accent && accentPosition === "below" && (
        <span
          className="accent-script block text-fuchsia mt-2"
          style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
          aria-hidden="true"
        >
          {accent}
        </span>
      )}

      {/* Accessible equivalent of the handwritten accent */}
      {accent && <span className="sr-only">{accent}</span>}
    </div>
  );
}
