import { ResetPasswordEmail } from '@/components/common/ui/emailTemplates/resetPasswordEmail'
import { sendEmail } from '@/lib/email'
import { prisma } from '@/lib/prisma'
import { createPasswordResetToken } from '../auth/tokens/createPasswordResetToken'

export async function sendResetEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw new Error('No user found with that email')
  }

  const token = await createPasswordResetToken(user.id)

  try {
    await sendEmail(
      email,
      'Your password reset link for KeyLabs',
      <ResetPasswordEmail token={token} />
    )
  } catch (sendError) {
    //testing without a domain so sad console.error my beloved
    console.error('Email sending failed:', sendError)
    throw sendError
  }
}
