import React, { useState } from 'react';
import { MapPin, Menu, Users, User, Settings, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center text-primary-600 text-xl font-bold">
            <MapPin size={24} className="mr-2" />
            <span>ProfileMap</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Profiles
            </Link>
            <Link
              to="/map"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/map') 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Map View
            </Link>
            <Link
              to="/admin"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname.startsWith('/admin') 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Admin
            </Link>
          </div>
          
          <div className="hidden md:block">
            <SearchBar />
          </div>
          
          <button
            className="md:hidden p-2 text-gray-500 hover:text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="mb-4">
              <SearchBar />
            </div>
            <nav className="flex flex-col space-y-1">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/')
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users size={18} className="inline mr-2" />
                Profiles
              </Link>
              <Link
                to="/map"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/map')
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <MapPin size={18} className="inline mr-2" />
                Map View
              </Link>
              <Link
                to="/admin"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname.startsWith('/admin')
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings size={18} className="inline mr-2" />
                Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;