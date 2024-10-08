import React, { createContext, useContext } from 'react';
import { UserStats } from '@prisma/client';

import { SafeUser } from '@/app/types/safeUser';

interface UserContextType {
  user: SafeUser | null;
  userStats: UserStats[] | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{
  user: SafeUser;
  userStats: UserStats[];
  children: React.ReactNode;
}> = ({ user, userStats, children }) => {
  return (
    <UserContext.Provider value={{ user, userStats }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
