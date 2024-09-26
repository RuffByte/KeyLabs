import Image from 'next/image'
import Link from 'next/link'

import RouteButton from '@/components/common/transition/RouteButton'

export default function Home() {
  return (
    <div className="">
      <div>
        <RouteButton href="/login">login wow</RouteButton>
      </div>
    </div>
  )
}
