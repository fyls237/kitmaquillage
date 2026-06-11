import { prisma } from "@/lib/db";
import { unstable_cache } from "next/cache";

const getSubscriberCount = unstable_cache(
  async () => {
    if (!prisma) return null;

    try {
      const count = await prisma.waitlistEntry.count();
      return count;
    } catch {
      // En cas d'erreur DB, retourner null pour fallback
      return null;
    }
  },
  ["subscriber-count"],
  { revalidate: 300 } // Cache ISR 5 minutes
);

export async function SubscriberCount() {
  const count = await getSubscriberCount();

  // Compteur simulé si pas de DB ou aucune inscription
  const displayCount = count !== null && count > 0 ? count : 432;

  return (
    <p className="eyebrow text-blanc/60 mt-8 m-0 text-center">
      <span className="text-fuchsia font-medium">+{displayCount}</span>{" "}
      futures makeup queens ont rejoint le mouvement
    </p>
  );
}
