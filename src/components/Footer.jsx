import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaXTwitter, FaLinkedinIn } from 'react-icons/fa6';
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
            <p><MapPin size={18} /> No.5,Mariyamman Kovil Street,
Vadavalli, Coimbatore-641 046, Tamil Nadu.</p>
            <p><Phone size={18} /> +91 94435 22285</p>
            <p><Mail size={18} /> nilan.infralimited@gmail.com</p>
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
