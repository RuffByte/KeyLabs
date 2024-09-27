import React from 'react'
import * as motion from 'framer-motion/client'
import { Info, Keyboard, Settings, User } from 'lucide-react'

import { TLink } from '../transition/TLink'

export const NavigationBar = () => {
  return (
    <div className="flex w-full items-center justify-between">
      <TLink href="/">
        <div className="flex gap-4 font-kollektif items-center p-2">
          <Keyboard size={28} />
          <h1 className="text-3xl">KeyLabs</h1>
        </div>
      </TLink>
      <div className="flex gap-4 p-2">
        <Info size={28} />
        <Settings size={28} />
        <User size={28} />
      </div>
    </div>
  )
}
