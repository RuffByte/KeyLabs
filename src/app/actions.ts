'use server';

import { prisma } from '@/lib/prisma'; // Or Supabase if you're using Supabase

export async function submitGameData(gameData: {
  mode: string;
  language: string;
  totalTime: number;
  totalChar: number;
  totalClick: number;
  totalHit: number;
  userName: string;
  wpm: number;
  accuracy: number;
}) {
  await prisma.gameEntry.create({
    data: {
      mode: gameData.mode,
      language: gameData.language,
      wpm: gameData.wpm,
      charsTyped: gameData.totalChar,
      clicks: gameData.totalClick,
      accuracy: gameData.accuracy,
      gameDuration: gameData.totalTime,
      user: {
        connect: { name: gameData.userName },
      },
    },
  });
  console.log('score is allg');
}
