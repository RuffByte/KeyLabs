import type { Session, User } from '@prisma/client';

export function generateSessionToken(): string {
  // TODO
}

export async function createSession(
  token: string,
  userId: number
): Promise<Session> {
  // TODO
}

export async function validateSessionToken(
  token: string
): Promise<SessionValidationResult> {
  // TODO
}

export async function invalidateSession(sessionId: string): Promise<void> {
  // TODO
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
