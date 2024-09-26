'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { GoogleOAuthButton } from '@/components/authentication/GoogleOAuthButton'
import TextInput from '@/components/authentication/TextInput' // Import the TextInput component
import Button from '@/components/common/Button'
import { signInSchema } from '@/schemas/zod/schemas'
import { signIn } from './login.action'

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
    <div>
      <h1 className="mb-2 text-secondary font-bold">Login</h1>
      <div className="flex flex-col w-[350px] gap-4">
        <GoogleOAuthButton />
        <hr />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
          <TextInput
            id="login-email"
            type="email"
            placeholder="Email"
            {...register('email')}
            errors={errors.email?.message}
          />
          <TextInput
            id="login-password"
            type="password"
            placeholder="Password"
            {...register('password')}
            errors={errors.password?.message}
          />

          <Button
            type="submit"
            className="rounded bg-input px-5 py-1 text-sm mt-2 text-foreground"
          >
            Login
          </Button>
        </form>

        <Link href="/login/forgot-password">
          <Button className="rounded bg-input px-5 py-1 text-sm mt-2 text-foreground">
            Forgot Password
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default LoginForm
