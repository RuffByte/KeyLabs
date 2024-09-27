import TLink from '@/components/common/transition/TLink'

export default function Home() {
  return (
    <div className="grid place-items-center">
      <TLink href="/login" className="p-2 border rounded-md bg-white">
        login wow
      </TLink>
    </div>
  )
}
