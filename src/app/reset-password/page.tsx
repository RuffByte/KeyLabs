'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { resetPasswordSchema } from '@/schemas/zod/schemas';
import { resetPasswordAction } from './actions';
import { redirect } from 'next/navigation';
import TextInput from '@/components/authentication/TextInput'; // Importing TextInput component
import Button from '@/components/common/Button'; // Assuming Button is a reusable component

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  // Show error toast if the token is missing
  if (!token) {
    toast.error('Invalid or missing reset token.');
    redirect("/login")
  }

  // Setup form with react-hook-form and zod schema
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


  const onSubmit = async (values: { password: string; confirmPassword: string }) => {
    const result = await resetPasswordAction({ token: token || '', ...values });
    if (result.success) {
      toast.success(result.message);
      router.push('/login');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl mb-4">Reset Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[350px]">
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
        <Button type="submit" className="rounded bg-blue-500 text-white p-2 mt-2">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
