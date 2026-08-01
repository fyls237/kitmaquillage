"use client";

import { useState } from "react";
import { OrderCard } from "./OrderCard";

// On suppose que l'Order retourné par Prisma a tous ces champs
type Order = any; // Pour l'instant on utilise 'any' ou on peut typer correctement

interface OrderTabsProps {
  orders: Order[];
}

export function OrderTabs({ orders }: OrderTabsProps) {
  const [activeTab, setActiveTab] = useState<
    "A_TRAITER" | "RDV" | "ENCAISSEES" | "ANNULEES"
  >("A_TRAITER");

  const filteredOrders = orders.filter((order) => {
    switch (activeTab) {
      case "A_TRAITER":
        return order.status === "NOUVELLE" || order.status === "CONTACTEE";
      case "RDV":
        return order.status === "RDV_FIXE";
      case "ENCAISSEES":
        return order.status === "REMISE";
      case "ANNULEES":
        return order.status === "ANNULEE";
      default:
        return false;
    }
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Navigation des onglets */}
      <div className="flex overflow-x-auto border-b border-border mb-6 no-scrollbar">
        <TabButton
          label="À traiter"
          count={orders.filter(o => o.status === "NOUVELLE" || o.status === "CONTACTEE").length}
          isActive={activeTab === "A_TRAITER"}
          onClick={() => setActiveTab("A_TRAITER")}
        />
        <TabButton
          label="Rendez-vous"
          count={orders.filter(o => o.status === "RDV_FIXE").length}
          isActive={activeTab === "RDV"}
          onClick={() => setActiveTab("RDV")}
        />
        <TabButton
          label="Encaissées"
          count={orders.filter(o => o.status === "REMISE").length}
          isActive={activeTab === "ENCAISSEES"}
          onClick={() => setActiveTab("ENCAISSEES")}
        />
        <TabButton
          label="Annulées"
          count={orders.filter(o => o.status === "ANNULEE").length}
          isActive={activeTab === "ANNULEES"}
          onClick={() => setActiveTab("ANNULEES")}
        />
      </div>

      {/* Liste des commandes */}
      <div className="flex flex-col gap-4">
        {filteredOrders.length === 0 ? (
          <p className="text-text-muted text-center py-12">
            Aucune commande dans cet onglet.
          </p>
        ) : (
          filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </div>
    </div>
  );
}

function TabButton({
  label,
  count,
  isActive,
  onClick,
}: {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-3 whitespace-nowrap
        border-b-2 font-medium text-sm transition-colors
        ${
          isActive
            ? "border-accent text-accent"
            : "border-transparent text-text-muted hover:text-text hover:border-border"
        }
      `}
    >
      {label}
      <span
        className={`
          text-xs px-2 py-0.5 rounded-full
          ${isActive ? "bg-accent/10 text-accent" : "bg-surface text-text-muted"}
        `}
      >
        {count}
      </span>
    </button>
  );
}
