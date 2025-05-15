import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import MapComponent from './MapComponent';
import { useProfiles } from '../context/ProfileContext';
import { Profile } from '../types';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const ProfileList: React.FC = () => {
  const { filteredProfiles, loading, error } = useProfiles();
  const [selectedMapProfile, setSelectedMapProfile] = useState<Profile | null>(null);
  const [showMap, setShowMap] = useState(false);

  const handleSummaryClick = (profile: Profile) => {
    setSelectedMapProfile(profile);
    setShowMap(true);
  };

  const handleCloseMap = () => {
    setShowMap(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {showMap && selectedMapProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold">{selectedMapProfile.name}'s Location</h3>
              <button 
                onClick={handleCloseMap}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div className="flex-1 min-h-[400px] p-4">
              <MapComponent 
                profiles={[selectedMapProfile]} 
                center={selectedMapProfile.coordinates} 
                zoom={13}
              />
            </div>
            <div className="p-4 border-t">
              <p className="font-medium">{selectedMapProfile.address}</p>
            </div>
          </div>
        </div>
      )}

      {filteredProfiles.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No profiles found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map(profile => (
            <ProfileCard 
              key={profile.id} 
              profile={profile} 
              onSummaryClick={handleSummaryClick} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileList;