import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

// Generate itinerary using Gemini API via Supabase Edge Function
export const generateItinerary = async (preferences: any): Promise<GeneratedItinerary> => {
  const numDays = calculateDays(preferences.startDate, preferences.endDate);
  
  try {
    // Create the prompt for Gemini
    const prompt = `Create a detailed ${numDays}-day travel itinerary for ${preferences.destination}.
Budget: ${preferences.budget}
Number of travelers: ${preferences.numTravelers}
Interests: ${preferences.interests.join(', ')}
${preferences.additionalInfo ? `Additional information: ${preferences.additionalInfo}` : ''}

Please format the response as a JSON object with the following structure:
{
  "title": "A catchy title for the itinerary",
  "description": "A brief description of the overall trip",
  "days": [
    {
      "day": 1,
      "activities": [
        {
          "time": "Morning/Afternoon/Evening time (e.g., 09:00 AM)",
          "activity": "Short name of activity",
          "description": "Detailed description",
          "location": "Location name",
          "type": "One of: food, culture, nature, shopping, adventure, relaxation, nightlife",
          "title": "A title for this activity"
        }
      ]
    }
  ]
}`;

    console.log("Calling Gemini API via Edge Function...");
    
    try {
      // Call our Supabase Edge Function
      const { data, error } = await supabase.functions.invoke("generate-itinerary", {
        body: { prompt },
      });

      if (error) {
        console.error("Edge function error:", error);
        throw new Error("Failed to connect to AI service");
      }

      if (data.error) {
        console.error("Gemini API error:", data.error);
        throw new Error("AI couldn't generate an itinerary");
      }

      console.log("Generated itinerary:", data.itinerary);
      return data.itinerary;
      
    } catch (apiError) {
      console.error("API error:", apiError);
      toast.error("Failed to generate itinerary with AI. Using fallback data.");
      
      // Fallback to mock data if the API call fails
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
              description: `Engage in ${preferences.interests[0] || "adventure"} activities`,
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
    }
  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw new Error("Failed to generate itinerary. Please try again.");
  }
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
