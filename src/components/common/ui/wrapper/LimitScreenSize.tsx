'use client';

import React, { useLayoutEffect, useState } from 'react';
import { useMediaQuery } from '@uidotdev/usehooks';
import { Frown } from 'lucide-react';

import { devConfig } from '@/devconfig';

const [W_MIN, H_MIN] = [1280, 800];

const ClientLimitScreenSize = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useMediaQuery(
    `only screen and (min-width : ${W_MIN}px) and (min-height : ${H_MIN}px)`
  );

  if (!isDesktop) {
    return (
      <div className="fixed left-0 flex h-dvh w-dvw flex-col items-center justify-center text-center text-foreground">
        <p>Your screen size is currently not supported.</p>
        <p className="rounded bg-foreground p-1 px-4 font-bold text-background">
          min width {W_MIN}px, min height: {H_MIN}px
        </p>
        <Frown size={48} className="my-4" />
        <p>zoom out</p>
        <p>or</p>
        <p>Check again in the future for support on this screen size</p>
        <p>Version: {devConfig.VERSION}</p>
      </div>
    );
  }

  return <>{children}</>;
};

export const LimitScreenSize = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isClient, setIsClient] = useState(false);

  useLayoutEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <ClientLimitScreenSize>{children}</ClientLimitScreenSize>;
};
