
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, this would connect to Supabase
    setIsLoading(true);
    try {
      // Simulate API call
      toast.info("Please connect to Supabase to enable authentication");
      console.log('Signup with:', { email, password, name });
      
      // Navigate to login after successful signup
      setTimeout(() => {
        setIsLoading(false);
        navigate('/login');
      }, 1500);
    } catch (error) {
      console.error('Error signing up:', error);
      setIsLoading(false);
      toast.error('Failed to create account');
    }
  };

  return (
    <Card className="w-full max-w-md glass-card">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Create your account</CardTitle>
        <CardDescription className="text-center">
          Start planning your dream trips today
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <p className="text-xs text-gray-500">Password must be at least 6 characters</p>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-teal-500 hover:bg-teal-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-teal-500 hover:text-teal-600 font-medium">
            Login
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
