import React from 'react';

import SignOutButton from '@/components/authentication/SignOutButton';
import { AvatarAndName } from './AvatarAndName';
import { ExperienceBar } from './ExperienceBar';
import { TestStats } from './TestStats';

export const AccountDetails = () => {
  return (
    <div className="flex flex-col justify-between gap-2 whitespace-nowrap rounded-lg border border-secondary/70 p-4">
      <AvatarAndName />
      <ExperienceBar />
      <TestStats />
      <SignOutButton>Sign out</SignOutButton>
    </div>
  );
};
