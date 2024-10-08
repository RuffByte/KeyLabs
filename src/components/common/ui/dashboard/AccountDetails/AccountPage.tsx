'use client';

import React from 'react';
import { UserStats } from '@prisma/client';

import { SafeUser } from '@/app/types/safeUser';
import SignOutButton from '@/components/authentication/SignOutButton';
import { NavigationBar } from '../../navigation/navbar';
import { AccountDetails } from './AccountDetails';
import { UserProvider } from './UserContext';

interface AccountPageProps {
  user: SafeUser;
  userStats: UserStats[];
}

const AccountPage: React.FC<AccountPageProps> = ({ user, userStats }) => {
  return (
    <UserProvider user={user} userStats={userStats}>
      <div className="flex h-full flex-col items-center justify-center">
        <NavigationBar />
        <AccountDetails />
        <SignOutButton>Sign Out</SignOutButton>
      </div>
    </UserProvider>
  );
};

export default AccountPage;
