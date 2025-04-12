
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import Navbar from '@/components/Navbar';
import { Plane } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col hero-pattern">
      <Navbar isLoggedIn={false} />
      <div className="flex-1 flex items-center justify-center p-4">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
