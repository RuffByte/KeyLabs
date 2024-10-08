import React from 'react';

const ModeStatBox = () => {
  return <div>Hello</div>;
};
export const ModeStats = () => {
  return (
    <div className="grid w-full grid-cols-2">
      <div className="grid grid-cols-3">
        <ModeStatBox />
        <ModeStatBox />
        <ModeStatBox />
      </div>
      <div className="grid grid-cols-3">
        <ModeStatBox />
        <ModeStatBox />
        <ModeStatBox />
      </div>
    </div>
  );
};
