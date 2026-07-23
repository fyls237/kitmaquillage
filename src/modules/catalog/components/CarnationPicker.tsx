import type { CarnationId } from "./SkinToneSelector";

interface Carnation {
  id: string;
  label: string;
  description: string;
  image: string;
}

interface CarnationPickerProps {
  carnations: Carnation[];
  selected: CarnationId | null;
  onSelect: (id: CarnationId) => void;
}

export function CarnationPicker({ carnations, selected, onSelect }: CarnationPickerProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {carnations.map((carnation) => {
        const isSelected = selected === carnation.id;

        return (
          <button
            key={carnation.id}
            onClick={() => onSelect(carnation.id as CarnationId)}
            className={`
              relative flex flex-col items-center gap-3 p-4
              bg-surface border-2 cursor-pointer
              transition-all duration-200 ease-out
              hover:border-accent/50
              focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2
              ${isSelected ? "border-accent shadow-glow" : "border-border"}
            `}
            style={{ borderRadius: "var(--radius-card)" }}
            aria-pressed={isSelected}
            aria-label={`Carnation ${carnation.label}`}
          >
            {/* Photo de peau */}
            <div
              className="w-full aspect-square overflow-hidden relative"
              style={{ borderRadius: "var(--radius-card)" }}
            >
              <CarnationPlaceholder id={carnation.id} />
            </div>

            {/* Label */}
            <span className="text-text font-semibold text-sm">{carnation.label}</span>
            <span className="text-text-muted text-xs text-center leading-tight">
              {carnation.description}
            </span>

            {/* Badge sélectionné */}
            {isSelected && (
              <div
                className="absolute top-2 right-2 w-6 h-6 bg-accent flex items-center justify-center"
                style={{ borderRadius: "50%" }}
                aria-hidden="true"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}

            {/* Texte accessible pour le statut sélectionné */}
            {isSelected && <span className="sr-only">Sélectionné</span>}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Placeholder SVG pour les photos de carnation.
 * À remplacer par de vraies photos de peau.
 */
function CarnationPlaceholder({ id }: { id: string }) {
  const colors: Record<string, { bg: string; skin: string }> = {
    claire: { bg: "#2a1f1f", skin: "#F5D6C3" },
    medium: { bg: "#2a1f1f", skin: "#D4A574" },
    tan: { bg: "#2a1f1f", skin: "#A67C52" },
    profonde: { bg: "#2a1f1f", skin: "#5C3A21" },
  };

  const c = colors[id] ?? colors.medium;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
      <rect width="200" height="200" fill={c.bg} />
      <circle cx="100" cy="85" r="50" fill={c.skin} />
      <ellipse cx="100" cy="160" rx="55" ry="40" fill={c.skin} />
      {/* Simple face indicators */}
      <circle cx="85" cy="78" r="3" fill={c.bg} opacity="0.6" />
      <circle cx="115" cy="78" r="3" fill={c.bg} opacity="0.6" />
      <ellipse cx="100" cy="95" rx="8" ry="3" fill={c.bg} opacity="0.15" />
    </svg>
  );
}
