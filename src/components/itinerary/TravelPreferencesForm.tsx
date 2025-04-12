
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { generateItinerary } from '@/services/itineraryService';

const TravelPreferencesForm: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('moderate');
  const [numTravelers, setNumTravelers] = useState('1');
  const [interests, setInterests] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { user } = useAuth();

  const interestOptions = [
    { id: 'nature', label: 'Nature & Outdoors' },
    { id: 'culture', label: 'Culture & History' },
    { id: 'food', label: 'Food & Cuisine' },
    { id: 'adventure', label: 'Adventure & Sports' },
    { id: 'relaxation', label: 'Relaxation & Wellness' },
    { id: 'nightlife', label: 'Nightlife & Entertainment' },
    { id: 'shopping', label: 'Shopping' },
    { id: 'family', label: 'Family-friendly Activities' },
  ];

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be logged in to create an itinerary');
      navigate('/login');
      return;
    }
    
    if (interests.length === 0) {
      toast.error('Please select at least one interest');
      return;
    }
    
    setIsLoading(true);
    
    try {
      toast.info("Generating your personalized itinerary...");
      
      // Generate itinerary using Gemini AI
      const preferences = {
        destination,
        startDate,
        endDate,
        budget,
        numTravelers,
        interests,
        additionalInfo
      };
      
      const itinerary = await generateItinerary(preferences);
      
      if (!itinerary) {
        throw new Error('Failed to generate itinerary');
      }
      
      // Save itinerary to Supabase
      const { data, error } = await supabase
        .from('itineraries')
        .insert({
          user_id: user.id,
          destination,
          start_date: startDate,
          end_date: endDate,
          budget,
          num_travelers: Number(numTravelers),
          interests,
          additional_info: additionalInfo,
          content: itinerary
        })
        .select('id')
        .single();
      
      if (error) {
        throw error;
      }
      
      toast.success('Itinerary generated successfully!');
      
      // Navigate to the itinerary view
      navigate(`/itinerary/${data.id}`);
    } catch (error) {
      console.error('Error generating itinerary:', error);
      toast.error('Failed to generate itinerary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateDuration = () => {
    if (!startDate || !endDate) return null;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const duration = calculateDuration();

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl">Create Your Travel Itinerary</CardTitle>
        <CardDescription>
          Tell us about your travel preferences, and we'll generate a personalized itinerary for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="destination" className="text-sm font-medium">
                Destination
              </Label>
              <Input
                id="destination"
                placeholder="e.g., Tokyo, Japan"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate" className="text-sm font-medium">
                  Start Date
                </Label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="pl-10"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="endDate" className="text-sm font-medium">
                  End Date
                </Label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="pl-10"
                    min={startDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>
            
            {duration !== null && (
              <div className="bg-teal-50 p-3 rounded-md text-sm text-teal-800">
                Your trip will last <strong>{duration} {duration === 1 ? 'day' : 'days'}</strong>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget" className="text-sm font-medium">
                  Budget Range
                </Label>
                <Select 
                  value={budget} 
                  onValueChange={setBudget}
                >
                  <SelectTrigger id="budget" className="mt-1">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">Budget / Backpacker</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="travelers" className="text-sm font-medium">
                  Number of Travelers
                </Label>
                <Input
                  id="travelers"
                  type="number"
                  min={1}
                  max={20}
                  value={numTravelers}
                  onChange={(e) => setNumTravelers(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Interests (select at least one)
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {interestOptions.map((interest) => (
                  <div key={interest.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={interest.id}
                      checked={interests.includes(interest.id)}
                      onCheckedChange={() => toggleInterest(interest.id)}
                    />
                    <Label htmlFor={interest.id} className="text-sm">
                      {interest.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="additionalInfo" className="text-sm font-medium">
                Additional Information (Optional)
              </Label>
              <Textarea
                id="additionalInfo"
                placeholder="Tell us more about your preferences, special needs, or any specific places you'd like to visit..."
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="mt-1"
                rows={4}
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-teal-500 hover:bg-teal-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Generating Itinerary...' : 'Generate Itinerary'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-center text-sm text-gray-500">
        Powered by Gemini AI. Your preferences will be used to create a personalized travel plan.
      </CardFooter>
    </Card>
  );
};

export default TravelPreferencesForm;
