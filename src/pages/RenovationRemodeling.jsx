import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Hammer, 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  Calendar, 
  Maximize2, 
  Palette, 
  Wrench, 
  TrendingUp, 
  ShieldCheck, 
  Home, 
  Building2,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import actionNilanImg from '../assets/actionNilan.png';
import residentialImg from '../assets/nilan_residential.png';
import infrastructureImg from '../assets/nilan_infrastructure.png';
import blueprintImg from '../assets/nilan_blueprint.png';
import TypewriterHighlightBox from '../components/TypewriterHighlightBox';
import './ServiceDetail.css';

const RenovationRemodeling = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Renovation & Remodeling in Coimbatore | Nilan Infra";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Home, villa and office renovation in Coimbatore. Nilan Infra upgrades existing buildings with careful planning and minimal disruption.'
    );
  }, []);

  const renovationTypes = [
    {
      title: 'Homes',
      description: 'Living rooms, bedrooms, kitchens and bathrooms. Floors and painting. Changes to the structure and better use of space. We work closely with you, so the result gives better comfort, use and look.',
      image: residentialImg
    },
    {
      title: 'Villas',
      description: 'Villas need extra care. We do modern inside work, better finish, layout improvements, outside improvements, new floors and decorative finishes. We respect the character of your property.',
      image: residentialImg
    },
    {
      title: 'Offices',
      description: 'Better use of work space, inside upgrades, meeting rooms, reception areas, comfort for staff and layout changes. A well-planned office helps work and shows your business at its best.',
      image: infrastructureImg
    },
    {
      title: 'Commercial Buildings',
      description: 'Showroom upgrades, shop remodeling, building improvements, inside renovation and structure improvements. This helps you stay ahead and welcome customers.',
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

  const maxIndex = Math.max(0, renovationTypes.length - itemsPerView);

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

  const reasons = [
    { icon: <Maximize2 size={26} color="#ea580c" />, title: 'Not Enough Space', desc: 'Renovation can add usable rooms and extensions without the cost of relocating.' },
    { icon: <Palette size={26} color="#ea580c" />, title: 'Old Design', desc: 'Modern elevation, premium flooring, and renewed layout completely revitalize tired spaces.' },
    { icon: <Wrench size={26} color="#ea580c" />, title: 'Repairs & Waterproofing', desc: 'Fixing age-related damage keeps the structural bones safe, dry, and sound.' },
    { icon: <Sparkles size={26} color="#ea580c" />, title: 'Better Day-to-Day Use', desc: 'Reconfigure walls and corridors to suit how your family or business really lives.' },
    { icon: <TrendingUp size={26} color="#ea580c" />, title: 'Higher Property Value', desc: 'High-quality architectural upgrades drastically increase market resale and rental yield.' }
  ];

  const steps = [
    { step: '1', title: 'Check the Property', desc: 'We check the strength of the building, the layout, the problems in use and what you need.' },
    { step: '2', title: 'Plan', desc: 'We agree on the work, design points, materials, time and budget.' },
    { step: '3', title: 'Build and Remodel', desc: 'Good work, joined-up work, as little disturbance as possible, safety and checking.' },
    { step: '4', title: 'Finish and Upgrade', desc: 'Painting, floors, fittings, decoration and final small details.' },
    { step: '5', title: 'Check and Hand Over', desc: 'We check the renovated space against your goals before we finish.' }
  ];

  const faqs = [
    {
      q: 'Is renovation cheaper than building new?',
      a: 'Often yes, but it depends on the condition of the building and what you want. We can check your property and tell you honestly.'
    },
    {
      q: 'Can you do structure work in a renovation?',
      a: 'Yes. We can include structure improvements as your project needs.'
    },
    {
      q: 'How long does a renovation take?',
      a: 'It depends on the work, the size of the property and how hard it is. After we check the property, we tell you the time.'
    }
  ];

  return (
    <div className="service-detail-page">
      {/* Hero Section */}
      <section className="sd-hero">
        <div className="sd-hero-bg">
          <img src={actionNilanImg} alt="Renovation and Remodeling in Coimbatore" />
          <div className="sd-hero-overlay"></div>
        </div>
        <div className="sd-hero-content">
          <span className="sd-hero-tag">RESTORATION & MODERNIZATION</span>
          <h1 className="sd-hero-title">Renovation and Remodeling in Coimbatore</h1>
          <p className="sd-hero-subtitle">
            Buildings must change as people change. We upgrade existing homes, villas, and commercial properties with precision and minimal disruption.
          </p>
        </div>
      </section>

      {/* Intro Overview Split */}
      <section className="sd-section sd-section-warm">
        <div className="sd-container">
          <div className="sd-overview-split">
            <div className="sd-overview-body">
              <span className="sd-eyebrow">RENEW WHAT YOU LOVE</span>
              <h2 className="sd-overview-lead">
                You do not always have to build new. Often the best way is to improve what you already have.
              </h2>
              <p>
                A house that was right for your family five years ago may feel small today. An office that worked well may need a better layout. A showroom may need a new look to bring customers in.
              </p>
              <p>
                A well-planned renovation can make the place more useful, make old spaces modern, improve the look and comfort, add usable space, make the building last longer and raise the value of the property. And you do not need to start from nothing.
              </p>
            </div>

            <TypewriterHighlightBox
              title="Why Choose Nilan Infra for Renovation:"
              items={[
                "Hands-on experience with homes, villas, and commercial spaces",
                "Meticulous structural safety checks before altering any walls",
                "Minimal disturbance to your daily household or business routine",
                "Transparent budget management with zero hidden expenses",
                "Respect for the original architectural character of your building"
              ]}
            />
          </div>
        </div>
      </section>

      {/* What We Renovate - Taj-Style Auto-Scrolling Showcase */}
      <section className="sd-section sd-section-white sd-what-we-build-section">
        <div className="sd-container">

          {/* Taj-Style Split Header */}
          <div className="sd-taj-header">
            <div className="sd-taj-title-wrap">
              <span className="sd-taj-dash">—</span>
              <h2 className="sd-taj-title">
                WHAT WE<br />RENOVATE
              </h2>
            </div>
            <p className="sd-taj-desc">
              Specialized upgrades preserving what works while modernizing tired spaces with minimal disruption to your daily life.
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
                {renovationTypes.map((item, idx) => (
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

      {/* Common Reasons to Renovate */}
      <section className="sd-section sd-section-warm">
        <div className="sd-container">
          <div className="sd-section-header">
            <span className="sd-eyebrow">PROJECT CATALYSTS</span>
            <h2 className="sd-title">Common Reasons to Renovate</h2>
          </div>

          <div className="sd-cards-grid">
            {reasons.map((r, i) => (
              <div key={i} className="sd-feature-card">
                {r.icon}
                <h4>{r.title}</h4>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Steps: How We Renovate - Split Layout Without Boxes */}
      <section className="sd-section sd-section-white sd-process-section">
        <div className="sd-container">
          <div className="sd-process-split-layout">
            
            {/* Left Column: Heading & Description */}
            <div className="sd-process-left-col">
              <div className="luxury-action-title-block">
                <span className="luxury-action-dash">—</span>
                <div className="luxury-action-titles">
                  <h2>HOW WE RENOVATE</h2>
                  <h3>YOUR SPACE</h3>
                </div>
              </div>
              <p className="sd-process-desc-left">
                A thorough methodology taking your property from structural diagnosis to flawless architectural handover.
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
                Answers to common questions regarding structural feasibility, interior overhauls, and renovation timelines.
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
                <h3>ABOUT YOUR RENOVATION?</h3>
              </div>
            </div>
            <div className="luxury-action-content-block">
              <p>
                Talk to our team about your home remodel, villa enhancement, office upgrade or commercial restoration. We bring clear planning, honest talk and close attention to small details.
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

export default RenovationRemodeling;
