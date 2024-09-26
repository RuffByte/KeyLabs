'use client'

import React from 'react'

import ForgetPasswordForm from './forgetPasswordForm'

const ForgetPasswordPage = () => {
  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center">
      <h1 className="mb-2 text-secondary">Forget Password</h1>
      <ForgetPasswordForm />
    </div>
  )
}

export default ForgetPasswordPage
