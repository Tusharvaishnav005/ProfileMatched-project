export interface Profile {
  id: string;
  name: string;
  photo: string;
  description: string;
  address: string;
  contact: string;
  email: string;
  interests: string[];
  coordinates: [number, number]; // [latitude, longitude]
}

export interface ProfileFormData extends Omit<Profile, 'id'> {}