"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { signJwt, verifyJwt } from "@/lib/auth";
import { generateActivationToken, generateActivationCode } from "@/lib/tokens";
import type { ActionState } from "./types";
import { revalidatePath } from "next/cache";

// ── Login ─────────────────────────────────────────

export async function loginAdmin(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { success: false, message: "Veuillez remplir tous les champs." };
  }

  try {
    if (!prisma) {
      return { success: false, message: "Base de données inaccessible." };
    }

    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin) {
      return { success: false, message: "Identifiants invalides." };
    }

    const now = new Date();
    // Vérifier si le compte est bloqué
    if (admin.lockedUntil && admin.lockedUntil > now) {
      const minutesLeft = Math.ceil((admin.lockedUntil.getTime() - now.getTime()) / 60000);
      return { success: false, message: `Compte bloqué suite à plusieurs tentatives échouées. Réessayez dans ${minutesLeft} minutes.` };
    }

    const isValid = await bcrypt.compare(password, admin.password);
    
    if (!isValid) {
      const MAX_ATTEMPTS = 5;
      const newAttempts = admin.failedAttempts + 1;
      const lockedUntil = newAttempts >= MAX_ATTEMPTS ? new Date(now.getTime() + 15 * 60000) : null; // Bloqué 15 min

      await prisma.adminUser.update({
        where: { id: admin.id },
        data: { failedAttempts: newAttempts, lockedUntil }
      });

      if (lockedUntil) {
        return { success: false, message: `Trop de tentatives. Compte bloqué pour 15 minutes.` };
      }
      return { success: false, message: `Identifiants invalides. Tentative ${newAttempts}/${MAX_ATTEMPTS}.` };
    }

    // Réinitialiser les tentatives si succès
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { failedAttempts: 0, lockedUntil: null }
    });

    const token = await signJwt({ adminId: admin.id, email: admin.email });
    
    // Cookie sécurisé
    const cookieStore = await cookies();
    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 heures
      path: "/",
    });
  } catch (error) {
    console.error("[Admin Login Error]", error);
    return { success: false, message: "Une erreur est survenue." };
  }

  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}

// ── Gestion des commandes ─────────────────────────

export async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    if (!prisma) throw new Error("No DB");
    
    const currentOrder = await prisma.order.findUnique({ where: { id: orderId } });
    if (!currentOrder) return { success: false, message: "Commande introuvable" };

    // Machine à états : transitions autorisées
    const ALLOWED_TRANSITIONS: Record<string, string[]> = {
      NOUVELLE: ["NOUVELLE", "CONTACTEE", "RDV_FIXE", "ANNULEE"],
      CONTACTEE: ["NOUVELLE", "CONTACTEE", "RDV_FIXE", "ANNULEE"],
      RDV_FIXE: ["CONTACTEE", "RDV_FIXE", "REMISE", "ANNULEE"],
      REMISE: ["REMISE"], // État terminal
      ANNULEE: ["ANNULEE"], // État terminal
    };

    const allowed = ALLOWED_TRANSITIONS[currentOrder.status] || [];
    if (!allowed.includes(newStatus)) {
      return { success: false, message: "Transition de statut non autorisée (Règle métier)." };
    }

    await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error updating status:", error);
    return { success: false, message: "Erreur lors de la mise à jour" };
  }
}

export async function saveMeetingDetails(
  orderId: string,
  formData: FormData
) {
  try {
    const meetingDateStr = formData.get("meetingDate")?.toString();
    const meetingLocation = formData.get("meetingLocation")?.toString();

    if (!meetingDateStr || !meetingLocation) {
      return { success: false, message: "Tous les champs sont requis." };
    }

    if (!prisma) throw new Error("No DB");
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "RDV_FIXE",
        meetingDate: new Date(meetingDateStr),
        meetingLocation,
      },
    });
    
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error saving meeting:", error);
    return { success: false, message: "Erreur lors de l'enregistrement" };
  }
}

export async function savePaymentDetails(
  orderId: string,
  formData: FormData
) {
  try {
    const paymentMethod = formData.get("paymentMethod")?.toString();
    const paymentAmountStr = formData.get("paymentAmount")?.toString();

    if (!paymentMethod || !paymentAmountStr) {
      return { success: false, message: "Tous les champs sont requis." };
    }

    const paymentAmount = parseFloat(paymentAmountStr);
    if (isNaN(paymentAmount)) {
      return { success: false, message: "Le montant est invalide." };
    }

    if (!prisma) throw new Error("No DB");

    // Vérifier si un token existe déjà (idempotent)
    const existing = await prisma.order.findUnique({ where: { id: orderId }, select: { activationToken: true } });
    const activationToken = existing?.activationToken ?? generateActivationToken();
    const activationCode = existing?.activationToken ? undefined : generateActivationCode();

    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "REMISE",
        paymentMethod,
        paymentAmount,
        activationToken,
        ...(activationCode ? { activationCode } : {}),
      },
    });
    
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error saving payment:", error);
    return { success: false, message: "Erreur lors de l'enregistrement" };
  }
}

// ── Paramètres ────────────────────────────────────

export async function changePassword(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return { success: false, message: "Non autorisé" };

  const payload = await verifyJwt(token);
  if (!payload || !payload.adminId) return { success: false, message: "Session invalide" };

  const oldPassword = formData.get("oldPassword")?.toString();
  const newPassword = formData.get("newPassword")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  if (!oldPassword || !newPassword || !confirmPassword) {
    return { success: false, message: "Veuillez remplir tous les champs." };
  }

  if (newPassword !== confirmPassword) {
    return { success: false, message: "Les nouveaux mots de passe ne correspondent pas." };
  }

  if (newPassword.length < 8) {
    return { success: false, message: "Le nouveau mot de passe doit faire au moins 8 caractères." };
  }

  if (oldPassword === newPassword) {
    return { success: false, message: "Le nouveau mot de passe doit être différent de l'ancien." };
  }

  try {
    if (!prisma) throw new Error("No DB");
    
    const admin = await prisma.adminUser.findUnique({
      where: { id: payload.adminId as string }
    });

    if (!admin) return { success: false, message: "Admin introuvable" };

    const isValid = await bcrypt.compare(oldPassword, admin.password);
    if (!isValid) return { success: false, message: "L'ancien mot de passe est incorrect." };

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { password: hashedPassword }
    });

    return { success: true, message: "Mot de passe mis à jour avec succès !" };
  } catch (error) {
    console.error("[changePassword Error]", error);
    return { success: false, message: "Une erreur est survenue." };
  }
}
