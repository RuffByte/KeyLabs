'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { create } from 'zustand';

// import { Debugger } from '@/components/common/Debugger';
import Dialog, {
  DialogContent,
  DialogTriggerButton,
} from '@/components/common/Dialog';
import { FunctionDebugger } from '@/components/common/FunctionDebugger';
import { EndGameScreen } from '@/components/common/ui/game/EndGameScreen';
import GameBoard from '@/components/common/ui/game/GameBoard';
import { LanguageSelectionDialog } from '@/components/common/ui/game/LanguageSelectionDialog';
import { OptionsBar } from '@/components/common/ui/game/OptionsBar';
import { WordsBar } from '@/components/common/ui/game/WordsBar';
import { NavigationBar } from '@/components/common/ui/navigation/navbar';
import { devConfig } from '@/devconfig';
import { QUERY_KEY } from '@/lib/utils/queryKeys';
import { OptionBarOutVariants } from '@/lib/variants/variants';
import { generatePoint } from '@/services/points/generate-point';
import { wordSet } from '@/services/words/generate-word';
import { submitGameData } from './actions';
import { useGenerateWords } from './hooks/query/useGenerateWords';
import { GameData } from './types/gameData';
import { User } from './types/user';

// *===================================================================================================
// *===================================================================================================
// *===================================================================================================

export type Screen = {
  screen: { width: number; height: number };
  setScreen: (screen: { width: number; height: number }) => void;
};

