'use client'

import React from 'react'
import { create } from 'zustand'

import GameBoard from '@/components/common/ui/game/GameBoard'
import { OptionsBar } from '@/components/common/ui/game/OptionsBar'
import { WordsBar } from '@/components/common/ui/game/WordsBar'
import { NavigationBar } from '@/components/common/ui/navigation/navbar'

export type Screen = {
  screen: { width: number; height: number }
  setScreen: (screen: { width: number; height: number }) => void
}

export const useScreen = create<Screen>()((set) => ({
  screen: { width: 1280, height: 720 },
  setScreen: (screen) => set({ screen }),
}))

const ClientGamePage = () => {
  return (
    <>
      <NavigationBar />
      <div className="flex flex-col justify-center items-center h-full ">
        <WordsBar />
        <GameBoard />
      </div>
      <OptionsBar />
    </>
  )
}

export default ClientGamePage
