'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { resetPasswordSchema } from '@/schemas/zod/schemas';
import { resetPasswordAction } from './actions'; 
import TextInput from '@/components/authentication/TextInput'; 
import Button from '@/components/common/Button'; 
import { useRouter, useSearchParams, redirect } from 'next/navigation';

const ResetPasswordForm: React.FC = () => {
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

  const onSubmit = async (values: { password: string; confirmPassword: string }) => {
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
  );
};

export default ResetPasswordForm;
