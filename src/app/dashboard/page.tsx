import React from 'react';
import { redirect } from 'next/navigation';

import AccountPage from '@/components/common/ui/dashboard/AccountDetails/AccountPage';
import { getUser } from '@/lib/lucia';

const page = async () => {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  return <AccountPage />;
};

export default page;
