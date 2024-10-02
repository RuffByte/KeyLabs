import React, { useRef, useState } from 'react';
import { animate, motion, useIsomorphicLayoutEffect } from 'framer-motion';
import { CaseSensitive, Timer } from 'lucide-react';

import {
  GameDataProps,
  PreGameConfig,
  useGameContext,
  usePreConfig,
  useScreen,
} from '@/app/client-page';
import { cn } from '@/lib/utils';

export const WordsBar = () => {
  const { screen } = useScreen();
  const { config } = usePreConfig();
  const { Gamedata } = useGameContext();
  const refTimer = useRef<HTMLParagraphElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (config.mode !== 'time' || !Gamedata.hasStart || !Gamedata.totalTime)
      return;
    const timer = refTimer.current;
    if (!timer) return;

    const animation = animate(Gamedata.totalTime, 0, {
      duration: Gamedata.totalTime,
      ease: 'linear',
      onUpdate: (value) => {
        // console.log(value);
        timer.innerHTML = Math.ceil(value).toString();
      },
      onComplete: () => {
        console.log(Gamedata);
        console.log(config);
        Gamedata.handleFinish();
      },
    });
    animation.play();
    return () => {
      animation.stop();
    };
  }, [Gamedata.totalTime, Gamedata.hasStart]);

  useIsomorphicLayoutEffect(() => {
    if (Gamedata.mode !== 'characters') return;
    if (Gamedata.charCount >= Gamedata.totalChar) {
      Gamedata.finishGame();
    }
  }, [Gamedata.charCount]);
  return (
    <div
      className="flex justify-between relative items-center h-[60px] px-6 select-none"
      style={{ width: screen.width }}
    >
      <DisplayWrapper>
        <CharacterDisplay config={config} Gamedata={Gamedata} />
      </DisplayWrapper>
      <div className="h-full overflow-hidden flex items-center whitespace-nowrap w-[600px] absolute left-1/2 -translate-x-1/2 border-secondary rounded-full border-2">
        <WordsView
          words={Gamedata.words}
          index={Gamedata.wordIndex}
          letterIndex={Gamedata.charIndex}
        />
      </div>
      <h3 className="text-2xl  ">
        <p className="p-2 flex gap-2 items-center bg-foreground text-background rounded-md px-4 min-w-32 justify-end">
          {Gamedata.hasStart ? (
            <span ref={refTimer}>
              {Gamedata.totalTime ? `${config.time}s` : '0s'}
            </span>
          ) : (
            <span>{config.time ? `${config.time}s` : '0s'}</span>
          )}
          <Timer size={32} />
        </p>
      </h3>
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
    <h3 className="text-2xl ">
      <p className="p-2 flex gap-2 items-center bg-foreground text-background rounded-md px-4 min-w-32">
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
      className="text-3xl left-1/2 absolute gap-2 flex whitespace-pre text-input"
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
