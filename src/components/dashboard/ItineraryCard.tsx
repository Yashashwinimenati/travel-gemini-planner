
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ItineraryCardProps {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  duration: number;
  thumbnail?: string;
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({
  id,
  destination,
  startDate,
  endDate,
  duration,
  thumbnail
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div 
        className="h-48 bg-cover bg-center" 
        style={{ 
          backgroundImage: thumbnail 
            ? `url(${thumbnail})` 
            : `url('https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')` 
        }}
      />
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{destination}</CardTitle>
        <CardDescription className="flex items-center">
          <Calendar size={14} className="mr-1" />
          {formatDate(startDate)} - {formatDate(endDate)}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-gray-500">
          <Clock size={14} className="mr-1" />
          <span>{duration} {duration === 1 ? 'day' : 'days'}</span>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Link to={`/itinerary/${id}`} className="w-full">
          <Button variant="outline" className="w-full justify-between text-teal-500 border-teal-500 hover:bg-teal-50">
            View Itinerary
            <ChevronRight size={16} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ItineraryCard;
