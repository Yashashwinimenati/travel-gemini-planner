
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import ItineraryCard from './ItineraryCard';

// Sample data for display purposes
const sampleItineraries = [
  {
    id: 'sample-123',
    destination: 'Tokyo, Japan',
    startDate: '2025-06-15',
    endDate: '2025-06-20',
    duration: 5,
    createdAt: '2025-04-02',
    thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'sample-456',
    destination: 'Paris, France',
    startDate: '2025-07-10',
    endDate: '2025-07-17',
    duration: 7,
    createdAt: '2025-04-05',
    thumbnail: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'sample-789',
    destination: 'Rome, Italy',
    startDate: '2025-09-05',
    endDate: '2025-09-10',
    duration: 5,
    createdAt: '2025-04-10',
    thumbnail: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

const UserDashboard: React.FC = () => {
  // In a real implementation, we would fetch the user's itineraries from Supabase
  
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
      
      {sampleItineraries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleItineraries.map((itinerary) => (
            <ItineraryCard
              key={itinerary.id}
              id={itinerary.id}
              destination={itinerary.destination}
              startDate={itinerary.startDate}
              endDate={itinerary.endDate}
              duration={itinerary.duration}
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
