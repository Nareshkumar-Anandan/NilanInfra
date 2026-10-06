import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Importing assets
import commercialImg from '../assets/nilan_hero.png';
import residentialImg from '../assets/nilan_residential.png';
import infrastructureImg from '../assets/nilan_infrastructure.png';
import blueprintImg from '../assets/nilan_blueprint.png';
import './Gallery.css';

const Gallery = () => {
  const [filter, setFilter] = useState('all');
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
  }, []);

  const filteredMedia = filter === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === filter);

  return (
    <div className="gallery-page">

      {/* Gallery Hero */}
      <section className="gallery-hero">
        <div className="gallery-hero-bg">
          <img src={commercialImg} alt="Nilan Infra Projects Gallery" />
          <div className="hero-overlay"></div>
        </div>
        <div className="gallery-hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="premium-title"
          >
            Project <span>Gallery</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Visualizing the safety, precision, and design of our landmark projects.
          </motion.p>
        </div>
      </section>

      {/* Gallery Filter */}
      <section className="gallery-section section-padding">
        <div className="container">
          <div className="gallery-filters">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`} 
              onClick={() => setFilter('all')}
            >
              ALL PROJECTS
            </button>
            <button 
              className={`filter-btn ${filter === 'Residential' ? 'active' : ''}`} 
              onClick={() => setFilter('Residential')}
            >
              RESIDENTIAL
            </button>
            <button 
              className={`filter-btn ${filter === 'Commercial' ? 'active' : ''}`} 
              onClick={() => setFilter('Commercial')}
            >
              COMMERCIAL
            </button>
            <button 
              className={`filter-btn ${filter === 'Infrastructure' ? 'active' : ''}`} 
              onClick={() => setFilter('Infrastructure')}
            >
              INFRASTRUCTURE
            </button>
          </div>

          <motion.div 
            layout
            className="gallery-grid"
          >
            <AnimatePresence>
              {filteredMedia.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="gallery-item"
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

    </div>
  );
};

export default Gallery;
