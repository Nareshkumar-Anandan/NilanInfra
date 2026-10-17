import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Briefcase, 
  CheckCircle2, 
  Phone, 
  Calendar, 
  TrendingUp, 
  ShieldCheck, 
  Layers, 
  Users, 
  Store, 
  Compass, 
  Zap,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import infrastructureImg from '../assets/nilan_infrastructure.png';
import heroImg from '../assets/nilan_hero.png';
import blueprintImg from '../assets/nilan_blueprint.png';
import residentialImg from '../assets/nilan_residential.png';
import TypewriterHighlightBox from '../components/TypewriterHighlightBox';
import './ServiceDetail.css';

const CommercialConstruction = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Commercial Construction Company in Coimbatore | Nilan Infra";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Nilan Infra builds offices, showrooms, retail spaces and commercial complexes in Coimbatore, planned carefully for durability and daily use.'
    );
  }, []);

  const buildTypes = [
    {
      title: 'Offices',
      description: 'Company offices, business centres and work places with useful layouts, a strong structure, comfortable rooms, meeting areas, easy walking space, and room to change later.',
      image: infrastructureImg
    },
    {
      title: 'Showrooms',
      description: 'A showroom is often the first place a customer meets your brand. We build showrooms with a good look, good display areas, easy customer movement, clear visibility, easy access and strength.',
      image: residentialImg
    },
    {
      title: 'Shops & Retail Spaces',
      description: 'Shops, shopping spaces, multi-brand stores and retail buildings, planned to work well for both customers and owners.',
      image: infrastructureImg
    },
    {
      title: 'Commercial Complexes',
      description: 'A complex has many businesses and shares services. We handle the planning, the space for each shop or office, the services and the structure. We also think about care and repair in future.',
      image: heroImg
    },
    {
      title: 'Institution Buildings',
      description: 'Buildings for public, education and other organisations need useful layouts, strong building and easy movement of people. We build as the use of the building and the project need.',
      image: blueprintImg
    },
    {
      title: 'Multi-Use Buildings',
      description: 'Buildings with shops, offices and shared spaces together. We build them so they can change when your needs change.',
      image: infrastructureImg
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

  const maxIndex = Math.max(0, buildTypes.length - itemsPerView);

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
    { step: '1', title: 'Understand Your Business', desc: 'Your goals, your daily work, how you will use the space and what you expect.' },
    { step: '2', title: 'Check the Site', desc: 'Size, way in, what is already there, services and whether building is possible.' },
    { step: '3', title: 'Plan', desc: 'Work, time, team, coordination and materials.' },
    { step: '4', title: 'Build', desc: 'Good work, a strong structure, safety, and checking progress against the approved plan.' },
    { step: '5', title: 'Finish', desc: 'Floor, paint, fittings and small details that make the building professional and easy to use.' },
    { step: '6', title: 'Check & Hand Over', desc: 'We check the finished building against the project needs before we hand over.' }
  ];

  const differences = [
    { title: 'Business First', desc: 'We see a commercial building as an investment that helps your work and business growth.' },
    { title: 'Same Quality Everywhere', desc: 'Consistent engineering integrity from the sub-grade foundation to the final electrical finish.' },
    { title: 'Practical Planning', desc: 'Thorough planning leads to superior workmanship and avoids unnecessary job delays.' },
    { title: 'Clear Talk', desc: 'Transparent milestone reporting so you always know exactly how work is moving.' },
    { title: 'Good Coordination', desc: 'Managing electrical, plumbing, HVAC, and civil trades in optimal sequence.' },
    { title: 'Built for Heavy Use', desc: 'Engineered with high-grade materials to easily endure heavy daily footfall.' }
  ];

  const clientTypes = [
    'Company Offices & IT Workspaces',
    'Shops, Showrooms & Retail Outlets',
    'Schools, Colleges & Training Centers',
    'Commercial Complexes & Business Centers',
    'Commercial Developers & Real Estate Firms',
    'Professional Service Firms & Consultancies'
  ];

  const faqs = [
    {
      q: 'What commercial projects do you do?',
      a: 'Offices, showrooms, shops, commercial complexes, institution buildings and other business buildings.'
    },
    {
      q: 'Do you do full turnkey work?',
      a: 'We can take a project from planning to handover, or do only the parts you need. Tell us what you need and we will say clearly what we can do.'
    },
    {
      q: 'Can you handle big commercial projects?',
      a: 'We work on commercial projects of different sizes. Tell us the work, and we will say honestly if we are the right fit.'
    },
    {
      q: 'Do you renovate commercial buildings?',
      a: 'Yes. We renovate offices, showrooms, shops and other commercial buildings.'
    }
  ];

  return (
    <div className="service-detail-page">
      {/* Hero Section */}
      <section className="sd-hero">
        <div className="sd-hero-bg">
          <img src={infrastructureImg} alt="Commercial Construction in Coimbatore" />
          <div className="sd-hero-overlay"></div>
        </div>
        <div className="sd-hero-content">
          <span className="sd-hero-tag">COMMERCIAL EXPERTISE</span>
          <h1 className="sd-hero-title">Commercial Construction in Coimbatore</h1>
          <p className="sd-hero-subtitle">
            A commercial building is where your business happens. Staff work there. Customers walk in. We plan and build spaces that elevate your business.
          </p>
        </div>
      </section>

      {/* Intro Overview Split */}
      <section className="sd-section sd-section-warm">
        <div className="sd-container">
          <div className="sd-overview-split">
            <div className="sd-overview-body">
              <span className="sd-eyebrow">SPACES THAT HELP YOUR BUSINESS</span>
              <h2 className="sd-overview-lead">
                Every commercial project has its own use. First, we understand your operations.
              </h2>
              <p>
                A commercial building is where your business happens. Staff work there. Customers walk in. How it is built changes how smoothly everything runs. Nilan Infra builds offices, showrooms, shops, commercial complexes and institution buildings in Coimbatore.
              </p>
              <p>
                A modern business needs a useful layout, a comfortable place to work, a professional look, strength, room to grow and easy access for customers. A showroom needs easy movement for customers. An office needs a productive environment. A complex needs shared services and smart circulation.
              </p>
            </div>

            <TypewriterHighlightBox
              title="Before We Start, We Evaluate:"
              items={[
                "What your business needs and how the building will be used",
                "Your daily team workflow and customer journey",
                "Your plans for team or departmental expansion",
                "Your capital budget and payback horizon",
                "Your site accessibility, parking, and frontage"
              ]}
            />
          </div>
        </div>
      </section>

      {/* What We Build - Taj-Style Auto-Scrolling Showcase */}
      <section className="sd-section sd-section-white sd-what-we-build-section">
        <div className="sd-container">

          {/* Taj-Style Split Header */}
          <div className="sd-taj-header">
            <div className="sd-taj-title-wrap">
              <span className="sd-taj-dash">—</span>
              <h2 className="sd-taj-title">
                WHAT WE<br />BUILD
              </h2>
            </div>
            <p className="sd-taj-desc">
              From corporate headquarters and luxury retail showrooms to commercial complexes and institutional facilities, Nilan Infra builds around your business goals.
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
                {buildTypes.map((item, idx) => (
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

      {/* 6 Steps: How We Build - Split Layout Without Boxes */}
      <section className="sd-section sd-section-white sd-process-section">
        <div className="sd-container">
          <div className="sd-process-split-layout">
            
            {/* Left Column: Heading & Description */}
            <div className="sd-process-left-col">
              <div className="luxury-action-title-block">
                <span className="luxury-action-dash">—</span>
                <div className="luxury-action-titles">
                  <h2>HOW WE BUILD</h2>
                  <h3>YOUR PROJECT</h3>
                </div>
              </div>
              <p className="sd-process-desc-left">
                Coordinating multiple engineering disciplines to eliminate downtime and project delay.
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

      {/* What Makes Us Different */}
      <section className="sd-section sd-section-white">
        <div className="sd-container">
          <div className="sd-section-header">
            <span className="sd-eyebrow">THE NILAN ADVANTAGE</span>
            <h2 className="sd-title">What Makes Us Different</h2>
          </div>

          <div className="sd-features-grid">
            {differences.slice(0, 4).map((diff, i) => (
              <div key={i} className="sd-feature-card">
                <TrendingUp size={28} color="#ea580c" />
                <h4>{diff.title}</h4>
                <p>{diff.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Build For */}
      <section className="sd-section sd-section-warm">
        <div className="sd-container">
          <div className="sd-section-header">
            <span className="sd-eyebrow">CLIENT SECTORS</span>
            <h2 className="sd-title">Who We Build For</h2>
            <p className="sd-subtitle-text">
              Each sector has unique functional demands. We study your domain before laying the foundation.
            </p>
          </div>

          <div className="sd-cards-grid cols-2">
            {clientTypes.map((client, i) => (
              <div key={i} className="sd-feature-card" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Briefcase size={22} color="#ea580c" style={{ flexShrink: 0 }} />
                <h4 style={{ margin: 0, fontSize: '1.05rem' }}>{client}</h4>
              </div>
            ))}
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
                Answers to common commercial queries regarding approvals, turnkey scopes, and delivery schedules.
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
                <h3>ABOUT YOUR COMMERCIAL PLAN?</h3>
              </div>
            </div>
            <div className="luxury-action-content-block">
              <p>
                Talk to our team about your office, showroom, shopping complex or institution building. We bring clear planning, honest talk and close attention to small details.
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

export default CommercialConstruction;
