"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { addContactToWaitlist } from "@/lib/brevo";
import type { WaitlistFormState } from "./types";

// ── Validation ────────────────────────────────────

const emailSchema = z
  .string()
  .min(1, "L'adresse e-mail est requise")
  .email("L'adresse e-mail n'est pas valide")
  .max(254, "L'adresse e-mail est trop longue")
  .transform((email) => email.toLowerCase().trim());

// ── Rate limiting simple (en mémoire) ─────────────

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requêtes par minute par IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
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

// ── Server Action ─────────────────────────────────

export async function subscribeToWaitlist(
  _prevState: WaitlistFormState,
  formData: FormData
): Promise<WaitlistFormState> {
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

  // Validation
  const rawEmail = formData.get("email");
  const result = emailSchema.safeParse(rawEmail);

  if (!result.success) {
    return {
      success: false,
      message: "",
      errors: {
        email: result.error.flatten().formErrors,
      },
    };
  }

  const email = result.data;

  try {
    // Upsert dans la base de données (skip si pas de DB)
    if (prisma) {
      await prisma.waitlistEntry.upsert({
        where: { email },
        create: { email, source: "tiktok" },
        update: { optInAt: new Date() },
      });
    }

    // Inscription double opt-in chez Brevo
    const brevoResult = await addContactToWaitlist(email);

    if (!brevoResult.success) {
      console.error("[Subscribe] Brevo error:", brevoResult.error);
      // On ne bloque pas l'inscription en DB même si Brevo échoue
    }

    return {
      success: true,
      message: brevoResult.alreadyExists
        ? "Tu fais déjà partie du mouvement !"
        : "Bienvenue dans le mouvement !",
    };
  } catch (error) {
    // Gérer le cas d'un e-mail déjà inscrit (race condition)
    if ((error as any)?.code === "P2002") {
      return {
        success: true,
        message: "Tu fais déjà partie du mouvement !",
      };
    }

    console.error("[Subscribe] Unexpected error:", error);
    return {
      success: false,
      message: "Une erreur est survenue. Réessaie dans un instant.",
    };
  }
}
