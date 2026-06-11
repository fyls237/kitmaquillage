import type { Metadata } from "next";
import { DisplayTitle } from "@/components/ui/DisplayTitle";
import { ShareButton } from "./ShareButton";

export const metadata: Metadata = {
  title: "Merci — Mon Premier Kit",
  description:
    "Tu fais partie du mouvement ! Vérifie tes e-mails pour confirmer ton inscription à la liste d'attente Mon Premier Kit.",
  robots: { index: false, follow: false },
};

export default function MerciPage() {
  return (
    <main className="flex-1 flex items-center justify-center min-h-dvh bg-noir px-6 py-16">
      <div
        className="max-w-xl w-full flex flex-col items-center text-center animate-[fadeInUp_0.8s_ease-out_both]"
      >
        {/* Icône de confirmation */}
        <div className="w-16 h-16 mb-8 flex items-center justify-center border border-solid border-fuchsia">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            className="text-fuchsia"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Titre */}
        <DisplayTitle
          accent="Bienvenue"
          accentPosition="above"
          highlightDot={true}
          as="h1"
          className="mb-6"
        >
          MERCI.
        </DisplayTitle>

        {/* Message */}
        <p className="text-blanc/70 text-base leading-relaxed mt-4 mb-2 max-w-md">
          Tu fais officiellement partie du mouvement.
        </p>

        <p className="text-blanc/50 text-sm leading-relaxed mb-10 max-w-md">
          V&eacute;rifie ta bo&icirc;te e-mail (et les spams !) pour confirmer
          ton inscription. On te pr&eacute;viendra en avant-premi&egrave;re
          d&egrave;s le lancement.
        </p>

        {/* Séparateur éditorial */}
        <div className="w-12 h-px bg-filet-sombre mb-10" aria-hidden="true" />

        {/* Section partage */}
        <div className="w-full">
          <p className="eyebrow text-blanc/40 mb-4">
            Parle-en autour de toi
          </p>

          <ShareButton />

          <p className="text-blanc/30 text-xs mt-4">
            #MonPremierKit
          </p>
        </div>
      </div>
    </main>
  );
}
