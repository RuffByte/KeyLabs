import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const mode = url.searchParams.get('mode');
    const subMode = url.searchParams.get('subMode');

    let whereClause = {};

    if (mode === 'time') {
      whereClause = { totalTime: Number(subMode) };
    } else if (mode === 'characters') {
      whereClause = { totalChar: Number(subMode) };
    }

    const topScores = await prisma.gameEntry.findMany({
      where: whereClause,
      distinct: ['userId'],
      orderBy: {
        lpm: 'desc',
      },
      take: 50,
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(topScores);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
};
