'use server';

import { prisma } from '@/lib/prisma';
import { GameData } from './types/gameData';

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

  // Create game entry
  const gameEntry = await prisma.gameEntry.create({
    data: {
      userId: user.id,
      mode: gameData.mode,
      language: gameData.language,
      totalChar: gameData.totalHit, //total char is buggy ig swapped to total hit
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

  // Update user's total games and total time
  await prisma.user.update({
    where: { id: user.id },
    data: {
      totalGames: { increment: 1 },
      totalTime: { increment: gameData.totalTime },
    },
  });

  // Determine the category (time or characters)
  const category =
    gameData.mode === 'time' ? `${gameData.totalTime}` : `${gameData.totalHit}`;

  // Get current user stats
  const currentStats = await prisma.userStats.findUnique({
    where: {
      userId_mode_category: {
        userId: user.id,
        mode: gameData.mode,
        category: category,
      },
    },
    include: {
      bestGameEntry: true, // Fetch the current best game entry
    },
  });

  // Calculate new average LPM and accuracy
  const newTotalGames = (currentStats?.totalGames || 0) + 1;
  const newTotalLpm =
    (currentStats?.avgLpm || 0) * (currentStats?.totalGames || 0) +
    gameData.lpm;
  const newTotalAccuracy =
    (currentStats?.avgAccuracy || 0) * (currentStats?.totalGames || 0) +
    gameData.accuracy;

  const newAvgLpm = newTotalLpm / newTotalGames;
  const newAvgAccuracy = newTotalAccuracy / newTotalGames;

  // Check if the current game entry is the best (highest lpm)
  const isBestEntry =
    !currentStats?.bestGameEntry ||
    gameData.lpm > currentStats.bestGameEntry.lpm;

  // Upsert (create or update) user stats
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
      // Update best game entry if this one is better
      bestGameEntryId: isBestEntry
        ? gameEntry.id
        : currentStats.bestGameEntryId,
    },
    create: {
      userId: user.id,
      mode: gameData.mode,
      category: category,
      avgLpm: gameData.lpm,
      avgAccuracy: gameData.accuracy,
      totalGames: 1,
      totalTime: gameData.totalTime,
      bestGameEntryId: gameEntry.id, // Set the current game entry as the best one initially
    },
  });

  console.log('Score submitted successfully.');
}
