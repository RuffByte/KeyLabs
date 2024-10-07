import { GameEntry } from '@prisma/client';

interface LeaderboardEntry extends GameEntry {
  user: {
    name: string;
  };
}

export const fetchLeaderboard = async (
  currentMode: string,
  currentSubMode: number
) => {
  const response = await fetch(
    `/api/data/leaderboard?mode=${currentMode}&subMode=${currentSubMode}`
  );
  const data: LeaderboardEntry[] = await response.json();
  return data;
};
