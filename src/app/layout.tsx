import type { Metadata } from "next";
import { playfairDisplay, montserrat, italianno } from "./fonts";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "TON GLOW — Le kit qui t'apprend à te maquiller",
  description:
    "10 produits sélectionnés, un guide pas à pas et des tutoriels exclusifs. Choisis ta teinte et commande ton kit personnalisé à 99,99 €.",
  openGraph: {
    title: "TON GLOW — Le kit qui t'apprend à te maquiller",
    description:
      "10 produits sélectionnés pour un glow complet. Choisis ta teinte et commande ton kit personnalisé.",
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
      className={`${playfairDisplay.variable} ${montserrat.variable} ${italianno.variable}`}
    >
      <body className="min-h-dvh flex flex-col">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
