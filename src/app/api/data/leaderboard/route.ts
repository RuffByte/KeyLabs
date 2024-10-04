import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export const GET = async () => {
  try {
    const topScores = await prisma.gameEntry.findMany({
      orderBy: {
        wpm: 'desc',
      },
      take: 50,
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json(topScores)
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}
