import React from 'react';
import { UserRoundPen } from 'lucide-react';

import { getUser } from '@/lib/lucia';
import { ExperienceBar } from './ExperienceBar';

export const AvatarAndName = async () => {
  const user = await getUser();

  return (
    <div className="flex w-full flex-col md:w-1/4">
      <div className="flex w-full">
        <UserRoundPen size={81} className="flex-shrink-0" />
        <div className="flex h-full w-full flex-col justify-center p-4">
          <h1 className="text-3xl">{user?.name ?? 'Loading...'}</h1>
          <p>Joined 18 Feb 2022</p>
        </div>
      </div>
      <ExperienceBar />
    </div>
  );
};
