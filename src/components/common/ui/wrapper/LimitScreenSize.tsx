'use client';

import React, { useLayoutEffect, useState } from 'react';
import { useMediaQuery } from '@uidotdev/usehooks';
import { Frown } from 'lucide-react';

import { devConfig } from '@/devconfig';

const ClientLimitScreenSize = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useMediaQuery(
    'only screen and (min-width : 1280px) and (min-height : 800px)'
  );

  if (!isDesktop) {
    return (
      <div className="h-dvh w-dvw flex justify-center flex-col items-center text-center">
        <p>Your screen size is currently not supported.</p>
        <p className="bg-foreground text-background rounded p-1 px-4 font-bold">
          min width 1280px, min height: 800px
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
