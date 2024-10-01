'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import TextInput from '@/components/authentication/TextInput'; // Import the TextInput component

import Button from '@/components/common/Button';
import { signUpSchema } from '@/schemas/zod/schemas';
import { signUp } from './login.action';

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
    <div className="flex flex-col w-[350px]">
      <h1 className="mb-2 text-foreground text-xl font-bold">Sign up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <TextInput
          type="text"
          id="signup-name"
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
          id="confirm-password"
          {...register('confirmPassword')}
          placeholder="Confirm Password"
          errors={errors.confirmPassword?.message}
        />
        <Button className="">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
