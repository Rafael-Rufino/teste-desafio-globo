import { PrismaClient } from '@prisma/client'

const globalFormPrisma = global as unknown as { prisma?: PrismaClient }

export const prisma =
  globalFormPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalFormPrisma.prisma
