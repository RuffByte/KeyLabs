'use client';

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// Define the Zod schema
export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

const LoginForm = () => {
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
  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='bg-background-darker overflow-hidden rounded-xl'>
        <input
          type='text'
          id='email'
          {...register('email')}
          placeholder='Email'
          className='bg-background-darker px-4 py-2'
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <input
          type='password'
          id='password'
          {...register('password')}
          placeholder='Password'
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type='submit'>Login</button>
    </form>
  );
};

export default LoginForm;
