import React, { useRef, useState } from 'react';
import {
  animate,
  cancelFrame,
  motion,
  useIsomorphicLayoutEffect,
} from 'framer-motion';
import { CaseSensitive, Timer } from 'lucide-react';

import {
  GameDataProps,
  PreGameConfig,
  useGameContext,
  usePreConfig,
  useScreen,
} from '@/app/client-page';
import { cn } from '@/lib/utils';
import { GameTimer } from './Timer';

export const WordsBar = () => {
  const { screen } = useScreen();
  const { config } = usePreConfig();
  const { Gamedata } = useGameContext();
  const refTimer = useRef<HTMLSpanElement>(null); // Ref for the timer
  const [elapsedTime, setElapsedTime] = useState(0);

  useIsomorphicLayoutEffect(() => {
    if (Gamedata.mode !== 'characters') return;
    if (Gamedata.charCount >= Gamedata.totalChar) {
      Gamedata.setTime(elapsedTime);
      Gamedata.finishGame();
    }
  }, [Gamedata.charCount]);

  //timer loic
  useIsomorphicLayoutEffect(() => {
    if (!Gamedata.hasStart) return;

    const startTime = new Date();
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const elapsedMilliseconds = currentTime.getTime() - startTime.getTime();
      const elapsedSeconds = (elapsedMilliseconds / 1000).toFixed(2); // Store with two decimal places

      if (config.mode === 'time') {
        const remainingTime = (
          config.time - parseFloat(elapsedSeconds)
        ).toFixed(2);
        if (parseFloat(remainingTime) <= 0) {
          clearInterval(intervalId);
          Gamedata.handleFinish();
        }

        setElapsedTime(parseFloat(remainingTime)); // Store as 2 decimal places
        if (refTimer.current) {
          // Display only the whole number part
          refTimer.current.innerHTML = `${Math.floor(parseFloat(remainingTime))}s`;
        }
      } else if (config.mode === 'characters') {
        setElapsedTime(parseFloat(elapsedSeconds)); // Store as 2 decimal places
        if (refTimer.current) {
          refTimer.current.innerHTML = `${Math.floor(parseFloat(elapsedSeconds))}s`;
        }
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [config.mode, config.time, Gamedata.hasStart]);

  return (
    <div
      className="relative flex h-[60px] select-none items-center justify-between px-6"
      style={{ width: screen.width }}
    >
      <DisplayWrapper>
        <CharacterDisplay config={config} Gamedata={Gamedata} />
      </DisplayWrapper>
      <div className="absolute left-1/2 flex h-full w-[600px] -translate-x-1/2 items-center overflow-hidden whitespace-nowrap rounded-full border-2 border-secondary">
        <WordsView
          words={Gamedata.words}
          index={Gamedata.wordIndex}
          letterIndex={Gamedata.charIndex}
        />
      </div>
      <GameTimer ref={refTimer} />
    </div>
  );
};

const CharacterDisplay = ({
  config,
  Gamedata,
}: {
  config: PreGameConfig['config'];
  Gamedata: GameDataProps;
}) => {
  if (!Gamedata.hasStart) {
    return (
      <>
        <CaseSensitive size={32} />
        {config.mode === 'characters' && `0/${config.lengthChar}`}
        {config.mode === 'time' && config.lengthChar}
      </>
    );
  } else {
    return (
      <>
        <CaseSensitive size={32} />
        {Gamedata.mode === 'characters' &&
          `${Gamedata.charCount}/${Gamedata.totalChar}`}
        {Gamedata.mode === 'time' && Gamedata.charCount}
      </>
    );
  }
};

const DisplayWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <h3 className="text-2xl">
      <p className="flex min-w-32 items-center gap-2 rounded-md bg-foreground p-2 px-4 text-background">
        {children}
      </p>
    </h3>
  );
};

type WordViewProps = { words: string[]; index: number; letterIndex: number };

const WordsView = ({ words, index, letterIndex }: WordViewProps) => {
  const [currentOffset, setCurrentOffset] = React.useState(0);

  const refs = React.useRef<(HTMLParagraphElement | null)[]>([]);

  const handleSetOffset = (offset: number) => {
    setCurrentOffset(offset);
  };

  let currentWords: string[] = [];
  if (words.length < 10) {
    currentWords = words;
  } else {
    currentWords = words.slice(0, index + 15);
  }

  React.useEffect(() => {
    const ref = refs.current[index];
    if (ref) {
      const { offsetWidth, offsetLeft } = ref;
      console.log(offsetWidth, offsetLeft);
      handleSetOffset(offsetLeft + offsetWidth / 2);
    } else {
      console.log('no ref');
    }
  }, [currentWords, index]);

  return (
    <motion.div
      className="absolute left-1/2 flex gap-2 whitespace-pre text-3xl text-input"
      animate={{ x: -currentOffset }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {currentWords.map((word, i) => (
        <p
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
        >
          {index === i ? (
            word.split('').map((letter, j) => (
              <span
                key={`${i}-${j}`}
                className={cn(letterIndex > j && 'text-foreground')}
              >
                {letter}
              </span>
            ))
          ) : (
            <span className={cn(index > i && 'text-foreground')}>{word}</span>
          )}
        </p>
      ))}
    </motion.div>
  );
};

export default WordsView;
