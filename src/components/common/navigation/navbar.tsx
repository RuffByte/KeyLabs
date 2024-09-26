// components/NavBar.tsx
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Info, Keyboard, Settings, UserRoundPen } from 'lucide-react'

import UserDropdown from './usernav'

export const NavBar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleMouseEnter = () => {
    setDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    setDropdownOpen(false)
  }

  return (
    <div className="flex max-w-screen-desktop font-kollektif w-full p-4 h-full items-center justify-between">
      <Link href="/">
        <div className="flex gap-4 items-center">
          <Keyboard size={36} />
          <h1 className="text-3xl">KeyLabs</h1>
        </div>
      </Link>
      <div className="flex gap-10">
        <Info size={28} />
        <Settings size={28} />
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <UserRoundPen
            size={28}
            color={dropdownOpen ? '#EBDBC1' : 'currentColor'}
          />
          {/* Render the spacer only when the dropdown is open */}
          {dropdownOpen && <div className="absolute h-5 w-full top-6" />}
          <UserDropdown isOpen={dropdownOpen} />
        </div>
      </div>
    </div>
  )
}
