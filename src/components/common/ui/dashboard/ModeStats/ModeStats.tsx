import React from 'react';

import { useUserContext } from '../AccountDetails/UserContext';
import ModeStatBox from './ModeStatBox';

//this shit.... is so ass....
export const ModeStats = () => {
  const { userStats } = useUserContext();

  const characterModes = ['30c', '50c', '100c'];
  const timeModes = ['15s', '30s', '60s'];

  const findStats = (mode: string, category: string) => {
    return userStats?.find(
      (stat: any) => stat.mode === mode && stat.category === category
    );
  };

  return (
    <div className="grid w-full grid-cols-2 gap-4">
      <div className="grid grid-cols-3 gap-4">
        {characterModes.map((category) => {
          const stats = findStats('characters', category);
          return (
            <ModeStatBox
              key={category}
              title={`${category} characters`}
              lpm={stats?.avgLpm}
              accuracy={stats?.avgAccuracy}
              additionalStats={{
                duration: '30 seconds',
                lpm: 122,
                raw: 122,
                accuracy: 99,
                date: '26 Oct 2023',
              }}
            />
          );
        })}
      </div>

      {/* Time modes: 15s, 30s, 60s */}
      <div className="grid grid-cols-3 gap-4">
        {timeModes.map((category) => {
          const stats = findStats('time', category);
          return (
            <ModeStatBox
              key={category}
              title={`${category} seconds`}
              lpm={stats?.avgLpm}
              accuracy={stats?.avgAccuracy}
              additionalStats={{
                duration: stats?.totalTime,
                lpm: stats.lpm,
                raw: 122,
                accuracy: 99,
                date: '26 Oct 2023',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
