'use client';

import React from 'react';
import { create } from 'zustand';

import GameBoard from '@/components/common/ui/game/GameBoard';
import { OptionsBar } from '@/components/common/ui/game/OptionsBar';
import { WordsBar } from '@/components/common/ui/game/WordsBar';
import { NavigationBar } from '@/components/common/ui/navigation/navbar';
import { useGenerateWords } from './hooks/query/useWords';

export type Screen = {
  screen: { width: number; height: number };
  setScreen: (screen: { width: number; height: number }) => void;
};

export const useScreen = create<Screen>()((set) => ({
  screen: { width: 15 * 80, height: 9 * 80 },
  setScreen: (screen) => set({ screen }),
}));

const ClientGamePage = () => {
  const { data, isLoading } = useGenerateWords('english_5k');

  return (
    <>
      <NavigationBar />
      <div className="flex flex-col justify-center items-center h-full ">
        <WordsBar />
        <GameBoard />
      </div>
      <OptionsBar />
    </>
  );
};

export default ClientGamePage;
