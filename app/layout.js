import "./globals.css";

export const metadata = {
  title: "Kit Maquillage Débutante",
  description: "Boutique e-commerce Next.js pour vendre un kit de maquillage.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
