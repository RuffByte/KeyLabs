'use client';

import React from 'react';

import { logOut } from '@/app/login/login.action';

type Props = {
  children: React.ReactNode;
};

export const SignOutButton = ({ children }: Props) => {
  return (
    <button
      className="w-full rounded-md bg-foreground px-4 py-2 text-background"
      onClick={() => {
        logOut();
      }}
    >
      {children}
    </button>
  );
};

export default SignOutButton;
