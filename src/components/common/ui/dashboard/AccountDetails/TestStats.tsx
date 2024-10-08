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
  return (
    <div className="flex w-3/4 flex-col items-center gap-2 p-4 text-foreground sm:flex-row md:flex-col lg:flex-row">
      <div className="flex w-full flex-col">
        <p>Total Games Played</p>
        <p className="text-2xl">{user?.totalGames}</p>
      </div>
      <div className="flex w-full flex-col">
        <p>Total Time Spent Playing</p>
        <p className="text-2xl">
          {user ? formatTime(user.totalTime) : 'Loading...'}
        </p>
      </div>
    </div>
  );
};
