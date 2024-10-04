// app/game-test/page.tsx
import { getUser } from '@/lib/lucia'
import GameTestClient from './GameTestClient'

export const dynamic = 'force-dynamic'

const GameTestPage = async () => {
  const user = await getUser()
  return <GameTestClient user={user} />
}

export default GameTestPage
