import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Profile } from '../types';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  profiles: Profile[];
  center?: [number, number];
  zoom?: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  profiles, 
  center = [40, -95], // Default to US center
  zoom = 4 
}) => {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // Fix for Leaflet marker icon issue in React
    // Wait until the component is mounted before showing the map
    setMapReady(true);
  }, []);

  // Create custom marker icon
  const customIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  if (!mapReady) {
    return <div className="h-full w-full bg-gray-100 flex items-center justify-center">Loading map...</div>;
  }

  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {profiles.map((profile) => (
        <Marker 
          key={profile.id} 
          position={profile.coordinates}
          icon={customIcon}
        >
          <Popup>
            <div className="text-center p-1">
              <img 
                src={profile.photo} 
                alt={profile.name}
                className="w-16 h-16 rounded-full object-cover mx-auto mb-2"
              />
              <h3 className="font-semibold mb-1">{profile.name}</h3>
              <p className="text-xs text-gray-600 mb-1">{profile.address}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;