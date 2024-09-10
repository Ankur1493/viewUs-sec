/* eslint-disable no-var */
import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined;
}
/* eslint-enable no-var */

export const db = globalThis.prisma || new PrismaClient();

if (process.env.ENVIRONMENT !== "production") globalThis.prisma = db;
