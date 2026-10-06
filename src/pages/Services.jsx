import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Home as HomeIcon, Hammer, ClipboardList, PenTool, Activity, ArrowRight } from 'lucide-react';

// Importing assets for backgrounds
import heroImg from '../assets/nilan_hero.png';
import residentialImg from '../assets/nilan_residential.png';
import infrastructureImg from '../assets/nilan_infrastructure.png';
import blueprintImg from '../assets/nilan_blueprint.png';
import './Services.css';

const Services = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBooking = () => {
    navigate('/contact');
  };

  const services = [
    {
      id: 1,
      icon: <Building2 size={40} />,
      title: 'Commercial Construction',
      subtitle: 'Corporate & Retail Spaces',
      description: 'Design and construction of premium commercial structures, shopping malls, offices, and retail outlets built with safety, compliance, and structural efficiency.',
      image: infrastructureImg
    },
    {
      id: 2,
      icon: <HomeIcon size={40} />,
      title: 'Residential Villas',
      subtitle: 'Custom Homes & Apartments',
      description: 'Creating customized luxury villas, duplex homes, individual bungalows, and multi-family apartments using high-grade materials and structural execution.',
      image: residentialImg
    },
    {
      id: 3,
      icon: <Hammer size={40} />,
      title: 'Civil & Heavy Engineering',
      subtitle: 'Infrastructure Projects',
      description: 'Executing specialized concrete works, bridge building, layout development, heavy foundation piling, and urban drainage infrastructure.',
      image: heroImg
    },
    {
      id: 4,
      icon: <ClipboardList size={40} />,
      title: 'Project Management',
      subtitle: 'Execution & Quality Control',
      description: 'End-to-end execution support covering budget estimation, material sourcing, daily engineering supervision, safety monitoring, and quality audits.',
      image: blueprintImg
    },
    {
      id: 5,
      icon: <PenTool size={40} />,
      title: 'Interior Architecture',
      subtitle: 'Aesthetic Space Design',
      description: 'Premium space layout planning, interior styling, custom modular partitions, cabinetry work, false ceilings, and lighting coordination.',
      image: residentialImg
    },
    {
      id: 6,
      icon: <Activity size={40} />,
      title: 'Structural Consulting',
      subtitle: 'Stability & Layout Analysis',
      description: 'Comprehensive structural analysis, soil capacity test checks, blueprint reviews, stability certification, and government compliance drawing planning.',
      image: blueprintImg
    }
  ];

  return (
    <div className="services-page">

      {/* Services Hero */}
      <section className="services-hero">
        <div className="services-hero-bg">
          <img src={heroImg} alt="Nilan Infra Services" />
          <div className="hero-overlay"></div>
        </div>
        <div className="services-hero-content">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            OUR EXPERTISE
          </motion.h4>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="premium-title"
          >
            Services <span>We Provide</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Engineering safety, architectural excellence, and structural durability.
          </motion.p>
        </div>
      </section>

      {/* Services Detail List */}
      <section className="services-list section-padding">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="service-card-premium"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="service-card-image">
                  <img src={service.image} alt={service.title} />
                  <div className="service-icon-floating">
                    {service.icon}
                  </div>
                </div>
                <div className="service-card-info">
                  <span className="service-subtitle">{service.subtitle}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <button className="service-link" onClick={handleBooking}>
                    ENQUIRE NOW <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="services-cta section-padding">
        <div className="container">
          <motion.div
            className="cta-glass-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Plan Your <span>Next Project?</span></h2>
            <p>From architectural blueprints to quality execution, Nilan Infra is here to build it right.</p>
            <div className="cta-actions">
              <button className="btn-premium" onClick={handleBooking}>GET A FREE QUOTE</button>
              <button className="btn-secondary" onClick={() => navigate('/contact')}>CONTACT US</button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Services;
