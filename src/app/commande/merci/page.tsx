import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderNumberDisplay } from "./OrderNumberDisplay";

export const metadata: Metadata = {
  title: "Merci pour ta commande — TON GLOW",
  description:
    "Ta commande est enregistrée. Nous te contacterons sous 24 h pour organiser la remise en main propre de ton kit.",
  robots: { index: false, follow: false },
};

export default function CommandeMerciPage() {
  return (
    <main className="flex-1 flex items-center justify-center min-h-dvh bg-bg px-6 py-16">
      <div
        className="max-w-xl w-full flex flex-col items-center text-center animate-[fadeInUp_0.8s_ease-out_both]"
      >
        {/* Icône de confirmation */}
        <div className="w-16 h-16 mb-8 flex items-center justify-center border border-solid border-accent">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            className="text-accent"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Titre */}
        <h1
          className="accent-script text-white mb-6 text-center"
          style={{ fontSize: "clamp(40px, 6vw, 64px)", lineHeight: 1 }}
        >
          Merci pour ta commande
        </h1>

        {/* Numéro de commande */}
        <Suspense
          fallback={
            <p className="text-text-muted text-sm mb-4">
              Chargement…
            </p>
          }
        >
          <OrderNumberDisplay />
        </Suspense>

        {/* Message principal */}
        <p className="text-text/70 text-base leading-relaxed mt-4 mb-2 max-w-md">
          Nous te contacterons sous 24&nbsp;h par téléphone pour
          organiser la remise en main propre de ton kit.
        </p>

        <p className="text-text/50 text-sm leading-relaxed mb-10 max-w-md">
          Un e-mail de confirmation vient de t&apos;être envoyé.
          Vérifie ta boîte de réception (et les spams !).
        </p>

        {/* Séparateur éditorial */}
        <div className="w-12 h-px bg-border mb-10" aria-hidden="true" />

        {/* Info pratique */}
        <div className="w-full">
          <p className="eyebrow text-text-muted mb-4">
            Comment ça se passe ?
          </p>

          <div className="flex flex-col gap-4 text-left max-w-sm mx-auto">
            <StepInfo
              number="1"
              text="Nous te contacterons pour fixer un rendez-vous."
            />
            <StepInfo
              number="2"
              text="Tu récupères ton kit en main propre et tu règles sur place."
            />
            <StepInfo
              number="3"
              text="Tu scannes le QR Code du guide et tu accèdes à Glow Academy."
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function StepInfo({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="
          flex-shrink-0 w-7 h-7 flex items-center justify-center
          bg-accent text-white text-xs font-bold
        "
        style={{ borderRadius: "50%" }}
      >
        {number}
      </span>
      <p className="text-text/70 text-sm leading-relaxed m-0">{text}</p>
    </div>
  );
}
