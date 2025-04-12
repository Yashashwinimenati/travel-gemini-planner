
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import TravelPreferencesForm from '@/components/itinerary/TravelPreferencesForm';
import { toast } from 'sonner';

const CreateItinerary = () => {
  const navigate = useNavigate();
  
  // In a real implementation, this would check Supabase authentication status
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      toast.error('You must be logged in to create an itinerary');
      navigate('/login');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    toast.success('Successfully logged out');
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} onLogout={handleLogout} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <TravelPreferencesForm />
        </div>
      </div>
    </div>
  );
};

export default CreateItinerary;
