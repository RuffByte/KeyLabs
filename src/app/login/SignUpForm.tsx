'use client'

import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { signUp } from './login.action'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

// Define the Zod schema
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

const SignUpForm = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  // Handle form submission
  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const res = await signUp(values)
    if (res.success) {
      toast.success('Accoutn created successfully')
      router.push('/dashboard')
    } else {
      toast.error(res.error)
    }
  }

  return (
    <div className="flex flex-col">
      <h1 className="mb-2 text-secondary-blue">Sign Up Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <input
            type="text"
            id="name"
            {...register('name')}
            placeholder="Name"
            className="overflow-hidden rounded-xl border border-transparent bg-background-darker p-5 py-2 text-sm text-white placeholder-secondary-blue focus:border-white focus:outline-none"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="mb-2">
          <input
            type="email"
            id="email"
            {...register('email')}
            placeholder="Email"
            className="overflow-hidden rounded-xl border border-transparent bg-background-darker p-5 py-2 text-sm text-white placeholder-secondary-blue focus:border-white focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-2">
          <input
            type="password"
            id="password"
            {...register('password')}
            placeholder="Password"
            className="w-full overflow-hidden rounded-xl border border-transparent bg-background-darker px-5 py-2 text-sm text-white placeholder-secondary-blue focus:border-white focus:outline-none"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-2">
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
            placeholder="Confirm Password"
            className="w-full overflow-hidden rounded-xl border border-transparent bg-background-darker px-5 py-2 text-sm text-white placeholder-secondary-blue focus:border-white focus:outline-none"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="rounded bg-background-darker px-5 py-1 text-sm text-white"
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUpForm
