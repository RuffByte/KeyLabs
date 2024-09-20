import React from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
const LoginPage = () => {
  return (
    <div className='flex h-full w-full items-center justify-around'>
      <SignUpForm />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
