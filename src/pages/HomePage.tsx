import React from 'react';
import ProfileList from '../components/ProfileList';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Directory</h1>
          <p className="text-gray-600">Explore profiles and discover their locations</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="md:w-1/2">
              <SearchBar />
            </div>
            <div className="md:w-1/2">
              <FilterBar />
            </div>
          </div>
        </div>
        
        <ProfileList />
      </div>
    </div>
  );
};

export default HomePage;