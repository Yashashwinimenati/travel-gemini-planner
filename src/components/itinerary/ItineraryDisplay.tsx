
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Utensils, Tag, Hotel, Landmark, Coffee, Sun, Sunset, Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Sample itinerary data
const sampleItinerary = {
  id: 'sample-123',
  destination: 'Tokyo, Japan',
  duration: 5,
  startDate: '2025-06-15',
  endDate: '2025-06-20',
  budget: 'moderate',
  interests: ['culture', 'food', 'nature'],
  days: [
    {
      day: 1,
      activities: [
        { 
          time: '09:00 AM', 
          title: 'Meiji Shrine', 
          description: 'Start your day with a peaceful visit to this iconic Shinto shrine surrounded by lush forest.',
          type: 'culture'
        },
        { 
          time: '11:30 AM', 
          title: 'Harajuku Exploration', 
          description: 'Wander down Takeshita Street to experience Japan\'s unique youth culture and fashion scene.',
          type: 'culture'
        },
        { 
          time: '01:00 PM', 
          title: 'Lunch at Afuri Ramen', 
          description: 'Try their famous yuzu-infused ramen for a refreshing meal.',
          type: 'food'
        },
        { 
          time: '03:00 PM', 
          title: 'Shibuya Crossing', 
          description: 'Experience the world\'s busiest pedestrian crossing. Take photos from the Starbucks overlooking the crossing.',
          type: 'culture'
        },
        { 
          time: '05:00 PM', 
          title: 'Shibuya Sky', 
          description: 'Head to this observation deck for panoramic sunset views of Tokyo.',
          type: 'nature'
        },
        { 
          time: '07:30 PM', 
          title: 'Dinner at Ichiran Ramen', 
          description: 'Experience dining in individual booths at this famous ramen chain.',
          type: 'food'
        }
      ]
    },
    {
      day: 2,
      activities: [
        { 
          time: '08:30 AM', 
          title: 'Tsukiji Outer Market', 
          description: 'Sample fresh seafood and Japanese street food at this famous market.',
          type: 'food'
        },
        { 
          time: '10:30 AM', 
          title: 'Hamarikyu Gardens', 
          description: 'Enjoy a traditional tea ceremony in this beautiful Japanese garden.',
          type: 'nature'
        },
        { 
          time: '01:00 PM', 
          title: 'Lunch at Sushi Dai', 
          description: 'Enjoy outstanding sushi at this renowned local spot.',
          type: 'food'
        },
        { 
          time: '03:00 PM', 
          title: 'Asakusa & Sensoji Temple', 
          description: 'Visit Tokyo\'s oldest temple and explore the Nakamise shopping street.',
          type: 'culture'
        },
        { 
          time: '06:00 PM', 
          title: 'Tokyo Skytree', 
          description: 'Take in evening views from one of the world\'s tallest towers.',
          type: 'culture'
        },
        { 
          time: '08:00 PM', 
          title: 'Dinner at Gonpachi', 
          description: 'Dine at the restaurant that inspired the famous fight scene in Kill Bill.',
          type: 'food'
        }
      ]
    },
    {
      day: 3,
      activities: [
        { 
          time: '09:00 AM', 
          title: 'Shinjuku Gyoen', 
          description: 'Start with a peaceful morning walk through this beautiful national garden.',
          type: 'nature'
        },
        { 
          time: '11:30 AM', 
          title: 'Tokyo Metropolitan Building', 
          description: 'Visit the free observation deck for great views of the city and Mt. Fuji on clear days.',
          type: 'culture'
        },
        { 
          time: '01:00 PM', 
          title: 'Lunch at Omoide Yokocho', 
          description: 'Experience the narrow alleyways filled with tiny restaurants serving yakitori and other Japanese delicacies.',
          type: 'food'
        },
        { 
          time: '03:30 PM', 
          title: 'Ghibli Museum', 
          description: 'Delight in the magical world of Studio Ghibli films at this whimsical museum.',
          type: 'culture'
        },
        { 
          time: '07:00 PM', 
          title: 'Dinner at Robot Restaurant', 
          description: 'Enjoy a unique dinner show experience with robots, lasers, and performances.',
          type: 'culture'
        }
      ]
    },
    {
      day: 4,
      activities: [
        { 
          time: '07:00 AM', 
          title: 'Toyosu Fish Market', 
          description: 'Watch the famous tuna auction if you reserve in advance, or explore the market.',
          type: 'culture'
        },
        { 
          time: '10:00 AM', 
          title: 'TeamLab Borderless', 
          description: 'Immerse yourself in this incredible digital art museum.',
          type: 'culture'
        },
        { 
          time: '01:00 PM', 
          title: 'Lunch at T\'s Tantan', 
          description: 'Try vegan ramen at this popular restaurant inside Tokyo Station.',
          type: 'food'
        },
        { 
          time: '02:30 PM', 
          title: 'Imperial Palace Gardens', 
          description: 'Walk around the beautiful gardens surrounding the Imperial Palace.',
          type: 'nature'
        },
        { 
          time: '05:00 PM', 
          title: 'Akihabara', 
          description: 'Explore the electronic and anime capital of Tokyo.',
          type: 'culture'
        },
        { 
          time: '07:30 PM', 
          title: 'Dinner at Kobe Beef Kaiseki 511', 
          description: 'Splurge on high-quality Japanese wagyu beef.',
          type: 'food'
        }
      ]
    },
    {
      day: 5,
      activities: [
        { 
          time: '09:00 AM', 
          title: 'Ueno Park', 
          description: 'Explore Tokyo\'s largest public park and visit one of its many museums.',
          type: 'nature'
        },
        { 
          time: '11:00 AM', 
          title: 'Ameyoko Market', 
          description: 'Shop for souvenirs and street food at this lively market street.',
          type: 'culture'
        },
        { 
          time: '01:00 PM', 
          title: 'Lunch at Onigiri Asakusa Yadoroku', 
          description: 'Try traditional Japanese rice balls at the oldest onigiri shop in Tokyo.',
          type: 'food'
        },
        { 
          time: '03:00 PM', 
          title: 'Tokyo National Museum', 
          description: 'Discover the largest collection of Japanese art in the world.',
          type: 'culture'
        },
        { 
          time: '06:30 PM', 
          title: 'Farewell Dinner at Izakaya', 
          description: 'Experience a traditional Japanese pub with variety of small dishes and drinks.',
          type: 'food'
        },
        { 
          time: '09:00 PM', 
          title: 'Roppongi Night View', 
          description: 'End your trip with spectacular night views of Tokyo from Roppongi Hills.',
          type: 'culture'
        }
      ]
    }
  ]
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'culture':
      return <Landmark size={16} className="text-purple-500" />;
    case 'food':
      return <Utensils size={16} className="text-orange-500" />;
    case 'nature':
      return <Sun size={16} className="text-green-500" />;
    default:
      return <Tag size={16} className="text-gray-500" />;
  }
};

