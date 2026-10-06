import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import logo from '../assets/nilan.png';
import './Footer.css';

const Footer = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section brand">
          <Link to="/" className="footer-logo-link">
            <img src={logo} alt="Nilan Infra Logo" className="footer-logo" />
          </Link>
          <p>
            Building the future with precision, durability, and innovation. Nilan Infra is a premier construction and infrastructure development company committed to structural safety, architectural excellence, and customer satisfaction.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Instagram"><ArrowRight size={20} /></a>
            <a href="#" aria-label="Facebook"><ArrowRight size={20} /></a>
            <a href="#" aria-label="Twitter"><ArrowRight size={20} /></a>
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
            <li><Link to="/services">Commercial Construction</Link></li>
            <li><Link to="/services">Residential Villas</Link></li>
            <li><Link to="/services">Civil Engineering</Link></li>
            <li><Link to="/services">Project Management</Link></li>
            <li><Link to="/services">Interior Design</Link></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <p><MapPin size={18} /> Pollachi to Dharapuram road, Vasavi mahal opposite, Pollachi - 642001</p>
            <p><Phone size={18} /> +91 91596 66679</p>
            <p><Mail size={18} /> info@nilaninfra.com</p>
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
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
