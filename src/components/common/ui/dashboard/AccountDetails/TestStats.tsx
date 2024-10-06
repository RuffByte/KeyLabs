import React from 'react';

export const TestStats = () => {
  return (
    //"responsive design hahaha"
    <div className="flex w-3/4 flex-col items-center gap-2 p-4 text-foreground sm:flex-row md:flex-col lg:flex-row">
      <div className="flex w-full flex-col">
        <p>tests started</p>
        <p className="text-2xl">432</p>
      </div>
      <div className="flex w-full flex-col">
        <p>tests completed</p>
        <p className="text-2xl">432</p>
      </div>
    </div>
  );
};
