'use client'

import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { signIn } from './login.action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { GoogleOAuthButton } from '@/components/authentication/GoogleOAuthButton'
import TextInput from '@/components/authentication/TextInput' // Import the TextInput component
import Button from '@/components/common/Button'

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
      <h1 className="mb-2 text-secondary-blue">Sign In Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          id="email"
          type="email"
          placeholder="Email"
          register={register}
          errors={errors.email?.message}
        />
        <TextInput
          id="password"
          type="password"
          placeholder="Password"
          register={register}
          errors={errors.password?.message}
        />

        <Button
          type="submit"
          className="rounded bg-background-darker px-5 py-1 text-sm text-white"
        >
          Login
        </Button>
        <GoogleOAuthButton />
      </form>
    </div>
  )
}

export default LoginForm
