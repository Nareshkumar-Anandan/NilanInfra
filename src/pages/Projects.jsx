import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  CheckCircle2, 
  Phone, 
  Calendar, 
  Compass, 
  ShieldCheck, 
  Layers, 
  Sparkles, 
  Clock, 
  Tag 
} from 'lucide-react';
import heroImg from '../assets/nilan_hero.png';
import residentialImg from '../assets/nilan_residential.png';
import infrastructureImg from '../assets/nilan_infrastructure.png';
import blueprintImg from '../assets/nilan_blueprint.png';
import actionNilanImg from '../assets/actionNilan.png';
import TypewriterHighlightBox from '../components/TypewriterHighlightBox';
import './ServiceDetail.css';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Construction Projects in Coimbatore | Nilan Infra";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Browse Nilan Infra\'s residential, commercial, renovation and civil construction work in Coimbatore, from houses and villas to infrastructure.'
    );
  }, []);

  const projectList = [
    {
      id: 1,
      name: 'Skyline Commercial Landmark',
      type: 'Commercial Complex',
      category: 'commercial',
      location: 'Avinashi Road, Coimbatore',
      status: 'Finished',
      image: infrastructureImg,
      desc: 'Modern multi-storey retail and corporate hub built with energy-efficient glass facade and seismic-compliant concrete.'
    },
    {
      id: 2,
      name: 'Serene Haven Luxury Villa',
      type: 'Residential Villa',
      category: 'residential',
      location: 'Race Course, Coimbatore',
      status: 'Finished',
      image: residentialImg,
      desc: 'Custom-designed contemporary duplex villa featuring expansive courtyards, private swimming pool, and Italian marble finishes.'
    },
    {
      id: 3,
      name: 'Highway Overpass Engineering',
      type: 'Civil Infrastructure',
      category: 'civil',
      location: 'Pollachi Corridor, Coimbatore',
      status: 'Finished',
      image: heroImg,
      desc: 'Heavy reinforced civil engineering, high-tonnage bridge pier piling, and stormwater drainage infrastructure.'
    },
    {
      id: 4,
      name: 'Meadow Gated Community Layout',
      type: 'Property Development',
      category: 'property',
      location: 'Saravanampatti, Coimbatore',
      status: 'Ongoing',
      image: blueprintImg,
      desc: 'Master-planned 25-acre gated villa layout with underground utilities, paved roads, and integrated community amenities.'
    },
    {
      id: 5,
      name: 'Heritage Bungalow Restyling',
      type: 'Renovation & Remodeling',
      category: 'renovation',
      location: 'RS Puram, Coimbatore',
      status: 'Finished',
      image: actionNilanImg,
      desc: 'Structural strengthening, elevation redesign, and contemporary interior overhaul for an established family residence.'
    },
    {
      id: 6,
      name: 'Modern Executive Workspace',
      type: 'Commercial Office',
      category: 'commercial',
      location: 'Gandhipuram, Coimbatore',
      status: 'Ongoing',
      image: infrastructureImg,
      desc: 'Turnkey commercial building featuring ergonomic open plan layouts, smart electrical ducts, and high-load civil flooring.'
    }
  ];

  const filteredProjects = filter === 'all'
    ? projectList
    : projectList.filter((p) => p.category === filter);

  const steps = [
    { step: '1', title: 'Understand What You Need', desc: 'Goals, how you will use the space, the site conditions, the budget, and the scheduled timeline.' },
    { step: '2', title: 'Plan and Coordinate', desc: 'Detailed engineering drawings, team deployment, site logistical coordination, and quality standards.' },
    { step: '3', title: 'Build with Quality', desc: 'Good workmanship, structural strength, continuous trade coordination, and safety adherence.' },
    { step: '4', title: 'Check and Hand Over', desc: 'Thorough quality checklist inspections against agreed blueprints before handing over the keys.' }
  ];

  return (
    <div className="service-detail-page">
      {/* Hero Section */}
      <section className="sd-hero">
        <div className="sd-hero-bg">
          <img src={heroImg} alt="Construction Projects in Coimbatore" />
          <div className="sd-hero-overlay"></div>
        </div>
        <div className="sd-hero-content">
          <span className="sd-hero-tag">PORTFOLIO & EXECUTION</span>
          <h1 className="sd-hero-title">Our Projects in Coimbatore</h1>
          <p className="sd-hero-subtitle">
            Behind every project, there is an idea that became a plan, and a plan that became a place people live and work in every day.
          </p>
        </div>
      </section>

      {/* Intro Overview Split */}
      <section className="sd-section sd-section-warm">
        <div className="sd-container">
          <div className="sd-overview-split">
            <div className="sd-overview-body">
              <span className="sd-eyebrow">BUILT ON TRUST & PRECISION</span>
              <h2 className="sd-overview-lead">
                A project is more than cement, steel and finishing. It reflects client trust.
              </h2>
              <p>
                We work on homes, commercial buildings, renovations and civil works. On every one, we bring careful planning, good work and attention to small details.
              </p>
              <p>
                A project is not good only because it was finished. We look at how useful it is, how strong it is, its quality, whether the client is happy, and how it works for many years. Every site has its own problems, such as a difficult site or many teams working together. We solve them without letting quality go down.
              </p>
            </div>

            <TypewriterHighlightBox
              title="Why Clients Choose Nilan Infra:"
              items={[
                "Quality that you can verify at every construction milestone",
                "Practical engineering planning centered around your actual needs",
                "Open, honest talk during the entire lifecycle of the build",
                "Reliable timeline delivery through coordinated project management",
                "Long-term structural value in every square foot we build"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Featured Projects Gallery */}
      <section className="sd-section sd-section-white">
        <div className="sd-container">
          <div className="sd-section-header">
            <span className="sd-eyebrow">PORTFOLIO SHOWCASE</span>
            <h2 className="sd-title">Featured Projects</h2>
            <p className="sd-subtitle-text">
              Real projects delivered across Coimbatore: residential villas, commercial landmarks, and civil infrastructure.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {[
              { label: 'All Projects', value: 'all' },
              { label: 'Residential', value: 'residential' },
              { label: 'Commercial', value: 'commercial' },
              { label: 'Property Development', value: 'property' },
              { label: 'Renovation', value: 'renovation' },
              { label: 'Civil', value: 'civil' }
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                style={{
                  padding: '10px 22px',
                  borderRadius: '30px',
                  border: filter === tab.value ? '2px solid #ea580c' : '1px solid rgba(0,0,0,0.12)',
                  background: filter === tab.value ? '#ea580c' : '#ffffff',
                  color: filter === tab.value ? '#ffffff' : '#444444',
                  fontFamily: "var(--font-heading, 'Cinzel', serif)",
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="sd-cards-grid">
            <AnimatePresence>
              {filteredProjects.map((proj) => (
                <motion.div 
                  key={proj.id}
                  className="sd-build-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="sd-build-card-image" style={{ height: '220px' }}>
                    <img src={proj.image} alt={proj.name} />
                    <span 
                      style={{
                        position: 'absolute',
                        top: '14px',
                        right: '14px',
                        background: proj.status === 'Finished' ? '#16a34a' : '#ea580c',
                        color: '#ffffff',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '1.5px',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        textTransform: 'uppercase',
                        fontFamily: "var(--font-heading, 'Cinzel', serif)"
                      }}
                    >
                      {proj.status}
                    </span>
                  </div>
                  <div className="sd-build-card-body">
                    <span style={{ color: '#ea580c', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem', fontFamily: "var(--font-heading, 'Cinzel', serif)" }}>
                      {proj.type}
                    </span>
                    <h3>{proj.name}</h3>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#777777', fontSize: '0.85rem', marginBottom: '0.8rem' }}>
                      <MapPin size={15} color="#ea580c" />
                      <span>{proj.location}</span>
                    </p>
                    <p>{proj.desc}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4 Steps: How Every Project Runs - Split Layout Without Boxes */}
      <section className="sd-section sd-section-white sd-process-section">
        <div className="sd-container">
          <div className="sd-process-split-layout">
            
            {/* Left Column: Heading & Description */}
            <div className="sd-process-left-col">
              <div className="luxury-action-title-block">
                <span className="luxury-action-dash">—</span>
                <div className="luxury-action-titles">
                  <h2>HOW WE DELIVER</h2>
                  <h3>EVERY PROJECT</h3>
                </div>
              </div>
              <p className="sd-process-desc-left">
                A standardized quality protocol ensuring verified engineering integrity from initial consultation to final key handover.
              </p>
            </div>

            {/* Right Column: Steps Without Boxes */}
            <div className="sd-process-right-col">
              <div className="sd-process-steps-grid">
                {steps.map((st, i) => (
                  <div key={i} className="sd-process-step-item">
                    <div className="sd-process-step-head">
                      <span className="sd-process-step-num">0{st.step}</span>
                      <h4>{st.title}</h4>
                    </div>
                    <p className="sd-process-step-desc">{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom Luxury Split Action Layout */}
      <section className="services-luxury-action-section">
        <div className="sd-container">
          <div className="luxury-action-container">
            <div className="luxury-action-title-block">
              <span className="luxury-action-dash">—</span>
              <div className="luxury-action-titles">
                <h2>READY TO TALK.</h2>
                <h3>ABOUT YOUR UPCOMING PROJECT?</h3>
              </div>
            </div>
            <div className="luxury-action-content-block">
              <p>
                Talk to our team about your construction, property development, or civil infrastructure plan. We bring clear planning, honest talk and close attention to small details.
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

export default Projects;
