import type { CarnationId } from "./SkinToneSelector";

interface Carnation {
  id: CarnationId;
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
            onClick={() => onSelect(carnation.id)}
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
              <img
                src={carnation.image}
                alt={carnation.label}
                className="w-full h-full object-cover"
              />
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

