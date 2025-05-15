import React from 'react';
import { MapPin, Mail, PhoneCall, Tag, ArrowLeft, Edit, Trash } from 'lucide-react';
import { Profile } from '../types';
import MapComponent from './MapComponent';
import { Link, useNavigate } from 'react-router-dom';
import { useProfiles } from '../context/ProfileContext';

interface ProfileDetailProps {
  profile: Profile;
  isAdmin?: boolean;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ profile, isAdmin = false }) => {
  const navigate = useNavigate();
  const { deleteProfile } = useProfiles();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      deleteProfile(profile.id);
      navigate('/');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={profile.photo} 
          alt={profile.name} 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-bold">{profile.name}</h1>
          <p className="mt-2 text-white/90">{profile.description}</p>
        </div>
        <Link 
          to="/"
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        
        {isAdmin && (
          <div className="absolute top-4 right-4 flex space-x-2">
            <Link 
              to={`/admin/edit/${profile.id}`}
              className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
            >
              <Edit size={20} />
            </Link>
            <button 
              onClick={handleDelete}
              className="bg-red-500/70 backdrop-blur-sm p-2 rounded-full text-white hover:bg-red-500/90 transition-colors"
            >
              <Trash size={20} />
            </button>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <MapPin size={18} className="mr-3 text-primary-600" />
                <span>{profile.address}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Mail size={18} className="mr-3 text-primary-600" />
                <a href={`mailto:${profile.email}`} className="hover:text-primary-600 transition-colors">
                  {profile.email}
                </a>
              </div>
              
              <div className="flex items-center text-gray-600">
                <PhoneCall size={18} className="mr-3 text-primary-600" />
                <a href={`tel:${profile.contact}`} className="hover:text-primary-600 transition-colors">
                  {profile.contact}
                </a>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-50 text-primary-700"
                >
                  <Tag size={14} className="mr-1" />
                  {interest}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <div className="h-64 rounded-lg overflow-hidden border border-gray-200">
              <MapComponent 
                profiles={[profile]} 
                center={profile.coordinates} 
                zoom={13} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;