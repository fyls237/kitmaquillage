import Image from "next/image";
import Link from "next/link";
import { TrustBar } from "@/components/ui/TrustBar";
import kitData from "@/data/kit-products.json";

export default function HomePage() {
  const { kit } = kitData;

  return (
    <>
      {/* ── Hero section plein écran ───────────────── */}
      <section
        id="hero"
        className="relative flex items-center justify-center min-h-[90vh] overflow-hidden bg-bg"
      >
        {/* Image de fond */}
        <Image
          src="/images/accueil/hero_new.jpg"
          alt="Femme au maquillage impeccable — TON GLOW"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-top opacity-70"
          sizes="100vw"
          quality={100}
        />

        {/* Overlay gradient */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.7) 85%, var(--color-bg) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Contenu hero */}
        <div className="relative z-[2] w-full max-w-3xl mx-auto px-6 py-24 flex flex-col items-center text-center">
          {/* Accent manuscrit */}
          <span
            className="accent-script text-accent block mb-4"
            style={{ fontSize: "clamp(36px, 6vw, 56px)" }}
            aria-hidden="true"
          >
            Ton glow
          </span>
          <span className="sr-only">Ton glow</span>

          {/* Titre principal */}
          <h1 className="text-text font-bold tracking-wide m-0 text-center" style={{ fontSize: "clamp(32px, 6vw, 48px)", lineHeight: 1.1 }}>
            COMMENCE ICI<span className="text-accent">.</span>
          </h1>

          {/* Sous-titre */}
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed mt-6 mb-8 max-w-lg m-0">
            10 produits sélectionnés, un guide pas à pas et des tutoriels
            exclusifs tournés avec exactement les produits du kit.
          </p>

        </div>
      </section>

      {/* ── Barre de réassurance ───────────────────── */}
      <TrustBar />

      {/* ── Section : Le kit ──────────────────────── */}
      <section id="le-kit" className="bg-bg py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="eyebrow text-accent block mb-3">Le kit débutante</span>
            <h2 className="text-text m-0">
              10 essentiels pour un glow{" "}
              <span className="accent-script text-accent inline-block" style={{ fontSize: "1.3em" }} aria-hidden="true">
                parfait
              </span>
            </h2>
            <p className="text-text-muted mt-4 max-w-xl mx-auto m-0">
              Chaque produit a été sélectionné pour sa qualité, sa simplicité d&apos;utilisation et son rapport qualité-prix. Pas de superflu.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            {/* Image du kit global */}
            <div className="w-full lg:w-1/2">
              <div
                className="relative w-full aspect-[4/3] bg-surface border border-border flex items-center justify-center overflow-hidden"
                style={{ borderRadius: "var(--radius-card)" }}
              >
                <Image
                  src="/images/accueil/kitmaquillage.jpg"
                  alt="Le Kit Complet TON GLOW"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  quality={100}
                  priority
                />
              </div>
            </div>

            {/* CTA à la place de la liste */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
              <Link
                href="/kit"
                className="
                  inline-flex items-center justify-center gap-2
                  min-h-[48px] px-8 py-4
                  bg-transparent text-accent border border-accent
                  font-semibold text-lg no-underline
                  transition-all duration-200 ease-out
                  hover:bg-accent/10
                  focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2
                "
                style={{ borderRadius: "var(--radius-button)" }}
              >
                Voir le contenu détaillé
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section : La promesse ─────────────────── */}
      <section className="bg-surface border-t border-b border-border py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="eyebrow text-accent block mb-3">Pourquoi ce kit ?</span>
          <h2 className="text-text m-0 mb-8">
            Tout ce qu&apos;il te faut<span className="text-accent">.</span><br />
            Rien de plus<span className="text-accent">.</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">
            <PromiseCard
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              }
              title="Des produits infaillibles"
              description="Nous avons sélectionné des textures qui se travaillent toutes seules et fusionnent avec la peau. Le résultat parfait, sans effort."
            />
            <PromiseCard
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              }
              title="La pratique en temps réel"
              description="Fini les tutoriels frustrants avec des produits introuvables. Nos vidéos utilisent exactement le contenu de ton coffret. On le fait ensemble."
            />
            <PromiseCard
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              }
              title="Ton guide de poche"
              description="Un manuel illustré glissé dans ta box pour ne jamais oublier l'ordre d'application, de la préparation jusqu'à la touche finale."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function PromiseCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <span className="text-accent">{icon}</span>
      <h3 className="text-text text-base font-semibold m-0">{title}</h3>
      <p className="text-text-muted text-sm leading-relaxed m-0">{description}</p>
    </div>
  );
}
