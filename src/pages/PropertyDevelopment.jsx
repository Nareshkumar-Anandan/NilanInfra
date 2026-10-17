import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Compass, 
  MapPin, 
  CheckCircle2, 
  Phone, 
  Calendar, 
  Layers, 
  TrendingUp, 
  ShieldCheck, 
  Home, 
  Building2, 
  Trees,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import blueprintImg from '../assets/nilan_blueprint.png';
import residentialImg from '../assets/nilan_residential.png';
import infrastructureImg from '../assets/nilan_infrastructure.png';
import heroImg from '../assets/nilan_hero.png';
import TypewriterHighlightBox from '../components/TypewriterHighlightBox';
import './ServiceDetail.css';

const PropertyDevelopment = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Property Development Company in Coimbatore | Nilan Infra";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Nilan Infra develops residential layouts, villa communities, apartments and commercial properties in Coimbatore, with construction planned in from day one.'
    );
  }, []);

  const developments = [
    {
      title: 'Housing Projects',
      description: 'Housing layouts, housing projects, villa communities, apartments and the services they need. We think about building quality and future value.',
      image: residentialImg
    },
    {
      title: 'Villa Communities',
      description: 'Villa communities are for home owners who want privacy and comfort. They need good use of land, planned services, good road access and good building. We plan all of these together.',
      image: residentialImg
    },
    {
      title: 'Apartment Projects',
      description: 'Apartments need a balance between using space well and comfortable living. We look at easy access, common facilities, services, building quality and care. So the project stays useful and wanted.',
      image: infrastructureImg
    },
    {
      title: 'Commercial Property',
      description: 'Office projects, shops, commercial complexes and mixed-use projects. Their success depends on the place, the way in, a useful design, services and building quality.',
      image: heroImg
    },
    {
      title: 'Mixed-Use Projects',
      description: 'Homes, shops and community spaces in one project can give more ease, better use of land and a better community. We make sure each part works well with the others.',
      image: infrastructureImg
    },
    {
      title: 'Land Development',
      description: 'Land alone does not create value. Planning, services, access and building knowledge do. We help with land development through site study, planning, services, construction help and doing the work.',
      image: blueprintImg
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, developments.length - itemsPerView);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const steps = [
    { step: '1', title: 'Understand Your Goals', desc: 'What you want, who will use it, what the market needs, what the site offers and what you expect from the investment.' },
    { step: '2', title: 'Check the Site', desc: 'Size, way in, what is there now, services needed and whether it can be done.' },
    { step: '3', title: 'Plan the Project', desc: 'Layout, services, building points, engineering team and master plan.' },
    { step: '4', title: 'Build & Do the Work', desc: 'Good work, joined-up services and close checking against the plan.' },
    { step: '5', title: 'Finish & Create Value', desc: 'Success means places that stay useful and valuable for owners, residents, and businesses.' }
  ];

  const questionsBefore = [
    'Is the geographical location and road connectivity right?',
    'What is the core target demographic and project purpose?',
    'Who will live, work, or invest in this community?',
    'What civil services, drainage, and utilities does it need?',
    'How can the property sustain and appreciate its value long-term?',
    'Is there strategic room for phased future growth?'
  ];

  const faqs = [
    {
      q: 'What property projects do you take?',
      a: 'Housing projects, villa projects, apartments, commercial property, mixed-use projects and land development.'
    },
    {
      q: 'Do you do both construction and development?',
      a: 'Yes. Our building experience helps us support a project from planning to finishing.'
    },
    {
      q: 'Do you work with land owners and investors?',
      a: 'Yes. We talk about chances based on what is possible for the project and what you want.'
    }
  ];

  return (
    <div className="service-detail-page">
      {/* Hero Section */}
      <section className="sd-hero">
        <div className="sd-hero-bg">
          <img src={blueprintImg} alt="Real Estate and Property Development in Coimbatore" />
          <div className="sd-hero-overlay"></div>
        </div>
        <div className="sd-hero-content">
          <span className="sd-hero-tag">PROPERTY & LAND DEVELOPMENT</span>
          <h1 className="sd-hero-title">Real Estate and Property Development in Coimbatore</h1>
          <p className="sd-hero-subtitle">
            Good property development starts long before the first wall is built. It starts with the land, the place, and its lasting future value.
          </p>
        </div>
      </section>

      {/* Intro Overview Split */}
      <section className="sd-section sd-section-warm">
        <div className="sd-container">
          <div className="sd-overview-split">
            <div className="sd-overview-body">
              <span className="sd-eyebrow">CONSTRUCTION-FIRST DEVELOPMENT</span>
              <h2 className="sd-overview-lead">
                Because we build, we know what is practical, durable, and cost-effective.
              </h2>
              <p>
                At Nilan Infra, we look at development from the construction side. Because we build, we know early what is practical, what it will cost to build and what will need care later. We work with land owners, investors, developers and businesses. We turn plots and ideas into housing, commercial and mixed-use projects.
              </p>
              <p>
                Many projects get into trouble because building and services were thought of last. We do both construction and development. So the decisions on layout, roads, drains, water and power are made with the building work in mind. You get fewer surprises and a project that can really be finished.
              </p>
            </div>

            <TypewriterHighlightBox
              title="Questions We Ask Before We Build:"
              items={questionsBefore}
            />
          </div>
        </div>
      </section>

      {/* What We Develop - Taj-Style Auto-Scrolling Showcase */}
      <section className="sd-section sd-section-white sd-what-we-build-section">
        <div className="sd-container">

          {/* Taj-Style Split Header */}
          <div className="sd-taj-header">
            <div className="sd-taj-title-wrap">
              <span className="sd-taj-dash">—</span>
              <h2 className="sd-taj-title">
                WHAT WE<br />DEVELOP
              </h2>
            </div>
            <p className="sd-taj-desc">
              Transforming raw acreage into thriving residential communities and high-yield commercial assets with construction planned from day one.
            </p>
          </div>

          {/* Auto-Scrolling Carousel with Side-Centered Arrows */}
          <div
            className="sd-taj-carousel-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Left Centered Arrow */}
            <button
              className="sd-carousel-arrow-side prev"
              onClick={handlePrev}
              aria-label="Previous slide"
            >
              <ChevronLeft size={22} />
            </button>

            <div className="sd-taj-carousel-track-wrapper">
              <div
                className="sd-taj-carousel-track"
                style={{
                  transform: `translateX(-${carouselIndex * (100 / itemsPerView)}%)`
                }}
              >
                {developments.map((item, idx) => (
                  <div
                    key={idx}
                    className="sd-taj-carousel-slide"
                    style={{ flex: `0 0 ${100 / itemsPerView}%` }}
                  >
                    <div className="sd-taj-card">
                      <div className="sd-taj-card-img">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="sd-taj-card-box">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Centered Arrow */}
            <button
              className="sd-carousel-arrow-side next"
              onClick={handleNext}
              aria-label="Next slide"
            >
              <ChevronRight size={22} />
            </button>
          </div>

        </div>
      </section>

      {/* Infrastructure: The Base of a Good Project */}
      <section className="sd-section sd-section-warm">
        <div className="sd-container">
          <div className="sd-section-header">
            <span className="sd-eyebrow">ESSENTIAL FOUNDATIONS</span>
            <h2 className="sd-title">Infrastructure: The Base of a Good Project</h2>
            <p className="sd-subtitle-text">
              Services and access are engineered from day one, not treated as an afterthought.
            </p>
          </div>

          <div className="sd-features-grid">
            <div className="sd-feature-card">
              <Compass size={28} color="#ea580c" />
              <h4>Roads & Access</h4>
              <p>Roads give access, establish traffic flow, and connect communities efficiently.</p>
            </div>
            <div className="sd-feature-card">
              <Layers size={28} color="#ea580c" />
              <h4>Drains & Protection</h4>
              <p>Engineered storm drains protect buildings, roads, and investments from flooding.</p>
            </div>
            <div className="sd-feature-card">
              <MapPin size={28} color="#ea580c" />
              <h4>Utilities Planning</h4>
              <p>Underground water lines, power ducts, and sewage lines coordinated in proper order.</p>
            </div>
            <div className="sd-feature-card">
              <TrendingUp size={28} color="#ea580c" />
              <h4>Future Growth</h4>
              <p>Provisions for future road expansion and increased community capacity planned early.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Steps: How We Develop - Split Layout Without Boxes */}
      <section className="sd-section sd-section-white sd-process-section">
        <div className="sd-container">
          <div className="sd-process-split-layout">
            
            {/* Left Column: Heading & Description */}
            <div className="sd-process-left-col">
              <div className="luxury-action-title-block">
                <span className="luxury-action-dash">—</span>
                <div className="luxury-action-titles">
                  <h2>HOW WE DEVELOP</h2>
                  <h3>A PROPERTY</h3>
                </div>
              </div>
              <p className="sd-process-desc-left">
                A structured roadmap taking your project from feasibility study to successful, high-value delivery.
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

      {/* FAQ Section - Split Layout with Heading on Right */}
      <section className="sd-section sd-section-white sd-faq-section">
        <div className="sd-container">
          <div className="sd-faq-split-layout">
            
            {/* Left Column: FAQ List */}
            <div className="sd-faq-left-col">
              <div className="sd-faq-list">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`sd-faq-item ${isOpen ? 'sd-faq-item-open' : ''}`}
                    >
                      <button
                        type="button"
                        className="sd-faq-question"
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                      >
                        <div className="sd-faq-q-left">
                          <span className="sd-faq-q-badge">Q.</span>
                          <span className="sd-faq-q-text">{faq.q}</span>
                        </div>
                        <span className={`sd-faq-toggle-icon ${isOpen ? 'open' : ''}`}>
                          <ChevronDown size={19} />
                        </span>
                      </button>
                      {isOpen && (
                        <div className="sd-faq-answer-wrapper">
                          <p className="sd-faq-answer">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Heading styled like How We Build */}
            <div className="sd-faq-right-col">
              <div className="luxury-action-title-block">
                <span className="luxury-action-dash">—</span>
                <div className="luxury-action-titles">
                  <h2>FREQUENTLY ASKED</h2>
                  <h3>QUESTIONS</h3>
                </div>
              </div>
              <p className="sd-faq-desc-right">
                Key insights into land zoning, approvals, investor partnerships, and development timelines.
              </p>
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
                <h3>ABOUT YOUR PROPERTY DEVELOPMENT?</h3>
              </div>
            </div>
            <div className="luxury-action-content-block">
              <p>
                Talk to our team about your land parcel, housing layout, villa community or mixed-use project. We bring the same care to every job: clear planning, honest talk and close attention to small details.
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

export default PropertyDevelopment;
