import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Layers, 
  CheckCircle2, 
  Phone, 
  Calendar, 
  Compass, 
  Truck, 
  ShieldCheck, 
  TrendingUp, 
  Droplets, 
  Wrench, 
  HardHat,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import heroImg from '../assets/nilan_hero.png';
import infrastructureImg from '../assets/nilan_infrastructure.png';
import blueprintImg from '../assets/nilan_blueprint.png';
import actionNilanImg from '../assets/actionNilan.png';
import TypewriterHighlightBox from '../components/TypewriterHighlightBox';
import './ServiceDetail.css';

const CivilInfrastructure = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Civil Construction Company in Coimbatore | Nilan Infra";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Site development, foundations, concrete works, roads and drainage in Coimbatore. Nilan Infra builds the groundwork for homes and developments.'
    );
  }, []);

  const civilServices = [
    {
      title: 'Site Development',
      description: 'Every project starts with the site. We prepare the land, clear the site, coordinate earth work, level the surface, help with development planning and prepare the site for building. The ground is then ready to build on.',
      image: actionNilanImg
    },
    {
      title: 'Foundation',
      description: 'A building is only as strong as its foundation. Our foundation work includes ground preparation, help with foundation planning, building the base structure, reinforced concrete work and coordination.',
      image: blueprintImg
    },
    {
      title: 'Civil & Structure Work',
      description: 'Structure concrete work, reinforced concrete structures, civil engineering help, site coordination and building support work. We do it with good workmanship and well-organised work.',
      image: heroImg
    },
    {
      title: 'Roads & Access',
      description: 'Good access helps housing communities, commercial projects, industrial projects and property developments. We build internal roads, site entry roads, development roads and walkways, including preparing the surface.',
      image: infrastructureImg
    },
    {
      title: 'Drains & Services',
      description: 'Good drainage stops water from collecting, lowers the chance of damage to property, makes the site easier to use and helps other services work well.',
      image: heroImg
    },
    {
      title: 'Concrete Work',
      description: 'Concrete is very important in modern building. We do concrete work for foundations, structure parts, infrastructure and civil projects. We take care of strength and safety.',
      image: actionNilanImg
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

  const maxIndex = Math.max(0, civilServices.length - itemsPerView);

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
    { step: '1', title: 'Understand the Project', desc: 'The goals of the project, the site topography, services needed, and heavy machinery logistics.' },
    { step: '2', title: 'Check the Site', desc: 'Soil load-bearing capacity, access roads, drainage gradients, and existing utilities.' },
    { step: '3', title: 'Plan and Coordinate', desc: 'Engineering drawings, team deployment, heavy machinery scheduling, and material testing.' },
    { step: '4', title: 'Do the Work', desc: 'Precision concrete batching, vibration, curing, safety compliance, and steady execution.' },
    { step: '5', title: 'Check and Finish', desc: 'Strict load testing and QA inspections against structural standards before sign-off.' }
  ];

  const sectors = [
    {
      title: 'Housing Communities',
      desc: 'Internal bitumen and paver roads, stormwater drains, culverts, boundary piling, and underground service ducts that safeguard long-term community living.'
    },
    {
      title: 'Commercial Complexes',
      desc: 'Heavy foundation piling, high-load concrete floors, expansive parking lots, traffic ingress/egress ramps, and robust civil retaining structures.'
    },
    {
      title: 'Property Developments',
      desc: 'Comprehensive site clearing, cut-and-fill contour leveling, layout road networks, and master drainage systems enabling fast, reliable plot sales.'
    }
  ];

  const faqs = [
    {
      q: 'What civil services do you give?',
      a: 'Site development, foundation work, structure work, concrete work, drains, roads and support for development.'
    },
    {
      q: 'Do you build roads and drains for housing layouts?',
      a: 'Yes. We support housing and commercial developments with infrastructure planning and civil construction.'
    },
    {
      q: 'Do you do site development?',
      a: 'Yes. Preparing and developing the site is an important part of our work.'
    }
  ];

  return (
    <div className="service-detail-page">
      {/* Hero Section */}
      <section className="sd-hero">
        <div className="sd-hero-bg">
          <img src={heroImg} alt="Civil and Infrastructure Work in Coimbatore" />
          <div className="sd-hero-overlay"></div>
        </div>
        <div className="sd-hero-content">
          <span className="sd-hero-tag">CIVIL & HEAVY ENGINEERING</span>
          <h1 className="sd-hero-title">Civil and Infrastructure Work in Coimbatore</h1>
          <p className="sd-hero-subtitle">
            Behind every building, there is groundwork that must be done right: site preparation, foundations, roads, drains, and concrete engineering.
          </p>
        </div>
      </section>

      {/* Intro Overview Split */}
      <section className="sd-section sd-section-warm">
        <div className="sd-container">
          <div className="sd-overview-split">
            <div className="sd-overview-body">
              <span className="sd-eyebrow">THE UNSEEN BACKBONE</span>
              <h2 className="sd-overview-lead">
                When the groundwork is right, everything built on top works better and lasts longer.
              </h2>
              <p>
                Behind every building, housing project or commercial complex, there is groundwork that most people never see: land preparation, foundations, roads, drains and service lines. When this groundwork is right, everything built on top works better and lasts longer.
              </p>
              <p>
                Nilan Infra does civil construction and infrastructure work in Coimbatore for housing, commercial, industrial and property development projects. For us, infrastructure is the backbone of a project, not a small detail. Even a well-designed building can have problems for years if the civil work around it was done in a hurry.
              </p>
            </div>

            <TypewriterHighlightBox
              title="Why Infrastructure Decides Project Success:"
              items={[
                "Ensures site safety and stable soil foundation integrity",
                "Prevents water-logging and structural foundation erosion",
                "Smooth all-weather road access for residents and transport",
                "Protects capital investments from costly future ground repairs",
                "Forms the critical launchpad for rapid vertical construction"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Our Civil Construction Services - Taj-Style Auto-Scrolling Showcase */}
      <section className="sd-section sd-section-white sd-what-we-build-section">
        <div className="sd-container">

          {/* Taj-Style Split Header */}
          <div className="sd-taj-header">
            <div className="sd-taj-title-wrap">
              <span className="sd-taj-dash">—</span>
              <h2 className="sd-taj-title">
                INFRASTRUCTURE<br />WORKS
              </h2>
            </div>
            <p className="sd-taj-desc">
              From earth-moving and deep piling to structural concrete works and master drainage, Nilan Infra builds the groundwork for lasting structures.
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
                {civilServices.map((item, idx) => (
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

      {/* Infrastructure by Sector */}
      <section className="sd-section sd-section-warm">
        <div className="sd-container">
          <div className="sd-section-header">
            <span className="sd-eyebrow">SECTOR APPLICATION</span>
            <h2 className="sd-title">Infrastructure for Homes and Business Developments</h2>
          </div>

          <div className="sd-cards-grid">
            {sectors.map((sec, i) => (
              <div key={i} className="sd-feature-card">
                <HardHat size={28} color="#ea580c" />
                <h4>{sec.title}</h4>
                <p>{sec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Steps: How We Do Civil Work - Split Layout Without Boxes */}
      <section className="sd-section sd-section-white sd-process-section">
        <div className="sd-container">
          <div className="sd-process-split-layout">
            
            {/* Left Column: Heading & Description */}
            <div className="sd-process-left-col">
              <div className="luxury-action-title-block">
                <span className="luxury-action-dash">—</span>
                <div className="luxury-action-titles">
                  <h2>HOW WE EXECUTE</h2>
                  <h3>CIVIL WORKS</h3>
                </div>
              </div>
              <p className="sd-process-desc-left">
                A rigorous execution protocol from soil testing and machinery dispatch to load-testing and handover.
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
                Insights into soil conditions, heavy machinery coordination, drainage regulations, and civil schedules.
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
                <h3>ABOUT CIVIL & INFRASTRUCTURE?</h3>
              </div>
            </div>
            <div className="luxury-action-content-block">
              <p>
                Talk to our engineering team about foundations, roads, earthworks, drainage, or civil structures. We bring clear planning, honest talk and close attention to small details.
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

export default CivilInfrastructure;
