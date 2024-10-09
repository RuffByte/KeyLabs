import React from 'react';

export const ExperienceBar = () => {
  return (
    <div className="flex w-full items-center gap-2 text-foreground">
      <div>38</div>
      <div className="h-[6px] w-full rounded-md bg-secondary"></div>
      <div>60/100</div>
    </div>
  );
};