interface ItineraryDisplayProps {
  itineraryId?: string;
}

const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ itineraryId }) => {
  const navigate = useNavigate();
  
  // In a real implementation, we would fetch the itinerary data from Supabase
  const itinerary = sampleItinerary;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const handleSaveItinerary = () => {
    toast.info("Please connect to Supabase to save itineraries");
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleShare = () => {
    toast.info("Sharing functionality would be implemented here");
  };
  
  const handleDelete = () => {
    toast.info("Please connect to Supabase to manage itineraries");
    navigate('/dashboard');
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
            {itinerary.interests.map(interest => (
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
      
      <Tabs defaultValue="1" className="mb-10">
        <TabsList className="mb-4">
          {itinerary.days.map((day) => (
            <TabsTrigger key={day.day} value={day.day.toString()}>
              Day {day.day}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {itinerary.days.map((day) => (
          <TabsContent key={day.day} value={day.day.toString()} className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Day {day.day} Itinerary</h3>
            
            <div className="space-y-6">
              {day.activities.map((activity, index) => (
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
      
      <div className="flex justify-center mb-10">
        <Button className="bg-teal-500 hover:bg-teal-600" onClick={handleSaveItinerary}>
          Save Itinerary
        </Button>
      </div>
    </div>
  );
};

export default ItineraryDisplay;
