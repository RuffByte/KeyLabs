import React from 'react';

import { AvatarAndName } from './AvatarAndName';
import { TestStats } from './TestStats';

export const AccountDetails = () => {
  return (
    <div className="bg-tertiary w-full rounded-lg flex p-4 flex-col md:flex-row">
      <AvatarAndName />
      <TestStats />
    </div>
  );
};
