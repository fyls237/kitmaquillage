import { Bodoni_Moda, Montserrat, Italianno } from "next/font/google";

/**
 * Titres display — Bodoni Moda
 * Graisse 300-400, tailles géantes (clamp 40-96px), style éditorial magazine
 */
export const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

/**
 * Corps de texte, boutons, navigation — Montserrat
 * Graisse 400 (corps) et 500 (boutons/étiquettes)
 */
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
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
