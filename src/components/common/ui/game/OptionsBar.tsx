import React from 'react';

export const OptionsBar = () => {
  return (
    <div className="absolute flex bottom-0 items-end left-[50%] -translate-x-[50%] h-[100px]">
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M36.25 38.75C48.0498 27.8596 50 0 50 0V50H0C0 50 25.3575 48.803 36.25 38.75Z"
          fill="#141311"
        />
      </svg>

      <div className="w-[1000px] bg-black  rounded-t-[50px] h-full" />
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.75 38.75C1.95019 27.8596 0 0 0 0V50H50C50 50 24.6425 48.803 13.75 38.75Z"
          fill="#141311"
        />
      </svg>
    </div>
  );
};
