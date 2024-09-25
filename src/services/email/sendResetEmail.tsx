
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { ResetPasswordEmail } from '@/components/emailTemplates/resetPasswordEmail';
import { createPasswordResetToken } from '../auth/tokens/createPasswordResetToken';

export async function sendResetEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('No user found with that email');
  }

  const token = await createPasswordResetToken(user.id); 

  try {
    await sendEmail(
      email,
      "Your password reset link for KeyLabs",
      <ResetPasswordEmail token={token} />
    );
  } 
  //testing without a domain so sad console.error my beloved
  catch (sendError) {
    console.error('Email sending failed:', sendError);
    throw sendError; 
  }
}