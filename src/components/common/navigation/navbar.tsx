import React from 'react'
import { Keyboard, Settings, UserRoundPen } from 'lucide-react'

export const NavBar = () => {
  return (
    <div className="flex max-w-screen-desktop font-kollektif w-full p-4 m-auto h-full items-center justify-between">
      <div className="flex gap-4 items-center">
        <Keyboard size={36} />
        <h1>KeyLabs</h1>
      </div>
      <div className="flex gap-4">
        <Settings size={28} />
        <UserRoundPen size={28} />
      </div>
    </div>
  )
}
