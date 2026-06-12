/**
 * Brevo (ex-Sendinblue) — Intégration API v3
 * Gère l'ajout de contacts en simple opt-in pour la liste d'attente.
 */

const BREVO_API_URL = "https://api.brevo.com/v3";

interface BrevoResponse {
  success: boolean;
  alreadyExists?: boolean;
  error?: string;
}

/**
 * Ajoute un contact à la liste d'attente Brevo (simple opt-in via création/mise à jour du contact).
 * Si les clés API ne sont pas configurées, retourne un succès silencieux
 * (mode dégradé pour le développement local).
 */
export async function addContactToWaitlist(
  email: string
): Promise<BrevoResponse> {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_WAITLIST_LIST_ID;

  // Mode dégradé : pas de clé API configurée
  if (!apiKey || !listId) {
    console.warn(
      "[Brevo] API key or list ID not configured — skipping contact creation"
    );
    return { success: true };
  }

  const listIdNum = Number.parseInt(listId, 10);
  if (!Number.isFinite(listIdNum)) {
    console.warn("[Brevo] WAITLIST_LIST_ID is not a valid number — skipping contact creation");
    return { success: true };
  }
  try {
    // Étape 1 : Créer ou mettre à jour le contact (Simple Opt-in)
    const response = await fetch(`${BREVO_API_URL}/contacts`, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [listIdNum],
        updateEnabled: true, // Si le contact existe déjà, le mettre à jour sans erreur
        attributes: {
          SOURCE: "waitlist",
          SIGNUP_DATE: new Date().toISOString(),
        },
      }),
    });

    if (response.status === 204 || response.status === 201) {
      return { success: true };
    }

    // Contact déjà existant ou erreur métier Brevo
    if (response.status === 400) {
      const data = await response.json();
      if (
        data.code === "duplicate_parameter" ||
        data.message?.includes("already exist")
      ) {
        return { success: true, alreadyExists: true };
      }
      return { success: false, error: data.message || "Erreur Brevo" };
    }

    // Erreur inattendue
    const errorText = await response.text();
    console.error(`[Brevo] Unexpected response ${response.status}:`, errorText);
    return { success: false, error: "Erreur lors de l'inscription" };
  } catch (error) {
    console.error("[Brevo] Network error:", error);
    return { success: false, error: "Impossible de contacter le service d'e-mail" };
  }
}
