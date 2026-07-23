# TON GLOW — Cahier des charges MVP

**Pour le développeur.**
Objectif : un site simple qui permet de présenter le kit, de recevoir des commandes, et de donner accès à Glow Academy après remise du produit.

**Pas de paiement en ligne.** La cliente commande, Yvana la contacte, la remise se fait en main propre, le paiement se fait à ce moment-là (espèces, virement ou PayPal).

---

## 1. Le principe en 6 étapes

```
1. La cliente choisit sa carnation → le site lui montre les teintes qui lui vont
2. Elle choisit son fond de teint + son anti-cernes
3. Elle remplit un formulaire de commande (nom, email, téléphone, ville)
   → aucun paiement en ligne
4. Yvana reçoit la commande dans son back-office et contacte la cliente
5. Remise en main propre + paiement sur place
   → Yvana marque la commande comme "Remise & payée"
6. La cliente scanne le QR Code du guide papier
   → son compte se crée → elle accède à Glow Academy à vie
```

---

## 2. Les pages à créer

| # | Page | Contenu |
|---|---|---|
| 1 | **Accueil** `/` | Présentation de la marque, photos, promesse, bouton « Trouver ma teinte » |
| 2 | **Le kit** `/kit` | Photos du produit, contenu du kit, prix 99,99 €, sélecteur de teinte |
| 3 | **Commande** `/commander` | Formulaire de commande, récapitulatif des teintes choisies |
| 4 | **Confirmation** `/commande/merci` | « Merci, Yvana te contacte sous 24 h » + numéro de commande |
| 5 | **Activation** `/activate/[token]` | Page qui s'ouvre au scan du QR Code → création du compte |
| 6 | **Glow Academy** `/academy` | Le lecteur vidéo avec chapitres et progression |
| 7 | **Mon compte** `/compte` | Prénom, email, appareils connectés, suppression du compte |
| 8 | **Back-office** `/admin` | Liste des commandes, changement de statut, impression des QR Codes |
| 9 | **Pages légales** | Mentions légales, CGV, confidentialité |

C'est tout. Neuf pages.

---

## 3. Le sélecteur de teinte

**Étape 1 — La carnation.** 4 choix : Claire, Médium, Tan, Profonde.
Chacun représenté par une **photo de peau réelle**, pas un carré de couleur (un aplat de couleur ne se compare pas à de la peau, et fait se tromper).

**Étape 2 — Les teintes.** Le site affiche uniquement les teintes compatibles avec la carnation choisie.

> **Règle absolue : une teinte incompatible n'est jamais affichée.** Pas grisée, pas filtrable. Elle n'existe pas à l'écran.

Pour chaque teinte : nom, sous-ton expliqué simplement, photo du produit appliqué.

**Étape 3 — L'anti-cernes.** Même principe.

La correspondance carnation → teintes est un **fichier JSON** modifiable sans toucher au code :

```json
{
  "claire":   { "fond": ["T1", "T2"], "cernes": ["AC1", "AC2"] },
  "medium":   { "fond": ["T2", "T3"], "cernes": ["AC2", "AC3"] },
  "tan":      { "fond": ["T4", "T5"], "cernes": ["AC4"] },
  "profonde": { "fond": ["T5", "T6"], "cernes": ["AC5", "AC6"] }
}
```

---

## 4. Le formulaire de commande

Champs demandés, rien de plus :

