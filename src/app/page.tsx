import React from 'react';

import { LimitScreenSize } from '@/components/common/ui/wrapper/LimitScreenSize';
import ClientGamePage from './client-page';

export default function Home() {
  return (
    <LimitScreenSize>
      <ClientGamePage />
    </LimitScreenSize>
  );
}
