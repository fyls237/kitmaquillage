import type { Metadata } from "next";
import { bodoniModa, montserrat, italianno } from "./fonts";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { ConsentAwarePixels } from "@/components/analytics/ConsentAwarePixels";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mon Premier Kit — Ton glow commence ici",
  description:
    "Rejoins la liste d'attente pour découvrir le premier kit maquillage clé en main pour débutantes. 6 essentiels curés par une experte, tutoriels exclusifs inclus.",
  openGraph: {
    title: "Mon Premier Kit — Ton glow commence ici",
    description:
      "Le premier kit maquillage clé en main pour débutantes. Rejoins la liste d'attente.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${bodoniModa.variable} ${montserrat.variable} ${italianno.variable}`}
    >
      <body className="min-h-dvh flex flex-col">
        {children}
        <CookieBanner />
        <ConsentAwarePixels />
      </body>
    </html>
  );
}
