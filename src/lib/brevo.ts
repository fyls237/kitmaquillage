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

// ── Emails transactionnels (Commande) ─────────────────────────

/**
 * Données de la commande passées aux templates Brevo.
 * Les noms des paramètres correspondent aux variables du template Brevo.
 */
interface OrderEmailParams {
  orderNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  postalCode?: string;
  message?: string;
  carnationLabel: string;
  fondDeTeintLabel: string;
  antiCernesLabel: string;
}

/**
 * Envoie un email transactionnel via un template Brevo.
 * Mode dégradé silencieux si l'API key ou le template ID n'est pas configuré.
 */
async function sendBrevoTransactionalEmail(
  to: { email: string; name?: string },
  templateId: number,
  params: Record<string, string>
): Promise<BrevoResponse> {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.warn("[Brevo] API key not configured — skipping transactional email");
    return { success: true };
  }

  if (!Number.isFinite(templateId) || templateId <= 0) {
    console.warn("[Brevo] Invalid template ID — skipping transactional email");
    return { success: true };
  }

  try {
    const response = await fetch(`${BREVO_API_URL}/smtp/email`, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        to: [to],
        templateId,
        params,
      }),
    });

    if (response.status === 201 || response.status === 200) {
      return { success: true };
    }

    const errorText = await response.text();
    console.error(`[Brevo] Transactional email error ${response.status}:`, errorText);
    return { success: false, error: "Erreur lors de l'envoi de l'email" };
  } catch (error) {
    console.error("[Brevo] Network error (transactional):", error);
    return { success: false, error: "Impossible de contacter le service d'e-mail" };
  }
}

/**
 * Envoie l'email de confirmation de commande à la cliente.
 * Template Brevo personnalisable depuis le dashboard — variables :
 * PRENOM, NOM, NUMERO_COMMANDE, CARNATION, FOND_DE_TEINT, ANTI_CERNES
 */
export async function sendOrderConfirmationEmail(
  order: OrderEmailParams
): Promise<BrevoResponse> {
  const templateIdStr = process.env.BREVO_ORDER_CONFIRMATION_TEMPLATE_ID;
  const templateId = templateIdStr ? Number.parseInt(templateIdStr, 10) : 0;

  return sendBrevoTransactionalEmail(
    { email: order.email, name: `${order.firstName} ${order.lastName}` },
    templateId,
    {
      PRENOM: order.firstName,
      NOM: order.lastName,
      NUMERO_COMMANDE: order.orderNumber,
      CARNATION: order.carnationLabel,
      FOND_DE_TEINT: order.fondDeTeintLabel,
      ANTI_CERNES: order.antiCernesLabel,
    }
  );
}

/**
 * Envoie un email d'alerte à Yvana pour chaque nouvelle commande.
 * Template Brevo personnalisable — variables :
 * PRENOM, NOM, EMAIL, TELEPHONE, VILLE, CODE_POSTAL, MESSAGE,
 * NUMERO_COMMANDE, CARNATION, FOND_DE_TEINT, ANTI_CERNES
 */
export async function sendOrderAlertToAdmin(
  order: OrderEmailParams
): Promise<BrevoResponse> {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.warn("[Brevo] ADMIN_EMAIL not configured — skipping admin alert");
    return { success: true };
  }

  const templateIdStr = process.env.BREVO_ORDER_ALERT_TEMPLATE_ID;
  const templateId = templateIdStr ? Number.parseInt(templateIdStr, 10) : 0;

  return sendBrevoTransactionalEmail(
    { email: adminEmail, name: "Yvana — TON GLOW" },
    templateId,
    {
      PRENOM: order.firstName,
      NOM: order.lastName,
      EMAIL: order.email,
      TELEPHONE: order.phone,
      VILLE: order.city,
      CODE_POSTAL: order.postalCode || "",
      MESSAGE: order.message || "—",
      NUMERO_COMMANDE: order.orderNumber,
      CARNATION: order.carnationLabel,
      FOND_DE_TEINT: order.fondDeTeintLabel,
      ANTI_CERNES: order.antiCernesLabel,
    }
  );
}
