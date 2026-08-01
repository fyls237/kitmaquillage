import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import readline from "readline";

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  console.log("=== Création du compte Admin ===");

  rl.question("Email de l'administrateur (ex: myriam@tonglow.fr): ", async (email) => {
    rl.question("Mot de passe: ", async (password) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        
        const admin = await prisma.adminUser.upsert({
          where: { email },
          update: { password: hashedPassword },
          create: { email, password: hashedPassword },
        });

        console.log(`✅ Compte admin ${admin.email} créé/mis à jour avec succès !`);
      } catch (error) {
        console.error("❌ Erreur lors de la création du compte:", error);
      } finally {
        await prisma.$disconnect();
        rl.close();
      }
    });
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
