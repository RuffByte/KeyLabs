import React from 'react';
import { UserRoundPen } from 'lucide-react';

import { ExperienceBar } from './ExperienceBar';
import { useUserContext } from './UserContext';

export const AvatarAndName = async () => {
  const { user } = useUserContext();

  // Format the date as "Joined 18 Feb 2022"
  const formattedDate = user?.joinedAt
    ? new Date(user.joinedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'Loading...';

  return (
    <div className="flex w-full flex-col md:w-1/4">
      <div className="flex w-full text-foreground">
        <UserRoundPen size={72} className="flex-shrink-0 *:stroke-foreground" />
        <div className="flex h-full w-full flex-col justify-center p-4">
          <h1 className="text-3xl">{user?.name ?? 'Loading...'}</h1>
          <p>Joined {formattedDate}</p>
        </div>
      </div>
      {/* <ExperienceBar /> */}
    </div>
  );
};
