
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import ItineraryCard from './ItineraryCard';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

// Define itinerary type
interface Itinerary {
  id: string;
  destination: string;
  start_date: string;
  end_date: string;
  duration?: number;
  created_at: string;
  thumbnail?: string;
}

const UserDashboard: React.FC = () => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchItineraries = async () => {
      try {
        const { data, error } = await supabase
          .from('itineraries')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          // Calculate duration for each itinerary
          const processedData = data.map(item => {
            const startDate = new Date(item.start_date);
            const endDate = new Date(item.end_date);
            const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
            const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            return {
              ...item,
              duration,
              // We could set a thumbnail based on destination in a real app
              thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
            };
          });
          
          setItineraries(processedData);
        }
      } catch (error) {
        console.error('Error fetching itineraries:', error);
        toast.error('Failed to load your itineraries');
      } finally {
        setLoading(false);
      }
    };

    fetchItineraries();
  }, [user]);
  
  if (loading) {
    return (
      <div className="w-full text-center py-10">
        <p>Loading your trips...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Your Trips</h2>
          <p className="text-gray-500">Manage your travel itineraries</p>
        </div>
        <Link to="/create">
          <Button className="bg-teal-500 hover:bg-teal-600 text-white">
            <PlusCircle size={18} className="mr-2" />
            Create New Trip
          </Button>
        </Link>
      </div>
      
      {itineraries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itineraries.map((itinerary) => (
            <ItineraryCard
              key={itinerary.id}
              id={itinerary.id}
              destination={itinerary.destination}
              startDate={itinerary.start_date}
              endDate={itinerary.end_date}
              duration={itinerary.duration || 0}
              thumbnail={itinerary.thumbnail}
            />
          ))}
        </div>
      ) : (
        <Card className="text-center p-10">
          <CardContent className="py-10">
            <div className="flex flex-col items-center gap-4">
              <Calendar className="h-12 w-12 text-gray-400" />
              <h3 className="text-xl font-medium">No Itineraries Yet</h3>
              <p className="text-gray-500 max-w-sm">
                Create your first travel itinerary by filling out your preferences.
              </p>
              <Link to="/create">
                <Button className="mt-4 bg-teal-500 hover:bg-teal-600 text-white">
                  <PlusCircle size={18} className="mr-2" />
                  Create Your First Trip
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserDashboard;
