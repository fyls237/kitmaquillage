import { ShadeCard } from "./ShadeCard";
import type { Shade } from "./SkinToneSelector";

interface ShadePickerProps {
  shades: Shade[];
  selected: string | null;
  onSelect: (id: string) => void;
  type: "fond" | "cernes";
}

/**
 * Affiche UNIQUEMENT les teintes compatibles avec la carnation sélectionnée.
 * Règle absolue du CDC : une teinte incompatible n'est JAMAIS affichée.
 * Pas grisée, pas filtrable — elle n'existe pas à l'écran.
 */
export function ShadePicker({ shades, selected, onSelect, type }: ShadePickerProps) {
  if (shades.length === 0) {
    return (
      <p className="text-text-muted text-center py-8">
        Aucune teinte disponible pour cette carnation.
      </p>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      role="radiogroup"
      aria-label={type === "fond" ? "Teintes de fond de teint" : "Teintes d'anti-cernes"}
    >
      {shades.map((shade) => (
        <ShadeCard
          key={shade.id}
          shade={shade}
          isSelected={selected === shade.id}
          onSelect={() => onSelect(shade.id)}
          type={type}
        />
      ))}
    </div>
  );
}
