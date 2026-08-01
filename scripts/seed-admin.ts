import { prisma } from "../src/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  if (!prisma) {
    throw new Error("Base de données non accessible. Vérifiez DATABASE_URL.");
  }
  
  const email = "myriam@tonglow.fr";
  const password = "myriamtonglow"; // Mot de passe par défaut
  
  const hashedPassword = await bcrypt.hash(password, 12);
  
  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: { password: hashedPassword },
    create: { email, password: hashedPassword },
  });

  console.log(`✅ Compte admin ${admin.email} créé/mis à jour avec le mot de passe: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
