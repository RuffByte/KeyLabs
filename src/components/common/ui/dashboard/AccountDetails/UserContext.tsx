import React, { createContext, useContext } from 'react';
import { UserStats } from '@prisma/client';

import { SafeUser } from '@/app/types/safeUser';

// Define the structure for BestGame and BestScore
interface BestGame {
  lpm: number;
  rawLpm: number;
  accuracy: number;
  createdAt: string;
  language: string;
  totalChar: number;
  totalClicks: number;
}

interface BestScore {
  mode: string;
  category: string;
  avgLpm: number;
  avgAccuracy: number;
  bestGame: BestGame | null;
}

interface UserContextType {
  user: SafeUser | null;
  userStats: UserStats[] | null;
  bestScores: BestScore[] | null;
}

// Create a context with the updated structure
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider now takes user, userStats, and bestScores as props
export const UserProvider: React.FC<{
  user: SafeUser;
  userStats: UserStats[];
  bestScores: BestScore[]; // Add bestScores to the provider
  children: React.ReactNode;
}> = ({ user, userStats, bestScores, children }) => {
  return (
    <UserContext.Provider value={{ user, userStats, bestScores }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the context in components
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
