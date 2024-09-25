'use client';

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { forgetPasswordSchema } from '@/schemas/zod/schemas';
import TextInput from '@/components/authentication/TextInput';
import { resetPasswordAction } from './actions';
import Button from '@/components/common/Button';

const ForgetPasswordForm: React.FC = () => {
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

  const onSubmit = async (values: z.infer<typeof forgetPasswordSchema>) => {
    const result = await resetPasswordAction(values);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[350px]">
      <TextInput
        id="email"
        type="email"
        placeholder="Email"
        {...register('email')}
        errors={errors.email?.message}
      />
      <Button type="submit" className="rounded bg-background-darker px-5 py-1 text-sm mt-2 text-white">
        Send Reset Password
      </Button>
    </form>
  );
};

export default ForgetPasswordForm;
