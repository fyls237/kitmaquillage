import "dotenv/config";
import { prisma } from "../src/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  if (!prisma) {
    throw new Error("Base de données non accessible. Vérifiez DATABASE_URL.");
  }
  
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  
  if (!email || !password) {
    throw new Error("ADMIN_EMAIL ou ADMIN_PASSWORD n'est pas défini dans le fichier .env");
  }
  
  const hashedPassword = await bcrypt.hash(password, 12);
  
  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: { password: hashedPassword },
    create: { email, password: hashedPassword },
  });

  console.log(`✅ Compte admin ${admin.email} créé/mis à jour`);
  process.exit(0);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
