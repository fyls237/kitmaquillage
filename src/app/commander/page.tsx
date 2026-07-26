import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderForm } from "@/modules/orders";

export const metadata: Metadata = {
  title: "Commander — TON GLOW",
  description:
    "Finalise ta commande TON GLOW. Tes teintes personnalisées, un kit complet à 99,99 €. Nous te contacterons pour organiser la remise en main propre.",
  robots: { index: true, follow: true },
};

export default function CommanderPage() {
  return (
    <div className="bg-bg min-h-dvh">
      {/* En-tête de page */}
      <section className="pt-12 pb-8 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span
            className="accent-script text-accent block mb-3"
            style={{ fontSize: "clamp(36px, 6vw, 52px)", lineHeight: 1 }}
            aria-hidden="true"
          >
            Dernière étape
          </span>
          <span className="sr-only">Dernière étape</span>

          <p className="text-text-muted text-base mt-4 m-0 max-w-md mx-auto">
            Remplis tes coordonnées. Aucun paiement en ligne&nbsp;:
            Nous te contacterons pour organiser la remise en main propre.
          </p>
        </div>
      </section>

      {/* Formulaire */}
      <section className="pb-20 px-4 sm:px-6">
        <Suspense
          fallback={
            <div className="max-w-2xl mx-auto text-center py-12">
              <p className="text-text-muted">Chargement…</p>
            </div>
          }
        >
          <OrderForm />
        </Suspense>
      </section>
    </div>
  );
}
