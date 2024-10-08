'use client';

import React from 'react';

import SignOutButton from '@/components/authentication/SignOutButton';
import { NavigationBar } from '../../navigation/navbar';
import { AccountDetails } from './AccountDetails';
import { UserProvider } from './UserContext';

const AccountPage = () => {
  return (
    <UserProvider>
      <div className="flex h-full flex-col items-center justify-center">
        <NavigationBar />
        <AccountDetails />
        <SignOutButton>Sign Out</SignOutButton>
      </div>
    </UserProvider>
  );
};

export default AccountPage;
