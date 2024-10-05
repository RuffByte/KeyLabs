// components/UserDropdown.tsx

import React from 'react';

interface UserDropdownProps {
  isOpen: boolean;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 z-10 mt-3 w-48 rounded border bg-white shadow-lg">
      <ul className="py-1">
        <li className="cursor-pointer px-4 py-2 hover:bg-gray-200">
          User Account
        </li>
        <li className="cursor-pointer px-4 py-2 hover:bg-gray-200">
          User Settings
        </li>
        <li className="cursor-pointer px-4 py-2 hover:bg-gray-200">Sign Out</li>
      </ul>
    </div>
  );
};

export default UserDropdown;
