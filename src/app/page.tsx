import Image from "next/image";
import { Suspense } from "react";
import { AnnouncementBar } from "@/components/ui/AnnouncementBar";
import { DisplayTitle } from "@/components/ui/DisplayTitle";
import { WaitlistForm } from "@/modules/marketing/components/WaitlistForm";
import { SubscriberCount } from "@/modules/marketing/components/SubscriberCount";

export default function HomePage() {
  // Date de lancement (ex: dans 14 jours)
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 14);

  return (
    <>
      {/* ── Bandeau annonce ────────────────────────── */}
      <AnnouncementBar 
        message="Série limitée — Rejoins la liste d'attente" 
        targetDate={launchDate}
      />

      {/* ── Hero section plein écran ───────────────── */}
      <section
        id="hero"
        className="relative flex-1 flex items-center justify-center min-h-dvh overflow-hidden bg-noir"
      >
        {/* Image de fond */}
        <Image
          src="/images/hero.png"
          alt="Femme au maquillage impeccable — Mon Premier Kit"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-top opacity-50"
          sizes="100vw"
          quality={85}
        />

        {/* Overlay gradient pour lisibilité */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(13,13,13,0.3) 0%, rgba(13,13,13,0.6) 40%, rgba(13,13,13,0.92) 75%, #0D0D0D 100%)",
          }}
          aria-hidden="true"
        />

        {/* Contenu hero */}
        <div className="relative z-[2] w-full max-w-3xl mx-auto px-6 py-24 flex flex-col items-center text-center">
          {/* Étiquette eyebrow */}
          <span className="eyebrow text-blanc/50 mb-6 block text-center">
            Kit maquillage d&eacute;butante
          </span>

          {/* Titre display avec accent manuscrit */}
          <DisplayTitle
            accent="Ton glow"
            accentPosition="above"
            highlightDot={true}
            as="h1"
          >
            COMMENCE ICI.
          </DisplayTitle>

          {/* Sous-titre */}
          <p className="text-blanc/70 text-base leading-relaxed mt-6 mb-8 max-w-lg m-0">
            Le premier kit maquillage cl&eacute; en main pour d&eacute;butantes.
            6&nbsp;essentiels cur&eacute;s par une experte, tutoriels exclusifs
            inclus.
          </p>

          {/* Formulaire waitlist */}
          <WaitlistForm />

          {/* Compteur d'inscrites */}
          <Suspense
            fallback={
              <p className="eyebrow text-blanc/40 mt-8 m-0">
                Chargement...
              </p>
            }
          >
            <SubscriberCount />
          </Suspense>
        </div>
      </section>
    </>
  );
}
