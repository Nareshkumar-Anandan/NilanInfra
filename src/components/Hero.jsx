import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import heroImg from '../assets/hero-Image.jpg';
import residentialImg from '../assets/nilan_residential.png';
import infrastructureImg from '../assets/nilan_infrastructure.png';
import './Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 0,
      title: 'QUALITY CONSTRUCTION',
      subtitle: 'NILAN INFRA',
      src: heroImg,
      description: 'We build durable homes, villas, commercial spaces, and infrastructure with attention to quality and detail.'
    },
    {
      id: 1,
      title: 'TRANSPARENT PROCESS',
      subtitle: 'CLEAR COMMUNICATION',
      src: infrastructureImg,
      description: 'Stay informed throughout every stage with clear communication, planning, and project updates.'
    },
    {
      id: 2,
      title: 'FROM IDEA TO REALITY',
      subtitle: 'TURNKEY SOLUTIONS',
      src: residentialImg,
      description: 'Whether you have a plot, a plan, or just an idea, we turn your vision into a completed project.'
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
    }, 8000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className="hero" id="home">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="hero-slide-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
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
                <div className="hero-btn-group">
                  <button className="slide-btn" onClick={() => window.location.href = '/services'}>
                    EXPLORE OUR SERVICES
                  </button>
                  <button className="slide-btn slide-btn-primary" onClick={() => window.location.href = '/contact'}>
                    GET FREE CONSULTATION
                  </button>
                </div>
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
