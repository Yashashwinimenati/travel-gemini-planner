
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ItineraryDisplay from '@/components/itinerary/ItineraryDisplay';
import { toast } from 'sonner';

const ItineraryView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real implementation, this would check Supabase authentication status
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      toast.error('You must be logged in to view itineraries');
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
        <ItineraryDisplay itineraryId={id} />
      </div>
    </div>
  );
};

export default ItineraryView;
