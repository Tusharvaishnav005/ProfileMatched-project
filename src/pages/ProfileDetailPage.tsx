import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProfiles } from '../context/ProfileContext';
import ProfileDetail from '../components/ProfileDetail';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const ProfileDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { profiles, loading, error, selectProfile, selectedProfile } = useProfiles();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && profiles.length > 0) {
      const profile = profiles.find(p => p.id === id);
      if (profile) {
        selectProfile(id);
      } else {
        navigate('/not-found', { replace: true });
      }
    }
  }, [id, profiles, selectProfile, navigate]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!selectedProfile) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ProfileDetail profile={selectedProfile} />
    </div>
  );
};

export default ProfileDetailPage;