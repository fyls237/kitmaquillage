import { prisma } from "@/lib/db";
import { OrderTabs } from "@/modules/admin/components/OrderTabs";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Espace Admin — TON GLOW",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic"; // Pas de mise en cache statique pour l'admin

export default async function AdminPage() {
  if (!prisma) {
    return <div>Erreur : La base de données n'est pas configurée.</div>;
  }

  // On récupère toutes les commandes triées par date (récentes d'abord)
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-dvh bg-bg">
      {/* Header Admin */}
      <header className="bg-surface border-b border-border sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-text m-0 tracking-wide">
            Espace <span className="text-accent">Admin</span>
          </h1>
          <a
            href="/admin/parametres"
            className="text-sm font-medium text-text-muted hover:text-accent transition-colors"
          >
            Paramètres
          </a>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <OrderTabs orders={orders} />
      </main>
    </div>
  );
}
