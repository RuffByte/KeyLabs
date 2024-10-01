'use client';

import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { create } from 'zustand';

import Dialog, {
  DialogContent,
  DialogTriggerButton,
} from '@/components/common/Dialog';
import GameBoard from '@/components/common/ui/game/GameBoard';
import { LanguageSelectionDialog } from '@/components/common/ui/game/LanguageSelectionDialog';
import { OptionsBar } from '@/components/common/ui/game/OptionsBar';
import { WordsBar } from '@/components/common/ui/game/WordsBar';
import { NavigationBar } from '@/components/common/ui/navigation/navbar';
import { QUERY_KEY } from '@/lib/utils/queryKeys';
import { generatePoint } from '@/services/points/generate-point';
import { wordSet } from '@/services/words/generate-word';
import { useGenerateWords } from './hooks/query/useGenerateWords';

// *
// *
// *

export type Screen = {
  screen: { width: number; height: number };
  setScreen: (screen: { width: number; height: number }) => void;
};

export const useScreen = create<Screen>()((set) => ({
  screen: { width: 15 * 80, height: 9 * 80 },
  setScreen: (screen) => set({ screen }),
}));

// *
// *
// *

export type GameConfig = {
  config: {
    mode: string;
    language: string;
    time: number | null;
    isCustom: boolean;
    lengthChar: number | null;
  };
  setConfig: (config: GameConfig['config']) => void;
  resetConfig: () => void;
};

export const useConfig = create<GameConfig>()((set) => ({
  config: {
    mode: 'characters',
    language: 'english_5k',
    time: 30,
    isCustom: false,
    lengthChar: null,
    targetSize: 80,
  },
  setConfig: (config) => set({ config }),
  resetConfig: () => set({ config: { ...useConfig.getState().config } }),
}));

// *
// *
// *

export type PointStack = {
  points: Point[];
  hitPoints: (index: number) => void;
  setPoints: (points: Point[]) => void;
  handleGenerate: (
    words: string,
    targetSize: number,
    screen: { width: number; height: number }
  ) => void;
};

export type Point = {
  index: number;
  value: string;
  x: number;
  y: number;
};

export const usePointsStack = create<PointStack>()((set) => ({
  points: [] as Point[],
  hitPoints: (index: number) =>
    set((state) => {
      let arr = [...state.points];
      console.log(state.points, index, arr.length);
      if (index === arr.length - 1) {
        arr.pop();
      } else {
        // this is so cursed lmfao
        // swap the value with the popped one
        // situation: popped value is the same as top of stack
        const point = arr.pop();
        const { x, y, value } = point!;
        arr[index] = { index, value, x, y };
      }
      return { points: arr };
    }),
  setPoints: (points: Point[]) => set({ points }),
  handleGenerate: (word, targetSize, screen) =>
    set({
      points: generatePoint(word, targetSize, screen),
    }),
}));

// *
// *
// *

export type GameData = {
  language: string;
  words: string[];
  hasStart: boolean;
  targetSize: number;
  charIndex: number;
  wordIndex: number;
  totalClick: number;
  totalhit: number;
  startGame: (words: wordSet) => void;
  incrementWordIndex: () => void;
  incrementCharIndex: () => void;
  isPlaying: () => void;
  endGame: () => void;
  resetGame: () => void;
};

export const useCurrentGame = create<GameData>()((set) => ({
  language: 'english',
  words: [],
  hasStart: false,
  targetSize: 80,
  charIndex: 0,
  wordIndex: 0,
  totalClick: 0,
  totalhit: 0,
  startGame: (state: wordSet) =>
    set({ words: state.words, language: state.name }),
  incrementWordIndex: () =>
    set((prevs) => {
      return { charIndex: 0, wordIndex: prevs.wordIndex + 1 };
    }),
  incrementCharIndex: () =>
    set((prevs) => {
      return { charIndex: prevs.charIndex + 1 };
    }),
  isPlaying: () => set({ hasStart: true }),
  endGame: () =>
    set({
      hasStart: false,
    }),
  resetGame: () =>
    set({
      hasStart: false,
      words: [],
      targetSize: 80,
      charIndex: 0,
      wordIndex: 0,
      totalClick: 0,
      totalhit: 0,
    }),
}));

let allowReset = false;

const ClientGamePage = () => {
  const { config } = useConfig();
  const { screen } = useScreen();
  const { startGame: setGame, endGame, targetSize } = useCurrentGame();
  const { handleGenerate } = usePointsStack();
  const [isRestarting, setRestarting] = useState(false);

  // * inital fetching
  const { data } = useGenerateWords(config.language);

  // * put function here that should run in the middle of the transition
  const queryClient = useQueryClient();
  const handleRestart = () => {
    if (isRestarting) return;
    queryClient.resetQueries({
      queryKey: [QUERY_KEY.STATIC_WORDS],
    });
    endGame();
  };

  useEffect(() => {
    if (data) {
      setGame(data);
      handleGenerate(data.words[0], targetSize, screen);
    }
  }, [data]);

  useEffect(() => {
    if (!isRestarting) handleRestart();
  }, [isRestarting]);

  useEffect(() => {
    setRestarting(true);
  }, [config.language]);

  useEffect(() => {
    setRestarting(true);
  }, []);

  document.addEventListener('keydown', function (event) {
    if (event.repeat != undefined) {
      allowReset = !event.repeat;
    }
    if (!allowReset) return;
    // key r
    if (event.key === 'r') {
      if (isRestarting) return;
      setRestarting(true);
    }
  });

  document.addEventListener('keyup', function () {
    allowReset = true;
  });

  document.addEventListener('focus', function () {
    allowReset = true;
  });

  return (
    <>
      <NavigationBar />
      <Dialog>
        <motion.div
          animate={{
            filter: isRestarting ? 'blur(8px)' : 'blur(0px)',
            opacity: isRestarting ? 0 : 1,
          }}
          onAnimationComplete={() => setRestarting(false)}
          className="flex flex-col justify-center items-center h-full "
        >
          <WordsBar />
          <GameBoard />
          <DialogTriggerButton>
            {config.language}
            <Globe size={20} strokeWidth={1.5} />
          </DialogTriggerButton>
        </motion.div>
        <DialogContent>
          <LanguageSelectionDialog />
        </DialogContent>
      </Dialog>
      <OptionsBar />
    </>
  );
};

export default ClientGamePage;
