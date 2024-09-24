'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import TextInput from '@/components/authentication/TextInput' // Import the TextInput component
import { signUp } from './login.action'

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
      toast.success('Account created successfully')
      router.push('/dashboard')
    } else {
      toast.error(res.error)
    }
  }

  return (
    <div className="flex flex-col">
      <h1 className="mb-2 text-secondary-blue">Sign Up Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          id="name"
          type="text"
          placeholder="Name"
          register={register}
          errors={errors.name?.message}
        />
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
        <TextInput
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          register={register}
          errors={errors.confirmPassword?.message}
        />

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
