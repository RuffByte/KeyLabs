'use server'

import { z } from 'zod'

import { rateLimitByIp } from '@/lib/limiter'
import { sendResetEmail } from '@/services/email/sendResetEmail'

const resetPasswordInputSchema = z.object({
  email: z.string().email(),
})

export const resetPasswordAction = async (input: { email: string }) => {
  const validatedInput = resetPasswordInputSchema.parse(input)

  // add this rate limit stuff later - anotn
  //await rateLimitByIp({ key: validatedInput.email, limit: 1, window: 30000 });

  try {
    await sendResetEmail(validatedInput.email)
    return { success: true, message: 'An email has been sent!' }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'No user found with that email') {
        return { success: false, message: 'No user found with that email.' }
      }
      console.log(error.message)
      return { success: false, message: 'Email has failed to send.' }
    }

    return { success: false, message: 'An unknown error occurred.' }
  }
}
