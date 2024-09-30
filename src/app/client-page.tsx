'use client';

import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { create } from 'zustand';

import GameBoard from '@/components/common/ui/game/GameBoard';
import { OptionsBar } from '@/components/common/ui/game/OptionsBar';
import { WordsBar } from '@/components/common/ui/game/WordsBar';
import { NavigationBar } from '@/components/common/ui/navigation/navbar';
import { QUERY_KEY } from '@/lib/utils/queryKeys';
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
  setWords: (words: wordSet) => void;
};

export const useScreen = create<Screen>()((set) => ({
  screen: { width: 15 * 80, height: 9 * 80 },
  setScreen: (screen) => set({ screen }),
}));

export const useConfig = create<GameConfig>()((set) => ({
  config: {
    mode: 'characters',
    language: 'english',
    time: 30,
    isCustom: false,
    lengthChar: null,
  },
  setConfig: (config) => set({ config }),
  resetConfig: () => set({ config: { ...useConfig.getState().config } }),
}));

let allowReset = false;

export const useCurrentGame = create<GameData>()((set) => ({
  language: 'english',
  words: [],
  setWords: (state: wordSet) =>
    set({ words: state.words, language: state.name }),
}));

const ClientGamePage = () => {
  const { config } = useConfig();
  const { data, isLoading } = useGenerateWords(config.language);
  const { setWords } = useCurrentGame();
  const [isRestarting, setRestarting] = useState(false);

  const queryClient = useQueryClient();
  const handleRestart = () => {
    if (isRestarting) return;
    queryClient.resetQueries({
      queryKey: [QUERY_KEY.STATIC_WORDS],
    });
  };

  useEffect(() => {
    if (isLoading) return;
    if (data) {
      setWords(data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (!isRestarting) handleRestart();
  }, [isRestarting]);

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

  document.addEventListener('keyup', function (event) {
    allowReset = true;
  });

  document.addEventListener('focus', function (event) {
    allowReset = true;
  });

  return (
    <>
      <NavigationBar />
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
      </motion.div>
      <OptionsBar />
    </>
  );
};

export default ClientGamePage;
