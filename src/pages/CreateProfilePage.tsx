import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminProfileForm from '../components/AdminProfileForm';
import { useProfiles } from '../context/ProfileContext';
import { ProfileFormData } from '../types';

const CreateProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { addProfile } = useProfiles();

  const handleSubmit = (data: ProfileFormData) => {
    addProfile(data);
    navigate('/admin');
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Profile</h1>
          <p className="text-gray-600">Add a new profile to the directory</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <AdminProfileForm 
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProfilePage;