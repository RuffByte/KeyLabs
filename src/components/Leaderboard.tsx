import React from 'react';

import Button from './common/Button';

export const Leaderboard = () => {
  return (
    <>
      <div className="fixed left-0 top-0 z-[98] h-dvh w-dvw bg-black/70" />
      <div className="fixed left-1/2 top-1/2 z-[99] rounded-xl bg-background px-9 py-4 text-white [translate:-50%_-50%]">
        <div className="flex w-full justify-between whitespace-nowrap text-4xl">
          <p className="w-min">Leaderboards</p>
          <p className="w-min">English</p>
        </div>
        <div className="my-4 flex w-full justify-between gap-8 whitespace-nowrap text-4xl">
          <div className="flex w-full gap-4">
            <Button>Characters</Button>
            <Button>Time</Button>
          </div>
          <div className="flex w-full justify-end">
            <Button>All Time</Button>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="w-[400px] odd:*:text-background even:*:bg-white">
            <Score />
            <Score />
            <Score />
            <Score />
            <Score />
          </div>
          <div className="w-[400px] odd:*:text-background even:*:bg-white">
            <Score />
            <Score />
            <Score />
            <Score />
            <Score />
          </div>
        </div>
      </div>
    </>
  );
};

const Score = () => {
  return (
    <div className="flex h-9 w-full items-center rounded-md px-2">Score</div>
  );
};
