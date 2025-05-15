import React from 'react';
import { MapPin, Info, Mail, PhoneCall } from 'lucide-react';
import { Profile } from '../types';
import { Link } from 'react-router-dom';

interface ProfileCardProps {
  profile: Profile;
  onSummaryClick: (profile: Profile) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onSummaryClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={profile.photo} 
          alt={`${profile.name}`} 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-semibold text-xl">{profile.name}</h3>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-gray-600 mb-4">{profile.description}</p>
        
        <div className="flex items-center text-gray-500 mb-2">
          <MapPin size={16} className="mr-2 text-primary-600" />
          <span className="text-sm truncate">{profile.address}</span>
        </div>
        
        <div className="flex justify-between mt-4">
          <button
            onClick={() => onSummaryClick(profile)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors"
          >
            <MapPin size={16} className="mr-1" /> 
            View on Map
          </button>
          
          <Link
            to={`/profile/${profile.id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-md hover:bg-primary-100 transition-colors"
          >
            <Info size={16} className="mr-1" /> 
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;