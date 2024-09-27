'use client'

import React, { AnchorHTMLAttributes, HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'
import { useTransition } from './Transition'

interface TransitionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string
  href: string
  children: React.ReactNode
}

export const TLink = ({
  className,
  children,
  href,
  ...props
}: TransitionLinkProps) => {
  const { handleRouteChange } = useTransition()
  return (
    <a
      {...props}
      className={cn('cursor-pointer', className)}
      onClick={() => handleRouteChange(href)}
    >
      {children}
    </a>
  )
}

export default TLink
