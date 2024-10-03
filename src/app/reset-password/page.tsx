import React, { Suspense } from 'react'

import ResetPasswordForm from './resetPasswordForm'

const ResetPasswordPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl mb-4">Reset Password</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  )
}

export default ResetPasswordPage
