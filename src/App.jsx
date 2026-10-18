import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
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
        
        {/* Fallback to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
      <FloatingContact />
    </div>
  );
}

export default App;
