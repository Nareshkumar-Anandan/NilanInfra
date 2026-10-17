import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  ArrowRight,
  Phone,
  Calendar,
  Compass,
  ShieldCheck,
  Layers,
  Clock,
  DollarSign,
  Home,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import residentialImg from '../assets/nilan_residential.png';
import heroImg from '../assets/nilan_hero.png';
import blueprintImg from '../assets/nilan_blueprint.png';
import infrastructureImg from '../assets/nilan_infrastructure.png';
import heroBgImg from '../assets/hero-Image.jpg';
import actionNilanImg from '../assets/actionNilan.png';
import TypewriterHighlightBox from '../components/TypewriterHighlightBox';
import './ServiceDetail.css';

const ResidentialConstruction = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "House & Villa Construction in Coimbatore | Nilan Infra";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Build your house, villa or apartment project with Nilan Infra. Clear planning, quality workmanship and regular updates across Coimbatore.'
    );
  }, []);

  const buildTypes = [
    {
      title: 'Individual House',
      description: 'When you build your own house, you decide how it looks. We check the site, plan the work, build the structure, do the civil work, and help with finishing. It can be a small family home or a big house.',
      image: residentialImg
    },
    {
      title: 'Villa',
      description: 'A villa needs extra care in layout, space and finish. We plan each one in detail. You get wide rooms, comfortable living spaces, rich quality and long life, with the privacy and comfort a villa owner expects.',
      image: heroBgImg
    },
    {
      title: 'Apartment',
      description: 'An apartment building has many parts: structure, civil work, electrical work, plumbing, common areas and finishing. We join all of them well, so the work goes smoothly and the building is easy to live in for many years.',
      image: infrastructureImg
    },
    {
      title: 'Residential Building',
      description: 'For home owners, investors and developers, we build residential buildings with useful layouts, a strong structure and good work. We also think about future repair and care.',
      image: actionNilanImg
    },
    {
      title: 'New Home',
      description: 'If you are building for the first time, questions on design, budget, time, materials and contractors can feel too many. We explain each step in simple words. We handle the work, so you never have to guess.',
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

  const planningPillars = [
    {
      id: 'site',
      tab: 'THE SITE',
      icon: Compass,
      title: 'The Site',
      lead: 'Every plot is different, and soil elevation affects the structural foundation work.',
      desc: 'Before any structural engineering starts, we assess ground levels, soil bearing capacity, approach road access, and groundwater depth. This ensures your foundation is built strong without excess cost or ground settling issues.',
      image: infrastructureImg
    },
    {
      id: 'budget',
      tab: 'THE BUDGET',
      icon: DollarSign,
      title: 'The Budget',
      lead: 'When you know the itemized cost at the start, there is no financial shock later.',
      desc: 'We provide an open, transparent Bill of Quantities (BOQ) with clear material grades, quantities, and milestone schedules. You know what you pay for at every construction stage with zero surprise costs.',
      image: blueprintImg
    },
    {
      id: 'worklist',
      tab: 'THE WORK LIST',
      icon: Layers,
      title: 'The Work List',
      lead: 'When we decide early what is included in the scope, the build stays smooth.',
      desc: 'We document every single deliverable — from foundation depth and reinforcement steel brands to electrical conduits, tile allowances, and sanitary fixtures — eliminating guesswork and mid-project confusion.',
      image: residentialImg
    },
    {
      id: 'future',
      tab: 'FUTURE NEEDS',
      icon: Clock,
      title: 'Future Needs',
      lead: 'Planning for what your family may need in five or ten years, such as an extra floor.',
      desc: 'We design column foundations, plumbing risers, and electrical conduits with future vertical or horizontal expansions in mind. If your family grows or you decide to add a floor later, the structural foundation is already engineered to support it.',
      image: heroBgImg
    }
  ];

  // Default to first pillar (THE SITE)
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  const handlePrevPillar = () => {
    setActivePillarIndex(prev => (prev === 0 ? planningPillars.length - 1 : prev - 1));
  };

  const handleNextPillar = () => {
    setActivePillarIndex(prev => (prev === planningPillars.length - 1 ? 0 : prev + 1));
  };

  const steps = [
    { step: '1', title: 'First Talk', desc: 'We talk about your dream, your plot location, your budget and what you need.' },
    { step: '2', title: 'Understand the Site', desc: 'We check the size, the way in, the land and whether building is possible.' },
    { step: '3', title: 'Plan', desc: 'We decide the work, time, team and materials together.' },
    { step: '4', title: 'Build', desc: 'We focus on good work, a strong structure, safety and steady progress. We do not cut corners on quality.' },
    { step: '5', title: 'Finishing', desc: 'Floor, paint, fittings and inside finish, with close attention to small details.' },
    { step: '6', title: 'Hand Over', desc: 'We check the house against what we agreed. Then you can move in with confidence.' }
  ];

  const faqs = [
    {
      q: 'How long does it take to build a house?',
      a: 'It depends on the plot size, the design, the work and the site. After we study what you need, we tell you a time for your project.'
    },
    {
      q: 'Do you build custom homes?',
      a: 'Yes. We learn what you need and then plan the building around it.'
    },
    {
      q: 'Do you build villas and apartments?',
      a: 'Yes. We build villas, apartments and residential buildings, with well-managed work.'
    },
    {
      q: 'Can you renovate my old house?',
      a: 'Yes. Please see our Renovation and Remodeling service for houses and villas.'
    }
  ];

  return (
    <div className="service-detail-page">
      {/* Hero Section */}
      <section className="sd-hero">
        <div className="sd-hero-bg">
          <img src={residentialImg} alt="House and Villa Construction in Coimbatore" />
          <div className="sd-hero-overlay"></div>
        </div>
        <div className="sd-hero-content">
          <span className="sd-hero-tag">RESIDENTIAL SERVICES</span>
          <h1 className="sd-hero-title">House and Villa Construction in Coimbatore</h1>
          <p className="sd-hero-subtitle">
            A home is where your family eats, rests, celebrates and grows. So it must be built with care, precision, and enduring strength.
          </p>
        </div>
      </section>

      {/* Intro Overview Split */}
      <section className="sd-section sd-section-warm">
        <div className="sd-container">
          <div className="sd-overview-split">
            <div className="sd-overview-body">
              <span className="sd-eyebrow">HOMES BUILT AROUND YOU</span>
              <h2 className="sd-overview-lead">
                Every family wants something different. First, we listen.
              </h2>
              <p>
                A home is where your family eats, rests, celebrates and grows. So it must be built with care. Nilan Infra builds houses, villas and apartments in Coimbatore. We build around the way you live. You get careful planning, good work and regular updates from start to end.
              </p>
              <p>
                Some families want open rooms with plenty of air and light. Some like traditional rooms with modern comforts. Some want to save power. Some want a rich finish. When we get these right early, most problems in the middle of the work do not come.
              </p>
            </div>

            <TypewriterHighlightBox
              title="Before We Start, We Understand:"
              items={[
                "Your family size and daily life",
                "What you may need later, such as a bigger family or one more floor",
                "Your budget and payment comfort",
                "Your plot and its soil condition",
                "The architectural style and design you like"
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
              From individual family bungalows to master-planned luxury villas and residential complexes, Nilan Infra builds around the way you live.
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

      {/* Taj-Style "Why Planning Is Important" Interactive Section */}
      <section className="sd-taj-planning-section">
        <div className="sd-container">

          {/* Header matching Taj aesthetic: lines flanking title + centered description */}
          <div className="sd-taj-explore-header">
            <div className="sd-taj-explore-title-wrap">
              <span className="sd-taj-explore-line"></span>
              <h2 className="sd-taj-explore-title">WHY PLANNING IS IMPORTANT</h2>
              <span className="sd-taj-explore-line"></span>
            </div>
            <p className="sd-taj-explore-desc">
              Careful initial planning prevents costly rework, schedule delays, and surprises. Explore our core engineering pillars below to see how we safeguard every rupee and detail of your home.
            </p>
          </div>

          {/* Taj Category Navigation Bar with Prev/Next and Elevated Active Tab */}
          <div className="sd-taj-nav-wrapper">
            <button
              type="button"
              className="sd-taj-nav-arrow prev"
              onClick={handlePrevPillar}
              aria-label="Previous planning pillar"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="sd-taj-nav-track">
              {planningPillars.map((p, idx) => {
                const isActive = activePillarIndex === idx;
                const IconComponent = p.icon;
                return (
                  <button
                    key={p.id}
                    type="button"
                    className={`sd-taj-nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActivePillarIndex(idx)}
                  >
                    <div className="sd-taj-nav-icon">
                      <IconComponent size={24} />
                    </div>
                    <span className="sd-taj-nav-label">{p.tab}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="sd-taj-nav-arrow next"
              onClick={handleNextPillar}
              aria-label="Next planning pillar"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Active Tab Showcase Area */}
          <div className="sd-taj-display-container">
            <div className="sd-taj-single-showcase">
              <div className="sd-taj-showcase-visual">
                <img
                  src={planningPillars[activePillarIndex].image}
                  alt={planningPillars[activePillarIndex].title}
                />
                <div className="sd-taj-visual-badge">
                  <span>{planningPillars[activePillarIndex].tab}</span>
                </div>
              </div>
              <div className="sd-taj-showcase-info">
                <span className="sd-taj-showcase-eyebrow">CRITICAL PLANNING PILLAR</span>
                <h3 className="sd-taj-showcase-title">{planningPillars[activePillarIndex].title}</h3>
                <p className="sd-taj-showcase-lead">{planningPillars[activePillarIndex].lead}</p>
                <p className="sd-taj-showcase-desc">{planningPillars[activePillarIndex].desc}</p>

                <Link to="/contact" className="sd-taj-showcase-btn">
                  <span>DISCUSS THIS FOR YOUR PLOT</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
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
                  <h3>YOUR HOME</h3>
                </div>
              </div>
              <p className="sd-process-desc-left">
                A transparent, stress-free construction journey from the initial conversation to your housewarming.
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


      {/* Questions People Ask (FAQ) - Split Layout with Heading on Right */}
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
                Answers to common queries regarding budgets, timelines, architectural drawings, and government approvals.
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
                <h3>ABOUT YOUR PLAN?</h3>
              </div>
            </div>
            <div className="luxury-action-content-block">
              <p>
                Talk to our team about your home, villa, apartment or plot development plan. We bring the same care to every job: clear planning, honest talk and close attention to small details.
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

export default ResidentialConstruction;
