import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const mode = url.searchParams.get('mode');
    const subMode = url.searchParams.get('subMode');

    // Check if mode or subMode is missing
    if (!mode || !subMode) {
      return NextResponse.json(
        {
          error: 'Missing required query parameters: mode or subMode',
          message:
            'Please provide both the "mode" (either "time" or "characters") and the appropriate "subMode".',
          example: {
            timeModeExample: '/api/leaderboard?mode=time&subMode=15',
            charactersModeExample:
              '/api/leaderboard?mode=characters&subMode=50',
          },
        },
        { status: 400 }
      );
    }

    let whereClause = { mode: mode, category: subMode };
    const userStats = await prisma.userStats.findMany({
      where: whereClause,
      orderBy: {
        bestGameEntry: {
          lpm: 'desc',
        },
      },
      take: 50,
      include: {
        user: {
          select: {
            name: true,
          },
        },
        bestGameEntry: true,
      },
    });
    //somehow i have entries with no best game entry idk how it's possible but will wait for score purge.
    const gameEntries = userStats
      .filter((stats) => stats.bestGameEntry !== null)
      .map((stats) => ({
        ...stats.bestGameEntry,
        user: {
          name: stats.user.name,
        },
      }));

    return NextResponse.json(gameEntries);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
};
