'use client'

import React, { MouseEvent, useRef } from 'react'

import { useScreen } from '@/app/client-page'
// import { useScreenSize } from '@/app/page'
import { StartButton } from './StartButton'

const GameBoard = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  // const { width, height } = useScreenSize()

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const { clientX, clientY } = e
    const { left, top } = containerRef.current.getBoundingClientRect()
    const [clickX, clickY] = [clientX - left, clientY - top]
  }

  const { screen } = useScreen()

  return (
    <div
      className="relative border-secondary"
      style={{ width: screen.width, height: screen.height }}
    >
      <div
        onMouseDown={handleClick}
        ref={containerRef}
        className="grid-80 bg-secondary size-full"
      />
      <StartButton />
    </div>
  )
}

export default GameBoard
