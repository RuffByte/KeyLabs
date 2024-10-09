import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  // Fetch the user by name to get userId
  const user = await prisma.user.findUnique({
    where: { name },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Get the best scores for each category
  const bestScores = await prisma.userStats.findMany({
    where: { userId: user.id },
    include: {
      bestGameEntry: true,
    },
  });

  const bestScoresFormatted = bestScores.map((stat) => ({
    mode: stat.mode,
    category: stat.category,
    avgLpm: stat.avgLpm,
    avgAccuracy: stat.avgAccuracy,
    bestGame: stat.bestGameEntry
      ? {
          lpm: stat.bestGameEntry.lpm,
          rawLpm: stat.bestGameEntry.rawLpm,
          accuracy: stat.bestGameEntry.accuracy,
          createdAt: stat.bestGameEntry.createdAt,
          language: stat.bestGameEntry.language,
          totalChar: stat.bestGameEntry.totalChar,
          totalClicks: stat.bestGameEntry.totalClicks,
        }
      : null,
  }));

  return NextResponse.json(bestScoresFormatted);
}
