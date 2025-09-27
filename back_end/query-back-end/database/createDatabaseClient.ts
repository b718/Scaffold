import { PrismaClient } from "@prisma/client";

export default function getDatabaseClient() {
  const prismaDatabaseClient = new PrismaClient();
  return prismaDatabaseClient;
}
