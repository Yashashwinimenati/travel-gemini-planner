
import { toast } from 'sonner';

interface TravelPreferences {
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  numTravelers: string | number;
  interests: string[];
  additionalInfo?: string;
}

interface ItineraryDay {
  day: number;
  activities: Array<{
    time: string;
    title: string;
    description: string;
    type: string;
  }>;
}

interface GeneratedItinerary {
  destination: string;
  duration: number;
  startDate: string;
  endDate: string;
  budget: string;
  interests: string[];
  days: ItineraryDay[];
}

// Gemini API Key
const API_KEY = 'AIzaSyA8FJDNlFsFggKkFZeZrwxj7TFEACWX5j0';

export async function generateItinerary(preferences: TravelPreferences): Promise<GeneratedItinerary | null> {
  try {
    // Calculate duration
    const start = new Date(preferences.startDate);
    const end = new Date(preferences.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Create prompt for Gemini
    const prompt = `
      Create a detailed travel itinerary for a trip to ${preferences.destination}.
      Trip details:
      - Duration: ${duration} days (from ${preferences.startDate} to ${preferences.endDate})
      - Budget: ${preferences.budget}
      - Number of travelers: ${preferences.numTravelers}
      - Interests: ${preferences.interests.join(', ')}
      - Additional information: ${preferences.additionalInfo || 'None'}

      Please format the response as a JSON object with this exact structure:
      {
        "days": [
          {
            "day": 1,
            "activities": [
              {
                "time": "09:00 AM",
                "title": "Activity name",
                "description": "Brief description of the activity",
                "type": "One of these categories: culture, food, nature, shopping, adventure, relaxation, nightlife"
              }
              // more activities for day 1
            ]
          }
          // more days
        ]
      }

      Make sure each day has 5-7 activities, including breakfast, lunch, and dinner. Each activity should have a specific time.
      IMPORTANT: Return ONLY valid JSON. Do not include any explanations or text outside the JSON structure.
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to generate itinerary');
    }

    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response from Gemini API');
    }

    const rawText = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from text response (in case there's any additional text)
    const jsonMatch = rawText.match(/(\{[\s\S]*\})/);
    if (!jsonMatch) {
      throw new Error('Could not extract valid JSON from the response');
    }
    
    // Parse JSON
    const itineraryData = JSON.parse(jsonMatch[0]);
    
    // Format into our expected structure
    const itinerary: GeneratedItinerary = {
      destination: preferences.destination,
      duration,
      startDate: preferences.startDate,
      endDate: preferences.endDate,
      budget: preferences.budget,
      interests: preferences.interests,
      days: itineraryData.days
    };

    return itinerary;
  } catch (error: any) {
    console.error('Error generating itinerary:', error);
    toast.error(error.message || 'Failed to generate itinerary');
    return null;
  }
}
