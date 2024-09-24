import React from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import { getUser } from '@/lib/lucia'
import { redirect } from 'next/navigation'

const LoginPage = async () => {
  const user = await getUser()
  if (user) return redirect('/dashboard')
  return (
    <div className="flex h-dvh w-dvw items-center justify-around">
      <SignUpForm />
      <LoginForm />
    </div>
  )
}

export default LoginPage
