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

export type Screen = {
  screen: { width: number; height: number };
  setScreen: (screen: { width: number; height: number }) => void;
};

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

export type GameData = {
  language: string;
  words: string[];
  hasStart: boolean;
  targetSize: number;
  setGame: (words: wordSet) => void;
  IsPlaying: () => void;
  EndGame: () => void;
};

export type Point = {
  index: number;
  value: string;
  x: number;
  y: number;
};
export type PointStack = {
  points: Point[];
  popPoints: (state: Point[]) => void;
  setPoints: (points: Point[]) => void;
  handleGenerate: (
    words: string,
    targetSize: number,
    screen: { width: number; height: number }
  ) => void;
};

export const useScreen = create<Screen>()((set) => ({
  screen: { width: 15 * 80, height: 9 * 80 },
  setScreen: (screen) => set({ screen }),
}));

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

export const usePointsStack = create<PointStack>()((set) => ({
  points: [] as Point[],
  popPoints: (state: Point[]) =>
    set(() => {
      state.pop();
      return { points: state };
    }),
  setPoints: (points: Point[]) => set({ points }),
  handleGenerate: (word, targetSize, screen) =>
    set({
      points: generatePoint(word, targetSize, screen),
    }),
}));

let allowReset = false;

export const useCurrentGame = create<GameData>()((set) => ({
  language: 'english',
  words: [],
  hasStart: false,
  targetSize: 80,
  setGame: (state: wordSet) =>
    set({ words: state.words, language: state.name }),
  IsPlaying: () => set({ hasStart: true }),
  EndGame: () => set({ hasStart: false }),
}));

const ClientGamePage = () => {
  const { config } = useConfig();
  const { data } = useGenerateWords(config.language);
  const { setGame, EndGame } = useCurrentGame();
  const [isRestarting, setRestarting] = useState(false);

  // * put function here that should run in the middle of the transition
  const queryClient = useQueryClient();
  const handleRestart = () => {
    if (isRestarting) return;
    queryClient.resetQueries({
      queryKey: [QUERY_KEY.STATIC_WORDS],
    });
    EndGame();
  };

  useEffect(() => {
    if (data) {
      setGame(data);
    }
  }, [data]);

  useEffect(() => {
    if (!isRestarting) handleRestart();
  }, [isRestarting]);

  useEffect(() => {
    setRestarting(true);
  }, [config.language]);

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
