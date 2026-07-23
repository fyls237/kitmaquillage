import Link from "next/link";
import type { Shade } from "./SkinToneSelector";

interface Carnation {
  id: string;
  label: string;
  description: string;
}

interface SelectionSummaryProps {
  carnation: Carnation | null;
  fondDeTeint: Shade | null;
  antiCernes: Shade | null;
}

export function SelectionSummary({ carnation, fondDeTeint, antiCernes }: SelectionSummaryProps) {
  if (!carnation || !fondDeTeint || !antiCernes) return null;

  return (
    <section
      className="bg-surface border border-border p-6 sm:p-8"
      style={{ borderRadius: "var(--radius-card)" }}
    >
      <div className="text-center mb-6">
        <span className="eyebrow text-accent block mb-2">Récapitulatif</span>
        <h3 className="text-text text-xl sm:text-2xl font-bold m-0">
          Ton kit personnalisé
        </h3>
      </div>

      <div className="space-y-4 mb-8">
        {/* Carnation */}
        <SummaryRow
          label="Carnation"
          value={carnation.label}
        />
        {/* Fond de teint */}
        <SummaryRow
          label="Fond de teint ELF Soft Glam"
          value={fondDeTeint.nom}
          detail={fondDeTeint.sousTon}
        />
        {/* Anti-cernes */}
        <SummaryRow
          label="Anti-cernes Essence"
          value={antiCernes.nom}
          detail={antiCernes.sousTon}
        />
      </div>

      {/* Prix + CTA */}
      <div className="text-center">
        <p className="text-text text-3xl font-bold m-0 mb-1">
          <span className="text-accent">99,99 €</span>
        </p>
        <p className="text-text-muted text-xs mb-6 m-0">Kit complet — 10 produits inclus</p>

        <Link
          href={`/commander?carnation=${carnation.id}&fond=${fondDeTeint.id}&cernes=${antiCernes.id}`}
          className="
            inline-flex items-center justify-center gap-2
            min-h-[48px] px-8 py-4
            bg-accent text-white
            font-semibold text-lg no-underline
            transition-all duration-200 ease-out
            hover:bg-accent-hover
            focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2
            shadow-glow
          "
          style={{ borderRadius: "var(--radius-button)" }}
        >
          Commander ce kit
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

function SummaryRow({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-border">
      <span className="text-text-muted text-sm">{label}</span>
      <div className="text-right">
        <span className="text-text font-semibold text-sm block">{value}</span>
        {detail && (
          <span className="text-text-muted text-xs block mt-0.5">{detail}</span>
        )}
      </div>
    </div>
  );
}
