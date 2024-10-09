import { cookies } from 'next/headers';

export function setSessionTokenCookie(token: string, expiresAt: Date): void {
  cookies().set('session', token, {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
  });
}

export function deleteSessionTokenCookie(): void {
  cookies().set('session', '', {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
  });
}
