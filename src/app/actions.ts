'use server';

import { prisma } from '@/lib/prisma';
import { GameData } from './types/gameData';

//need to uml this better because i am not

export async function submitGameData(gameData: GameData) {
  await prisma.gameEntry.create({
    data: {
      mode: gameData.mode,
      language: gameData.language,
      wpm: gameData.wpm,
      totalChar: gameData.totalChar,
      totalClicks: gameData.totalClick,
      totalTime: gameData.totalTime,
      accuracy: gameData.accuracy,
      rawWpm: gameData.rawWpm,
      user: {
        connect: { name: gameData.userName },
      },
    },
  });
  console.log('score is allg');
}
