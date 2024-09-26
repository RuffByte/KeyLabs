'use client'

import React from 'react'

import { useTransition } from './Transition'

const RouteButton = ({
  children,
  href,
}: {
  href: string
  children: React.ReactNode
}) => {
  const { handleRouteChange } = useTransition()
  return (
    <button
      className="p-4 px-12 border rounded"
      onClick={() => handleRouteChange(href)}
    >
      {children}
    </button>
  )
}

export default RouteButton
