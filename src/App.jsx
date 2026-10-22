import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import ResidentialConstruction from './pages/ResidentialConstruction';
import CommercialConstruction from './pages/CommercialConstruction';
import PropertyDevelopment from './pages/PropertyDevelopment';
import RenovationRemodeling from './pages/RenovationRemodeling';
import CivilInfrastructure from './pages/CivilInfrastructure';
import Projects from './pages/Projects';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FloatingContact from './components/FloatingContact';
import Footer from './components/Footer';

// Admin Modules
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

import './App.css';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <div className={`App ${isAdminRoute ? 'admin-app-mode' : ''}`}>
        {!isAdminRoute && <Navbar />}

        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />

          {/* Dedicated Service & Project Detail Pages */}
          <Route path="/residential-construction" element={<ResidentialConstruction />} />
          <Route path="/commercial-construction" element={<CommercialConstruction />} />
          <Route path="/property-development" element={<PropertyDevelopment />} />
          <Route path="/renovation-remodeling" element={<RenovationRemodeling />} />
          <Route path="/civil-infrastructure" element={<CivilInfrastructure />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* Dedicated Admin Portal Routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <FloatingContact />}
      </div>
    </AuthProvider>
  );
}

export default App;
