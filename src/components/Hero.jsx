import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import heroImg from '../assets/nilan_hero.png';
import residentialImg from '../assets/nilan_residential.png';
import infrastructureImg from '../assets/nilan_infrastructure.png';
import './Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 0,
      title: 'NILAN INFRA',
      subtitle: 'Building the Future',
      src: heroImg,
      description: 'Premier construction, civil engineering, and infrastructure development solutions.'
    },
    {
      id: 1,
      title: 'COMMERCIAL COMPLEXES',
      subtitle: 'Precision & Excellence',
      src: infrastructureImg,
      description: 'Engineered commercial spaces and civil works built to last for generations.'
    },
    {
      id: 2,
      title: 'RESIDENTIAL VILLAS',
      subtitle: 'Aesthetic Living Spaces',
      src: residentialImg,
      description: 'Luxurious apartments, villas, and custom-designed individual houses.'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero" id="home">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="hero-slide-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-image-wrapper">
            <img
              src={slides[currentSlide].src}
              alt={slides[currentSlide].title}
              className="hero-media"
            />
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <motion.h4
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="slide-subtitle"
              >
                {slides[currentSlide].subtitle}
              </motion.h4>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="slide-title"
              >
                {slides[currentSlide].title}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="slide-details"
              >
                <p>{slides[currentSlide].description}</p>
                <button className="slide-btn" onClick={() => window.location.href = '/services'}>
                  EXPLORE OUR SERVICES
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <button className="hero-nav-btn prev" onClick={prevSlide}>
        <ChevronLeft size={36} />
      </button>
      <button className="hero-nav-btn next" onClick={nextSlide}>
        <ChevronRight size={36} />
      </button>

      {/* Indicators */}
      <div className="hero-indicators">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
