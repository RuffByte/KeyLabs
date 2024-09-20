import React from 'react';
import { z } from 'zod';
import 

export const signInSchema = z
  .object({
    name: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })

  .refine((data) => data.password !== data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

  const SignInForm = () => {
    const form = useForm<z
  }
export const SignUpForm = () => {
  return <div>SignUpForm</div>;
};
