
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Utensils, Tag, Hotel, Landmark, Coffee, Sun, Sunset, Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const getActivityIcon = (type: string | undefined) => {
  if (!type) {
    return <Tag size={16} className="text-gray-500" />;
  }
  
  switch (type.toLowerCase()) {
    case 'culture':
      return <Landmark size={16} className="text-purple-500" />;
    case 'food':
      return <Utensils size={16} className="text-orange-500" />;
    case 'nature':
      return <Sun size={16} className="text-green-500" />;
    case 'shopping':
      return <Tag size={16} className="text-blue-500" />;
    case 'adventure':
      return <MapPin size={16} className="text-red-500" />;
    case 'relaxation':
      return <Coffee size={16} className="text-teal-500" />;
    case 'nightlife':
      return <Music size={16} className="text-pink-500" />;
    default:
      return <Tag size={16} className="text-gray-500" />;
  }
};

interface ItineraryDisplayProps {
  itineraryData: any;
}

const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ itineraryData }) => {
  const navigate = useNavigate();
  
  // Process the itinerary data from Supabase
  const itinerary = {
    id: itineraryData.id,
    destination: itineraryData.destination,
    startDate: itineraryData.start_date,
    endDate: itineraryData.end_date,
    duration: itineraryData.content?.duration || 
      Math.ceil(Math.abs(new Date(itineraryData.end_date).getTime() - new Date(itineraryData.start_date).getTime()) / (1000 * 60 * 60 * 24)),
    interests: itineraryData.interests || [],
    days: itineraryData.content?.days || []
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this itinerary?")) {
      try {
        const { error } = await supabase
          .from('itineraries')
          .delete()
          .eq('id', itineraryData.id);
          
        if (error) throw error;
        
        toast.success('Itinerary deleted successfully');
        navigate('/dashboard');
      } catch (error) {
        console.error('Error deleting itinerary:', error);
        toast.error('Failed to delete itinerary');
      }
    }
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleShare = () => {
    // In a real app, this could generate a shareable link
    navigator.clipboard.writeText(window.location.href)
      .then(() => toast.success('Link copied to clipboard'))
      .catch(() => toast.error('Failed to copy link'));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{itinerary.destination}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <Calendar size={16} className="mr-1" />
                {formatDate(itinerary.startDate)} - {formatDate(itinerary.endDate)}
                <span className="mx-2">•</span>
                <Clock size={16} className="mr-1" />
                {itinerary.duration} {itinerary.duration === 1 ? 'day' : 'days'}
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="text-teal-500 border-teal-500" onClick={handlePrint}>
                Print
              </Button>
              <Button variant="outline" size="sm" className="text-teal-500 border-teal-500" onClick={handleShare}>
                Share
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {itinerary.interests && itinerary.interests.map((interest: string) => (
              <span 
                key={interest}
                className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs text-teal-700"
              >
                {getActivityIcon(interest)}
                <span className="ml-1 capitalize">{interest}</span>
              </span>
            ))}
          </div>
        </CardHeader>
      </Card>
      
      {itinerary.days.length > 0 ? (
        <Tabs defaultValue="1" className="mb-10">
          <TabsList className="mb-4">
            {itinerary.days.map((day: any) => (
              <TabsTrigger key={day.day} value={day.day.toString()}>
                Day {day.day}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {itinerary.days.map((day: any) => (
            <TabsContent key={day.day} value={day.day.toString()} className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Day {day.day} Itinerary</h3>
              
              <div className="space-y-6">
                {day.activities.map((activity: any, index: number) => (
                  <div key={index} className="flex">
                    <div className="mr-4 w-20 text-sm text-gray-500">
                      {activity.time}
                    </div>
                    <div className="relative w-4 flex-shrink-0">
                      <div className="absolute top-1 left-1/2 -ml-0.5 h-full w-1 bg-teal-100"></div>
                      <div className="relative flex h-4 w-4 items-center justify-center rounded-full bg-teal-500 text-white z-10">
                        {getActivityIcon(activity.type)}
                      </div>
                    </div>
                    <div className="flex-grow pb-6">
                      <div className="bg-white rounded-lg shadow-sm p-4 ml-4 border border-gray-100">
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-gray-600 mt-1 text-sm">{activity.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">No itinerary details available</p>
        </div>
      )}
    </div>
  );
};

export default ItineraryDisplay;
