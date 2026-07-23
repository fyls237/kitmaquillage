import { Playfair_Display, Montserrat, Italianno } from "next/font/google";

/**
 * Titres display — Playfair Display
 * Serif élégante, style maison de beauté premium
 */
export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

/**
 * Corps de texte, boutons, navigation — Montserrat
 * Graisse 400 (corps), 500 (boutons/étiquettes), 600-700 (titres)
 */
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

/**
 * Accent manuscrit — Italianno
 * Un seul mot ou groupe par section, jamais pour l'info critique
 */
export const italianno = Italianno({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-accent",
});
