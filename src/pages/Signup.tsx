
import React from 'react';
import SignupForm from '@/components/auth/SignupForm';
import Navbar from '@/components/Navbar';
import { Plane } from 'lucide-react';

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col hero-pattern">
      <Navbar isLoggedIn={false} />
      <div className="flex-1 flex items-center justify-center p-4">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
