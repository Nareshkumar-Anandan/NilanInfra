import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'framer-motion';
import Hero from '../components/Hero';
import WhyUs from '../components/WhyUs';
import { ArrowLeft, ArrowRight, Star, Quote } from 'lucide-react';
import residentialImg from '../assets/nilan_residential.png';
import commercialImg from '../assets/nilan_hero.png';
import infrastructureImg from '../assets/nilan_infrastructure.png';
import blueprintImg from '../assets/nilan_blueprint.png';
import heroBgImg from '../assets/hero-Image.jpg';
import actionNilanImg from '../assets/actionNilan.png';
import './Home.css';

const AnimatedCounter = ({ target, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (!inView) return;

    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // Smooth ease-out cubic curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

const initialSiteNews = [
  {
    id: 'nilan-nova',
    project: 'Nova Pinnacle',
    site: 'Nilan Infra Sites',
    sideLabel: 'NILAN INFRA SITES',
    tagline: 'NOVA PINNACLE · NILAN INFRA SITES',
    desc: 'Ground floor finished. Structural column casting and quality inspection completed according to engineering blueprints.',
    status: ['Ground floor finished', 'Structural quality check completed'],
    img: commercialImg,
    note: "Sample picture (drawing). Use this week's real photo from the site."
  },
  {
    id: 'skyraa-nova',
    project: 'Nova Pinnacle',
    site: 'Skyraa Infra Sites',
    sideLabel: 'SKYRAA INFRA SITES',
    tagline: 'NOVA PINNACLE · SKYRAA INFRA SITES',
    desc: 'First floor plastering finished. Electrical conduit layout and internal piping work actively underway.',
    status: ['First floor plastering finished.', 'Electrical work started.'],
    img: infrastructureImg,
    note: "Sample picture (drawing). Use this week's real photo from the site."
  },
  {
    id: 'emerald-enclave',
    project: 'Emerald Enclave',
    site: 'Residential Layouts',
    sideLabel: 'RESIDENTIAL SITES',
    tagline: 'EMERALD ENCLAVE · RESIDENTIAL SITES',
    desc: 'Foundation curing and primary layout framing completed. Ground floor masonry progressing as planned.',
    status: ['Foundation slab cured', 'Ground level brickwork started'],
    img: residentialImg,
    note: "Sample picture (drawing). Use this week's real photo from the site."
  }
];

const initialExperiences = [
  {
    id: 'residential',
    img: residentialImg,
    title: 'Residential Villas',
    desc: 'From custom-built independent villas to modern apartments, we build homes designed for ultimate comfort, aesthetic beauty, and generation-spanning durability.',
  },
  {
    id: 'commercial',
    img: commercialImg,
    title: 'Commercial Construction',
    desc: 'Precision-engineered office buildings, corporate centers, retail outlets, and shopping complexes designed to maximize space and meet safety standards.',
  },
  {
    id: 'infrastructure',
    img: infrastructureImg,
    title: 'Civil Infrastructure',
    desc: 'Masterfully planned public works, flyovers, concrete structures, and custom layouts engineered with high structural safety and modern technologies.',
  }
];

const Home = () => {
  const [experiences, setExperiences] = useState(initialExperiences);
  const [siteNews, setSiteNews] = useState(initialSiteNews);

  useEffect(() => {
    document.title = "Construction Company in Coimbatore | Nilan Infra";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Nilan Infra is a trusted construction company in Coimbatore for houses, villas, commercial buildings and infrastructure. Get a free consultation today.'
    );
  }, []);

  const handleNext = () => {
    setExperiences(prev => {
      const newExp = [...prev];
      const first = newExp.shift();
      newExp.push(first);
      return newExp;
    });
  };

  const handlePrev = () => {
    setExperiences(prev => {
      const newExp = [...prev];
      const last = newExp.pop();
      newExp.unshift(last);
      return newExp;
    });
  };

  const handleCardClick = (index) => {
    if (index === 0) handlePrev();
    else if (index === 2) handleNext();
  };

  const handleNewsNext = () => {
    setSiteNews(prev => {
      const updated = [...prev];
      const first = updated.shift();
      updated.push(first);
      return updated;
    });
  };

  const handleNewsPrev = () => {
    setSiteNews(prev => {
      const updated = [...prev];
      const last = updated.pop();
      updated.unshift(last);
      return updated;
    });
  };

  const handleNewsCardClick = (index) => {
    if (index === 0) handleNewsPrev();
    else if (index === 2) handleNewsNext();
  };

  const stats = [
    { value: 50, suffix: '+', label: 'Projects handled' },
    { value: 100, suffix: '+', label: 'Happy clients' },
    { value: 20, suffix: '+', label: 'Team members' },
    { value: 100, suffix: '%', label: 'Focus on quality' }
  ];

  const whatWeBuildServices = [
    {
      title: 'Residential Construction',
      desc: 'We build houses, villas and apartments. We plan each one around how your family lives.',
      link: '/residential-construction',
      image: residentialImg,
    },
    {
      title: 'Commercial Construction',
      desc: 'We build offices, showrooms, shops and commercial buildings. We plan them around how your business works every day.',
      link: '/commercial-construction',
      image: commercialImg,
    },
    {
      title: 'Property Development',
      desc: 'We develop plots into housing layouts, villa communities and mixed-use projects. Construction is planned from day one.',
      link: '/property-development',
      image: infrastructureImg,
    },
    {
      title: 'Renovation and Remodeling',
      desc: 'We repair and upgrade homes, villas and offices. Sometimes improving what you have is better than building new.',
      link: '/renovation-remodeling',
      image: blueprintImg,
    },
    {
      title: 'Civil and Infrastructure Work',
      desc: 'We prepare the land and build foundations, concrete work, roads and drains. Everything else stands on this work.',
      link: '/civil-infrastructure',
      image: infrastructureImg,
    },
    {
      title: 'Architectural & Project Planning',
      desc: 'From initial 2D/3D blueprints and structural design to turnkey site supervision and quality execution.',
      link: '/services',
      image: heroBgImg,
    }
  ];

  return (
    <div className="home-page">
      <main>
        <Hero />

        {/* Numbers / Stats Section */}
        <section className="stats-banner-section">
          <div className="stats-banner-container">
            {stats.map((stat, index) => (
              <div key={index} className="stats-banner-item">
                <div className="stats-banner-number">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2} />
                </div>
                <div className="stats-banner-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* What We Build Section */}
        <section className="what-we-build-section">
          <div className="container">
            <div className="section-header">
              <h2 className="premium-title">What We Build</h2>
              <p className="section-subtitle">
                From a family house to a full housing project, our team looks after every step of the work.
              </p>
            </div>
          </div>

          <div className="what-we-build-grid full-width">
            {whatWeBuildServices.map((service, index) => (
              <div key={index} className="build-card overlay-card">
                <img src={service.image} alt={service.title} className="build-card-bg" />
                <div className="build-card-overlay"></div>
                <div className="build-card-content">
                  <div className="build-card-text">
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                  </div>
                  <div className="build-card-action">
                    <Link to={service.link} className="build-card-explore-btn">
                      <span>Explore Now</span>
                      <span className="btn-circle-icon">
                        <ArrowRight size={20} strokeWidth={2.5} />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        

        <section className="experiences-hero">
          <div className="section-header">
            <h2 className="premium-title">Our Core Expertise</h2>
          </div>

          <div className="experiences-container">
            <button className="slider-btn prev" onClick={handlePrev}><ArrowLeft size={24} /></button>
            <div className="experiences-slider">
              {experiences.map((exp, index) => {
                const isActive = index === 1;
                return (
                  <div
                    key={exp.id}
                    className={`experience-card ${isActive ? 'active' : 'side'}`}
                    onClick={() => handleCardClick(index)}
                  >
                    {!isActive ? (
                      <>
                        <img src={exp.img} alt={exp.title} />
                        <div className="side-label">{exp.title}</div>
                      </>
                    ) : (
                      <>
                        <div className="card-media">
                          <img src={exp.img} alt={exp.title} />
                        </div>
                        <div className="card-info">
                          <h4>{exp.title}</h4>
                          <p>{exp.desc}</p>
                          <a href="/services" className="more-link">MORE SERVICES <ArrowRight size={14} /></a>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            <button className="slider-btn next" onClick={handleNext}><ArrowRight size={24} /></button>
          </div>
        </section>

        <section className="resort-feature-section">
          <div className="resort-feature-image-wrapper" data-aos="fade-right">
            <img src={residentialImg} alt="About Nilan Infra" className="resort-feature-image" />
          </div>
          <div className="resort-feature-content" data-aos="fade-left">
            <span className="resort-tagline">About us</span>
            <h2 className="resort-feature-title">A construction company Coimbatore can trust</h2>
            <p className="resort-feature-description">
              Every project starts with an idea. It may be a family home, a new shop, a plot to develop, or an old building that needs a new life. We work with home owners, business owners, investors and developers.
            </p>
            <div className="resort-feature-highlight">
              Our way is simple: plan well, build well, and keep you informed.
            </div>
            <p className="resort-feature-description">
              Nilan Infra Ltd started on 29 January 2026. Mrs. Nikilalochani Sathyan is our founder. We are part of the Shanmugam Group, with Shanmugam Associates and Skyraa Infra. Nilan Infra is the group's own company for construction and property development.
            </p>
          </div>
        </section>
        <WhyUs />
        <section className="ae-section ae-research-section">
          <h2 className="ae-research-title">How We Work</h2>
          <div className="ae-research-container">
            <div className="ae-research-content">
              <div className="ae-research-grid how-we-work-grid">
                <div className="ae-research-item">
                  <h3>Step 1: Listen</h3>
                  <p>We first understand what you want, your budget and your needs.</p>
                </div>
                <div className="ae-research-item">
                  <h3>Step 2: See the site</h3>
                  <p>We look at your plot or building to find problems and chances early.</p>
                </div>
                <div className="ae-research-item">
                  <h3>Step 3: Plan</h3>
                  <p>We decide the work, time, materials and team before we start.</p>
                </div>
                <div className="ae-research-item">
                  <h3>Step 4: Build</h3>
                  <p>Our team does the structure, civil work and finishing in the right order.</p>
                </div>
                <div className="ae-research-item">
                  <h3>Step 5: Check</h3>
                  <p>We check the quality and progress all through the work.</p>
                </div>
                <div className="ae-research-item">
                  <h3>Step 6: Hand over</h3>
                  <p>Before we hand over, we check the finished work against what we agreed.</p>
                </div>
              </div>
            </div>
            <div className="ae-research-image-wrapper">
              <img src={blueprintImg} alt="How We Work Process" className="ae-research-image" />
            </div>
          </div>
        </section>

        {/* Latest News / Site Updates Section - Luxury Showcase Slider */}
        <section className="latest-site-news-section">
          {/* Dynamic Full-Width Background Layer from Active Card */}
          <div
            className="site-news-bg-layer"
            style={{ backgroundImage: `url(${siteNews[1]?.img})` }}
          ></div>
          <div className="site-news-bg-overlay"></div>

          <div className="site-news-header-container">
            <div className="site-news-title-block">
              <span className="site-news-dash">—</span>
              <div className="site-news-titles">
                <span className="site-news-pretitle">LATEST NEWS</span>
                <h2 className="site-news-main-title">FROM OUR SITES</h2>
              </div>
            </div>
            <div className="site-news-subtitle-block">
              <p>
                Every week we share a short update from our sites. You can see real work, not only promises.
              </p>
            </div>
          </div>

          <div className="site-news-slider-wrapper">
            <div className="site-news-cards-track">
              {/* Left Side Box */}
              <div
                className="site-news-card side left-side"
                onClick={() => handleNewsCardClick(0)}
                title="Click to view update"
              >
                <button
                  className="site-news-nav-btn prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNewsPrev();
                  }}
                  aria-label="Previous update"
                >
                  <ArrowLeft size={20} />
                </button>
                <div className="news-side-text-label">{siteNews[0]?.sideLabel}</div>
              </div>

              {/* Center Active Box */}
              <div className="site-news-card active">
                <div className="news-active-content">
                  <div className="news-active-image-box">
                    <img src={siteNews[1]?.img} alt={siteNews[1]?.project} />
                  </div>
                  <div className="news-active-details-box">
                    <h4 className="news-active-site-tag">{siteNews[1]?.tagline}</h4>
                    <p className="news-active-summary">{siteNews[1]?.desc}</p>
                    <ul className="news-active-points">
                      {siteNews[1]?.status.map((st, i) => (
                        <li key={i}>{st}</li>
                      ))}
                    </ul>
                    <a href="/gallery" className="news-active-more-link">
                      MORE UPDATES <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side Box */}
              <div
                className="site-news-card side right-side"
                onClick={() => handleNewsCardClick(2)}
                title="Click to view update"
              >
                <div className="news-side-text-label">{siteNews[2]?.sideLabel}</div>
                <button
                  className="site-news-nav-btn next"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNewsNext();
                  }}
                  aria-label="Next update"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section - Clean Luxury Split Layout */}
        <section className="luxury-action-section">
          <div className="container">
            <div className="luxury-action-container">
              <div className="luxury-action-title-block">
                <span className="luxury-action-dash">—</span>
                <div className="luxury-action-titles">
                  <h2>BUILD FOR TODAY.</h2>
                  <h3>PLAN FOR TOMORROW</h3>
                </div>
              </div>
              <div className="luxury-action-content-block">
                <p>
                  We build homes, villas, shops, offices, renovations and civil works. We bring the same care to every job: clear planning, honest talk and close attention to small details.
                </p>
                <Link to="/contact" className="luxury-action-link">
                  <span>REQUEST A QUOTE</span>
                  <span className="action-arrow">&gt;</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Full-Width Action Image Banner */}
        <div className="action-fullwidth-banner">
          <img src={actionNilanImg} alt="Nilan Infra Construction Work" className="action-fullwidth-img" />
        </div>
      </main>
    </div>
  );
};

export default Home;
