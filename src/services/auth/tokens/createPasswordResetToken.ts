// /lib/createPasswordResetToken.ts

import { PrismaClient } from '@prisma/client';
import { generateRandomToken } from './generateRandomToken';
import { TOKEN_TTL, TOKEN_LENGTH } from './token-consts';

const prisma = new PrismaClient();

export async function createPasswordResetToken(email: string) {

  const token = await generateRandomToken(TOKEN_LENGTH)
  const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL)

  //delete all active password reset tokens so only one token is active at a time
  await prisma.passwordResetToken.deleteMany({
    where: {
      user: {
        email: email,
      },
    },
  })

  //insert new token into DB
  await prisma.passwordResetToken.create({
    data: {
      token,
      expiresAt: tokenExpiresAt,
      user: {
        connect: {
          email: email,
        },
      },
    },
  });

  
  return token;
}
