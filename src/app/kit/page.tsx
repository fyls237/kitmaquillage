import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SkinToneSelector } from "@/modules/catalog";
import kitData from "@/data/kit-products.json";

export const metadata: Metadata = {
  title: "Le Kit — TON GLOW",
  description:
    "Découvre le contenu du kit TON GLOW : 10 produits sélectionnés pour un glow complet. Choisis ta carnation et tes teintes personnalisées.",
};

export default function KitPage() {
  const { kit } = kitData;

  return (
    <div className="bg-bg flex flex-col w-full overflow-hidden">
      {/* 1. HERO SECTION IMMERSIVE */}
      <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center pt-24 pb-16 px-4">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/kit/hero_new.jpg"
            alt="Femme au maquillage impeccable TON GLOW"
            fill
            priority
            fetchPriority="high"
            className="object-cover object-top opacity-100"
            sizes="100vw"
            quality={100}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 60%, var(--color-bg) 100%)"
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center flex flex-col items-center max-w-4xl mx-auto mt-auto mb-12 animate-fade-in-up">
          <span className="accent-script mb-2" style={{ fontSize: "clamp(40px, 8vw, 70px)", lineHeight: 1 }}>
            <span className="text-white">Ton</span> <span className="text-accent">glow</span>
          </span>
          <p className="text-white text-lg sm:text-xl max-w-2xl mx-auto m-0 mb-8 font-light">
            Oublie les heures passées à chercher les bons produits. Voici le seul coffret dont tu as besoin, adapté à ta carnation et accompagné de masterclasses privées.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="#les-produits"
              className="
                inline-flex items-center justify-center
                min-h-[48px] px-8 py-3
                bg-accent text-white
                font-semibold text-lg tracking-wide
                transition-all duration-300 ease-out
                hover:shadow-glow hover:-translate-y-1
                no-underline
              "
              style={{ borderRadius: "var(--radius-button)" }}
            >
              Kit complet
            </Link>
          </div>
        </div>
      </section>

      {/* 4. LES PRODUITS */}
      <section id="les-produits" className="py-20 sm:py-28 px-4 sm:px-6 bg-bg border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="eyebrow text-accent block mb-3">Dans le coffret</span>
            <p className="text-text-muted max-w-2xl mx-auto m-0 text-lg">Chaque produit a sa place, son rôle et son importance. Nous n'avons gardé que l'excellence.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            {/* Image du kit */}
            <div className="w-full lg:w-1/2">
              <div
                className="relative w-full aspect-[4/5] bg-surface overflow-hidden border border-border"
                style={{ borderRadius: "var(--radius-card)" }}
              >
                <Image
                  src="/images/kit/kitmaquillage.png"
                  alt="Le Kit Complet TON GLOW"
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={100}
                />
              </div>
            </div>

            {/* Liste simple des produits */}
            <div className="w-full lg:w-1/2">
              <ul className="space-y-4 m-0 p-0" style={{ listStyleType: "none" }}>
                {kit.produits.map((produit) => (
                  <li key={produit.id} className="flex items-center gap-4 py-2 border-b border-border/50 last:border-0">
                    <span className="text-accent font-bold text-xl flex-shrink-0 w-8">
                      {produit.id}.
                    </span>
                    <span className="text-text text-lg font-medium">
                      {produit.nom}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. L'ACCOMPAGNEMENT */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded-3xl overflow-hidden border border-border bg-bg flex items-center justify-center">
              <svg className="w-20 h-20 text-accent opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-text m-0 mb-6 text-3xl sm:text-4xl">L'accompagnement privé</h2>
              <p className="text-text-muted m-0 text-lg leading-relaxed mb-8">
                Acheter du maquillage n'a aucun sens si on ne sait pas comment l'appliquer. Avec ton coffret, tu reçois un accès exclusif à notre plateforme de formation.
              </p>
              <ul className="space-y-4 m-0 p-0 text-text" style={{ listStyleType: "none" }}>
                <li className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span><strong>Vidéos pas à pas</strong> avec les mêmes produits que toi.</span>
                </li>
                <li className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span><strong>Guide papier illustré</strong> inclus dans la boîte.</span>
                </li>
                <li className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span><strong>Astuces de pro</strong> pour faire tenir ton glow toute la nuit.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PERSONNALISATION (SkinToneSelector) */}
      <section id="selecteur-teinte" className="py-24 sm:py-32 px-4 sm:px-6 bg-bg border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="accent-script text-accent block mb-4" style={{ fontSize: "50px", lineHeight: 1 }}>À toi de jouer</span>
            <p className="text-text-muted max-w-xl mx-auto m-0 text-lg">
              Indique ta carnation de peau. Notre algorithme se charge de sélectionner pour toi les teintes exactes de fond de teint et d'anti-cernes.
            </p>
          </div>

          <div className="bg-surface rounded-[32px] p-6 sm:p-12 border border-border shadow-2xl">
            <SkinToneSelector />
          </div>
        </div>
      </section>

      {/* 7. TEMOIGNAGES */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-surface border-b border-border overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center gap-1 mb-4 text-accent">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
            <h2 className="text-text m-0 mb-4 text-3xl sm:text-4xl">Elles ont trouvé leur glow</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ReviewCard name="Sarah M." text="Je n'y connaissais rien en maquillage. Ce kit m'a sauvé la vie. Les tutos sont ultra clairs et le fond de teint matche parfaitement." />
            <ReviewCard name="Léa D." text="Le rapport qualité-prix est incroyable. J'ai enfin une routine complète sans avoir à passer des heures dans les rayons beauté." />
            <ReviewCard name="Inès B." text="L'expérience d'ouverture du coffret est folle. On sent vraiment le côté premium. Le blush et l'highlighter sont mes favoris !" />
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-bg border-b border-border">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-text m-0 text-3xl sm:text-4xl">Questions fréquentes</h2>
          </div>

          <div className="space-y-4">
            <FaqItem question="Comment être sûre de ma carnation ?" answer="Notre guide des teintes couvre l'ensemble des sous-tons. Si tu as un doute entre deux carnations, n'hésite pas à nous contacter sur Instagram, on t'aidera avec plaisir !" />
            <FaqItem question="Est-ce que le kit convient aux peaux sensibles ?" answer="Oui, tous les produits sélectionnés ont été testés dermatologiquement et conviennent à la majorité des types de peaux, y compris sensibles." />
            <FaqItem question="Quand vais-je recevoir l'accès aux vidéos ?" answer="Dès la validation de ta commande, tu recevras un email avec tes accès personnels pour visionner les masterclasses en attendant ton colis." />
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Composants locaux ──────────────────────────────────────────

function BenefitCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-surface border border-border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-accent/30 group">
      <div className="w-16 h-16 rounded-full bg-bg border border-border flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-text font-bold text-xl mb-3">{title}</h3>
      <p className="text-text-muted text-base leading-relaxed m-0">{description}</p>
    </div>
  );
}


function ReviewCard({ name, text }: { name: string; text: string }) {
  return (
    <div className="bg-bg p-8 rounded-3xl border border-border">
      <p className="text-text leading-relaxed text-lg italic mb-6">"{text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-text-muted font-bold">
          {name.charAt(0)}
        </div>
        <span className="text-text font-bold">{name}</span>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border-b border-border last:border-0 pb-4">
      <summary className="flex justify-between items-center font-bold cursor-pointer list-none text-text text-lg py-4">
        {question}
        <span className="transition group-open:rotate-180 text-accent">
          <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9" /></svg>
        </span>
      </summary>
      <p className="text-text-muted mt-2 m-0 text-base leading-relaxed pb-2 animate-fade-in-up">
        {answer}
      </p>
    </details>
  );
}
