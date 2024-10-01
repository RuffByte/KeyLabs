import React from 'react';
import { CaseSensitive, Timer } from 'lucide-react';

import { useConfig, useCurrentGame, useScreen } from '@/app/client-page';

export const WordsBar = () => {
  const { screen } = useScreen();
  const { config } = useConfig();
  const { words } = useCurrentGame();

  return (
    <div
      className="flex justify-between relative items-center h-[60px] px-6 select-none"
      style={{ width: screen.width }}
    >
      <h3 className="text-2xl font-bold ">
        <p className="p-2 flex gap-2 items-center bg-foreground text-background rounded-md px-4 min-w-32">
          <CaseSensitive size={32} />
          {config.lengthChar ? config.lengthChar : '---'}
        </p>
      </h3>
      <div className="h-full overflow-hidden flex items-center whitespace-nowrap w-[800px] absolute left-1/2 -translate-x-1/2 border-secondary rounded-full border-2">
        <div className="text-3xl left-1/2 absolute flex whitespace-pre ">
          <WordsView words={words} index={0} />
        </div>
      </div>
      <h3 className="text-2xl font-bold  ">
        <p className="p-2 flex gap-2 items-center bg-foreground text-background rounded-md px-4 min-w-32 justify-end">
          {config.time ? config.time : '---'}
          <Timer size={32} />
        </p>
      </h3>
    </div>
  );
};

type WordViewProps = { words: string[]; index: number };

const WordsView = ({ words, index }: WordViewProps) => {
  const offsetArr = [];

  // const [currentOffset, setCurrentOffset] = React.useState(0);

  const handleSetOffset = (offset: number) => {
    // setCurrentOffset(offset);
  };

  let currentWord: string[] = [];
  if (words.length < 10) {
    currentWord = words;
  } else {
    currentWord = words.slice(index, index + 10 + index);
  }

  return currentWord.map((word, i) => {
    const ref = React.useRef<HTMLParagraphElement>(null);
    if (ref.current) {
      const { offsetWidth, offsetLeft } = ref.current;
      handleSetOffset(offsetLeft + offsetWidth / 2);
    }
    return (
      <p ref={ref} key={i}>
        {word}{' '}
      </p>
    );
  });
};

export default WordsBar;
