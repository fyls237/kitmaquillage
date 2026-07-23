# TON GLOW — Design System

> Fichier de référence pour le développeur et l'IA de codage.
> Aucune couleur en dur dans le code : tout passe par les tokens ci-dessous.

---

## 1. Identité

| Élément | Couleur |
|---|---|
| **TON** (logo) | Blanc `#FFFFFF` |
| **GLOW** (logo) | Rose `#FF2E86` |
| Fond du site | Noir `#000000` |

---

## 2. Palette

```css
:root {
  /* Fonds */
  --color-bg:            #000000;   /* fond principal */
  --color-surface:       #111111;   /* cartes, inputs */
  --color-border:        #2B2B2B;   /* bordures de cartes */

  /* Texte */
  --color-text:          #FFFFFF;   /* texte principal */
  --color-text-muted:    #888888;   /* placeholders, texte secondaire */

  /* Accent */
  --color-accent:        #FF2E86;   /* rose TON GLOW */
  --color-accent-hover:  #FF4D96;   /* rose au survol */

  /* Ombre */
  --shadow-glow: 0 10px 40px rgba(255, 46, 134, 0.20);

  /* Rayons */
  --radius-card:   20px;
  --radius-button: 12px;
  --radius-input:  12px;
}
```

---

## 3. Composants

### Bouton principal

```css
background: #FF2E86;
color: #FFFFFF;
border-radius: 12px;
padding: 16px 32px;
font-weight: 600;
font-size: 18px;        /* minimum — voir §6 accessibilité */
box-shadow: 0 10px 40px rgba(255,46,134,.20);

/* survol */
background: #FF4D96;
```

### Bouton secondaire

```css
background: transparent;
border: 1px solid #FF2E86;
color: #FF2E86;
border-radius: 12px;
padding: 16px 32px;

/* survol */
background: rgba(255,46,134,.08);
```

### Champ de saisie

```css
background: #111111;
color: #FFFFFF;
border: 1px solid #2B2B2B;
border-radius: 12px;
padding: 14px 16px;

/* placeholder */
color: #888888;

/* focus */
border-color: #FF2E86;
outline: 2px solid #FF2E86;
outline-offset: 2px;
```

> ⚠️ Ne jamais supprimer l'`outline` au focus. C'est indispensable pour la navigation au clavier.

### Carte

```css
background: #111111;
border: 1px solid #2B2B2B;
border-radius: 20px;
padding: 24px;
```

### Carte sélectionnée (teinte choisie, carnation choisie)

```css
border: 2px solid #FF2E86;
box-shadow: 0 10px 40px rgba(255,46,134,.20);
```

> Une sélection ne doit **jamais** être signalée par la couleur seule : ajouter aussi une icône de validation ou le mot « Sélectionné ».

---

## 4. Où le rose a le droit d'exister

Le rose sert uniquement à mettre en valeur ce qui compte :

- Boutons principaux
- Prix
- Logo (le mot GLOW)
- Icônes
- Numéros d'étapes
- Liens
- Barre de progression
- QR Code et écran d'activation
- Le mot « Glow Academy »

**Partout ailleurs : noir et blanc.**

### Ce qui est interdit

- Un paragraphe entier en rose
- Un fond de section rose
- Deux boutons roses côte à côte sur le même écran
- Le rose pour un message d'erreur *(utiliser un rouge distinct, sinon on confond l'erreur et l'accent de marque)*

---

## 5. Ratio des couleurs

| Couleur | Part de l'écran |
|---|---|
| 🖤 Noir | 70 % |
| 🤍 Blanc | 20 % |
| 💗 Rose | 10 % |

**Test simple :** plisse les yeux devant l'écran. Si tu vois plus de deux zones roses, il y en a trop.

Le rose est un accent, pas une couleur de fond. C'est ce qui fait la différence entre « premium » et « site de dropshipping ».

---

