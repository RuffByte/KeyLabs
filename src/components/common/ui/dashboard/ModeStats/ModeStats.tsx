import React from 'react';

import { useUserContext } from '../AccountDetails/UserContext';
import ModeStatBox from './ModeStatBox';

export const ModeStats = () => {
  const { bestScores } = useUserContext();

  const characterModes = ['30', '50', '100'];
  const timeModes = ['15', '30', '60'];

  // Helper function to find the best score for a given mode and category
  const findBestScore = (mode: string, category: string) => {
    return bestScores?.find(
      (score) => score.mode === mode && score.category === category
    );
  };

  return (
    <div className="flex w-full flex-col gap-4 text-foreground *:rounded-lg *:border *:border-secondary/70">
      {/* Character modes: 30c, 50c, 100c */}
      <div className="flex justify-around gap-4">
        {characterModes.map((characterMode) => {
          const bestScore = findBestScore('characters', characterMode);
          return (
            <ModeStatBox
              key={characterMode}
              label={`${characterMode} characters`}
              {...bestScore?.bestGame!}
            />
          );
        })}
      </div>
      <div className="flex justify-around gap-4">
        {timeModes.map((timeMode) => {
          const bestScore = findBestScore('time', timeMode);
          return (
            <ModeStatBox
              key={timeMode}
              label={`${timeMode} seconds`}
              {...bestScore?.bestGame!}
            />
          );
        })}
      </div>
    </div>
  );
};
