// /lib/createPasswordResetToken.ts

import { PrismaClient } from '@prisma/client'

import { generateRandomToken } from './generateRandomToken'
import { TOKEN_LENGTH, TOKEN_TTL } from './token-consts'

const prisma = new PrismaClient()

export async function createPasswordResetToken(userId: string) {
  const token = await generateRandomToken(TOKEN_LENGTH)
  const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL)

  // Delete all active password reset tokens so only one token is active at a time
  await prisma.passwordResetToken.deleteMany({
    where: {
      userId: userId, // Use userId instead of user.email
    },
  })

  // Insert new token into DB
  await prisma.passwordResetToken.create({
    data: {
      token,
      expiresAt: tokenExpiresAt,
      user: {
        connect: {
          id: userId, // Connect using userId
        },
      },
    },
  })

  return token
}
