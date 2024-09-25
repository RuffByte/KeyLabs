'use client'

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { forgetPasswordSchema } from '@/schemas/zod/schemas';
import TextInput from '@/components/authentication/TextInput';
import { resetPasswordAction } from './actions';

export const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof forgetPasswordSchema>) {
    const result = await resetPasswordAction(values);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  }

  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center">
      <h1 className="mb-2 text-secondary-blue">Forget Password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          id="email"
          type="email"
          placeholder="Email"
          {...register('email')}
          errors={errors.email?.message}
        />
        <button
          type="submit"
          className="rounded bg-background-darker px-5 py-1 text-sm text-white"
        >
          Send reset email
        </button>
      </form>
    </div>
  )
}

export default page;
