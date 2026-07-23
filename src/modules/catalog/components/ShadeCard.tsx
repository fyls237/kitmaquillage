import type { Shade } from "./SkinToneSelector";

interface ShadeCardProps {
  shade: Shade;
  isSelected: boolean;
  onSelect: () => void;
  type: "fond" | "cernes";
}

/**
 * Carte individuelle d'une teinte.
 * État sélectionné : bordure rose + glow + badge.
 * La sélection n'est jamais signalée par la couleur seule (badge + texte sr-only).
 */
export function ShadeCard({ shade, isSelected, onSelect, type }: ShadeCardProps) {
  // Couleurs placeholder pour les teintes
  const shadeColors: Record<string, string> = {
    F1: "#F5D6C3", F2: "#EEDCC3", F3: "#D4B896",
    F4: "#C9A57A", F5: "#A67C52", F6: "#7B5438", F7: "#5C3A21",
    AC1: "#F8D9C4", AC2: "#E8C9AB", AC3: "#CDA67E",
    AC4: "#B58B5E", AC5: "#8B6239", AC6: "#6B4427",
  };

  return (
    <button
      onClick={onSelect}
      className={`
        flex items-center gap-4 p-4
        bg-surface border-2 cursor-pointer
        transition-all duration-200 ease-out
        hover:border-accent/50
        focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2
        text-left w-full
        ${isSelected ? "border-accent shadow-glow" : "border-border"}
      `}
      style={{ borderRadius: "var(--radius-card)" }}
      role="radio"
      aria-checked={isSelected}
      aria-label={`${shade.nom} — ${shade.sousTon}`}
    >
      {/* Swatch de couleur */}
      <div
        className="w-14 h-14 flex-shrink-0 relative"
        style={{
          borderRadius: "var(--radius-input)",
          backgroundColor: shadeColors[shade.id] ?? "#999",
        }}
      >
        {isSelected && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-accent/30"
            style={{ borderRadius: "var(--radius-input)" }}
            aria-hidden="true"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        )}
      </div>

      {/* Texte */}
      <div className="flex-1 min-w-0">
        <span className="text-text font-semibold text-sm block">{shade.nom}</span>
        <span className="text-text-muted text-xs block mt-0.5 leading-tight">
          {shade.sousTon}
        </span>
      </div>

      {/* Badge sélectionné */}
      {isSelected && (
        <>
          <span className="eyebrow text-accent flex-shrink-0">Choisi</span>
          <span className="sr-only">Sélectionné</span>
        </>
      )}
    </button>
  );
}
