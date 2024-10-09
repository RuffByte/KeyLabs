import React from 'react';
import { UserRoundPen } from 'lucide-react';

import { useUserContext } from './UserContext';

export const AvatarAndName = () => {
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
    <div className="flex size-full w-min gap-4">
      <UserRoundPen size={48} className="flex-shrink-0 *:stroke-foreground" />
      <div className="flex flex-col">
        <h1 className="text-3xl">{user?.name ?? 'Loading...'}</h1>
        <p>Joined {formattedDate}</p>
      </div>
      {/* <ExperienceBar /> */}
    </div>
  );
};
