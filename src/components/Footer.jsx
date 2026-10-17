import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaXTwitter, FaLinkedinIn } from 'react-icons/fa6';
import logo from '../assets/nilan.png';
import PrivacyPolicyModal from './PrivacyPolicyModal';
import './Footer.css';

const Footer = () => {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section brand">
            <Link to="/" className="footer-logo-link">
              <img src={logo} alt="Nilan Infra Logo" className="footer-logo" />
            </Link>
            {/* <p>
              Building the future with precision, durability, and innovation. Nilan Infra is a premier construction and infrastructure development company committed to structural safety, architectural excellence, and customer satisfaction.
            </p> */}
            <div className="social-links">
              <a href="https://www.instagram.com/nilaninfra/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram size={18} /></a>
              <a href="https://www.facebook.com/profile.php?id=61587188257291" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF size={16} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaXTwitter size={17} /></a>
              <a href="https://www.linkedin.com/in/nilan-infra-ltd-96398443a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn size={17} /></a>
            </div>
          </div>

          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-section services">
            <h3>Our Services</h3>
            <ul>
              <li><Link to="/residential-construction">Residential Construction</Link></li>
              <li><Link to="/commercial-construction">Commercial Construction</Link></li>
              <li><Link to="/property-development">Property Development</Link></li>
              <li><Link to="/renovation-remodeling">Renovation & Remodeling</Link></li>
              <li><Link to="/civil-infrastructure">Civil Infrastructure</Link></li>
              <li><Link to="/projects">Our Projects</Link></li>
            </ul>
          </div>

          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <div className="contact-info">
              <p><MapPin size={18} /> No. 62, Aringar Anna Co-operative Society Nagar, Vadavalli, Sri Lakshmi Nagar, Coimbatore – 641046, Tamil Nadu.</p>
              <p><Phone size={18} /> <a href="tel:+919443522285">+91 94435 22285</a></p>
              <p><Mail size={18} /> <a href="mailto:nilan.infralimited@gmail.com">nilan.infralimited@gmail.com</a></p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} Nilan Infra. All rights reserved.</p>
            <p className="footer-credit">
              Design and developed by <a href="https://tecnzo.com" target="_blank" rel="noopener noreferrer">Tecnzo Technologies Pvt Ltd</a>
            </p>
            <div className="footer-legal">
              <button
                type="button"
                className="footer-legal-btn"
                onClick={() => setIsPrivacyModalOpen(true)}
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* A4 Sheet Privacy Policy Popup Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </>
  );
};

export default Footer;
