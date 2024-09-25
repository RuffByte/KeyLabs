'use client'

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signUp } from './login.action';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import TextInput from '@/components/authentication/TextInput'; // Import the TextInput component
import { signUpSchema } from '@/schemas/zod/schemas';


const SignUpForm = () => {
  const router = useRouter();
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
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const res = await signUp(values);
    if (res.success) {
      toast.success('Account created successfully');
      router.push('/dashboard');
    } else {
      toast.error(res.error);
    }
  }

  return (
    <div className="flex flex-col">
      <h1 className="mb-2 text-secondary-blue">Sign Up Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          type="text"
          id="name"
          {...register('name')}
          placeholder="Name"
          errors={errors.name?.message}
        />
        <TextInput
          type="email"
          id="signup-email"
          {...register('email')}
          placeholder="Email"
          errors={errors.email?.message}
        />
        <TextInput
          type="password"
          id="signup-password"
          {...register('password')}
          placeholder="Password"
          errors={errors.password?.message}
        />
        <TextInput
          type="password"
          id="confirmPassword"
          {...register('confirmPassword')}
          placeholder="Confirm Password"
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
  );
};

export default SignUpForm;
