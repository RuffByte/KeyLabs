import React from 'react'
import { redirect } from 'next/navigation'

import { getUser } from '@/lib/lucia'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

const LoginPage = async () => {
  const user = await getUser()
  if (user) return redirect('/dashboard')
  return (
    <div className="flex h-dvh w-full items-center justify-around">
      <SignUpForm />
      <LoginForm />
    </div>
  )
}

export default LoginPage
