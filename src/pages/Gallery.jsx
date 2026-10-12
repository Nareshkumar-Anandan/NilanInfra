import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Importing assets
import commercialImg from '../assets/nilan_hero.png';
import residentialImg from '../assets/nilan_residential.png';
import infrastructureImg from '../assets/nilan_infrastructure.png';
import blueprintImg from '../assets/nilan_blueprint.png';
import './Gallery.css';

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [mediaItems] = useState([
    { id: 1, type: 'photo', src: commercialImg, title: 'Commercial Office Landmark', category: 'Commercial' },
    { id: 2, type: 'photo', src: residentialImg, title: 'Luxury Modern Villa', category: 'Residential' },
    { id: 3, type: 'photo', src: infrastructureImg, title: 'Highway Flyover Engineering', category: 'Infrastructure' },
    { id: 4, type: 'photo', src: blueprintImg, title: 'Detailed Foundation Plan', category: 'Designs' },
    { id: 5, type: 'photo', src: residentialImg, title: 'Custom Villa Front Elevation', category: 'Residential' },
    { id: 6, type: 'photo', src: commercialImg, title: 'Corporate Complex Facade', category: 'Commercial' },
    { id: 7, type: 'photo', src: infrastructureImg, title: 'Concrete Bridge Support Structure', category: 'Infrastructure' }
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Project Gallery | Nilan Infra - Construction & Architecture in Coimbatore";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Explore our portfolio of completed and ongoing residential villas, commercial landmarks, civil engineering, and architectural designs across Coimbatore by Nilan Infra.'
    );
  }, []);

  const filteredMedia = filter === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === filter);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev === 0 ? filteredMedia.length - 1 : prev - 1));
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev === filteredMedia.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredMedia.length]);

  const activePhoto = lightboxIndex !== null ? filteredMedia[lightboxIndex] : null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? filteredMedia.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === filteredMedia.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="gallery-page">

      {/* Gallery Hero */}
      <section className="gallery-hero">
        <div className="gallery-hero-bg">
          <img src={commercialImg} alt="Nilan Infra Projects Gallery" />
          <div className="gallery-hero-overlay"></div>
        </div>
        <div className="gallery-hero-content">
          <span className="gallery-hero-tag">Project Showcase</span>
          <h1 className="gallery-hero-title">Project Gallery</h1>
          <p className="gallery-hero-subtitle">
            Visualizing the safety, precision, and design of our landmark projects across Coimbatore.
          </p>
        </div>
      </section>

      {/* Gallery Filter */}
      <section className="gallery-section section-padding">
        <div className="container">
          <div className="gallery-filters">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`} 
              onClick={() => {
                setFilter('all');
                setLightboxIndex(null);
              }}
            >
              ALL PROJECTS
            </button>
            <button 
              className={`filter-btn ${filter === 'Residential' ? 'active' : ''}`} 
              onClick={() => {
                setFilter('Residential');
                setLightboxIndex(null);
              }}
            >
              RESIDENTIAL
            </button>
            <button 
              className={`filter-btn ${filter === 'Commercial' ? 'active' : ''}`} 
              onClick={() => {
                setFilter('Commercial');
                setLightboxIndex(null);
              }}
            >
              COMMERCIAL
            </button>
            <button 
              className={`filter-btn ${filter === 'Infrastructure' ? 'active' : ''}`} 
              onClick={() => {
                setFilter('Infrastructure');
                setLightboxIndex(null);
              }}
            >
              INFRASTRUCTURE
            </button>
          </div>

          <motion.div 
            layout
            className="gallery-grid"
          >
            <AnimatePresence>
              {filteredMedia.map((item, index) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="gallery-item"
                  onClick={() => setLightboxIndex(index)}
                  title="Click to view full photo"
                >
                  <div className="media-wrapper">
                    <img src={item.src} alt={item.title} />
                    <div className="media-info">
                      <h3>{item.title}</h3>
                      <p>{item.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Center Lightbox Modal Overlay */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            className="gallery-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button */}
            <button
              className="lightbox-close-btn"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close photo preview"
              type="button"
            >
              <X size={26} />
            </button>

            {/* Left Nav Button */}
            {filteredMedia.length > 1 && (
              <button
                className="lightbox-nav-btn lightbox-prev-btn"
                onClick={handlePrev}
                aria-label="Previous photo"
                type="button"
              >
                <ChevronLeft size={32} />
              </button>
            )}

            {/* Center Content Modal Card */}
            <motion.div
              className="lightbox-card"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lightbox-image-wrap">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  className="lightbox-image"
                />

                {/* Photo Caption Overlay on Hover */}
                <div className="lightbox-caption">
                  <div className="lightbox-caption-text">
                    <span className="lightbox-category">{activePhoto.category}</span>
                    <h3 className="lightbox-title">{activePhoto.title}</h3>
                  </div>
                  <div className="lightbox-counter">
                    {lightboxIndex + 1} / {filteredMedia.length}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Nav Button */}
            {filteredMedia.length > 1 && (
              <button
                className="lightbox-nav-btn lightbox-next-btn"
                onClick={handleNext}
                aria-label="Next photo"
                type="button"
              >
                <ChevronRight size={32} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Gallery;
