
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Store auth state in localStorage for persistence (only for development purposes)
        if (currentSession) {
          localStorage.setItem('isLoggedIn', 'true');
        } else {
          localStorage.removeItem('isLoggedIn');
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // First create the user
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      });
      
      if (error) throw error;

      // After signup, immediately sign in
      await signIn(email, password);
      
    } catch (error: any) {
      // Check if error is "Email not confirmed"
      if (error.message === "Email not confirmed") {
        // Try to sign in anyway
        try {
          await signIn(email, password);
          return;
        } catch (signInError) {
          // If sign in fails too, show the original error
          toast.error(error.message || 'An error occurred during signup');
          throw error;
        }
      } else {
        toast.error(error.message || 'An error occurred during signup');
        throw error;
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        // Check if error is "Email not confirmed"
        if (error.message === "Email not confirmed") {
          toast.warning('Your email is not confirmed, but you can continue to use the app');
          
          // Update the user state manually since we're allowing login
          const { data } = await supabase.auth.getUser();
          if (data && data.user) {
            setUser(data.user);
            localStorage.setItem('isLoggedIn', 'true');
            toast.success('Logged in successfully!');
            navigate('/dashboard');
            return;
          }
        }
        throw error;
      }
      
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      if (error.message === "Email not confirmed") {
        // We already tried to handle this above
        toast.error('Failed to login. Please try again later.');
      } else {
        toast.error(error.message || 'Invalid login credentials');
      }
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error(error.message || 'Error signing out');
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
