import React from 'react';

import { useUserContext } from '../AccountDetails/UserContext';
import ModeStatBox from './ModeStatBox';

export const ModeStats = () => {
  const { bestScores } = useUserContext();

  const characterModes = ['30c', '50c', '100c'];
  const timeModes = ['15s', '30s', '60s'];

  // Helper function to find the best score for a given mode and category
  const findBestScore = (mode: string, category: string) => {
    return bestScores?.find(
      (score) => score.mode === mode && score.category === category
    );
  };

  return (
    <div className="flex flex-col gap-8 text-foreground *:rounded-lg *:border *:border-secondary/70">
      {/* Character modes: 30c, 50c, 100c */}
      <div className="grid grid-cols-3 gap-4">
        {characterModes.map((category) => {
          const bestScore = findBestScore('characters', category);
          return (
            <ModeStatBox
              key={category}
              title={`${category} characters`}
              lpm={bestScore?.bestGame?.lpm}
              accuracy={bestScore?.bestGame?.accuracy}
              additionalStats={
                bestScore?.bestGame
                  ? {
                      duration: `${bestScore?.bestGame?.totalChar} characters`,
                      lpm: bestScore?.bestGame?.lpm || 0,
                      raw: bestScore?.bestGame?.rawLpm || 0,
                      accuracy: bestScore?.bestGame?.accuracy || 0,
                      date: new Date(
                        bestScore?.bestGame?.createdAt
                      ).toLocaleDateString(),
                    }
                  : undefined
              }
            />
          );
        })}
      </div>

      {/* Time modes: 15s, 30s, 60s */}
      <div className="flex">
        {timeModes.map((category) => {
          const bestScore = findBestScore('time', category);
          return (
            <ModeStatBox
              key={category}
              title={`${category} seconds`}
              lpm={bestScore?.bestGame?.lpm}
              accuracy={bestScore?.bestGame?.accuracy}
              additionalStats={
                bestScore?.bestGame
                  ? {
                      duration: `${category} seconds`,
                      lpm: bestScore?.bestGame?.lpm || 0,
                      raw: bestScore?.bestGame?.rawLpm || 0,
                      accuracy: bestScore?.bestGame?.accuracy || 0,
                      date: new Date(
                        bestScore?.bestGame?.createdAt
                      ).toLocaleDateString(),
                    }
                  : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
};
