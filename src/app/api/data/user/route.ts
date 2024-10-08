// src/app/api/data/user.ts
import { NextResponse } from 'next/server';

import { getUser } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  const fullUser = await prisma.user.findUnique({
    where: { name: name },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      picture: true,
      totalGames: true,
      totalTime: true,
      joinedAt: true,
    },
  });

  if (!fullUser) {
    return NextResponse.json(
      { error: 'Full user data not found' },
      { status: 404 }
    );
  }

  const userStats = await prisma.userStats.findMany({
    where: { userId: fullUser.id },
  });

  return NextResponse.json({ user: fullUser, stats: userStats });
}
