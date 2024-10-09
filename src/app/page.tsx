import React from 'react';

import { LimitScreenSize } from '@/components/common/ui/wrapper/LimitScreenSize';
import { getUser } from '@/lib/antAuth/sessions';
import ClientGamePage from './client-page';

//get user on load (idk a better way sry ruining ur archetecture)
const Home = async () => {
  const user = await getUser();

  return (
    <LimitScreenSize>
      <ClientGamePage user={user} />
    </LimitScreenSize>
  );
};

export default Home;
