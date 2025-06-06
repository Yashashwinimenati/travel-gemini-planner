
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import UserDashboard from '@/components/dashboard/UserDashboard';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();
  
  useEffect(() => {
    if (!loading && !user) {
      toast.error('You must be logged in to view this page');
      navigate('/login');
    }
  }, [user, loading, navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={!!user} onLogout={signOut} />
      <div className="container mx-auto px-4 py-8">
        <UserDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
