
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, this would connect to Supabase
    setIsLoading(true);
    try {
      // Simulate API call
      toast.info("Please connect to Supabase to enable authentication");
      console.log('Login with:', { email, password });
      
      // Navigate to dashboard after successful login
      setTimeout(() => {
        setIsLoading(false);
        // For demo purposes, we'll simulate a successful login
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/dashboard');
        toast.success('Successfully logged in!');
      }, 1500);
    } catch (error) {
      console.error('Error logging in:', error);
      setIsLoading(false);
      toast.error('Failed to login');
    }
  };

  return (
    <Card className="w-full max-w-md glass-card">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
        <CardDescription className="text-center">
          Login to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
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
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <a href="#" className="text-sm text-teal-500 hover:text-teal-600">
                Forgot Password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-teal-500 hover:bg-teal-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/signup" className="text-teal-500 hover:text-teal-600 font-medium">
            Sign Up
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
