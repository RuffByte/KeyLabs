'use client';

import React, { MouseEvent, useRef, useState } from 'react';

import {
  Point,
  useCurrentGame,
  usePointsStack,
  useScreen,
} from '@/app/client-page';
import { generatePoint } from '@/services/points/generate-point';
// import { useScreenSize } from '@/app/page'
import { StartButton } from './StartButton';

const GameBoard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // const { width, height } = useScreenSize()
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top } = containerRef.current.getBoundingClientRect();
    const [clickX, clickY] = [clientX - left, clientY - top];

    console.log(clickX, clickY);
  };

  const { points } = usePointsStack();
  const { screen } = useScreen();
  const { targetSize } = useCurrentGame();

  return (
    <div
      className="relative border-secondary"
      style={{ width: screen.width, height: screen.height }}
    >
      {points.map((point) => (
        <div
          key={point.index}
          className="absolute bg-foreground z-50 [translate:-50%_-50%] text-background rounded-full grid place-items-center  select-none font-bold text-3xl"
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
      <StartButton />
    </div>
  );
};

export default GameBoard;
