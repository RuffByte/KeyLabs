'use client';

import React, { useEffect, useState } from 'react';
import { GameEntry } from '@prisma/client';

import Button from '../common/Button';
import { Select, SelectContent, SelectItem } from '../common/Select';
import { NavigationBar } from '../common/ui/navigation/navbar';

interface LeaderboardEntry extends GameEntry {
  user: {
    name: string;
  };
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
    setCurrentSubMode(mode === 'time' ? 15 : 30);
  };

  const handleSubModeChange = (subMode: number) => {
    setCurrentSubMode(subMode);
  };

  return (
    <>
      <NavigationBar />
      <div className="absolute left-1/2 z-[99] mt-32 w-min -translate-x-1/2 rounded-xl border bg-background px-9 py-4 pb-16">
        <div className="flex w-full justify-between whitespace-nowrap text-4xl">
          <p className="w-min">Leaderboards</p>
          <p className="w-min">English 5k</p>
        </div>
        <div className="my-4 flex w-full justify-between gap-8 whitespace-nowrap text-4xl">
          <div className="flex w-full gap-2 text-white">
            <Select defaultValue="characters" onChange={handleModeChange}>
              <SelectContent name="Mode" className="w-[200px]">
                <SelectItem value="characters" />
                <SelectItem value="time" />
              </SelectContent>
            </Select>
            <div className="flex w-min gap-2 *:grow">
              {currentMode === 'time' && (
                <>
                  <Button onClick={() => handleSubModeChange(15)}>15s</Button>
                  <Button onClick={() => handleSubModeChange(30)}>30s</Button>
                  <Button onClick={() => handleSubModeChange(60)}>60s</Button>
                </>
              )}
              {currentMode === 'characters' && (
                <>
                  <Button onClick={() => handleSubModeChange(30)}>30c</Button>
                  <Button onClick={() => handleSubModeChange(50)}>50c</Button>
                  <Button onClick={() => handleSubModeChange(100)}>100c</Button>
                </>
              )}
            </div>
          </div>
          <div className="flex w-full gap-4 text-white">
            <Button className="w-full">All Time</Button>
          </div>
        </div>

        <div className="flex w-[800px] flex-col gap-2 even:*:bg-highlight/30">
          <ScoreRowLabel />
          {leaderboardData.map((item, i) => (
            <ScoreRow key={i} {...item} score={item} />
          ))}
        </div>
      </div>
    </>
  );
};

const ScoreRowLabel = () => {
  return (
    <div className="grid grid-cols-[1fr_80px_80px_80px_120px] justify-end px-2 *:w-min">
      <p className="justify-self-start">name</p>
      <p className="justify-self-end">accuracy</p>
      <p className="justify-self-end">lpm</p>
      <p className="justify-self-end">wpm</p>
      <p className="justify-self-end">date</p>
    </div>
  );
};

const ScoreRow = ({ score }: { score: LeaderboardEntry }) => {
  return (
    <div className="grid h-9 grid-cols-[1fr_80px_80px_80px_120px] items-center justify-end whitespace-nowrap rounded-lg px-2 *:w-min">
      <p className="justify-self-start">{score.user?.name}</p>
      <p className="justify-self-end">{score.accuracy.toFixed(2)}</p>
      <p className="justify-self-end">{score.lpm.toFixed(2)}</p>
      <p className="justify-self-end">{score.wpm.toFixed(2)}</p>
      <p className="justify-self-end">
        {new Date(score.createdAt).toLocaleDateString()}
      </p>
      {/* Replace with actual date */}
    </div>
  );
};
