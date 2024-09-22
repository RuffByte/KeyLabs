'use client'

import React from 'react'
import { logOut } from '@/app/login/login.action'

type Props = {
  children: React.ReactNode
}

export const SignOutButton = ({ children }: Props) => {
  return (
    <button
      className="rounded-full bg-white px-4 py-2"
      onClick={() => {
        logOut()
      }}
    >
      {children}
    </button>
  )
}

export default SignOutButton
