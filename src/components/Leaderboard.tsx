'use client';

import React, { useEffect, useState } from 'react';

import Button from './common/Button';

interface LeaderboardEntry {
  id: string;
  user: {
    name: string;
  } | null;
  wpm: number;
  accuracy: number;
  charsTyped: number;
}

export const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/data/leaderboard');
        const data: LeaderboardEntry[] = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  useEffect(() => {
    console.log(leaderboardData);
  }, [leaderboardData]);

  return (
    <>
      <div className="fixed left-0 top-0 z-[98] h-dvh w-dvw bg-black/50 text-foreground" />
      <div className="fixed left-1/2 top-1/2 z-[99] rounded-xl bg-background px-9 py-4 text-foreground [translate:-50%_-50%]">
        <div className="flex w-full justify-between whitespace-nowrap text-4xl">
          <p className="w-min">Leaderboards</p>
          <p className="w-min">English</p>
        </div>
        <div className="my-4 flex w-full justify-between gap-8 whitespace-nowrap text-4xl">
          <div className="flex w-full gap-4">
            <Button className="w-full">Characters</Button>
            <Button className="w-full">Time</Button>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-full"></div>
            <Button className="w-full">All Time</Button>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="w-[400px] even:*:bg-highlight">
            <ScoreRowLabel />
            {Array.from({ length: 10 }).map((_, i) => (
              <ScoreRow key={i} />
            ))}
          </div>
          <div className="w-[400px] even:*:bg-highlight">
            <ScoreRowLabel />
            {Array.from({ length: 10 }).map((_, i) => (
              <ScoreRow key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const ScoreRowLabel = () => {
  return (
    <div className="grid grid-cols-[1fr_80px_80px_80px] justify-end px-2 *:w-min">
      <p className="justify-self-start">name</p>
      <p className="justify-self-end">lpm</p>
      <p className="justify-self-end">wpm</p>
      <p className="justify-self-end">date</p>
    </div>
  );
};

const ScoreRow = () => {
  return (
    <div className="grid h-9 grid-cols-[1fr_80px_80px_80px] items-center justify-end rounded-lg px-2 *:w-min">
      <p className="justify-self-start">-</p>
      <p className="justify-self-end">-</p>
      <p className="justify-self-end">-</p>
      <p className="justify-self-end">-</p>
    </div>
  );
};
