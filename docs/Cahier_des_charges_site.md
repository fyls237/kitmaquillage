# Cahier des charges — Site e-commerce « Mon Premier Kit »

**Version** : 1.0 — juin 2026
**Rédaction** : Lead Solution / Product Manager / Design System UX-UI / Développeur
**Références amont** : Business plan v1 (juin 2026), maquettes HTML v2 (design éditorial), recommandations artistiques de la créatrice

---

## 1. Contexte et objectifs

### 1.1 Contexte
Side business e-commerce DTC d'une créatrice TikTok (30 000 abonnés) : vente d'un kit de maquillage « clé en main » pour débutantes à 59 € TTC (produits curés + guide + tutoriels vidéo via QR code). Stratégie MVP validée par le business plan : liste d'attente → précommandes → boutique. Le développement est internalisé (profil DevOps) : pas de Shopify, stack maîtrisée de bout en bout.

### 1.2 Objectifs du produit
| # | Objectif | Mesure de succès |
|---|---|---|
| O1 | Capturer la demande avant lancement | ≥ 500 inscrites liste d'attente en 30 j |
| O2 | Convertir l'audience TikTok en clientes | Taux de conversion site ≥ 2 % (audience chaude) |
| O3 | Crédibiliser la marque (« une vraie marque, pas une boutique Shopify ») | Qualité perçue, partages Instagram, NPS ≥ 4,5/5 |
| O4 | Permettre la gestion en side business (< 3 h/sem d'admin) | Backoffice couvrant 100 % des opérations courantes |
| O5 | Coût d'exploitation minimal | Infra ≤ 30 €/mois en phase 1 |

### 1.3 Hors périmètre (v1)
Multi-langue, multi-devise, abonnements récurrents, application mobile, marketplace, programme de fidélité à points, recherche produit (catalogue ≤ 5 références).

---

## 2. Périmètre fonctionnel et lotissement

Aligné sur les jalons Go/No-Go du business plan.

| Lot | Contenu | Échéance cible | Dépendance |
|---|---|---|---|
| **Lot 0 — Page d'attente** | Landing capture e-mail, page merci, intégration Brevo, analytics | Semaine 1 | — |
| **Lot 1 — Boutique MVP** | Accueil, page produit, panier/checkout Stripe, e-mails transactionnels, CGV/RGPD | Semaines 2-5 | Go/No-Go n°1 (≥ 500 inscrites) |
| **Lot 2 — Backoffice** | Auth admin, commandes, stock, codes promo, liste e-mail, contenu, avis | Semaines 4-7 (parallèle) | Lot 1 |
| **Lot 3 — Extensions** | Masterclass (contenu vidéo gated), codes ambassadrices, avis clients publics, upsell post-achat | Mois 4-6 | Go/No-Go n°3 |

---

## 3. Utilisateurs et parcours

### 3.1 Personas
- **Léa, 17 ans** (acheteuse cœur) : mobile-first (90 % du trafic attendu vient de TikTok), paiement Apple Pay/PayPal, décision rapide, sensible à la preuve sociale et à l'esthétique « vraie marque ».
- **Acheteur cadeau** (parent/proche, 35-55 ans) : desktop possible, besoin de réassurance (avis, retours, paiement sécurisé), achète sans connaître la créatrice.
- **Admin** (la créatrice + le développeur) : gestion quotidienne ≤ 20 min/jour, mobile friendly pour consulter les commandes.

### 3.2 Parcours critiques (user journeys)
1. **TikTok → achat** : lien bio → page produit (PAS l'accueil : deep-link direct) → ajout panier (+ upsell) → checkout Stripe → confirmation + e-mail → QR tutoriels.
2. **Liste d'attente** : vidéo TikTok → landing → e-mail (double opt-in Brevo) → page merci avec partage.
3. **Admin quotidien** : login → dashboard (commandes du jour, stock restant, CA) → impression étiquettes → passage commandes en « expédiée » (e-mail tracking automatique).

---

## 4. Exigences fonctionnelles — Front office

Priorisation MoSCoW. Chaque exigence est testable.

### 4.1 Lot 0 — Page d'attente
| ID | Exigence | Priorité |
|---|---|---|
| F-01 | Landing one-page : hero photo plein écran, titre, formulaire e-mail (champ unique), bandeau « série limitée » | Must |
| F-02 | Soumission e-mail → création contact Brevo (double opt-in) → redirection /merci | Must |
| F-03 | Page /merci : confirmation + incitation au partage (lien copiable, hashtag) | Must |
| F-04 | Compteur d'inscrites (mise à jour quotidienne, cache 5 min) | Should |
| F-05 | Pixels TikTok + Meta, événement `Lead` | Must |
| F-06 | Bannière consentement cookies (pixels bloqués avant consentement) | Must |

### 4.2 Lot 1 — Boutique
| ID | Exigence | Priorité |
|---|---|---|
| F-10 | Page d'accueil éditoriale (cf. § 6 et maquette) : hero photo plein écran femme noire maquillage impeccable, titre display, CTA, chiffres clés, témoignage, avant/après, créatrice, newsletter | Must |
| F-11 | Page produit : galerie (photos + vidéo 60 s), prix, jauge de stock réelle, contenu du kit en liste éditoriale numérotée 01-06, upsells par cases à cocher (total recalculé), avis, garanties, FAQ produit | Must |
| F-12 | Panier latéral (drawer) : modification quantités, upsell « complète ton rituel », barre franco de port | Must |
| F-13 | Checkout : Stripe Checkout hébergé (CB, Apple Pay, Google Pay, PayPal, Link), adresse de livraison collectée par Stripe | Must |
| F-14 | Codes promo (early-bird, ambassadrices) appliqués via Stripe Promotion Codes | Must |
| F-15 | Page de confirmation : récap + QR code/lien vers les tutoriels + incitation partage | Must |
| F-16 | E-mails transactionnels : confirmation commande, expédition avec n° de suivi (via Brevo templates) | Must |
| F-17 | Décrément automatique du stock à chaque commande payée (webhook Stripe) ; à stock 0 → bouton « Me prévenir » (capture e-mail) | Must |
| F-18 | Pages légales : CGV, mentions légales, confidentialité, rétractation (kit non ouvert), livraison | Must |
| F-19 | Avis clients : affichage avec note, photo facultative, badge « achat vérifié » | Should (Lot 3 pour la collecte) |
| F-20 | E-mail panier abandonné H+1 / H+24 (session checkout Stripe expirée → événement Brevo) | Should |
| F-21 | Page « La créatrice » (storytelling) et page « Tutoriels » (teaser public, accès complet par QR post-achat) | Should |
| F-22 | SEO : métadonnées OG par page, sitemap, données structurées Product/Review | Should |
| F-23 | Mode « précommande » activable : bandeau délai J+30, plafond de 100 commandes | Must (phase précommandes) |

### 4.3 Lot 3 — Extensions
Masterclass : espace vidéo accessible après achat (lien magique e-mail, pas de compte client à mot de passe en v1) ; codes ambassadrices avec attribution des ventes ; collecte d'avis par e-mail J+10 ; upsell one-click post-achat (Stripe).

---

## 5. Exigences fonctionnelles — Backoffice

Accès : `/admin`, réservé aux comptes admin (2 utilisateurs). Interface sobre, même design système en thème clair, optimisée tablette/mobile.

| ID | Module | Fonctions | Priorité |
|---|---|---|---|
| B-01 | **Authentification** | Login e-mail + mot de passe fort + TOTP (2FA), sessions 24 h, rate limiting | Must |
| B-02 | **Dashboard** | CA jour/semaine/mois, nb commandes, panier moyen, stock restant, inscrites newsletter, comparatif objectif (point mort 17 kits/mois du BP) | Must |
| B-03 | **Commandes** | Liste filtrable (statut payée/préparée/expédiée/remboursée), détail, génération étiquette (lien Sendcloud), passage en « expédiée » → e-mail tracking auto, export CSV compta | Must |
| B-04 | **Produits & kits** | CRUD produit (nom, slug, prix, description, images, vidéo, contenu du kit ordonné 01-06, upsells associés), publication/brouillon | Must |
| B-05 | **Stock** | Quantité par produit, mouvements (réassort, vente, casse), alerte seuil (e-mail à < 20 unités), historique | Must |
| B-06 | **Promotions** | Création de codes (montant/%, date d'expiration, usage max, ciblage produit), synchronisés vers Stripe | Must |
| B-07 | **Liste e-mail** | Vue des inscrites (waitlist + newsletter), statut opt-in, export, lien vers Brevo pour les campagnes | Should |
| B-08 | **Contenu** | Édition des blocs éditoriaux (hero, témoignages, avant/après, FAQ, pages légales) sans redéploiement | Should |
| B-09 | **Avis** | Modération (publier/masquer), réponse de la créatrice | Should (Lot 3) |
| B-10 | **Ambassadrices** | CRUD codes personnels, tableau ventes attribuées / commissions dues | Could (Lot 3) |
| B-11 | **Journal d'audit** | Trace des actions admin (qui, quoi, quand) | Should |

**Règle produit** : toute opération récurrente (> 1×/semaine) doit être réalisable en ≤ 3 clics depuis le dashboard.

---

## 6. Direction artistique et design système

### 6.1 Intention
Fusion de deux références validées : la **discipline éditoriale L'Oréal** (structure, typographie, rigueur) et la **direction artistique de la créatrice** (référence visuelle « DOLLXMYA BEAUTY ») : luxe féminin girl boss, peaux noires mises en avant, effet magazine de mode, instagramable. Première impression exigée : « une vraie marque », jamais « une petite boutique Shopify ».

**Équation visuelle** : luxe L'Oréal (structure + typographie) × campagne beauté pour femmes noires (photo + attitude) × influenceuse (ton + script manuscrit).

### 6.2 Palette (ratio impératif 70 % noir / 20 % blanc / 10 % rose)
| Token | Valeur | Usage exclusif |
|---|---|---|
| `--noir` | `#0D0D0D` | Fonds dominants (hero, sections, footer, header), texte sur fonds clairs |
| `--blanc` | `#FAF7F8` | Texte sur noir, fonds de respiration |
| `--rose-poudre` | `#F8D8E6` | Fonds de sections alternées (1 à 2 par page max), surlignages doux |
| `--fuchsia` | `#FF4FA3` | **Uniquement** : CTA, prix, badges promo, mots-clés soulignés, étoiles de notation sur fond noir |
| `--or` | `#A98445` | **Uniquement** : étiquettes éditoriales (eyebrows) et notations sur fonds clairs — hérité du système éditorial, jamais combiné au fuchsia dans un même composant |
| `--filet-sombre` | `rgba(250,247,248,.14)` | Filets 1px sur fond noir |
| `--filet-clair` | `#E5E0E2` | Filets 1px sur fonds clairs |

Règles : le fuchsia n'est jamais une couleur de fond de section ; jamais de texte fuchsia sur fond blanc en petite taille (contraste insuffisant — réserver au noir ou en grande taille) ; le doré n'apparaît jamais sur fond noir.

### 6.3 Typographie
| Rôle | Police | Spécification |
|---|---|---|
| Titres display | **Bodoni Moda** (fallback Playfair Display) | Graisse 300-400, très grande taille (clamp 40-96px), interlignage 0.95-1.1, majuscules pour les titres de section façon magazine |
| Accent manuscrit | **Italianno** ou **Great Vibes** | Un seul mot ou groupe par section (« parfait », « et validé »), couleur fuchsia ou rose poudré, jamais pour de l'information critique |
| Étiquettes (eyebrows) | **Montserrat** | 10-11px, capitales, letter-spacing `.28em`, graisse 500 |
| Corps de texte | **Montserrat** (fallback Poppins) | 14-16px, graisse 400, interlignage 1.7 |
| Boutons / nav | **Montserrat** | 11-12px, capitales, letter-spacing `.18em`, graisse 500 |

Chargement : `next/font` avec sous-ensembles latin, `display: swap`, 2 familles + 1 script maximum (budget performance).

### 6.4 Règles structurelles (héritées du système éditorial)
- **Angles droits partout** : `border-radius: 0` sur tous les composants (boutons, cartes, champs, images).
- **Filets 1px** entre sections et dans les grilles (jamais d'ombres portées).
- **Champ e-mail en simple soulignement** (bordure basse 1px, fond transparent) ; sur fond noir, soulignement blanc cassé.
- **Liste du kit numérotée éditoriale** : 01-06, numéro en fuchsia (fond noir) ou doré (fond clair), nom du produit en capitales espacées, descriptif court en dessous.
- **Aucun emoji** : typographie et icônes filaires uniquement (set d'icônes outline 1.5px : livraison, kit, tutoriels, paiement).
- Boutons : rectangulaires pleins — fuchsia texte noir `#0D0D0D` pour le CTA principal (1 par écran), noir texte blanc en secondaire sur fond clair, blanc cassé contour 1px en tertiaire sur fond noir. État hover : inversion fond/texte, jamais d'animation > 200 ms.

### 6.5 Art direction photo (critère de qualité n°1)
- Hero : portrait plein écran d'une femme noire au maquillage impeccable, lumière studio chaude, fond sombre dégradé vers le noir de la section (l'image « fond » dans le layout, pas de cadre).
- Diversité réelle des carnations dans 100 % des pages (hero, avant/après, avis) ; les peaux foncées ne sont pas un segment, elles sont le visage de la marque.
- Avant/après : diptyques cadrés identiques, lumière constante, sans retouche de peau (crédibilité), étiquettes AVANT / APRÈS en capitales espacées.
- Packshots : kit boîte noire + branding rose sur fond rose poudré ou noir, accessoires en quinconce, ombres douces réelles (pas de détourage flottant).
- Format : AVIF/WebP, ratio 4/5 vertical privilégié (recadrage Instagram natif), pleine largeur en hero.
- Interdits : banques d'images génériques, mockups 3D artificiels, filtres lissants excessifs.

### 6.6 Gabarit page d'accueil (conforme à la référence visuelle)
1. Bandeau annonce (fond rose poudré, texte noir) : « Livraison offerte dès 59 € d'achat ».
2. Header noir : logo (display serif + sous-titre lettré), nav capitales espacées (Accueil / Le kit / Tutoriels / Avis clientes / FAQ), icônes recherche-compte-panier.
3. Hero plein écran : photo + accroche manuscrite fuchsia (« Ton glow ») + titre display géant blanc (« COMMENCE ICI. ») point final fuchsia + sous-titre étiquette + paragraphe court + CTA fuchsia « Découvrir le kit → ».
4. Barre de réassurance 4 items sur noir, séparés par filets : livraison rapide / kit complet / tutoriels exclusifs / paiement sécurisé.
5. Section kit (fond rose poudré) : étiquette « Le kit débutante », titre display « 6 essentiels pour un glow » + mot manuscrit « parfait », packshot, CTA noir « Voir le contenu → ».
6. Section preuve (fond noir) : « Elles ont testé » + manuscrit « et validé », étoiles fuchsia 4,9/5, « +500 clientes satisfaites », carrousel avant/après, CTA « Lire les avis → ».
7. Bande newsletter (fond noir, filet haut) : « Ne manque pas le lancement », champ souligné + bouton fuchsia « Je m'inscris → », bénéfices en 2 puces icônes (-15 % première commande, accès prioritaire).
8. Footer noir : logo, colonnes liens, légal, réseaux.

### 6.7 Composants du design système (bibliothèque à livrer)
`AnnouncementBar`, `Header`, `Eyebrow`, `DisplayTitle` (avec slot manuscrit), `ButtonPrimary/Secondary/Ghost`, `UnderlineInput`, `TrustBar`, `EditorialList` (01-06), `ProductGallery`, `UpsellCheckbox`, `PriceTag` (fuchsia), `StockGauge`, `ReviewStars`, `BeforeAfterSlider`, `QuoteBlock`, `NewsletterBand`, `Footer`, `CookieBanner`, `Drawer` (panier). Chaque composant : variantes fond noir / fond clair, états (hover, focus visible, disabled), documentation Storybook légère (ou page `/styleguide` interne).

### 6.8 Accessibilité du thème
Contrastes vérifiés : blanc cassé sur noir ≈ 17:1 ; fuchsia sur noir ≈ 6,9:1 (AA) ; noir sur rose poudré ≈ 14:1 ; **interdit** : fuchsia sur blanc en texte < 24px (≈ 2,9:1). Focus visible : contour 2px fuchsia décalé 2px. Cibles tactiles ≥ 44px. Alternatives textuelles sur toutes les photos. Script manuscrit toujours doublé d'un équivalent lisible dans l'ordre de lecture.

---

## 7. Architecture et stack technique

### 7.1 Principes de décision
1. **Minimal** : chaque brique doit être justifiée par une exigence du business plan ; pas de microservices, pas de CMS lourd, pas de Kubernetes pour vendre 50 kits/mois.
2. **Modulaire** : monolithe modulaire — modules métier isolés derrière des interfaces, pour extraire plus tard (masterclass, 3PL) sans réécriture.
3. **Maîtrisé** : profil DevOps aux commandes — IaC légère, CI/CD, observabilité dès le jour 1.
4. **Coût** : ≤ 30 €/mois en phase 1 (tiers gratuits + domaine).

### 7.2 Stack retenue
| Couche | Choix | Justification | Alternatives écartées |
|---|---|---|---|
| Framework | **Next.js 15 (App Router, TypeScript)** | Front + API dans un seul déployable ; RSC pour la performance ; compétence déjà choisie par le porteur | Remix, Nuxt (pas de gain), Shopify (coût, pas « vraie marque », exigence écartée par le porteur) |
| UI | **Tailwind CSS 4 + tokens CSS du § 6** | Vitesse, design system encodé en config | MUI/Chakra (esthétique générique opposée au besoin) |
| Base de données | **PostgreSQL managé (Neon, tier gratuit)** + **Prisma** | Relationnel simple (10 tables), migrations versionnées, branching de DB pour la préprod | MongoDB (aucun besoin documentaire), SQLite (concurrence webhooks/admin) |
| Paiement | **Stripe Checkout (hébergé) + Promotion Codes + webhooks** | PCI déporté, Apple Pay/Google Pay/PayPal/Link natifs, codes promo gérés, panier abandonné détectable | Stripe Elements custom (surface de risque inutile), PayPal seul (conversion moindre) |
| E-mails | **Brevo** (transactionnel + marketing, double opt-in) | Déjà retenu au business plan, tier gratuit 300 mails/j, conformité RGPD UE | Klaviyo (coût), Resend (pas de marketing automation) |
| Auth admin | **Auth.js (NextAuth) credentials + TOTP** | 2 comptes, pas de besoin OAuth | Clerk/Auth0 (dépendance payante disproportionnée) |
| Médias | **Vercel Blob** (uploads admin) + `next/image` | Intégré, CDN automatique | Cloudinary (utile en phase 2 si transformations lourdes) |
| Hébergement | **Vercel** (front+API) + **Neon** (DB) | Zéro ops serveur, previews par PR, SSL/CDN inclus | VPS auto-géré (possible vu le profil DevOps, mais temps > économie en phase 1 — réévaluer au Lot 3) |
| Analytics | **Plausible** (ou Umami self-host) + pixels TikTok/Meta via consent mode | RGPD-friendly, léger | GA4 (consentement lourd, surdimensionné) |
| Étiquettes colis | **Sendcloud** (API) | Mondial Relay + Colissimo unifiés | Intégrations transporteurs directes (2 intégrations au lieu d'une) |

### 7.3 Schéma d'architecture
```
                        ┌─────────────────────────────────────────────┐
  TikTok / Instagram ──▶│              VERCEL (Next.js 15)            │
                        │                                             │
   Cliente (mobile) ───▶│  /            pages publiques (RSC, ISR)    │
                        │  /admin       backoffice (auth + 2FA)       │
   Admin (créatrice) ──▶│  /api/*       route handlers :              │
                        │    subscribe • checkout • webhooks/stripe   │
                        │    admin/* (CRUD) • cron/*                  │
                        └──────┬──────────┬──────────┬────────────────┘
                               │          │          │
                     ┌─────────▼──┐  ┌────▼─────┐ ┌──▼──────────┐
                     │ Neon       │  │ Stripe   │ │ Brevo       │
                     │ PostgreSQL │  │ Checkout │ │ contacts +  │
                     │ (Prisma)   │  │ webhooks │ │ e-mails     │
                     └────────────┘  └────┬─────┘ └─────────────┘
                                          │
                                    ┌─────▼──────┐   ┌─────────────┐
                                    │ Sendcloud  │   │ Vercel Blob │
                                    │ étiquettes │   │ médias      │
                                    └────────────┘   └─────────────┘
```

### 7.4 Découpage modulaire (monolithe modulaire)
```
src/
  modules/
    catalog/      produits, contenu kit, stock        (Lot 1-2)
    orders/       commandes, webhooks Stripe, statuts (Lot 1-2)
    marketing/    waitlist, newsletter, promos        (Lot 0-2)
    reviews/      avis, modération                    (Lot 3)
    academy/      masterclass, accès par lien magique (Lot 3)
    admin/        auth, dashboard, audit              (Lot 2)
  components/ui/  design system (§ 6.7)
  lib/            stripe.ts, brevo.ts, sendcloud.ts, db.ts
```
Règle : un module n'importe jamais l'intérieur d'un autre module — uniquement ses interfaces publiques (`modules/x/index.ts`). C'est la garantie « simple ET modulaire ».

### 7.5 Modèle de données (Prisma — 11 tables)
`Product` (slug, nom, prix, statut, médias[], kitItems[] ordonnés 01-06, upsells[]) · `StockMovement` (type: réassort/vente/casse, qté, motif) · `Order` (réf, stripeSessionId, statut payée→préparée→expédiée→remboursée, montants, adresse, trackingNumber) · `OrderItem` · `Customer` (e-mail, consentements horodatés) · `DiscountCode` (miroir Stripe) · `WaitlistEntry` (source, optInAt) · `Review` (note, texte, photo, statut modération) · `AmbassadorCode` (Lot 3) · `ContentBlock` (clé, JSON, version — blocs éditoriaux du § B-08) · `AuditLog` (acteur, action, cible, horodatage).

### 7.6 Flux critique de commande
1. Client POST `/api/checkout` (panier + upsells) → vérification stock → création session Stripe Checkout (metadata: items) → redirection.
2. Webhook `checkout.session.completed` (signé, idempotent) → transaction DB : création `Order` + décrément stock + contact Brevo + e-mail confirmation (lien tutoriels signé JWT, expiration 1 an).
3. Webhook `checkout.session.expired` → événement Brevo « panier abandonné » (si consentement marketing).
4. Admin passe en « expédiée » (n° Sendcloud) → e-mail tracking.

---

## 8. Exigences non fonctionnelles

| Domaine | Exigence |
|---|---|
| **Performance** | LCP < 2,5 s en 4G (hero préchargé `fetchpriority=high`), CLS < 0,1, JS initial < 150 kB ; pages publiques en ISR (revalidation 60 s), Lighthouse ≥ 90 mobile |
| **SEO** | SSR/ISR sur toutes les pages publiques, sitemap, schema.org Product + AggregateRating, OG images par page |
| **Sécurité** | HTTPS strict + HSTS, en-têtes CSP, webhooks Stripe vérifiés par signature, rate limiting `/api/subscribe` et login, 2FA admin, secrets en variables d'environnement Vercel, dépendances auditées en CI |
| **RGPD** | Double opt-in, registre des consentements horodatés, bannière cookies bloquante pour les pixels, page de politique, suppression sur demande (procédure documentée), données hébergées UE (Neon Francfort, Brevo France) |
| **Accessibilité** | WCAG 2.1 AA : cf. § 6.8 + navigation clavier complète, `prefers-reduced-motion` respecté |
| **Disponibilité** | Objectif 99,5 % ; le checkout (Stripe hébergé) survit à une panne du site |
| **Sauvegardes** | Snapshots Neon quotidiens (rétention 7 j), export CSV commandes hebdomadaire automatisé |
| **Observabilité** | Sentry (erreurs front/API), logs structurés, alerte e-mail si échec webhook Stripe ou stock < seuil |

---

## 9. Environnements et CI/CD

- **3 environnements** : local (Docker Compose : Postgres + Stripe CLI), préprod (preview Vercel par PR + branche DB Neon), production.
- **CI (GitHub Actions)** : lint + typecheck + tests (Vitest unitaires sur modules, Playwright sur les 3 parcours critiques du § 3.2) + `prisma migrate diff` ; déploiement auto en préprod, promotion manuelle en prod.
- **Definition of Done** : revue de code, tests verts, contraste AA vérifié sur tout nouvel écran, métriques Lighthouse non régressées, migration réversible.

---

## 10. Planning, charges et critères d'acceptation

| Lot | Charge estimée (dev solo, side project) | Critères d'acceptation clés |
|---|---|---|
| Lot 0 — Page d'attente | 12-16 h | E-mail collecté en double opt-in Brevo ; pixels après consentement ; LCP < 2,5 s ; design conforme § 6 (revue maquette vs rendu) |
| Lot 1 — Boutique | 50-70 h | Parcours TikTok→achat complet en < 90 s ; commande test Stripe de bout en bout (paiement, stock décrémenté, e-mails reçus, QR tutoriels valide) ; mode précommande activable par variable de config |
| Lot 2 — Backoffice | 40-50 h | La créatrice traite une commande réelle seule en ≤ 3 min sans assistance ; alerte stock reçue ; export compta CSV ouvert dans Excel |
| Lot 3 — Extensions | 30-40 h | Accès masterclass post-achat sans création de compte ; vente attribuée à un code ambassadrice visible au dashboard |

**Risques projet** : dérive de périmètre (mitigation : tout ajout passe par le présent CDC, versionné) ; dépendance Stripe/Brevo (mitigation : interfaces `lib/` substituables) ; photos non livrées à temps — chemin critique du Lot 1 (mitigation : shooting planifié dès le Go/No-Go n°1).

---

## 11. Livrables

1. Monorepo Git (code + IaC + ce CDC versionné).
2. Design system documenté (page `/styleguide` + tokens).
3. Site public (Lots 0-1) et backoffice (Lot 2) déployés.
4. Runbook d'exploitation (déploiement, rotation secrets, restauration DB, traitement RGPD).
5. Guide d'utilisation backoffice pour la créatrice (1 page, captures).

---

*Document contractuel interne v1.0 — toute évolution de périmètre fait l'objet d'un avenant versionné dans le dépôt Git.*

