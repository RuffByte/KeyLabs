type wordSet = {
  name: string;
  words: string[];
};

const getWordSet = async (wordSetName: string): Promise<wordSet> => {
  const fetchPromise = require(`../../app/static/language/${wordSetName}.json`);
  return await fetchPromise;
};

type GameOptions = {
  length?: number;
};

const generateWord = async (
  wordSetName: string,
  options: GameOptions = {} as GameOptions
): Promise<wordSet> => {
  const wordSet = await getWordSet(wordSetName);
  const length: number = wordSet.words.length;
  let words = wordSet.words;

  for (let currentIndex = 0; currentIndex < length; currentIndex++) {
    const randomIndex: number = Math.floor(Math.random() * length);
    [words[currentIndex], words[randomIndex]] = [
      words[randomIndex],
      words[currentIndex],
    ];
  }

  return {
    name: wordSet.name,
    words: words,
  };
};