export const useScreen = create<Screen>()((set) => ({
  screen: { width: 15 * 72, height: 9 * 72 },
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
    time: number;
    lengthChar: number;
    targetSize: number;
  };
  setConfig: (config: PreGameConfig['config']) => void;
  resetConfig: () => void;
};

export const usePreConfig = create<PreGameConfig>()((set) => ({
  config: {
    theme: 'default',
    mode: 'characters',
    language: 'english_5k',
    time: 0,
    isCustom: false,
    lengthChar: 30,
    targetSize: 16 * 6,
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
  key: string;
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

export type GameDataProps = {
  mode: string;
  language: string;
  words: string[];
  // bool
  hasStart: boolean;
  hasFinish: boolean;
  // target
  charCount: number;
  targetSize: number;
  charIndex: number;
  wordIndex: number;
  //
  totalTime: number;
  totalChar: number;
  totalClick: number;
  totalHit: number;
  setMode: (words: wordSet) => void;
  setTime: (time: number) => void;
  InitializeGame: (game: GameInitializeProps) => void;
  handleNextWord: () => void;
  incrementCharIndex: () => void;
  endGame: () => void;
  finishGame: () => void;
  resetGame: () => void;
  incrementClick: () => void;
  incrementHit: () => void;
  handleFinish: () => void;
};

export type GameInitializeProps = {
  mode: string;
  totalTime: number;
  totalChar: number;
  targetSize: number;
  languge: string;
};

export const useCurrentGame = create<GameDataProps>()((set) => ({
  mode: 'characters',
  language: 'english',
  words: [],
  totalTime: 0,
  totalChar: 0,
  charCount: 0,
  hasStart: false,
  hasFinish: false,
  targetSize: 0,
  charIndex: 0,
  wordIndex: 0,
  totalClick: 0,
  totalHit: 0,
  setMode: (state: wordSet) =>
    set({ words: state.words, language: state.name }),
  handleNextWord: () =>
    set((prevs) => {
      return { charIndex: 0, wordIndex: prevs.wordIndex + 1 };
    }),
  incrementCharIndex: () =>
    set((prevs) => {
      return { charIndex: prevs.charIndex + 1 };
    }),
  setTime: (time: number) => set({ totalTime: time }),
  InitializeGame: (game) =>
    set({
      ...game,
      hasStart: true,
      hasFinish: false,
      charIndex: 0,
      charCount: 0,
      wordIndex: 0,
      totalClick: 0,
      totalHit: 0,
    }),
  endGame: () =>
    set({
      hasStart: false,
    }),
  finishGame: () =>
    set({
      hasFinish: true,
    }),
  resetGame: () =>
    set({
      totalTime: 0,
      hasStart: false,
      hasFinish: false,
      charIndex: 0,
      charCount: 0,
      wordIndex: 0,
      totalClick: 0,
      totalHit: 0,
    }),
  incrementClick: () =>
    set((prevs) => {
      return { totalClick: prevs.totalClick + 1 };
    }),
  incrementHit: () =>
    set((prevs) => {
      return { totalHit: prevs.totalHit + 1, charCount: prevs.charCount + 1 };
    }),
  handleFinish: () => set({ hasFinish: true }),
}));

type GameContextProps = {
  Gamedata: GameDataProps;
  handleResetGame: () => void;
  handleEndGame: () => void;
  handleStartGame: () => void;
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

const saveToLocalStorage = (gameData: GameData) => {
  // Retrieve existing game data from local storage
  const existingData = JSON.parse(localStorage.getItem('gameData') || '[]');

  // Check the maximum limit
  if (existingData.length >= 10) {
    existingData.shift(); // Remove the oldest entry
  }

  existingData.push(gameData); // Add new game data
  localStorage.setItem('gameData', JSON.stringify(existingData)); // Save back to local storage
};

// *===================================================================================================
// *===================================================================================================
// *===================================================================================================

const calculateEndGameData = (
  totalHit: number,
  totalClick: number,
  totalTime: number,
  targetSize: number,
  config: PreGameConfig['config']
) => {
  const accuracy: number = parseFloat(
    ((totalHit / totalClick) * 100).toFixed(2)
  );
  const rawWpm: number = parseFloat(
    ((totalHit / 5) * (60 / totalTime)).toFixed(2)
  );
  const wpm: number = parseFloat((rawWpm * (accuracy / 100)).toFixed(2));
  const rawLpm: number = parseFloat((totalHit * (60 / totalTime)).toFixed(2));
  const lmp: number = parseFloat((rawLpm * (accuracy / 100)).toFixed(2));

  return {
    mode: config.mode,
    language: config.language,
    totalTime: totalTime,
    totalChar: totalHit,
    totalClick: totalClick,
    totalHit: totalHit,
    targetSize: targetSize,
    wpm: wpm,
    rawWpm: rawWpm,
    lpm: lmp,
    rawLpm: rawLpm,
    accuracy: accuracy,
  };
};

let allowReset = false;

const ClientGamePage = ({ user }: { user: User }) => {
  const { config } = usePreConfig();
  const { screen } = useScreen();
  const {
    setMode,
    endGame,
    targetSize,
    wordIndex,
    hasStart,
    resetGame,
    hasFinish,
    finishGame,
    totalClick,
    totalTime,
    totalHit,
    InitializeGame,
  } = useCurrentGame();
  const { handleGenerate, handleClear } = usePointsStack();
  const [isRestarting, setRestarting] = useState(false);
  const queryClient = useQueryClient();
  const [endGameData, setEndGameData] = useState<GameData | null>(null); // Add state for end game data

  // * inital fetching
  const { data } = useGenerateWords(config.language);

  // ! handles

  // * handle to reset game
  const handleRestart = () => {
    if (isRestarting) {
      queryClient.resetQueries({
        queryKey: [QUERY_KEY.STATIC_WORDS],
      });
    }
    setRestarting(false);
    resetGame();
    handleClear();
    endGame();
  };

  const handleStartGame = () => {
    InitializeGame({
      mode: config.mode,
      totalTime: config.time,
      totalChar: config.lengthChar,
      targetSize: config.targetSize,
      languge: config.language,
    });
  };

  // * handle to blur then reset
  const handleBlurToRestart = () => {
    setRestarting(true);
  };

  // * handle to go to endscreen menu
  const handleFinishGame = () => {
    finishGame();
  };

  // * Logic for submitting game data
  const handleSubmitGameData = () => {
    const gameData = calculateEndGameData(
      totalHit,
      totalClick,
      totalTime,
      targetSize,
      config
    );
    setEndGameData(gameData); // Store game data for the EndGameScreen

    if (user) {
      submitGameData({
        ...gameData,
        userName: user.name,
      });
    } else {
      saveToLocalStorage({ ...gameData, wpm: gameData.wpm });
    }
  };

  useEffect(() => {
    // workaround as wordbar sets hasFinish to true on load fml
    if (hasFinish && totalClick > 0) {
      handleSubmitGameData();
    }
  }, [hasFinish]);

  // * Effects
  useEffect(() => {
    if (data) {
      setMode(data);
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
    if (event.key.toLocaleLowerCase() === 'r') {
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
        handleResetGame: handleBlurToRestart,
        handleEndGame: handleFinishGame,
        handleStartGame: handleStartGame,
      }}
    >
      {/* otherstuff */}
      {devConfig.DEBUG_FUNCTION && (
        <FunctionDebugger
          handleRestart={handleRestart}
          handleBlurToRestart={handleBlurToRestart}
          handleEndGame={handleFinishGame}
        />
      )}
      <NavigationBar />
      <OptionsBar
        initial="initial"
        animate="animate"
        variants={OptionBarOutVariants(hasStart)}
      />

      {/* Game Container */}
      <Dialog>
        <motion.div
          animate={{
            filter: isRestarting ? 'blur(8px)' : 'blur(0px)',
            opacity: isRestarting ? 0 : 1,
          }}
          onAnimationComplete={handleRestart}
          className="flex h-full flex-col items-center justify-center"
        >
          {/* Game */}
          <AnimatePresence mode="wait">
            {hasFinish ? (
              <EndGameScreen gameData={endGameData} />
            ) : (
              <motion.div exit={{ opacity: 0 }} key="gameboard">
                <WordsBar />
                <GameBoard />
                <motion.div
                  animate={{ opacity: hasStart ? 0 : 1 }}
                  className="flex justify-center"
                >
                  <DialogTriggerButton>
                    {config.language}
                    <Globe size={20} strokeWidth={1.5} />
                  </DialogTriggerButton>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
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
