import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext';
import HomePage from './pages/HomePage';
import ProfileDetailPage from './pages/ProfileDetailPage';
import MapViewPage from './pages/MapViewPage';
import AdminPage from './pages/AdminPage';
import CreateProfilePage from './pages/CreateProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import Header from './components/Header';
import './index.css';

function App() {
  return (
    <ProfileProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile/:id" element={<ProfileDetailPage />} />
              <Route path="/map" element={<MapViewPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/create" element={<CreateProfilePage />} />
              <Route path="/admin/edit/:id" element={<EditProfilePage />} />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </main>
        </div>
      </Router>
    </ProfileProvider>
  );
}

export default App;