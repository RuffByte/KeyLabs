import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserStats } from '@prisma/client';

import { User } from '@/app/types/user';
import { getUser } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';

interface UserContextType {
  user: User | null;
  userStats: UserStats[] | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userStats, setUserStats] = useState<UserStats[] | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userResponse = await getUser();
      setUser(userResponse);

      if (userResponse) {
        const userIdResponse = await prisma.user.findUnique({
          where: {
            name: userResponse.name,
          },
          select: {
            id: true,
          },
        });

        if (userIdResponse) {
          // Now fetch user stats using the fetched userId
          const statsResponse = await prisma.userStats.findMany({
            where: { userId: userIdResponse.id },
          });

          setUserStats(statsResponse); // Directly set the array of UserStats
        }
      }
    };

    fetchUserData();
  }, []);

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
