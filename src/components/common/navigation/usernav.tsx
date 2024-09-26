// components/UserDropdown.tsx

import React from 'react'

interface UserDropdownProps {
  isOpen: boolean
}

const UserDropdown: React.FC<UserDropdownProps> = ({ isOpen }) => {
  if (!isOpen) return null

  return (
    <div className="absolute right-0 mt-3 w-48 bg-white border rounded shadow-lg z-10">
      <ul className="py-1">
        <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
          User Account
        </li>
        <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
          User Settings
        </li>
        <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Sign Out</li>
      </ul>
    </div>
  )
}

export default UserDropdown
