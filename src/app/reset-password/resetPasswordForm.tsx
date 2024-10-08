'use client';

import React, { useEffect } from 'react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import TextInput from '@/components/authentication/TextInput';
import Button from '@/components/common/Button';
import { resetPasswordSchema } from '@/schemas/zod/schemas';
import { resetPasswordAction } from './actions';

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      toast.error('Invalid or missing reset token.');
      redirect('/login');
    }
  }, [token]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    if (!token) return;

    const result = await resetPasswordAction({ token, ...values });
    if (result.success) {
      toast.success(result.message);
      router.push('/login');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-[350px] flex-col gap-4"
    >
      <TextInput
        id="reset-password"
        type="password"
        placeholder="New Password"
        {...register('password')}
        errors={errors.password?.message}
      />
      <TextInput
        id="confirm-password"
        type="password"
        placeholder="Confirm Password"
        {...register('confirmPassword')}
        errors={errors.confirmPassword?.message}
      />
      <Button type="submit" className="mt-2 rounded bg-blue-500 p-2 text-white">
        Reset Password
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
