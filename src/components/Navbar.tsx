
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Plane } from 'lucide-react';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-teal-500">
          <Plane size={24} className="text-teal-500" />
          <span>TravelGenius</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-teal-500 transition-colors">
            Home
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-teal-500 transition-colors">
                Dashboard
              </Link>
              <Link to="/create" className="text-gray-600 hover:text-teal-500 transition-colors">
                Create Itinerary
              </Link>
              <Button 
                variant="outline" 
                onClick={onLogout}
                className="border-teal-500 text-teal-500 hover:bg-teal-50"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="border-teal-500 text-teal-500 hover:bg-teal-50">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
