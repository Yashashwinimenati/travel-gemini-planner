
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ItineraryDisplay from '@/components/itinerary/ItineraryDisplay';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const ItineraryView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();
  const [itineraryData, setItineraryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!loading && !user) {
      toast.error('You must be logged in to view itineraries');
      navigate('/login');
      return;
    }
    
    if (user && id) {
      const fetchItinerary = async () => {
        try {
          const { data, error } = await supabase
            .from('itineraries')
            .select('*')
            .eq('id', id)
            .single();
            
          if (error) {
            throw error;
          }
          
          if (!data) {
            toast.error('Itinerary not found');
            navigate('/dashboard');
            return;
          }
          
          setItineraryData(data);
        } catch (error) {
          console.error('Error fetching itinerary:', error);
          toast.error('Failed to load itinerary');
          navigate('/dashboard');
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchItinerary();
    }
  }, [id, user, loading, navigate]);
  
  if (loading || isLoading) {
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
        {itineraryData && <ItineraryDisplay itineraryData={itineraryData} />}
      </div>
    </div>
  );
};

export default ItineraryView;
