
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plane, MapPin, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={false} />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 hero-pattern">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight animate-fade-in">
                Your AI Travel Companion
              </h1>
              <p className="text-lg text-gray-600 animate-slide-up">
                Create personalized travel itineraries with the help of AI. Just tell us your preferences, and we'll plan your perfect trip.
              </p>
              <div className="flex gap-4 pt-4 animate-slide-up">
                <Link to="/signup">
                  <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="border-teal-500 text-teal-500 hover:bg-teal-50">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative w-full h-[350px] md:h-[400px] rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Travel planning" 
                  className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="text-white font-medium">
                    Plan your next adventure
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-gray-600 mt-2">Three simple steps to plan your perfect trip</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-teal-50 p-3 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-teal-500" />
              </div>
              <h3 className="text-xl font-medium mb-2">Choose Your Destination</h3>
              <p className="text-gray-600">Tell us where you want to go, for how long, and what you're interested in.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-teal-50 p-3 rounded-full mb-4">
                <Clock className="h-8 w-8 text-teal-500" />
              </div>
              <h3 className="text-xl font-medium mb-2">AI Creates Your Itinerary</h3>
              <p className="text-gray-600">Our AI analyzes your preferences and creates a personalized day-by-day plan.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-teal-50 p-3 rounded-full mb-4">
                <Calendar className="h-8 w-8 text-teal-500" />
              </div>
              <h3 className="text-xl font-medium mb-2">Enjoy Your Trip</h3>
              <p className="text-gray-600">Access your itinerary anytime, make adjustments, and enjoy your perfectly planned trip.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-teal-50">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold">Ready to Plan Your Next Adventure?</h2>
            <p className="text-gray-600">Sign up for free and create your first AI-generated travel itinerary today.</p>
            <Link to="/signup">
              <Button className="mt-4 bg-teal-500 hover:bg-teal-600 text-white">
                <Plane className="mr-2 h-4 w-4" /> Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 text-xl font-bold text-teal-500 mb-4 md:mb-0">
              <Plane size={24} />
              <span>TravelGenius</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-teal-500 transition-colors">About</a>
              <a href="#" className="hover:text-teal-500 transition-colors">Help</a>
              <a href="#" className="hover:text-teal-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-teal-500 transition-colors">Terms</a>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-gray-500">
            © 2025 TravelGenius. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