- Prénom et nom
- Email
- Téléphone *(obligatoire — c'est par là que Yvana contacte)*
- Ville / code postal
- Un champ libre « Un message pour Yvana ? » *(facultatif)*
- Case à cocher : j'accepte les CGV *(non pré-cochée)*
- Case à cocher : je veux recevoir les nouveautés *(non pré-cochée, facultative)*

**Pas de compte à créer, pas de mot de passe, pas de panier.** Le compte se crée plus tard, au scan du QR Code.

À la validation :
- la commande est enregistrée en base avec le statut `NOUVELLE`
- un email de confirmation part vers la cliente
- un email d'alerte part vers Yvana

---

## 5. Le back-office

Une seule page, protégée par un mot de passe simple (vérifié côté serveur).

**Liste des commandes** avec pour chacune : numéro, date, nom, téléphone, ville, teintes choisies, statut.

**Les statuts, dans l'ordre :**

| Statut | Signification |
|---|---|
| `NOUVELLE` | Vient d'arriver, à contacter |
| `CONTACTEE` | Yvana a joint la cliente |
| `RDV_FIXE` | Rendez-vous convenu (date + lieu saisis) |
| `REMISE` | Kit remis et payé → **débloque l'activation du QR Code** |
| `ANNULEE` | Abandon |

**Actions possibles :**
- changer le statut
- saisir la date et le lieu du rendez-vous
- au passage en `REMISE` : saisir le moyen de paiement (espèces / virement / PayPal) et le montant
- **imprimer le QR Code** de la commande

> ⚠️ **Règle importante : le QR Code ne fonctionne que si la commande est au statut `REMISE`.** Sinon quelqu'un pourrait commander sans jamais payer et débloquer l'Academy.

**Cette page doit marcher sur téléphone.** C'est là que Yvana travaille, debout, en préparant les colis. Boutons larges, appel téléphonique en un clic sur le numéro.

---

## 6. Le QR Code

- Un QR Code unique par commande
- Il pointe vers `tonglow.com/activate/{token}`
- Le token est **aléatoire et imprévisible** — jamais `kit-1`, `kit-2`, `kit-3`
- **Utilisable une seule fois.** Une fois scanné, il est lié à ce compte définitivement
- Sous le QR Code, imprimer aussi un **code court lisible** (ex. `TG-4K9P`) au cas où le scan échoue

**Page d'activation :** prénom, email, mot de passe. Rien d'autre. Pas d'email de confirmation à cliquer avant d'accéder à l'Academy.

**Cas à respecter :** le compte qui scanne peut être différent de la personne qui a commandé (kit offert).

---

## 7. Glow Academy

- Une vidéo, découpée en chapitres (titre + timecode de début)
- Liste des chapitres visible, navigation libre entre eux
- **Reprise de lecture** : au retour, proposer « Reprendre à 12:34 » ou « Recommencer ». Jamais automatique.
- **Barre de progression** en pourcentage. Un chapitre est validé à 90 % réellement visionné — l'avance rapide ne compte pas.
- **Accès à vie**, jamais retiré automatiquement
- **Maximum 2 appareils** connectés. Au 3e, le plus ancien est déconnecté.
- Vidéo hébergée sur **Mux ou Vimeo privé** — jamais un fichier MP4 dans le dossier public du site

---

## 8. Ce qu'on ne fait PAS

Paiement en ligne · panier · fidélité · parrainage · wishlist · avis clients · newsletter automatisée · statistiques · livraison postale · connexion Google/Apple · sous-titres · plusieurs rôles admin.

Tout ça viendra plus tard, quand il y aura des clientes.

---

## 9. Les 8 règles à ne jamais casser

1. Le QR Code ne fonctionne que si la commande est au statut `REMISE`.
2. Le QR Code est unique et ne s'utilise qu'une seule fois.
3. Le token du QR Code est aléatoire, jamais un numéro qui se suit.
4. Le QR Code crée le compte — aucune connexion préalable exigée.
5. L'accès à l'Academy est définitif, jamais retiré automatiquement.
6. Maximum 2 appareils par compte.
7. On ne montre jamais une teinte incompatible avec la carnation.
8. La vidéo n'est jamais téléchargeable et son lien n'est pas partageable.

---

## 10. Design

Sombre, élégant, calme. Beaucoup d'espace, une seule action principale par écran.

- Pas de pop-up, pas de compte à rebours, pas de « plus que 3 en stock »
- Tutoiement dans tous les textes
- Aucun mot technique visible par la cliente (jamais « token », « erreur 404 », « invalide »)
- **Mobile d'abord** : plus de 90 % des visites viendront de TikTok et Instagram, donc du téléphone
- Boutons d'au moins 44 px
- Attention aux contrastes : sur fond sombre, le gris clair devient vite illisible

---

## 11. Obligations légales (même sans paiement en ligne)

- **Mentions légales** : identité, statut, contact
- **CGV** : c'est de la vente à distance même si le paiement se fait en main propre
- **Droit de rétractation 14 jours**, avec l'exception « produit descellé » pour l'hygiène
- **Politique de confidentialité** (RGPD) + possibilité de supprimer son compte
- **Bandeau cookies** si un outil de statistiques est installé

Et il faut une **micro-entreprise créée avant la première vente** : c'est gratuit, ça prend 15 minutes en ligne, et ça permet d'encaisser proprement.

---

## 12. Ordre de développement

Une étape à la fois. On ne passe à la suivante que si la précédente marche vraiment.

| Étape | Ce qu'on construit | Test de validation |
|---|---|---|
| 1 | Accueil + page kit + sélecteur de teinte | Choisir une carnation sur téléphone, voir les bonnes teintes |
| 2 | Formulaire de commande + emails | Passer une commande, recevoir les deux emails |
| 3 | Back-office + statuts | Changer un statut depuis un téléphone |
| 4 | Génération et impression des QR Codes | Imprimer un QR, le scanner, arriver sur la bonne page |
| 5 | Page d'activation + création de compte | Scanner deux fois le même QR → le 2e est refusé |
| 6 | Glow Academy + progression | Avancer rapidement → le chapitre n'est pas validé |
| 7 | Pages légales + finitions | Tout le parcours sur iPhone et Android en 4G |

---

## 13. Le test qui décide de tout

Avant de lancer : **imprime 20 QR Codes et fais-les scanner par 20 personnes différentes, sur 20 téléphones différents, en 4G.**

S'il y en a 19 qui marchent sur 20, ce n'est pas prêt. Il en faut 20 sur 20.

Parce que si une cliente reçoit son kit, scanne, et que ça ne marche pas : elle a déjà payé, mais la promesse est cassée. Et c'est la promesse qui fait revenir et recommander.
