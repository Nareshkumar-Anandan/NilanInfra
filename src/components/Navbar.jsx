import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/nilan.png';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'GALLERY', path: '/gallery' },
    { name: 'SERVICES', path: '/services' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const isHome = location.pathname === '/';

  return (
    <nav className={`navbar ${isScrolled && !isMobileMenuOpen ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="logo" onClick={() => setIsMobileMenuOpen(false)}>
          <img src={logo} alt="Nilan Infra Logo" />
        </Link>

        {/* Desktop Menu */}
        <div className="nav-menu desktop">
          {navLinks.map((link) => (
            link.path.startsWith('/#') && isHome ? (
              <a key={link.name} href={link.path.substring(1)} className="nav-link">
                {link.name}
              </a>
            ) : (
              <Link key={link.name} to={link.path} className="nav-link">
                {link.name}
              </Link>
            )
          ))}

          <div className="nav-actions">
            <Link to="/contact" className="btn-premium">
              GET A QUOTE
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        {navLinks.map((link) => (
          link.path.startsWith('/#') && isHome ? (
            <a
              key={link.name}
              href={link.path.substring(1)}
              className="mobile-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ) : (
            <Link
              key={link.name}
              to={link.path}
              className="mobile-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          )
        ))}

        <div className="mobile-actions">
          <Link
            to="/contact"
            className="btn-premium"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ display: 'inline-block', textAlign: 'center', width: '100%' }}
          >
            GET A QUOTE
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
