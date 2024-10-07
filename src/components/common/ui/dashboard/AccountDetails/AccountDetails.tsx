import React from 'react';

import { AvatarAndName } from './AvatarAndName';
import { TestStats } from './TestStats';

export const AccountDetails = () => {
  return (
    <div className="flex w-full flex-col rounded-lg border border-secondary/70 p-4 md:flex-row">
      <AvatarAndName />
      <TestStats />
    </div>
  );
};
