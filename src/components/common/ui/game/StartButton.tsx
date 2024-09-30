import React from 'react'
import { Waypoints } from 'lucide-react'

export const StartButton = () => {
  return (
    <div className="bg-foreground absolute grid pointer-events-none left-1/2 top-1/2 [translate:-50%_-50%] place-items-center rounded-full size-16">
      <Waypoints color="hsl(var(--background))" />
    </div>
  )
}
