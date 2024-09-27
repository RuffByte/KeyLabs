// app/game-test/page.tsx
import { getUser } from '@/lib/lucia'
import GameTestClient from './GameTestClient'

export const dynamic = 'force-dynamic'

const GameTestPage = async () => {
  // Server-side logic to get the user
  const user = await getUser()

  // Pass user as a prop to the client component
  return <GameTestClient user={user} />
}

export default GameTestPage
