import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useProfiles } from '../context/ProfileContext';

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useProfiles();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Update local state when context changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(localSearchTerm);
  };

  const handleClear = () => {
    setLocalSearchTerm('');
    setSearchTerm('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative flex items-center">
        <input
          type="text"
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          placeholder="Search profiles..."
          className="w-full py-2 pl-10 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        
        {localSearchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-12 flex items-center text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
        
        <button
          type="submit"
          className="absolute right-0 top-0 h-full px-4 rounded-r-full bg-primary-500 text-white font-medium transition-colors hover:bg-primary-600"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;