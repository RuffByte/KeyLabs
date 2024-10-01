'use client';

import React, { MouseEvent, useRef } from 'react';

import { useCurrentGame, usePointsStack, useScreen } from '@/app/client-page';
import { distance } from '@/services/utils';
import { StartButton } from './StartButton';

const GameBoard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // const { width, height } = useScreenSize()

  const { points, hitPoints } = usePointsStack();
  const { screen } = useScreen();
  const { targetSize, hasStart, incrementCharIndex, handleNextWord } =
    useCurrentGame();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top } = containerRef.current.getBoundingClientRect();
    const [clickX, clickY] = [clientX - left, clientY - top];

    for (const point of points) {
      if (distance(clickX, clickY, point.x, point.y) > targetSize / 2) continue;
      if (point.value !== points[points.length - 1].value) continue;
      incrementCharIndex();
      if (points.length <= 1) handleNextWord();
      hitPoints(point.index);
      break;
    }
  };

  return (
    <div
      className="relative border-secondary"
      style={{ width: screen.width, height: screen.height }}
    >
      {points.map((point) => (
        <div
          key={point.index}
          className="absolute bg-foreground z-50 [translate:-50%_-50%] text-background rounded-full grid place-items-center pointer-events-none select-none text-4xl"
          style={{
            left: point.x,
            top: point.y,
            width: targetSize,
            height: targetSize,
          }}
        >
          {point.value}
        </div>
      ))}
      <div
        onMouseDown={handleClick}
        ref={containerRef}
        className="grid-80 bg-secondary size-full"
      />
      {!hasStart && <StartButton />}
    </div>
  );
};

export default GameBoard;
