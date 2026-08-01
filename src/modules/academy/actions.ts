"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { signJwt } from "@/lib/auth";
import type { ActionState } from "./types";

const ActivateSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit faire au moins 2 caractères."),
  email: z.string().email("L'adresse e-mail n'est pas valide."),
  password: z.string().min(8, "Le mot de passe doit faire au moins 8 caractères."),
  token: z.string().min(1, "Token manquant."),
});

export async function activateAccount(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Extraire les données
  const data = {
    firstName: formData.get("firstName")?.toString(),
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
    token: formData.get("token")?.toString(),
  };

  // Valider les données
  const parsed = ActivateSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: parsed.error.errors[0].message };
  }

  const { firstName, email, password, token } = parsed.data;

  try {
    if (!prisma) {
      return { success: false, message: "Base de données inaccessible." };
    }

    // 1. Vérifier la validité du token (activationToken ou activationCode)
    const order = await prisma.order.findFirst({
      where: {
        OR: [
          { activationToken: token },
          { activationCode: token }
        ]
      }
    });

    if (!order) {
      return { success: false, message: "Ce code d'activation est invalide." };
    }

    // 2. Vérifier que la commande n'est pas déjà activée
    if (order.activatedAt || order.userId) {
      return { success: false, message: "Ce kit a déjà été activé." };
    }

    // 3. Vérifier que la commande est bien en statut REMISE (sécurité supplémentaire)
    if (order.status !== "REMISE") {
      return { success: false, message: "Cette commande n'est pas éligible à l'activation." };
    }

    // 4. Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { success: false, message: "Un compte existe déjà avec cette adresse e-mail." };
    }

    // 5. Créer l'utilisateur et lier la commande
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // On fait ça dans une transaction pour éviter les états inconsistants
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          firstName,
          email,
          password: hashedPassword,
        }
      });

      await tx.order.update({
        where: { id: order.id },
        data: {
          userId: user.id,
          activatedAt: new Date(),
        }
      });

      return user;
    });

    // 6. Créer la session (JWT)
    const sessionToken = await signJwt({ userId: newUser.id, email: newUser.email });
    
    const cookieStore = await cookies();
    cookieStore.set("user_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365, // 1 an (accès à vie, session longue)
      path: "/",
    });

  } catch (error) {
    console.error("[Activation Error]", error);
    return { success: false, message: "Une erreur est survenue lors de l'activation." };
  }

  // 7. Rediriger vers l'Academy
  redirect("/academy");
}
