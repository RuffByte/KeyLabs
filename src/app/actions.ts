'use server';

import { prisma } from '@/lib/prisma';
import { GameData } from './types/gameData';

//need to uml this better because i am not

export async function submitGameData(gameData: GameData) {
  await prisma.gameEntry.create({
    data: {
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
      user: {
        connect: { name: gameData.userName },
      },
      targetSize: gameData.targetSize,
    },
  });
  console.log('score is allg');
}
