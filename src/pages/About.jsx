import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Target,
  Compass,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import aboutHero from '../assets/nilan_hero.png';
import residentialImg from '../assets/nilan_residential.png';
import blueprintImg from '../assets/nilan_blueprint.png';
import infraImg from '../assets/nilan_infrastructure.png';
import actionNilanImg from '../assets/actionNilan.png';
import shanmugamLogo from '../assets/logo/Shanmugam.webp';
import skyraLogo from '../assets/logo/SkyraInfra.PNG';
import nilanLogo from '../assets/nilan.png';
import './About.css';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About Nilan Infra | Building Contractors in Coimbatore";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Meet Nilan Infra Ltd, the construction arm of the Shanmugam Group in Coimbatore, founded by Mrs. Nikilalochani Sathyan.'
    );
  }, []);

  const groupCompanies = [
    {
      name: 'Shanmugam Associates',
      focus: 'Painting Work',
      desc: 'Expert painting, protective coating, and interior-exterior surface finishing.'
    },
    {
      name: 'Nilan Infra Ltd',
      focus: 'Construction & Property Development',
      desc: "The group's dedicated company for construction, residential villas, commercial buildings and property development."
    },
    {
      name: 'Skyraa Infra',
      focus: 'Infrastructure & Specialized Works',
      desc: 'Specialized structural execution and regional infrastructure projects.'
    }
  ];

  const showcaseSlides = [
    {
      id: 1,
      tagline: 'WHAT WE DO',
      titleLine1: 'HOUSE',
      titleLine2: 'BUILDING',
      titleItalic: 'EXCELLENCE',
      desc: 'Custom-crafted houses, modern luxury villas, duplexes, and residential apartments engineered with high-grade materials, seismic safety, and timeless architecture in Coimbatore.',
      image: residentialImg,
      alt: 'House Building and Luxury Villas'
    },
    {
      id: 2,
      tagline: 'WHAT WE DO',
      titleLine1: 'COMMERCIAL',
      titleLine2: 'BUILDING',
      titleItalic: 'PROJECTS',
      desc: 'State-of-the-art office spaces, commercial complexes, retail showrooms, and institutional buildings built on schedule with full regulatory compliance and premium finishes.',
      image: aboutHero,
      alt: 'Commercial Building and Business Complexes'
    },
    {
      id: 3,
      tagline: 'WHAT WE DO',
      titleLine1: 'PROPERTY',
      titleLine2: 'DEVELOPMENT',
      titleItalic: '& LAYOUTS',
      desc: 'End-to-end land development, gated villa communities, residential plots, and layout infrastructure with clear documentation and modern amenities.',
      image: blueprintImg,
      alt: 'Property Development and Land Layouts'
    },
    {
      id: 4,
      tagline: 'WHAT WE DO',
      titleLine1: 'RENOVATION',
      titleLine2: 'REMODELING',
      titleItalic: '& FINISHES',
      desc: 'Complete restoration and structural remodeling of houses, villas, and commercial properties — including structural retrofitting, modern flooring, and premium painting with Shanmugam Associates.',
      image: actionNilanImg,
      alt: 'Renovation and Remodeling Services'
    },
    {
      id: 5,
      tagline: 'WHAT WE DO',
      titleLine1: 'CIVIL WORK',
      titleLine2: '& HEAVY',
      titleItalic: 'INFRASTRUCTURE',
      desc: 'Heavy foundation engineering, land levelling, concrete paving, drainage networks, compound structures, and industrial civil contracts executed with precision machinery.',
      image: infraImg,
      alt: 'Civil and Infrastructure Engineering'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? showcaseSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === showcaseSlides.length - 1 ? 0 : prev + 1));
  };

  // Auto scroll timer (pauses when mouse is hovering the section)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === showcaseSlides.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(timer);
  }, [showcaseSlides.length, currentSlide, isPaused]);




  const whyChooseList = [
    'Part of the Shanmugam Group, with Nilan Infra as its own construction company.',
    'Practical planning for better results.',
    'Careful work, materials and finishing.',
    'Open talk and regular updates.',
    'Solutions made for your project.',
    'Buildings made to last and stay useful.'
  ];

  const missionPoints = [
    'Give good quality construction, Give useful ideas for design',
    'Do the work reliably, Speak openly and honestly',
    'Build with care for people and place, Create lasting value for our clients'
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <img src={aboutHero} alt="About Nilan Infra" />
          <div className="about-hero-overlay"></div>
        </div>
        <div className="about-hero-content">
          <span className="about-hero-tag">About Nilan Infra</span>
          <h1 className="about-hero-title">Building Spaces. Creating Futures.</h1>
          <p className="about-hero-subtitle">
            Nilan Infra is a construction and property development company in Coimbatore. We build houses, villas, apartments, shops, offices and roads. We also renovate old buildings.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="about-section about-story-section">
        <div className="container">
          <div className="about-split-layout">
            <div className="about-split-text">
              <span className="about-section-eyebrow">OUR STORY</span>
              <h2 className="about-section-heading">A construction company Coimbatore can count on</h2>
              <p>
                <strong>Nilan Infra Ltd</strong> started on <strong>29 January 2026</strong>. Our founder is <strong>Mrs. Nikilalochani Sathyan</strong>. We started to give good construction and property development service to home owners, businesses and investors in Coimbatore.
              </p>
              <p>
                We are part of the <strong>Shanmugam Group</strong>. The group brings together three specialized companies so each can do the work it knows best:
              </p>
              <ul className="group-inline-list">
                <li><strong>Shanmugam Associates:</strong> painting work.</li>
                <li><strong>Nilan Infra Ltd:</strong> construction and property development.</li>
                <li><strong>Skyraa Infra:</strong> infrastructure and specialized works.</li>
              </ul>
              <p>
                When you need construction, Nilan Infra is the group's own construction company. This lets us focus on house building, commercial building, property development and civil work. When a project needs it, we can also use the help and experience of the whole group.
              </p>
              {/* <p>
                Our aim is to be a name that people in Coimbatore and all over Tamil Nadu trust for construction and real estate.
              </p> */}
            </div>
            <div className="about-split-image">
              <div className="about-image-card">
                <img src={residentialImg} alt="Nilan Infra Construction Project" />
              </div>
            </div>
          </div>

          {/* Shanmugam Group Organizational Hierarchy Tree */}
          <div className="group-org-tree-wrapper">
            {/* Top Parent Node */}
            <div className="org-parent-node">
              <span>SHANMUGAM GROUP</span>
            </div>

            {/* Tree Branch Connector Lines */}
            <div className="org-connector-lines">
              <div className="org-line-vertical-top"></div>
              <div className="org-line-horizontal"></div>
              <div className="org-line-vertical-branches">
                <div className="org-branch-line"></div>
                <div className="org-branch-line"></div>
                <div className="org-branch-line"></div>
              </div>
            </div>

            {/* 3 Child Company Nodes */}
            <div className="org-children-grid">
              {/* Card 1: Shanmugam Associates */}
              <div className="org-child-card side-company">
                <div className="org-card-logo-wrap">
                  <img src={shanmugamLogo} alt="Shanmugam Associates Logo" className="org-company-logo" />
                </div>
                <h3>Shanmugam Associates</h3>
                <p>Painting-related services</p>
              </div>

              {/* Card 2: Nilan Infra Ltd (Highlighted in Orange) */}
              <div className="org-child-card highlighted-company">
                <div className="org-card-logo-wrap">
                  <img src={nilanLogo} alt="Nilan Infra Ltd Logo" className="org-company-logo" />
                </div>
                <h3>Nilan Infra Ltd</h3>
                <p>Construction and property development</p>
              </div>

              {/* Card 3: Skyraa Infra */}
              <div className="org-child-card side-company">
                <div className="org-card-logo-wrap">
                  <img src={skyraLogo} alt="Skyraa Infra Logo" className="org-company-logo" />
                </div>
                <h3>Skyraa Infra</h3>
                <p>Group company</p>
              </div>
            </div>

            {/* Bottom Note */}
            <div className="org-footer-note">
              Nilan Infra is the group's dedicated construction company
            </div>
          </div>
        </div>
      </section>

      {/* What We Do - Full-Width Interactive Luxury Showcase Carousel */}
      <section
        className="about-showcase-section full-bleed"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left Navigation Arrow Button */}
        <button
          onClick={prevSlide}
          className="showcase-nav-btn showcase-prev-btn"
          aria-label="Previous service"
          type="button"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Right Navigation Arrow Button */}
        <button
          onClick={nextSlide}
          className="showcase-nav-btn showcase-next-btn"
          aria-label="Next service"
          type="button"
        >
          <ChevronRight size={28} />
        </button>

        <div className="about-showcase-wrapper">
          {/* Left Dark Column */}
          <div className="showcase-dark-panel">
            <div className="showcase-content-box" key={`content-${currentSlide}`}>
              <span className="showcase-eyebrow">{showcaseSlides[currentSlide].tagline}</span>
              <h2 className="showcase-title">
                {showcaseSlides[currentSlide].titleLine1}<br />
                {showcaseSlides[currentSlide].titleLine2}<br />
                <span className="showcase-title-italic">{showcaseSlides[currentSlide].titleItalic}</span>
              </h2>
              <p className="showcase-desc">
                {showcaseSlides[currentSlide].desc}
              </p>
              <div className="showcase-action-row">
                <Link to="/services" className="showcase-pill-btn">
                  LEARN MORE
                </Link>
              </div>
            </div>
          </div>

          {/* Overlapping Center Image Card (Clickable to Next Slide) */}
          <div
            className="showcase-center-card"
            onClick={nextSlide}
            title="Click for next capability"
            key={`center-${currentSlide}`}
          >
            <img
              src={showcaseSlides[currentSlide].image}
              alt={showcaseSlides[currentSlide].alt}
              className="showcase-card-img"
            />
            <div className="center-card-badge">
              <span>{showcaseSlides[currentSlide].titleLine1} {showcaseSlides[currentSlide].titleLine2}</span>
            </div>
          </div>

          {/* Bottom Center Dots Indicator */}
          <div className="showcase-center-dots">
            {showcaseSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide(idx);
                }}
                className={`showcase-dot ${currentSlide === idx ? 'active' : ''}`}
                aria-label={`Go to slide ${idx + 1}`}
                type="button"
              />
            ))}
          </div>

          {/* Right Background Architectural Image (Shows Next Slide - Clickable to Bring into Center) */}
          <div
            className="showcase-image-panel"
            onClick={nextSlide}
            title="Click to view next capability"
            key={`bg-${currentSlide}`}
          >
            <img
              src={showcaseSlides[(currentSlide + 1) % showcaseSlides.length].image}
              alt={showcaseSlides[(currentSlide + 1) % showcaseSlides.length].alt}
              className="showcase-bg-img"
            />
            <div className="showcase-bg-overlay"></div>
          </div>
        </div>
      </section>

      {/* Why Choose Nilan Infra Section - Luxury Editorial Split */}
      <section className="about-section about-why-section">
        <div className="why-luxury-split-layout">
          {/* Left Luxury Image Card */}
          <div className="why-luxury-image-col">
            <div className="why-luxury-image-card">
              <img src={blueprintImg} alt="Why Choose Nilan Infra Construction Excellence" className="why-luxury-img" />

              {/* Bottom-Right Association Tag */}
              <div className="why-luxury-assoc-tag">
                <span>in association with <strong>SHANMUGAM GROUP</strong></span>
              </div>
            </div>
          </div>

          {/* Right Editorial Typography & Content */}
          <div className="why-luxury-text-col">
            <span className="why-luxury-eyebrow">WHY US</span>
            <h2 className="why-luxury-title">WHY CHOOSE NILAN INFRA</h2>
            
            <p className="why-luxury-lead">
              Delivering end-to-end construction excellence, precision architectural engineering, and enduring value across residential, commercial, and infrastructure developments in Coimbatore.
            </p>

            <ul className="why-luxury-checklist">
              {whyChooseList.map((point, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={15} className="why-luxury-check-icon" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="why-luxury-callout">
              <h4>WE BUILD RELATIONSHIPS, NOT ONLY BUILDINGS</h4>
              <p>
                A good project is a team effort between you, your advisers and our site team. Good building needs transparent communication. We stay dedicated to your vision even long after handover.
              </p>
            </div>

            <div className="why-luxury-action-row">
              <Link to="/services" className="why-luxury-action-link">
                <span>EXPLORE OUR SERVICES</span>
                <ChevronRight size={15} className="action-arrow-icon" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="about-section about-vision-mission-section">
        <div className="container">
          <div className="vision-mission-grid">
            <div className="vision-card">
              <div className="card-header-row">
                <div className="vision-icon">
                  <Compass size={24} />
                </div>
                <div className="card-title-group">
                  <span className="card-tagline">LOOKING AHEAD</span>
                  <h2>Our Vision</h2>
                </div>
              </div>
              <p>
                To be one of the most trusted construction and property development companies in Coimbatore and Tamil Nadu. We want to be known for careful planning, skilled work and good service to customers.
              </p>
            </div>

            <div className="mission-card">
              <div className="card-header-row">
                <div className="mission-icon">
                  <Target size={24} />
                </div>
                <div className="card-title-group">
                  <span className="card-tagline">OUR COMMITMENT</span>
                  <h2>Our Mission</h2>
                </div>
              </div>
              <ul className="mission-list">
                {missionPoints.map((point, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={15} className="mission-check-icon" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Clean Luxury Split Layout */}
      <section className="about-luxury-action-section">
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

export default About;
