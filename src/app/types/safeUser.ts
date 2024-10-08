import type { User } from '@prisma/client';

//it's literally just the full user table but without the password because im scared lol
export type SafeUser = Omit<User, 'hashedPassword'>;
