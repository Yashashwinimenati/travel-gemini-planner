
import { supabase } from "@/integrations/supabase/client";

export interface GeneratedItinerary {
  title: string;
  description: string;
  days: {
    day: number;
    activities: {
      time: string;
      activity: string;
      description: string;
      location?: string;
      type?: string;
      title?: string;
    }[];
  }[];
}

export interface ItineraryData {
  id: string;
  destination: string;
  start_date: string;
  end_date: string;
  budget: string;
  num_travelers: number;
  interests: string[];
  additional_info?: string;
  content?: GeneratedItinerary | null;
  created_at: string;
  user_id: string;
}

// Mock function to simulate AI generating an itinerary
export const generateItinerary = async (preferences: any): Promise<GeneratedItinerary> => {
  // This is a mock implementation that returns a sample itinerary
  // In a real implementation, this would call an AI service
  
  const numDays = calculateDays(preferences.startDate, preferences.endDate);
  
  return {
    title: `Your ${preferences.budget} trip to ${preferences.destination}`,
    description: `A ${numDays}-day itinerary for ${preferences.numTravelers} traveler(s) focusing on ${preferences.interests.join(', ')}.`,
    days: Array.from({ length: numDays }, (_, i) => ({
      day: i + 1,
      activities: [
        {
          time: "09:00 AM",
          activity: "Breakfast",
          description: "Start your day with a local breakfast",
          location: "Local cafe",
          type: "food",
          title: "Breakfast"
        },
        {
          time: "11:00 AM",
          activity: "Sightseeing",
          description: "Visit popular attractions",
          location: "City center",
          type: "culture",
          title: "Sightseeing"
        },
        {
          time: "02:00 PM",
          activity: "Lunch",
          description: "Enjoy local cuisine",
          location: "Restaurant district",
          type: "food",
          title: "Lunch"
        },
        {
          time: "04:00 PM",
          activity: "Activity",
          description: "Engage in an activity based on your interests",
          location: "Various locations",
          type: preferences.interests[0] || "adventure",
          title: "Afternoon Activity"
        },
        {
          time: "07:00 PM",
          activity: "Dinner",
          description: "Experience local nightlife and cuisine",
          location: "Downtown",
          type: "food",
          title: "Dinner"
        }
      ]
    }))
  };
};

function calculateDays(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export const saveItinerary = async (itineraryData: Omit<ItineraryData, 'id' | 'created_at'>) => {
  // Convert the GeneratedItinerary to a JSON object
  const dataToInsert = {
    ...itineraryData,
    content: itineraryData.content as unknown as any // Type coercion for Supabase
  };

  const { data, error } = await supabase
    .from('itineraries')
    .insert(dataToInsert)
    .select()
    .single();
    
  if (error) {
    console.error('Error saving itinerary:', error);
    throw error;
  }
  
  return data as unknown as ItineraryData;
};

export const getUserItineraries = async () => {
  const { data, error } = await supabase
    .from('itineraries')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching user itineraries:', error);
    throw error;
  }
  
  return data as unknown as ItineraryData[];
};

export const getItineraryById = async (id: string) => {
  const { data, error } = await supabase
    .from('itineraries')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error(`Error fetching itinerary with id ${id}:`, error);
    throw error;
  }
  
  return data as unknown as ItineraryData;
};
