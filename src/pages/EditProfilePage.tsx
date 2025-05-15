import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminProfileForm from '../components/AdminProfileForm';
import { useProfiles } from '../context/ProfileContext';
import { ProfileFormData } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const EditProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profiles, updateProfile, loading, error } = useProfiles();
  
  const profile = id ? profiles.find(p => p.id === id) : undefined;
  
  useEffect(() => {
    if (!loading && !profile && profiles.length > 0) {
      navigate('/admin', { replace: true });
    }
  }, [profile, profiles, loading, navigate]);

  const handleSubmit = (data: ProfileFormData) => {
    if (id) {
      updateProfile(id, data);
      navigate('/admin');
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  if (!profile) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Profile</h1>
          <p className="text-gray-600">Update profile information</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <AdminProfileForm 
            initialData={profile}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;