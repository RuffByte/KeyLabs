'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { GoogleOAuthButton } from '@/components/authentication/GoogleOAuthButton';
import TextInput from '@/components/authentication/TextInput'; // Import the TextInput component
import Button from '@/components/common/Button';
import TLink from '@/components/common/ui/transition/TLink';
import { signInSchema } from '@/schemas/zod/schemas';
import { signIn } from './login.action';

const LoginForm = () => {
  const router = useRouter();
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
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof signInSchema>) {
    const res = await signIn(values);
    console.log(res);
    if (res.success) {
      toast.success('Login successful');
      router.push('/dashboard');
    } else {
      toast.error(res.error);
    }
  }

  return (
    <div>
      <h1 className="mb-2 font-kollektif text-xl font-bold text-foreground">
        Login
      </h1>
      <div className="flex w-[350px] flex-col gap-2">
        <GoogleOAuthButton />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
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

          <Button type="submit">Login</Button>
        </form>
        <TLink href="/login/forgot-password">
          <Button>Forgot Password</Button>
        </TLink>
      </div>
    </div>
  );
};

export default LoginForm;