## 6. Accessibilité — deux points à corriger

Ce sont les seuls vrais problèmes de la palette. Ils sont faciles à régler.

**Le texte blanc sur le bouton rose est trop peu contrasté.**
`#FFFFFF` sur `#FF2E86` donne un rapport de contraste de **3,5:1**. Le minimum légal est de 4,5:1 pour un texte normal, mais de 3:1 pour un texte large.

Deux solutions, au choix :
- **Recommandé** : garder le texte blanc, mais uniquement en **18 px gras minimum** sur les boutons. À cette taille, 3,5:1 est conforme.
- Sinon : texte noir `#000000` sur le bouton rose (contraste 6:1), mais l'effet est moins premium.

> Ne jamais mettre de texte blanc de moins de 18 px sur un fond rose.

**Le reste de la palette est bon :**

| Combinaison | Contraste | Verdict |
|---|---|---|
| Blanc sur noir | 21:1 | Excellent |
| Rose sur noir | 6:1 | Conforme |
| Rose sur `#111111` | 5,4:1 | Conforme |
| `#888888` sur `#111111` | 5,3:1 | Conforme |

Le gris `#888888` est donc utilisable pour les placeholders, mais **pas** pour du texte qu'on doit vraiment lire. Pour du texte secondaire important, monter à `#AAAAAA`.

---

## 7. Couleurs de statut

Absentes de ta liste, mais nécessaires — et surtout, elles ne doivent pas se confondre avec le rose de marque.

```css
--color-success: #2ECC71;   /* chapitre terminé, commande validée */
--color-error:   #FF4444;   /* erreurs de formulaire */
--color-warning: #F5A623;   /* en attente, rupture */
```

---

## 8. Typographie

À confirmer, mais voici une base cohérente avec l'univers premium :

- **Titres** : une serif élégante (Playfair Display, Cormorant) — apporte le côté maison de beauté
- **Textes** : une sans-serif neutre (Inter, DM Sans) — lisible sur mobile

Échelle :

```
h1  40px / 700   (mobile : 32px)
h2  28px / 700   (mobile : 24px)
h3  20px / 600
p   16px / 400   ← jamais en dessous sur mobile
small 14px / 400
```

Hauteur de ligne : 1,6 pour les paragraphes, 1,2 pour les titres.

---

## 9. Espacements

Une seule échelle, multiples de 4 :

```
4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96
```

Sur fond noir, il faut **plus d'espace** que sur fond blanc : le vide est ce qui crée la sensation de luxe. Ne pas serrer les éléments.

---

## 10. Animations

Sobres et courtes. Le luxe, c'est le calme.

```css
transition: all 200ms ease-out;
```

- Survol de bouton : changement de couleur uniquement, pas d'agrandissement
- Apparition de contenu : fondu léger, pas de rebond ni de glissement spectaculaire
- Barre de progression : transition fluide sur 300 ms
- Respecter `prefers-reduced-motion` : supprimer toutes les transitions si l'utilisatrice l'a activé

---

## 11. Configuration Tailwind

```js
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        bg:      '#000000',
        surface: '#111111',
        border:  '#2B2B2B',
        muted:   '#888888',
        accent: {
          DEFAULT: '#FF2E86',
          hover:   '#FF4D96',
        },
        success: '#2ECC71',
        error:   '#FF4444',
        warning: '#F5A623',
      },
      borderRadius: {
        card:   '20px',
        button: '12px',
      },
      boxShadow: {
        glow: '0 10px 40px rgba(255,46,134,.20)',
      },
    },
  },
}
```

---

## 12. Règle finale

Avant de livrer un écran, poser trois questions :

1. Y a-t-il **une seule** action principale rose visible ?
2. Le rose représente-t-il **moins de 10 %** de la surface ?
3. Tout le texte est-il lisible à bout de bras sur un téléphone, en plein soleil ?

Si une réponse est non, l'écran n'est pas fini.
