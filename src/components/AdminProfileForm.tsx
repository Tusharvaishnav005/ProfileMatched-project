import React, { useState, useEffect } from 'react';
import { Profile, ProfileFormData } from '../types';
import { X, Plus, MapPin } from 'lucide-react';

interface AdminProfileFormProps {
  initialData?: Profile;
  onSubmit: (data: ProfileFormData) => void;
  onCancel: () => void;
}

const DEFAULT_FORM_DATA: ProfileFormData = {
  name: '',
  photo: '',
  description: '',
  address: '',
  contact: '',
  email: '',
  interests: [],
  coordinates: [0, 0]
};

const AdminProfileForm: React.FC<AdminProfileFormProps> = ({ 
  initialData, 
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<ProfileFormData>(initialData || DEFAULT_FORM_DATA);
  const [interest, setInterest] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCoordinateChange = (index: number, value: string) => {
    const newValue = parseFloat(value) || 0;
    const newCoordinates = [...formData.coordinates];
    newCoordinates[index] = newValue;
    
    setFormData(prev => ({ ...prev, coordinates: newCoordinates as [number, number] }));
  };

  const addInterest = () => {
    if (!interest.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      interests: [...prev.interests, interest.trim()]
    }));
    setInterest('');
  };

  const removeInterest = (index: number) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.photo.trim()) {
      newErrors.photo = 'Photo URL is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Photo URL
          </label>
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.photo ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="https://example.com/photo.jpg"
          />
          {errors.photo && <p className="mt-1 text-xs text-red-500">{errors.photo}</p>}
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={`w-full p-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
              <MapPin size={16} />
            </span>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`flex-1 p-2 border rounded-r-md ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Number
          </label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.contact ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.contact && <p className="mt-1 text-xs text-red-500">{errors.contact}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Latitude
          </label>
          <input
            type="number"
            step="0.000001"
            value={formData.coordinates[0]}
            onChange={(e) => handleCoordinateChange(0, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Longitude
          </label>
          <input
            type="number"
            step="0.000001"
            value={formData.coordinates[1]}
            onChange={(e) => handleCoordinateChange(1, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interests
          </label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md"
              placeholder="Add an interest"
            />
            <button
              type="button"
              onClick={addInterest}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.interests.map((item, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-50 text-primary-700"
              >
                {item}
                <button
                  type="button"
                  onClick={() => removeInterest(index)}
                  className="ml-1 focus:outline-none"
                >
                  <X size={14} className="text-primary-700 hover:text-primary-900" />
                </button>
              </span>
            ))}
            
            {formData.interests.length === 0 && (
              <span className="text-sm text-gray-500">No interests added</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {initialData ? 'Update Profile' : 'Create Profile'}
        </button>
      </div>
    </form>
  );
};

export default AdminProfileForm;