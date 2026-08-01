import crypto from "crypto";

/**
 * Génère un token d'activation unique et imprévisible (32 caractères hex).
 * Utilisé pour l'URL /activate/{token}
 */
export function generateActivationToken(): string {
  return crypto.randomBytes(16).toString("hex"); // 32 chars hex
}

/**
 * Génère un code court lisible (format TG-XXXX) pour l'impression.
 * Utilisé comme fallback si le scan QR échoue.
 */
export function generateActivationCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Sans 0/O/1/I pour éviter la confusion
  let code = "TG-";
  for (let i = 0; i < 4; i++) {
    code += chars[crypto.randomInt(0, chars.length)];
  }
  return code;
}
