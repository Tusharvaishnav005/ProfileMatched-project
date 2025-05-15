import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile, ProfileFormData } from '../types';
import { mockProfiles } from '../data/mockProfiles';

interface ProfileContextType {
  profiles: Profile[];
  loading: boolean;
  error: string | null;
  selectedProfile: Profile | null;
  searchTerm: string;
  filterInterest: string;
  filteredProfiles: Profile[];
  addProfile: (profile: ProfileFormData) => void;
  updateProfile: (id: string, profile: ProfileFormData) => void;
  deleteProfile: (id: string) => void;
  selectProfile: (id: string) => void;
  clearSelectedProfile: () => void;
  setSearchTerm: (term: string) => void;
  setFilterInterest: (interest: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterInterest, setFilterInterest] = useState('');

  useEffect(() => {
    // Simulate API call delay
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProfiles(mockProfiles);
        setError(null);
      } catch (err) {
        setError('Failed to fetch profiles');
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          profile.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          profile.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesInterest = filterInterest === '' || 
                           profile.interests.some(interest => 
                             interest.toLowerCase().includes(filterInterest.toLowerCase())
                           );
    
    return matchesSearch && matchesInterest;
  });

  const addProfile = (profileData: ProfileFormData) => {
    const newProfile: Profile = {
      ...profileData,
      id: Date.now().toString()
    };
    setProfiles(prev => [...prev, newProfile]);
  };

  const updateProfile = (id: string, profileData: ProfileFormData) => {
    setProfiles(prev => 
      prev.map(profile => 
        profile.id === id ? { ...profileData, id } : profile
      )
    );
    
    // Update selected profile if it's the one being edited
    if (selectedProfile?.id === id) {
      setSelectedProfile({ ...profileData, id });
    }
  };

  const deleteProfile = (id: string) => {
    setProfiles(prev => prev.filter(profile => profile.id !== id));
    
    // Clear selected profile if it's the one being deleted
    if (selectedProfile?.id === id) {
      setSelectedProfile(null);
    }
  };

  const selectProfile = (id: string) => {
    const profile = profiles.find(p => p.id === id) || null;
    setSelectedProfile(profile);
  };

  const clearSelectedProfile = () => {
    setSelectedProfile(null);
  };

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        loading,
        error,
        selectedProfile,
        searchTerm,
        filterInterest,
        filteredProfiles,
        addProfile,
        updateProfile,
        deleteProfile,
        selectProfile,
        clearSelectedProfile,
        setSearchTerm,
        setFilterInterest
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfiles = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfiles must be used within a ProfileProvider');
  }
  return context;
};