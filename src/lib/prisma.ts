import { PrismaClient } from '@prisma/client';

const client = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
});

// global variable that stores the client
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? client;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = client;

prisma.user.findMany({});
