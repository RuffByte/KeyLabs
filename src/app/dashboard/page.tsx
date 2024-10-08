import React from 'react';
import { redirect } from 'next/navigation';

import AccountPage from '@/components/common/ui/dashboard/AccountDetails/AccountPage';
import { getUser } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';

const Page = async () => {
  //can put this in a function later
  const userResponse = await getUser();
  if (!userResponse) {
    redirect('/login');
  }

  const fullUser = await prisma.user.findUnique({
    where: { email: userResponse.email },
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
    redirect('/login');
  }

  const userStats = await prisma.userStats.findMany({
    where: { userId: fullUser.id },
  });

  // have to do like 10 loops because i don't know how to use React Hooks :skull:
  return <AccountPage user={fullUser} userStats={userStats} />;
};

export default Page;
