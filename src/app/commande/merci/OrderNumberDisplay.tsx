"use client";

import { useSearchParams } from "next/navigation";

export function OrderNumberDisplay() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");

  if (!orderNumber) return null;

  return (
    <div
      className="
        inline-flex items-center gap-2
        bg-surface border border-border
        px-5 py-2.5 mb-4
      "
      style={{ borderRadius: "var(--radius-card)" }}
    >
      <span className="text-text-muted text-xs uppercase tracking-wider">
        N° commande
      </span>
      <span className="text-accent font-bold text-lg tracking-wider">
        {orderNumber}
      </span>
    </div>
  );
}
