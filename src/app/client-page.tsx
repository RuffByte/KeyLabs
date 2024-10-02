'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { create } from 'zustand';

import { Debugger } from '@/components/common/Debugger';
import Dialog, {
  DialogContent,
  DialogTriggerButton,
} from '@/components/common/Dialog';
import { FunctionDebugger } from '@/components/common/FunctionDebugger';
import GameBoard from '@/components/common/ui/game/GameBoard';
import { LanguageSelectionDialog } from '@/components/common/ui/game/LanguageSelectionDialog';
import { OptionsBar } from '@/components/common/ui/game/OptionsBar';
import { WordsBar } from '@/components/common/ui/game/WordsBar';
import { NavigationBar } from '@/components/common/ui/navigation/navbar';
import { devConfig } from '@/devconfig';
import { QUERY_KEY } from '@/lib/utils/queryKeys';
import { generatePoint } from '@/services/points/generate-point';
import { wordSet } from '@/services/words/generate-word';
import { useGenerateWords } from './hooks/query/useGenerateWords';

// *===================================================================================================
// *===================================================================================================
// *===================================================================================================

export type Screen = {
  screen: { width: number; height: number };
  setScreen: (screen: { width: number; height: number }) => void;
};

export const useScreen = create<Screen>()((set) => ({
  screen: { width: 15 * 80, height: 9 * 80 },
  setScreen: (screen) => set({ screen }),
}));

// *===================================================================================================
// *===================================================================================================
// *===================================================================================================

export type PreGameConfig = {
  config: {
    mode: string;
    language: string;
    isCustom: boolean;
    time: number | null;
    lengthChar: number | null;
  };
  setConfig: (config: PreGameConfig['config']) => void;
  resetConfig: () => void;
};

export const usePreConfig = create<PreGameConfig>()((set) => ({
  config: {
    mode: 'characters',
    language: 'english_5k',
    time: null,
    isCustom: false,
    lengthChar: 30,
    targetSize: 80,
  },
  setConfig: (config) => set({ config }),
  resetConfig: () => set({ config: { ...usePreConfig.getState().config } }),
}));

// *===================================================================================================
// *===================================================================================================
// *===================================================================================================

export type PointStack = {
  points: Point[];
  hitPoints: (index: number) => void;
  setPoints: (points: Point[]) => void;
  handleGenerate: (
    words: string,
    targetSize: number,
    screen: { width: number; height: number }
  ) => void;
  handleClear: () => void;
};

export type Point = {
  index: number;
  value: string;
  x: number;
  y: number;
  key: number;
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
        [arr[index], arr[arr.length - 1]] = [
          { ...arr[arr.length - 1], index: index },
          { ...arr[index], index: arr.length - 1 },
        ];
        arr.pop();
      }
      return { points: arr };
    }),
  setPoints: (points: Point[]) => set({ points }),
  handleGenerate: (word, targetSize, screen) =>
    set({
      points: generatePoint(word, targetSize, screen),
    }),
  handleClear: () => set({ points: [] }),
}));

// *===================================================================================================
// *===================================================================================================
// *===================================================================================================

export type GameData = {
  language: string;
  words: string[];
  hasStart: boolean;
  hasFinish: boolean;
  targetSize: number;
  charIndex: number;
  wordIndex: number;
  totalClick: number;
  totalhit: number;
  setGame: (words: wordSet) => void;
  handleNextWord: () => void;
  incrementCharIndex: () => void;
  startGame: () => void;
  endGame: () => void;
  resetGame: () => void;
  incrementClick: () => void;
  incrementHit: () => void;
  handleFinish: () => void;
};

