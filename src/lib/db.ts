import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  prismaInitFailed: boolean | undefined;
};

function createPrismaClient(): PrismaClient | null {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.warn(
      "[Prisma] DATABASE_URL not set — database operations will be skipped"
    );
    return null;
  }

  try {
    const adapter = new PrismaPg({ connectionString });
    return new PrismaClient({ adapter });
  } catch (error) {
    console.error("[Prisma] Failed to initialize client:", error);
    return null;
  }
}

/**
 * Prisma client singleton — returns null if DATABASE_URL is not configured.
 * All consumers must handle the null case gracefully.
 */
export const prisma: PrismaClient | null =
  globalForPrisma.prismaInitFailed === true
    ? null
    : globalForPrisma.prisma ?? (() => {
        const client = createPrismaClient();
        if (!client) {
          globalForPrisma.prismaInitFailed = true;
        }
        return client;
      })();

if (process.env.NODE_ENV !== "production" && prisma) {
  globalForPrisma.prisma = prisma;
}
