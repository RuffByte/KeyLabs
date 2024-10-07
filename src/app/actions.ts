'use server';

import { prisma } from '@/lib/prisma';
import { GameData } from './types/gameData';

//maybe i shouldn't have everything in one action - anton
export async function submitGameData(gameData: GameData) {
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

  // create game entry
  await prisma.gameEntry.create({
    data: {
      userId: user.id,
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
  console.log(gameData.totalTime);
  // update user total games
  await prisma.user.update({
    where: { id: user.id },
    data: {
      totalGames: { increment: 1 },
      totalTime: { increment: gameData.totalTime },
    },
  });

  // get gamemode
  const category =
    gameData.mode === 'time'
      ? `${gameData.totalTime}s`
      : `${gameData.totalChar}c`;

  //get cur stats to update
  const currentStats = await prisma.userStats.findUnique({
    where: {
      userId_mode_category: {
        userId: user.id,
        mode: gameData.mode,
        category: category,
      },
    },
  });

  //calculate new avg acc and lpm
  const newTotalGames = (currentStats?.totalGames || 0) + 1;
  const newTotalLpm =
    (currentStats?.avgLpm || 0) * (currentStats?.totalGames || 0) +
    gameData.lpm;
  const newTotalAccuracy =
    (currentStats?.avgAccuracy || 0) * (currentStats?.totalGames || 0) +
    gameData.accuracy;

  const newAvgLpm = newTotalLpm / newTotalGames;
  const newAvgAccuracy = newTotalAccuracy / newTotalGames;

  await prisma.userStats.upsert({
    where: {
      userId_mode_category: {
        userId: user.id,
        mode: gameData.mode,
        category: category,
      },
    },
    update: {
      avgLpm: newAvgLpm,
      avgAccuracy: newAvgAccuracy,
      totalGames: { increment: 1 },
      totalTime: { increment: gameData.totalTime },
    },
    create: {
      userId: user.id,
      mode: gameData.mode,
      category: category,
      avgLpm: gameData.lpm,
      avgAccuracy: gameData.accuracy,
      totalGames: 1,
      totalTime: gameData.totalTime,
    },
  });

  console.log('Score submitted successfully.');
}
