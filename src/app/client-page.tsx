'use client';

import React from 'react';
import { Languages } from 'lucide-react';
import { create } from 'zustand';

import GameBoard from '@/components/common/ui/game/GameBoard';
import { OptionsBar } from '@/components/common/ui/game/OptionsBar';
import { WordsBar } from '@/components/common/ui/game/WordsBar';
import { NavigationBar } from '@/components/common/ui/navigation/navbar';
import { useGenerateWords } from './hooks/query/useWords';
import { LimitScreenSize } from '@/components/common/ui/wrapper/LimitScreenSize';

export type Screen = {
  screen: { width: number; height: number };
  setScreen: (screen: { width: number; height: number }) => void;
};

export type Config = {
  config: {
    mode: 'characters' | 'time';
    language: string;
    time: number | null;
    isCustom: boolean;
    lengthChar: number | null;
  };
  setConfig: (config: Config['config']) => void;
  resetConfig: () => void;
};

export const useScreen = create<Screen>()((set) => ({
  screen: { width: 15 * 80, height: 9 * 80 },
  setScreen: (screen) => set({ screen }),
}));

export const useConfig = create<Config>()((set) => ({
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
  const { data, isLoading } = useGenerateWords('english_5k');

  return (
    <LimitScreenSize>
      <NavigationBar />
      <div className="flex flex-col justify-center items-center h-full ">
        <WordsBar />
        <GameBoard />
      </div>
      <OptionsBar />
    </LimitScreenSize>
  );
};

export default ClientGamePage;
