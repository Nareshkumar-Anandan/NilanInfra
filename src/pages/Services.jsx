import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Home as HomeIcon, Hammer, ClipboardList, Compass, Activity, ArrowRight } from 'lucide-react';

// Importing assets for backgrounds
import heroImg from '../assets/nilan_hero.png';
import residentialImg from '../assets/nilan_residential.png';
import infrastructureImg from '../assets/nilan_infrastructure.png';
import blueprintImg from '../assets/nilan_blueprint.png';
import actionNilanImg from '../assets/actionNilan.png';
import './Services.css';

const Services = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Our Construction Services | Nilan Infra Coimbatore";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Comprehensive construction and engineering services in Coimbatore by Nilan Infra: Residential villas, commercial buildings, heavy civil infrastructure, and turnkey project management.'
    );
  }, []);

  const handleBooking = () => {
    navigate('/contact');
  };

  const services = [
    {
      id: 1,
      icon: <HomeIcon size={24} />,
      title: 'Residential Construction',
      subtitle: 'Custom Homes & Luxury Villas',
      description: 'Creating customized luxury villas, duplex homes, independent houses, and multi-family apartments using high-grade materials and structural execution.',
      image: residentialImg,
      path: '/residential-construction'
    },
    {
      id: 2,
      icon: <Building2 size={24} />,
      title: 'Commercial Construction',
      subtitle: 'Corporate & Retail Spaces',
      description: 'Design and construction of premium commercial structures, shopping malls, offices, IT hubs, and retail outlets built with safety and efficiency.',
      image: infrastructureImg,
      path: '/commercial-construction'
    },
    {
      id: 3,
      icon: <Compass size={24} />,
      title: 'Property Development',
      subtitle: 'Layouts & Land Planning',
      description: 'End-to-end property development, residential layout planning, DTCP and RERA approvals, gated community works, and strategic land development.',
      image: blueprintImg,
      path: '/property-development'
    },
    {
      id: 4,
      icon: <Hammer size={24} />,
      title: 'Renovation Remodeling',
      subtitle: 'Restoration & Modernization',
      description: 'Complete structural renovations, elevation restyling, floor extensions, commercial interior upgrades, and modernization of existing properties.',
      image: actionNilanImg,
      path: '/renovation-remodeling'
    },
    {
      id: 5,
      icon: <Activity size={24} />,
      title: 'Civil Infrastructure',
      subtitle: 'Heavy Engineering Works',
      description: 'Executing specialized concrete works, bridge building, layout development, heavy foundation piling, and urban drainage infrastructure.',
      image: heroImg,
      path: '/civil-infrastructure'
    },
    {
      id: 6,
      icon: <ClipboardList size={24} />,
      title: 'Projects',
      subtitle: 'Turnkey Execution & Delivery',
      description: 'Comprehensive project management covering architectural design, budget estimations, material sourcing, on-site supervision, and timely handover.',
      image: blueprintImg,
      path: '/projects'
    }
  ];

  return (
    <div className="services-page">

      {/* Services Hero */}
      <section className="services-hero">
        <div className="services-hero-bg">
          <img src={heroImg} alt="Nilan Infra Services" />
          <div className="services-hero-overlay"></div>
        </div>
        <div className="services-hero-content">
          <span className="services-hero-tag">Our Expertise</span>
          <h1 className="services-hero-title">Services We Provide</h1>
          <p className="services-hero-subtitle">
            Engineering safety, architectural excellence, and structural durability across every build.
            From luxury residential villas to commercial spaces and heavy infrastructure, we deliver turnkey construction solutions tailored to your vision.
          </p>
        </div>
      </section>

      {/* Services Detail List */}
      <section className="services-list">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="service-card-minimal"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="service-card-image" onClick={() => navigate(service.path)}>
                  <img src={service.image} alt={service.title} />
                </div>
                <div className="service-card-info">
                  <h3 onClick={() => navigate(service.path)}>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-card-actions">
                    <button className="service-btn-enquire" onClick={handleBooking}>
                      ENQUIRE NOW
                    </button>
                    <Link to={service.path} className="service-link-readmore">
                      <span>READ MORE</span> <span className="arrow">&gt;</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section - Clean Luxury Split Layout */}
      <section className="services-luxury-action-section">
        <div className="container">
          <div className="luxury-action-container">
            <div className="luxury-action-title-block">
              <span className="luxury-action-dash">—</span>
              <div className="luxury-action-titles">
                <h2>READY TO TALK.</h2>
                <h3>ABOUT YOUR PLAN?</h3>
              </div>
            </div>
            <div className="luxury-action-content-block">
              <p>
                Talk to our team about your home, shop, renovation or property development plan. We bring the same care to every job: clear planning, honest talk and close attention to small details.
              </p>
              <Link to="/contact" className="luxury-action-link">
                <span>REQUEST A QUOTE</span>
                <span className="action-arrow">&gt;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
