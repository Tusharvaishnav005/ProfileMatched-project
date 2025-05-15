import React from 'react';
import MapComponent from '../components/MapComponent';
import { useProfiles } from '../context/ProfileContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const MapViewPage: React.FC = () => {
  const { filteredProfiles, loading, error } = useProfiles();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Map View</h1>
          <p className="text-gray-600">View all profile locations on a single map</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="h-[70vh] rounded-lg overflow-hidden">
            <MapComponent profiles={filteredProfiles} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapViewPage;