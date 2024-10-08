import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserStats } from '@prisma/client';

// Adjust import to match your app structure
import { getUser } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';

type SafeUser = Omit<User, 'hashedPassword'>;

interface UserContextType {
  user: SafeUser | null;
  userStats: UserStats[] | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [userStats, setUserStats] = useState<UserStats[] | null>(null);

  //some like go through 10 rings typa beat to get the full user table
  useEffect(() => {
    const fetchUserData = async () => {
      const userResponse = await getUser();
      if (userResponse) {
        const fullUser = await prisma.user.findUnique({
          where: {
            email: userResponse.email,
          },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            picture: true,
            totalGames: true,
            totalTime: true,
            joinedAt: true,
            userStats: true,
            //reason why im selecting so much is to not include password (idk maybe it's bad to query it so i got rid of it)
          },
        });

        if (fullUser) {
          setUser(fullUser);

          const statsResponse = await prisma.userStats.findMany({
            where: { userId: fullUser.id },
          });
          setUserStats(statsResponse);
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

//react magic im still learning - anton
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
