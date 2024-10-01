import React from 'react';
import { Keyboard } from 'lucide-react';

import KeyLabsIcon from '../../KeyLabsLogo';
import TLink from '../transition/TLink';

export const Keylabslogo = () => {
  return (
    <TLink href="/">
      <div className="flex gap-4 font-kollektif items-center p-2">
        <KeyLabsIcon className="stroke-black size-8" />
        <h1 className="text-3xl select-none">KeyLabs</h1>
      </div>
    </TLink>
  );
};
