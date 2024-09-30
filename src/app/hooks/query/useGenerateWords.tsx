import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@/lib/utils/queryKeys';
import { generateWords } from '@/services/words/generate-word';

export const useGenerateWords = (wordset: string) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.STATIC_WORDS, wordset],
    queryFn: () => generateWords(wordset),
  });

  return query;
};
