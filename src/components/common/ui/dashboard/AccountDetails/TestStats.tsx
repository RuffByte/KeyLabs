import React from 'react';

import { useUserContext } from './UserContext';

const formatTime = (totalTime: number) => {
  const totalSeconds = Math.floor(totalTime);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes} min ${seconds} sec`;
};

export const TestStats = () => {
  const { user } = useUserContext();
  //"responsive design hahaha"
  // t: "bruh wtf is this :skull:"
  return (
    <div className="flex w-[300px] items-center gap-4 text-foreground">
      <div className="flex w-full flex-col">
        <p>Games Played</p>
        <p className="text-2xl">{user?.totalGames}</p>
      </div>
      <div className="flex w-full flex-col">
        <p>Playtime</p>
        <p className="text-2xl">
          {user ? formatTime(user.totalTime) : 'Loading...'}
        </p>
      </div>
    </div>
  );
};
