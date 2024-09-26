import { prisma } from '@/lib/prisma'

//ggs gonna have to find a way to periodically run this script man (it's a production issue :D )
async function deleteExpiredTokens() {
  try {
    const result = await prisma.passwordResetToken.deleteMany({
      where: {
        expiresAt: { lt: new Date() }, // delete tokens that have an expirey date less than today
      },
    })
    console.log(`Deleted ${result.count} expired tokens.`)
  } catch (error) {
    console.error('Error deleting expired tokens:', error)
  }
}

export default deleteExpiredTokens
