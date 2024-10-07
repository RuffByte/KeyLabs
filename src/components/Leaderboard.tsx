'use client';

import React, { useEffect, useState } from 'react';

import Button from './common/Button';
import { NavigationBar } from './common/ui/navigation/navbar';

interface LeaderboardEntry {
  id: string;
  user: {
    name: string;
  } | null;
  wpm: number;
  lpm: number;
  accuracy: number;
  charsTyped: number;
}

export const ClientLeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [currentMode, setCurrentMode] = useState('time');
  const [currentSubMode, setCurrentSubMode] = useState(5);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          `/api/data/leaderboard?mode=${currentMode}&subMode=${currentSubMode}`
        );
        const data: LeaderboardEntry[] = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboard();
  }, [currentMode, currentSubMode]);

  useEffect(() => {
    console.log(leaderboardData);
  }, [leaderboardData]);

  const handleModeChange = (mode: string) => {
    setCurrentMode(mode);
    setCurrentSubMode(mode === 'time' ? 5 : 25);
  };

  const handleSubModeChange = (subMode: number) => {
    setCurrentSubMode(subMode);
  };

  return (
    <>
      <NavigationBar />
      <div className="fixed left-1/2 top-1/2 z-[99] rounded-xl bg-background px-9 py-4 pb-16 [translate:-50%_-50%]">
        <div className="flex w-full justify-between whitespace-nowrap text-4xl">
          <p className="w-min">Leaderboards</p>
          <p className="w-min">English 5k</p>
        </div>
        <div className="my-4 flex w-full justify-between gap-8 whitespace-nowrap text-4xl">
          <div className="flex w-full gap-4 text-white">
            <Button
              className="w-full"
              onClick={() => handleModeChange('characters')}
            >
              Characters
            </Button>
            <Button className="w-full" onClick={() => handleModeChange('time')}>
              Time
            </Button>
          </div>
          <div className="flex w-full gap-4 text-white">
            <div className="w-full"></div>
            <Button className="w-full">All Time</Button>
          </div>
        </div>
        <div className="my-4 flex w-full gap-4 text-white">
          {currentMode === 'time' ? (
            <select
              value={currentSubMode}
              onChange={(e) => handleSubModeChange(Number(e.target.value))}
              className="text-black"
            >
              <option value={5}>5 seconds</option>
              <option value={15}>15 seconds</option>
              <option value={30}>30 seconds</option>
              <option value={60}>60 seconds</option>
            </select>
          ) : (
            <select
              value={currentSubMode}
              onChange={(e) => handleSubModeChange(Number(e.target.value))}
              className="text-black"
            >
              <option value={25}>25 characters</option>
              <option value={30}>30 characters</option>
              <option value={50}>50 characters</option>
              <option value={100}>100 characters</option>
              <option value={150}>150 characters</option>
            </select>
          )}
        </div>
        <div className="flex gap-8">
          <div className="w-[500px] even:*:bg-highlight/30">
            <ScoreRowLabel />
            {leaderboardData.map((item, i) => (
              <ScoreRow key={i} {...item} score={item} />
            ))}
          </div>
          <div className="w-[500px] even:*:bg-highlight/30">
            <ScoreRowLabel />
            {Array.from({ length: 10 }).map((_, i) => (
              <ScoreRowEmpty key={i} />
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

const ScoreRow = ({ score }: { score: LeaderboardEntry }) => {
  return (
    <div className="grid h-9 grid-cols-[1fr_80px_80px_80px] items-center justify-end whitespace-nowrap rounded-lg px-2 *:w-min">
      <p className="justify-self-start">{score.user?.name}</p>
      <p className="justify-self-end">{score.lpm.toFixed(2)}</p>
      <p className="justify-self-end">{score.wpm.toFixed(2)}</p>
      <p className="justify-self-end">NaN</p> {/* Replace with actual date */}
    </div>
  );
};

const ScoreRowEmpty = () => {
  return (
    <div className="grid h-9 grid-cols-[1fr_80px_80px_80px] items-center justify-end rounded-lg px-2 *:w-min">
      <p className="justify-self-start">-</p>
      <p className="justify-self-end">-</p>
      <p className="justify-self-end">-</p>
      <p className="justify-self-end">NaN</p>
    </div>
  );
};
