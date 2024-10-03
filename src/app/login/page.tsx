export const runtime = 'edge';

import React from 'react';
import { redirect } from 'next/navigation';

import { NavigationBar } from '@/components/common/ui/navigation/navbar';
import { getUser } from '@/lib/lucia';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const LoginPage = async () => {
  const user = await getUser();
  if (user) return redirect('/dashboard');

  return (
    <div className="flex h-full items-center justify-around">
      <NavigationBar />
      <div className="flex w-full justify-between px-4">
        <SignUpForm />
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
