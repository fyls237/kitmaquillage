"use client";

import { useState } from "react";
import { updateOrderStatus, saveMeetingDetails, savePaymentDetails } from "../actions";

export function OrderCard({ order }: { order: any }) {
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Status mapping
  const statusLabels: Record<string, string> = {
    NOUVELLE: "Nouvelle",
    CONTACTEE: "Contactée",
    RDV_FIXE: "RDV Fixé",
    REMISE: "Remise & Payée",
    ANNULEE: "Annulée",
  };

  const statusColors: Record<string, string> = {
    NOUVELLE: "bg-blue-100 text-blue-800 border-blue-200",
    CONTACTEE: "bg-yellow-100 text-yellow-800 border-yellow-200",
    RDV_FIXE: "bg-purple-100 text-purple-800 border-purple-200",
    REMISE: "bg-green-100 text-green-800 border-green-200",
    ANNULEE: "bg-red-100 text-red-800 border-red-200",
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsUpdating(true);
    await updateOrderStatus(order.id, e.target.value);
    setIsUpdating(false);
  };

  return (
    <div className="bg-surface border border-border p-4 sm:p-6 shadow-sm mb-4" style={{ borderRadius: "var(--radius-card)" }}>
      {/* Header : Numéro et Statut */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-accent font-bold text-lg">{order.orderNumber}</span>
          <div className="text-text-muted text-xs mt-1">
            {new Date(order.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric", month: "long", hour: "2-digit", minute: "2-digit"
            })}
          </div>
        </div>
        <select
          value={order.status}
          onChange={handleStatusChange}
          disabled={isUpdating}
          className={`text-xs font-semibold px-2 py-1 rounded-full border outline-none cursor-pointer ${statusColors[order.status] || "bg-gray-100 text-gray-800"}`}
        >
          {Object.entries(statusLabels).map(([val, label]) => (
            <option key={val} value={val}>{label}</option>
          ))}
        </select>
      </div>

      {/* Informations Client */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-sm text-text">
        <div>
          <div className="text-text-muted text-xs uppercase tracking-wider mb-1">Cliente</div>
          <div className="font-medium">{order.firstName} {order.lastName}</div>
          <div className="mt-1">
            <a href={`mailto:${order.email}`} className="text-accent hover:underline">{order.email}</a>
          </div>
          <div className="mt-1">
            <a href={`tel:${order.phone}`} className="inline-flex items-center gap-1 text-accent hover:underline">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              {order.phone}
            </a>
          </div>
          <div className="mt-1 text-text-muted">{order.city} {order.postalCode}</div>
        </div>

        <div>
          <div className="text-text-muted text-xs uppercase tracking-wider mb-1">Teintes choisies</div>
          <div><span className="text-text-muted">Carnation:</span> {order.carnation}</div>
          <div><span className="text-text-muted">Fond:</span> {order.fondDeTeint}</div>
          <div><span className="text-text-muted">Cernes:</span> {order.antiCernes}</div>
        </div>
      </div>

      {order.message && (
        <div className="mb-4 bg-bg p-3 text-sm italic text-text-muted border-l-2 border-accent" style={{ borderRadius: "0 var(--radius-input) var(--radius-input) 0" }}>
          "{order.message}"
        </div>
      )}

      {/* Formulaire RDV si statut est RDV_FIXE et pas de date */}
      {order.status === "RDV_FIXE" && (!order.meetingDate || !order.meetingLocation) && (
        <form action={async (formData) => { await saveMeetingDetails(order.id, formData); }} className="mt-4 p-4 border border-border bg-bg" style={{ borderRadius: "var(--radius-card)" }}>
          <div className="text-sm font-semibold mb-3">Fixer le rendez-vous</div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input type="datetime-local" name="meetingDate" required className="p-2 border border-border bg-surface text-sm w-full outline-none focus:border-accent" />
            <input type="text" name="meetingLocation" placeholder="Lieu (ex: Paris 1er)" required className="p-2 border border-border bg-surface text-sm w-full outline-none focus:border-accent" />
          </div>
          <button type="submit" className="mt-3 w-full bg-accent text-white py-2 text-sm font-semibold hover:bg-accent-hover transition-colors">
            Enregistrer le RDV
          </button>
        </form>
      )}

      {/* Affichage du RDV s'il est fixé */}
      {order.meetingDate && order.meetingLocation && order.status !== "ANNULEE" && (
        <div className="mt-4 p-3 bg-bg border border-border text-sm flex flex-col sm:flex-row sm:items-center justify-between" style={{ borderRadius: "var(--radius-card)" }}>
          <div>
            <span className="font-semibold">RDV : </span>
            {new Date(order.meetingDate).toLocaleString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} à {order.meetingLocation}
          </div>
        </div>
      )}

      {/* Formulaire Paiement si statut est REMISE et pas de paiement */}
      {order.status === "REMISE" && !order.paymentMethod && (
        <form action={async (formData) => { await savePaymentDetails(order.id, formData); }} className="mt-4 p-4 border border-border bg-bg" style={{ borderRadius: "var(--radius-card)" }}>
          <div className="text-sm font-semibold mb-3 text-green-700">Enregistrer l'encaissement</div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <select name="paymentMethod" required className="p-2 border border-border bg-surface text-sm w-full outline-none focus:border-accent">
              <option value="">Moyen de paiement...</option>
              <option value="especes">Espèces</option>
              <option value="virement">Virement</option>
              <option value="paypal">PayPal</option>
            </select>
            <input type="number" name="paymentAmount" step="0.01" defaultValue="99.99" required className="p-2 border border-border bg-surface text-sm w-full outline-none focus:border-accent" />
          </div>
          <button type="submit" className="mt-3 w-full bg-green-600 text-white py-2 text-sm font-semibold hover:bg-green-700 transition-colors">
            Valider l'encaissement
          </button>
        </form>
      )}

      {/* Affichage Paiement s'il est fait */}
      {order.paymentMethod && order.paymentAmount && (
        <div className="mt-4 p-3 bg-green-50 text-green-800 border border-green-200 text-sm flex items-center justify-between" style={{ borderRadius: "var(--radius-card)" }}>
          <div>
            <span className="font-bold">Payé : </span>
            {order.paymentAmount} € via {order.paymentMethod}
          </div>
        </div>
      )}

      {/* Etape 4 : QR Code placeholder */}
      {order.status === "REMISE" && order.paymentMethod && (
        <div className="mt-4 pt-4 border-t border-border flex justify-end">
          <button disabled className="text-sm font-medium text-text-muted bg-surface border border-border px-4 py-2 cursor-not-allowed" style={{ borderRadius: "var(--radius-button)" }}>
            Imprimer QR Code (Étape 4)
          </button>
        </div>
      )}
    </div>
  );
}
