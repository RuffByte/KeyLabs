'use server'

import { cookies } from 'next/headers' // Ensure you import the right cookies method

import { lucia } from '@/lib/lucia' // Adjust based on your Lucia setup
import { prisma } from '@/lib/prisma' // Adjust based on your Prisma setup

export const uploadGameEntry = async (gameData: any) => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null
  if (!sessionId) {
    throw new Error('User not authenticated')
  }

  const { session, user } = await lucia.validateSession(sessionId)
  if (!session || !user) {
    throw new Error('User not authenticated')
  }

  try {
    await prisma.gameEntry.create({
      data: {
        userId: user.id,
        mode: gameData.mode,
        language: gameData.language,
        wpm: gameData.wpm,
        charsTyped: gameData.charsTyped,
        clicks: gameData.clicks,
        accuracy: gameData.accuracy,
        gameDuration: gameData.gameDuration,
        wordGoal: gameData.wordGoal || null,
        timeGoal: gameData.timeGoal || null,
      },
    })
  } catch (error) {
    return { success: false }
  }
  return { success: true }
}
