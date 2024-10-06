'use server';

import { prisma } from '@/lib/prisma';
import { GameData } from './types/gameData';

export async function submitGameData(gameData: GameData) {
  // First, find the user's id based on the userName
  const user = await prisma.user.findUnique({
    where: {
      name: gameData.userName,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    throw new Error(`User with username ${gameData.userName} not found`);
  }

  // Create the game entry using the user's id
  await prisma.gameEntry.create({
    data: {
      userId: user.id, // Use userId now
      mode: gameData.mode,
      language: gameData.language,
      totalChar: gameData.totalChar,
      totalClicks: gameData.totalClick,
      totalTime: gameData.totalTime,
      accuracy: gameData.accuracy,
      wpm: gameData.wpm,
      rawWpm: gameData.rawWpm,
      lpm: gameData.lpm,
      rawLpm: gameData.rawLpm,
      targetSize: gameData.targetSize,
    },
  });

  console.log('Score submitted successfully.');
}
