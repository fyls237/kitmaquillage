import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/auth";
import { redirect } from "next/navigation";
import QRCode from "qrcode";
import { PrintButton } from "./PrintButton";

interface Props {
  params: Promise<{ orderId: string }>;
}

export default async function QrPrintPage({ params }: Props) {
  // 1. Vérifier la session admin
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) redirect("/admin/login");

  const payload = await verifyJwt(token);
  if (!payload?.adminId) redirect("/admin/login");

  // 2. Récupérer la commande
  const { orderId } = await params;
  if (!prisma) redirect("/admin");

  const order = await prisma.order.findUnique({ where: { id: orderId } });

  if (!order) redirect("/admin");

  // 3. Vérifier que la commande est bien REMISE
  if (order.status !== "REMISE" || !order.activationToken) {
    redirect("/admin");
  }

  // 4. Générer le QR Code en base64
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kitmaquillage.vercel.app";
  const activationUrl = `${baseUrl}/activate/${order.activationToken}`;
  const qrDataUrl = await QRCode.toDataURL(activationUrl, {
    width: 300,
    margin: 2,
    color: { dark: "#1a1a1a", light: "#ffffff" },
  });

  return (
    <>
      {/* Styles d'impression */}
      <style>{`
        @media print {
          body { margin: 0; background: white; }
          .no-print { display: none !important; }
          .print-card { box-shadow: none !important; border: none !important; }
        }
        body { font-family: 'Georgia', serif; background: #f5f5f0; }
      `}</style>

      {/* Bouton d'impression — masqué à l'impression */}
      <div className="no-print fixed top-4 right-4 flex gap-2 z-50">
        <PrintButton />
        <a
          href="/admin"
          className="bg-white text-black border border-gray-300 px-5 py-2.5 text-sm font-semibold rounded-full hover:bg-gray-50 transition-colors"
        >
          ← Retour
        </a>
      </div>

      {/* Carte d'impression */}
      <div className="min-h-screen flex items-center justify-center p-8">
        <div
          className="print-card bg-white border border-gray-200 shadow-xl p-10 max-w-sm w-full text-center"
          style={{ borderRadius: "12px" }}
        >
          {/* Logo / Marque */}
          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Kit Maquillage</p>
            <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              TON GLOW
            </h1>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrDataUrl}
              alt={`QR Code d'activation pour la commande ${order.orderNumber}`}
              width={220}
              height={220}
              style={{ imageRendering: "pixelated" }}
            />
          </div>

          {/* Instructions */}
          <p className="text-sm text-gray-600 mb-5 leading-relaxed">
            Scanne ce QR Code pour activer ton accès à{" "}
            <strong>Glow Academy</strong> et créer ton compte.
          </p>

          {/* Séparateur */}
          <div className="border-t border-gray-200 pt-5 mt-2">
            {/* Code court de secours */}
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">
              Code d'activation
            </p>
            <p className="text-3xl font-bold tracking-widest text-black font-mono">
              {order.activationCode}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Si le scan ne fonctionne pas, va sur{" "}
              <span className="text-black">kitmaquillage.vercel.app/activate</span> et saisis ce code.
            </p>
          </div>

          {/* Numéro de commande */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-300">
              Commande {order.orderNumber} · {order.firstName} {order.lastName}
            </p>
          </div>
        </div>
      </div>

    </>
  );
}
