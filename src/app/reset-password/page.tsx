import React from 'react';

import ResetPasswordForm from './resetPasswordForm';

const ResetPasswordPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl mb-4">Reset Password</h1>
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordPage;
