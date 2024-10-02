import React, { useRef } from 'react';
import {
  animate,
  motion,
  motionValue,
  useIsomorphicLayoutEffect,
} from 'framer-motion';
import { CaseSensitive, Timer } from 'lucide-react';

import { useConfig, useCurrentGame, useScreen } from '@/app/client-page';
import { cn } from '@/lib/utils';

export const WordsBar = () => {
  const { screen } = useScreen();
  const { config } = useConfig();
  const { words, charIndex, wordIndex, hasStart } = useCurrentGame();

  const refTimer = useRef<HTMLParagraphElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (config.mode !== 'time' || !hasStart || !config.time) return;
    const timer = refTimer.current;
    if (!timer) return;

    const animation = animate(config.time, 0, {
      duration: config.time,
      ease: 'linear',
      onUpdate: (value) => {
        // console.log(value);
        console.log(value);
        timer.innerHTML = Math.ceil(value).toString();
      },
    });
    animation.play();
    return () => animation.stop();
  }, [config.time, hasStart]);

  return (
    <div
      className="flex justify-between relative items-center h-[60px] px-6 select-none"
      style={{ width: screen.width }}
    >
      <h3 className="text-2xl font-bold ">
        <p className="p-2 flex gap-2 items-center bg-foreground text-background rounded-md px-4 min-w-32">
          <CaseSensitive size={32} />
          <span>{config.lengthChar ? config.lengthChar : '---'}</span>
        </p>
      </h3>
      <div className="h-full overflow-hidden flex items-center whitespace-nowrap w-[800px] absolute left-1/2 -translate-x-1/2 border-secondary rounded-full border-2">
        <WordsView words={words} index={wordIndex} letterIndex={charIndex} />
      </div>
      <h3 className="text-2xl font-bold  ">
        <p className="p-2 flex gap-2 items-center bg-foreground text-background rounded-md px-4 min-w-32 justify-end">
          <span ref={refTimer}>{config.time ? config.time : '---'}</span>
          <Timer size={32} />
        </p>
      </h3>
    </div>
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
