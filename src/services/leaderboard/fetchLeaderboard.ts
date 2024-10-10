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
    `/api/data/leaderboard?mode=${currentMode}&subMode=${currentSubMode}`,
    {
      cache: 'force-cache',
      next: { tags: [`leaderboard`] },
    }
  );
  const data: LeaderboardEntry[] = await response.json();
  console.log(data);
  return data;
};
