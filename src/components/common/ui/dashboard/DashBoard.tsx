'use client';

import React from 'react';
import { UserStats } from '@prisma/client';

import { SafeUser } from '@/app/types/safeUser';
import SignOutButton from '@/components/authentication/SignOutButton';
import { NavigationBar } from '../navigation/navbar';
import { AccountDetails } from './AccountDetails/AccountDetails';
import { UserProvider } from './AccountDetails/UserContext';
import { ModeStats } from './ModeStats/ModeStats';

//i'll export this later gl refactoring all that.
interface BestGame {
  lpm: number;
  rawLpm: number;
  accuracy: number;
  createdAt: string;
  language: string;
  totalChar: number;
  totalClicks: number;
}

interface BestScore {
  mode: string;
  category: string;
  avgLpm: number;
  avgAccuracy: number;
  bestGame: BestGame | null;
}

interface AccountPageProps {
  user: SafeUser;
  userStats: UserStats[];
  bestScores: BestScore[];
}

const DashBoard: React.FC<AccountPageProps> = ({
  user,
  userStats,
  bestScores,
}) => {
  return (
    <UserProvider user={user} userStats={userStats} bestScores={bestScores}>
      <NavigationBar />
      <div className="flex h-full items-center justify-center gap-2 text-foreground">
        <div className="flex size-min flex-col gap-4">
          <div className="flex h-min gap-4">
            <AccountDetails />
            <ModeStats />
          </div>
          <SignOutButton>Sign out</SignOutButton>
        </div>
      </div>
    </UserProvider>
  );
};

export default DashBoard;
