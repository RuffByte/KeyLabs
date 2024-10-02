import React from 'react';

export const FunctionDebugger = ({ ...props }: any) => {
  return (
    <div className="bg-foreground flex-col flex gap-1 text-2xl text-background left-0 absolute z-[9999] p-2 ">
      {Object.keys(props).map((item) => {
        return (
          <button
            className="border p-4 border-accent"
            onClick={() => props[item]()}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};
