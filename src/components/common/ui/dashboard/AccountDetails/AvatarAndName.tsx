import React from 'react';
import { UserRoundPen } from 'lucide-react';

import { ExperienceBar } from './ExperienceBar';

export const AvatarAndName = () => {
  return (
    <div className="flex flex-col w-full md:w-1/4">
      <div className="flex w-full">
        <UserRoundPen size={81} className="flex-shrink-0" />
        <div className="flex flex-col h-full justify-center p-4 w-full">
          <h1 className="text-3xl">AntGa</h1>
          <p>Joined 18 Feb 2022</p>
        </div>
      </div>
      <ExperienceBar />
    </div>
  );
};
