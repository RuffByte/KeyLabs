import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

export const signUpSchema = z
  .object({
    name: z.string().min(5, 'Name must be at least 5 characters long'),
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const forgetPasswordSchema = z.object({
  email: z.string().email(),
})
