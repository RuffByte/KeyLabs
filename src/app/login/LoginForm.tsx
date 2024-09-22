'use client'

import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { signIn } from './login.action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { GoogleOAuthButton } from '@/components/authentication/GoogleOAuthButton'

// Define the Zod schema
export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

const LoginForm = () => {
  const router = useRouter()
  // Setup form with react-hook-form and zod schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // Handle form submission
  async function onSubmit(values: z.infer<typeof signInSchema>) {
    const res = await signIn(values)
    if (res.success) {
      toast.success('Login successful')
      router.push('/dashboard')
    } else {
      toast.error(res.error)
    }
  }

  return (
    <div className="flex flex-col">
      <GoogleOAuthButton />
      <h1 className="mb-2 text-secondary-blue">Sign In Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <input
            type="email"
            id="email"
            {...register('email')}
            placeholder="email"
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
            placeholder="password"
            className="w-full overflow-hidden rounded-xl border border-transparent bg-background-darker px-5 py-2 text-sm text-white placeholder-secondary-blue focus:border-white focus:outline-none"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="rounded bg-background-darker px-5 py-1 text-sm text-white"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