export const useCurrentGame = create<GameData>()((set) => ({
  language: 'english',
  words: [],
  totalTime: 0,
  hasStart: false,
  hasFinish: false,
  targetSize: 80,
  charIndex: 0,
  wordIndex: 0,
  totalClick: 0,
  totalhit: 0,
  setGame: (state: wordSet) =>
    set({ words: state.words, language: state.name }),
  handleNextWord: () =>
    set((prevs) => {
      return { charIndex: 0, wordIndex: prevs.wordIndex + 1 };
    }),
  incrementCharIndex: () =>
    set((prevs) => {
      return { charIndex: prevs.charIndex + 1 };
    }),
  startGame: () => set({ hasStart: true }),
  endGame: () =>
    set({
      hasStart: false,
    }),
  resetGame: () =>
    set({
      hasStart: false,
      hasFinish: false,
      targetSize: 80,
      charIndex: 0,
      wordIndex: 0,
      totalClick: 0,
      totalhit: 0,
    }),
  incrementClick: () =>
    set((prevs) => {
      return { totalClick: prevs.totalClick + 1 };
    }),
  incrementHit: () =>
    set((prevs) => {
      return { totalhit: prevs.totalhit + 1 };
    }),
  handleFinish: () => set({ hasFinish: true }),
}));

type GameContextProps = {
  Gamedata: GameData;
  handleResetGame: () => void;
  handleEndGame: () => void;
};

// *===================================================================================================
// *===================================================================================================
// *===================================================================================================
// ? context, use to cohaerere global state into handle and pass to other component

const GameContext = createContext<GameContextProps>({} as GameContextProps);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

// *===================================================================================================
// *===================================================================================================
// *===================================================================================================

let allowReset = false;

const ClientGamePage = () => {
  const { config } = usePreConfig();
  const { screen } = useScreen();
  const { setGame, endGame, targetSize, wordIndex, hasStart, resetGame } =
    useCurrentGame();
  const { handleGenerate, handleClear } = usePointsStack();
  const [isRestarting, setRestarting] = useState(false);
  const queryClient = useQueryClient();

  // * inital fetching
  const { data } = useGenerateWords(config.language);

  // ! handles

  // * handle to reset game
  const handleRestart = () => {
    setRestarting(false);
    resetGame();
    handleClear();
    endGame();
    queryClient.resetQueries({
      queryKey: [QUERY_KEY.STATIC_WORDS],
    });
  };

  // * handle to blur then reset
  const handleBlurToRestart = () => {
    setRestarting(true);
  };

  // * handle to go to endscreen menu
  const handleEndGame = () => {
    endGame();
  };

  // * Effects
  useEffect(() => {
    if (data) {
      setGame(data);
    }
  }, [data]);

  useEffect(() => {
    if (data && hasStart) {
      handleGenerate(data.words[wordIndex], targetSize, screen);
    }
  }, [wordIndex, hasStart]);

  // ! Events

  // * Reset
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
    <GameContext.Provider
      value={{
        Gamedata: useCurrentGame(),
        handleResetGame: handleRestart,
        handleEndGame: handleEndGame,
      }}
    >
      {/* otherstuff */}
      {devConfig.DEBUG_MENU && <Debugger />}
      {/* DEBUG */}
      <FunctionDebugger
        handleRestart={handleRestart}
        handleBlurToRestart={handleBlurToRestart}
        handleEndGame={handleEndGame}
      />
      <NavigationBar />
      <OptionsBar
        initial={{ x: '-50%' }}
        animate={{ opacity: hasStart ? 0 : 1, y: hasStart ? '100%' : '0%' }}
      />

      {/* Game Container */}
      <Dialog>
        <motion.div
          animate={{
            filter: isRestarting ? 'blur(8px)' : 'blur(0px)',
            opacity: isRestarting ? 0 : 1,
          }}
          onAnimationComplete={handleRestart}
          className="flex flex-col justify-center items-center h-full "
        >
          {/* Game */}
          <WordsBar />
          <GameBoard />
          <motion.div animate={{ opacity: hasStart ? 0 : 1 }}>
            <DialogTriggerButton>
              {config.language}
              <Globe size={20} strokeWidth={1.5} />
            </DialogTriggerButton>
          </motion.div>
          {/* Game */}
        </motion.div>
        <DialogContent>
          <LanguageSelectionDialog />
        </DialogContent>
      </Dialog>
    </GameContext.Provider>
  );
};

export default ClientGamePage;
