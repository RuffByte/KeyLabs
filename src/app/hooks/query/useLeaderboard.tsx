import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@/lib/utils/queryKeys';
import { fetchLeaderboard } from '@/services/leaderboard/fetchLeaderboard';

export const useLeaderboardScore = (
  currentMode: string,
  currentSubMode: number
) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.STATIC_LEADERBOARD],
    queryFn: () => fetchLeaderboard(currentMode, currentSubMode),
    staleTime: 60 * 2
  });

  return query;
};
