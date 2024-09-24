
import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/resend';
import { generateRandomToken } from '@/services/auth/tokens/generateRandomToken';
import { sendEmail } from '@/lib/email';

const TOKEN_TTL = 60 * 60 * 1000; // 1 hour

export async function sendResetEmail(email: string) {
 
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('No user found with that email');
  }

  const token = await generateRandomToken(64); 
 
  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

  await sendEmail(
    email,
     "Your password reset link for KeyLabs",
     
  )
}
