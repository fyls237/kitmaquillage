import { prisma } from "@/lib/db";
import { ActivationForm } from "@/modules/academy/components/ActivationForm";
import { DisplayTitle } from "@/components/ui/DisplayTitle";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ token: string }>;
}

export default async function ActivateTokenPage({ params }: Props) {
  const { token } = await params;

  if (!prisma) {
    return <div>Erreur de base de données.</div>;
  }

  // 1. Chercher la commande correspondant au token (ou au code court)
  const order = await prisma.order.findFirst({
    where: {
      OR: [
        { activationToken: token },
        { activationCode: token }
      ]
    }
  });

  // 2. Si introuvable
  if (!order) {
    return (
      <div className="min-h-dvh bg-bg flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold text-text mb-4">Code invalide</h1>
        <p className="text-text-muted mb-8 max-w-md">
          Nous n'avons pas pu trouver de kit correspondant à ce code. Assure-toi d'avoir bien scanné le QR Code ou d'avoir saisi le bon code.
        </p>
        <a href="/activate" className="text-accent font-semibold hover:underline">
          Réessayer avec le code manuel
        </a>
      </div>
    );
  }

  // 3. Si déjà activé ou si la commande n'est pas REMISE
  if (order.activatedAt || order.userId) {
    return (
      <div className="min-h-dvh bg-bg flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold text-text mb-4">Kit déjà activé</h1>
        <p className="text-text-muted mb-8 max-w-md">
          Ce kit a déjà été activé et lié à un compte. Si c'est le tien, tu peux te connecter directement à la Glow Academy.
        </p>
        <a href="/academy" className="bg-accent text-white px-6 py-3 font-semibold rounded-full hover:bg-accent-hover transition-colors">
          Aller à l'Academy
        </a>
      </div>
    );
  }

  if (order.status !== "REMISE") {
    return (
      <div className="min-h-dvh bg-bg flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold text-text mb-4">Kit en attente</h1>
        <p className="text-text-muted mb-8 max-w-md">
          Cette commande n'a pas encore été remise. Le QR Code sera activable une fois le kit entre tes mains !
        </p>
      </div>
    );
  }

  // 4. Si tout est bon, afficher le formulaire d'activation
  return (
    <div className="min-h-dvh bg-bg flex flex-col items-center py-12 px-4 sm:px-6">
      <div className="text-center mb-8 max-w-md">
        <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
          Bienvenue
        </p>
        <DisplayTitle
          accent="Ton compte"
          accentPosition="above"
          as="h1"
        >
          <span className="sr-only">Crée ton compte</span>
        </DisplayTitle>
        <p className="text-text-muted mt-4">
          Dernière étape avant d'accéder à Glow Academy. Crée ton accès à vie.
        </p>
      </div>

      <ActivationForm token={token} />
    </div>
  );
}
