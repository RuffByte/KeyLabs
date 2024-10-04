import React from 'react';

export const TestStats = () => {
  return (
    //"responsive design hahaha"
    <div className="flex items-center w-3/4 gap-2 text-foreground p-4 flex-col sm:flex-row md:flex-col lg:flex-row ">
      <div className="flex flex-col w-full">
        <p>tests started</p>
        <p className="text-2xl">432</p>
      </div>
      <div className="flex flex-col w-full">
        <p>tests completed</p>
        <p className="text-2xl">432</p>
      </div>
    </div>
  );
};
