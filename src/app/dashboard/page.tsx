import React from 'react';
import { redirect } from 'next/navigation';

import SignOutButton from '@/components/authentication/SignOutButton';
import { AccountDetails } from '@/components/common/ui/dashboard/AccountDetails/AccountDetails';
import { NavigationBar } from '@/components/common/ui/navigation/navbar';
import { getUser } from '@/lib/lucia';

const page = async () => {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex h-full justify-center items-center flex-col">
      <NavigationBar />
      <AccountDetails />
      <div className="text-white">you are logged in as {user.name}</div>
      <SignOutButton>Sign Out</SignOutButton>
    </div>
  );
};

export default page;
