'use server'

import { z } from 'zod'
import { signUpSchema } from './SignUpForm'
import { prisma } from '@/lib/prisma'
import { Argon2id } from 'oslo/password'
export const signUp = async (values: z.infer<typeof signUpSchema>) => {
  try {
    //if user exists, explode
    const exisitingUser = await prisma.user.findUnique({
      where: {
        email: values.email,
      },
    })

    if (exisitingUser) {
      return { error: 'User already exists', success: false }
    }

    //hash password with argon2 apparently better than bcrypt (will research later)
    const hashedPassword = await new Argon2id().hash(values.password)

    const user = await prisma.user.create({
      data: {
        email: values.email.toLowerCase(),
        name: values.name,
        hashedPassword,
      },
    })
  } catch (error) {}
}
