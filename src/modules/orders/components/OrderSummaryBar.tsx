import teintesData from "@/data/teintes.json";

interface OrderSummaryBarProps {
  carnation: string;
  fondDeTeint: string;
  antiCernes: string;
}

export function OrderSummaryBar({
  carnation,
  fondDeTeint,
  antiCernes,
}: OrderSummaryBarProps) {
  const carnationData = teintesData.carnations.find(
    (c) => c.id === carnation
  );
  const fondData = teintesData.teintes.fond.find(
    (t) => t.id === fondDeTeint
  );
  const cernesData = teintesData.teintes.cernes.find(
    (t) => t.id === antiCernes
  );

  return (
    <div
      className="bg-surface border border-border p-5 sm:p-6 mb-8"
      style={{ borderRadius: "var(--radius-card)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="eyebrow text-accent">Ton kit personnalisé</span>
        <span className="text-accent font-bold text-lg">99,99&nbsp;€</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <SummaryItem
          label="Carnation"
          value={carnationData?.label ?? carnation}
        />
        <SummaryItem
          label="Fond de teint"
          value={fondData?.nom ?? fondDeTeint}
        />
        <SummaryItem
          label="Anti-cernes"
          value={cernesData?.nom ?? antiCernes}
        />
      </div>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-text-muted text-xs uppercase tracking-wider">
        {label}
      </span>
      <span className="text-text text-sm font-semibold">{value}</span>
    </div>
  );
}
