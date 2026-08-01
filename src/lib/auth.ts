import { SignJWT, jwtVerify } from "jose";

const getSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    // Dans un vrai environnement de production, ça devrait throw.
    // Pour l'exercice/MVP en dégradé on utilise un fallback,
    // mais il FAUT configurer JWT_SECRET en production.
    return new TextEncoder().encode("fallback_secret_only_for_dev_change_me");
  }
  return new TextEncoder().encode(secret);
};

export async function signJwt(payload: any) {
  const secret = getSecretKey();
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);
  return token;
}

export async function verifyJwt(token: string) {
  try {
    const secret = getSecretKey();
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}
