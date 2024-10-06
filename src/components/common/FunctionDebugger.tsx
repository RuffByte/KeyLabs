import React from 'react';

export const FunctionDebugger = ({ ...props }: any) => {
  return (
    <div className="absolute left-0 z-[9999] flex flex-col gap-1 bg-foreground p-2 text-2xl text-background">
      {Object.keys(props).map((item, i) => {
        return (
          <button
            key={i}
            className="border-accent border p-4"
            onClick={() => props[item]()}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};
