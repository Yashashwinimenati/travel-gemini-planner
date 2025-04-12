
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
  
  return data;
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
  
  return data as ItineraryData[];
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
  
  return data as ItineraryData;
};
