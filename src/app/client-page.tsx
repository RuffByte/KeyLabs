'use client';

import { isReadable } from 'stream';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { create } from 'zustand';

import GameBoard from '@/components/common/ui/game/GameBoard';
import { OptionsBar } from '@/components/common/ui/game/OptionsBar';
import { WordsBar } from '@/components/common/ui/game/WordsBar';
import { NavigationBar } from '@/components/common/ui/navigation/navbar';
import { QUERY_KEY } from '@/lib/utils/queryKeys';
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

const ClientGamePage = () => {
  const { data, isLoading } = useGenerateWords('english');
  const [isRestarting, setRestarting] = useState(false);
  console.log(isRestarting);

  const queryClient = useQueryClient();
  const handleRestart = () => {
    if (isRestarting) return;
    console.log('re-fetching');
    queryClient.resetQueries({
      queryKey: [QUERY_KEY.STATIC_WORDS, 'english'],
    });
  };

  document.addEventListener('keydown', function (event) {
    if (event.key === 'r') {
      if (isRestarting) return;
      handleRestart();
      setRestarting(true);
    }
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
