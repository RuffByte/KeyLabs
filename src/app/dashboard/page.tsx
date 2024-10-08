import React from 'react';
import { redirect } from 'next/navigation';

import AccountPage from '@/components/common/ui/dashboard/AccountDetails/AccountPage';
import { getUser } from '@/lib/lucia';

const Page = async () => {
  //check for login its called userCheck cause user got taken below so sad
  const userCheck = await getUser();
  if (!userCheck) {
    redirect('/login');
  }
  //api route is like this so we can have public api route i guess for querying later. (maybe idk)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/data/user?name=${userCheck.name}`
  );

  const { user, stats } = await response.json();

  return <AccountPage user={user} userStats={stats} />;
};

export default Page;
