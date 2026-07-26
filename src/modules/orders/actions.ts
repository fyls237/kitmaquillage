"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import {
  sendOrderConfirmationEmail,
  sendOrderAlertToAdmin,
} from "@/lib/brevo";
import teintesData from "@/data/teintes.json";
import type { OrderFormState } from "./types";

// ── Validation ────────────────────────────────────

const orderSchema = z.object({
  firstName: z
    .string()
    .min(1, "Le prénom est requis")
    .max(100, "Le prénom est trop long")
    .transform((v) => v.trim()),
  lastName: z
    .string()
    .min(1, "Le nom est requis")
    .max(100, "Le nom est trop long")
    .transform((v) => v.trim()),
  email: z
    .string()
    .min(1, "L'adresse e-mail est requise")
    .email("L'adresse e-mail n'est pas valide")
    .max(254, "L'adresse e-mail est trop longue")
    .transform((v) => v.toLowerCase().trim()),
  phone: z
    .string()
    .min(1, "Le numéro de téléphone est requis")
    .regex(
      /^(?:(?:\+33|0033)\s?[1-9](?:[\s.-]?\d{2}){4}|0[1-9](?:[\s.-]?\d{2}){4})$/,
      "Le numéro de téléphone n'est pas valide (ex. 06 12 34 56 78)"
    ),
  city: z
    .string()
    .min(1, "La ville est requise")
    .max(100, "La ville est trop longue")
    .transform((v) => v.trim()),
  postalCode: z
    .string()
    .max(10, "Le code postal est trop long")
    .optional()
    .transform((v) => v?.trim() || undefined),
  message: z
    .string()
    .max(500, "Le message est trop long (500 caractères max)")
    .optional()
    .transform((v) => v?.trim() || undefined),
  cgv: z.literal("on", {
    error: "Tu dois accepter les CGV pour commander",
  }),
  newsletter: z.string().nullable().optional(),
  // Teintes (depuis les hidden inputs)
  carnation: z.enum(["claire", "medium", "tan", "profonde"] as const, {
    error: "Carnation invalide",
  }),
  fondDeTeint: z.string().min(1, "Le fond de teint est requis"),
  antiCernes: z.string().min(1, "L'anti-cernes est requis"),
});

// ── Rate limiting simple (en mémoire) ─────────────

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3; // 3 commandes par minute par IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetAt) {
      rateLimitMap.delete(key);
    }
  }

  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

// ── Génération du numéro de commande ──────────────

function generateOrderNumber(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Pas de 0/O/1/I pour éviter les confusions
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `TG-${code}`;
}

// ── Résolution des labels de teintes ──────────────

function resolveShadeName(type: "fond" | "cernes", id: string): string {
  const shade = teintesData.teintes[type].find((t) => t.id === id);
  return shade ? `${shade.nom} (${shade.id})` : id;
}

function resolveCarnationLabel(id: string): string {
  const carnation = teintesData.carnations.find((c) => c.id === id);
  return carnation?.label ?? id;
}

// ── Server Action ─────────────────────────────────

export async function submitOrder(
  _prevState: OrderFormState,
  formData: FormData
): Promise<OrderFormState> {
  // Rate limiting
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown";

  if (ip !== "unknown" && !checkRateLimit(ip)) {
    return {
      success: false,
      message: "Trop de tentatives. Réessaie dans une minute.",
    };
  }

  // Extraction des données du formulaire
  const rawData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    city: formData.get("city"),
    postalCode: formData.get("postalCode"),
    message: formData.get("message"),
    cgv: formData.get("cgv"),
    newsletter: formData.get("newsletter"),
    carnation: formData.get("carnation"),
    fondDeTeint: formData.get("fondDeTeint"),
    antiCernes: formData.get("antiCernes"),
  };

  // Validation
  const result = orderSchema.safeParse(rawData);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    return {
      success: false,
      message: "",
      errors: {
        firstName: fieldErrors.firstName,
        lastName: fieldErrors.lastName,
        email: fieldErrors.email,
        phone: fieldErrors.phone,
        city: fieldErrors.city,
        cgv: fieldErrors.cgv,
      },
    };
  }

  const data = result.data;
  const orderNumber = generateOrderNumber();

  // Résolution des labels pour les emails
  const carnationLabel = resolveCarnationLabel(data.carnation);
  const fondDeTeintLabel = resolveShadeName("fond", data.fondDeTeint);
  const antiCernesLabel = resolveShadeName("cernes", data.antiCernes);

  try {
    // Enregistrement en base (skip si pas de DB)
    if (prisma) {
      await prisma.order.create({
        data: {
          orderNumber,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          city: data.city,
          postalCode: data.postalCode,
          message: data.message,
          carnation: data.carnation,
          fondDeTeint: data.fondDeTeint,
          antiCernes: data.antiCernes,
          newsletter: data.newsletter === "on",
          cgvAccepted: true,
          status: "NOUVELLE",
        },
      });
    }

    // Envoi des emails (fire-and-forget, on ne bloque pas la commande)
    const emailParams = {
      orderNumber,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      city: data.city,
      postalCode: data.postalCode,
      message: data.message,
      carnationLabel,
      fondDeTeintLabel,
      antiCernesLabel,
    };

    // Email de confirmation à la cliente
    const confirmResult = await sendOrderConfirmationEmail(emailParams);
    if (!confirmResult.success) {
      console.error("[Order] Confirmation email error:", confirmResult.error);
    }

    // Email d'alerte à Yvana
    const alertResult = await sendOrderAlertToAdmin(emailParams);
    if (!alertResult.success) {
      console.error("[Order] Admin alert email error:", alertResult.error);
    }

    return {
      success: true,
      message: "Commande enregistrée !",
      orderNumber,
    };
  } catch (error) {
    // Collision de numéro de commande (très improbable mais géré)
    if ((error as any)?.code === "P2002") {
      console.warn("[Order] Order number collision, retrying...");
      // On laisse le formulaire ré-essayer
      return {
        success: false,
        message: "Un problème est survenu. Réessaie dans un instant.",
      };
    }

    console.error("[Order] Unexpected error:", error);
    return {
      success: false,
      message: "Une erreur est survenue. Réessaie dans un instant.",
    };
  }
}
