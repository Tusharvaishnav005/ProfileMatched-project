import React from 'react';
import { Filter } from 'lucide-react';
import { useProfiles } from '../context/ProfileContext';

const FilterBar: React.FC = () => {
  const { filterInterest, setFilterInterest } = useProfiles();
  
  // Get unique interests from all profiles
  const { profiles } = useProfiles();
  const allInterests = new Set<string>();
  
  profiles.forEach(profile => {
    profile.interests.forEach(interest => {
      allInterests.add(interest);
    });
  });
  
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center text-gray-600">
        <Filter size={18} className="mr-2" />
        <span className="text-sm font-medium">Filter:</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterInterest('')}
          className={`text-sm px-3 py-1 rounded-full transition-colors ${
            filterInterest === '' 
              ? 'bg-primary-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        
        {Array.from(allInterests).map(interest => (
          <button
            key={interest}
            onClick={() => setFilterInterest(interest)}
            className={`text-sm px-3 py-1 rounded-full transition-colors ${
              filterInterest === interest 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {interest}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;