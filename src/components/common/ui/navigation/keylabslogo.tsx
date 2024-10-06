import React from 'react';
import { Keyboard } from 'lucide-react';

import KeyLabsLogo from '../../KeyLabsLogo';
import TLink from '../transition/TLink';

export const Keylabslogo = () => {
  return (
    <TLink href="/">
      <div className="flex items-center gap-4 p-2 font-kollektif">
        <KeyLabsLogo className="size-8 stroke-black" />
        <h1 className="select-none text-3xl">KeyLabs</h1>
      </div>
    </TLink>
  );
};
