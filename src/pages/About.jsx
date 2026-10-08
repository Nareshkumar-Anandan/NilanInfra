import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Home as HomeIcon, 
  Layers, 
  Wrench, 
  Truck, 
  CheckCircle2, 
  Target, 
  Compass, 
  PhoneCall, 
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Lightbulb,
  Eye,
  Clock,
  Sparkles,
  Paintbrush
} from 'lucide-react';
import aboutHero from '../assets/nilan_hero.png';
import residentialImg from '../assets/nilan_residential.png';
import blueprintImg from '../assets/nilan_blueprint.png';
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

  const whatWeDo = [
    {
      title: 'House Building',
      desc: 'Houses, villas, apartments and new homes.',
      icon: <HomeIcon size={26} />
    },
    {
      title: 'Commercial Building',
      desc: 'Offices, shops, showrooms, commercial complexes and business centres.',
      icon: <Building2 size={26} />
    },
    {
      title: 'Property Development',
      desc: 'Housing layouts, villa communities, apartments, and land development.',
      icon: <Layers size={26} />
    },
    {
      title: 'Renovation',
      desc: 'Repair and upgrade of houses, villas and offices, including floors and painting.',
      icon: <Wrench size={26} />
    },
    {
      title: 'Civil Work',
      desc: 'Land preparation, foundations, concrete work, drains and roads.',
      icon: <Truck size={26} />
    }
  ];

  const howWeWorkSteps = [
    {
      step: 'Step 1',
      title: 'Understand you',
      desc: 'We learn what you want and how your site is, before we suggest anything.'
    },
    {
      step: 'Step 2',
      title: 'Plan',
      desc: 'We study the work, the site, the materials and the time. Problems are solved on paper, not on site.'
    },
    {
      step: 'Step 3',
      title: 'Build',
      desc: 'We do the structure, civil work and finishing in the right order.'
    },
    {
      step: 'Step 4',
      title: 'Check quality',
      desc: 'We check the materials, the work, the strength, the finish and the safety all through the job.'
    },
    {
      step: 'Step 5',
      title: 'Hand over',
      desc: 'We check every project against what we agreed, and then give it to you.'
    }
  ];

  const values = [
    {
      name: 'Quality',
      desc: 'Good building starts with good planning, good materials and good workers.',
      icon: <ShieldCheck size={24} />
    },
    {
      name: 'Honesty',
      desc: 'We tell you the truth about work, cost and problems.',
      icon: <CheckCircle2 size={24} />
    },
    {
      name: 'Responsibility',
      desc: "People's homes, business and savings depend on us. We take care.",
      icon: <HeartHandshake size={24} />
    },
    {
      name: 'New ideas',
      desc: 'We use better ways and tools when they give better results.',
      icon: <Lightbulb size={24} />
    },
    {
      name: 'Client first',
      desc: 'We listen first. Then we suggest.',
      icon: <Sparkles size={24} />
    }
  ];

  const whyChooseList = [
    'Part of the Shanmugam Group, with Nilan Infra as its own construction company.',
    'Practical planning for better results.',
    'Careful work, materials and finishing.',
    'Open talk and regular updates.',
    'Solutions made for your project.',
    'Buildings made to last and stay useful.'
  ];

  const missionPoints = [
    'Give good quality construction',
    'Give useful ideas for design',
    'Do the work reliably',
    'Speak openly and honestly',
    'Build with care for people and place',
    'Create lasting value for our clients'
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
                <div className="org-card-icon-wrap orange-icon-bg">
                  <Paintbrush size={26} className="org-icon-graphic" />
                </div>
                <h3>Shanmugam Associates</h3>
                <p>Painting-related services</p>
              </div>

              {/* Card 2: Nilan Infra Ltd (Highlighted in Orange) */}
              <div className="org-child-card highlighted-company">
                <div className="org-card-icon-wrap white-icon-bg">
                  <HomeIcon size={26} className="org-icon-graphic-orange" />
                </div>
                <h3>Nilan Infra Ltd</h3>
                <p>Construction and property development</p>
              </div>

              {/* Card 3: Skyraa Infra */}
              <div className="org-child-card side-company">
                <div className="org-card-icon-wrap orange-icon-bg">
                  <Building2 size={26} className="org-icon-graphic" />
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

      {/* What We Do Section */}
      <section className="about-section about-what-we-do-section">
        <div className="container">
          <div className="about-section-header">
            <span className="about-section-eyebrow">OUR CAPABILITIES</span>
            <h2 className="about-section-heading">What We Do</h2>
            <p className="about-section-subtext">
              Comprehensive construction and development services tailored to residential and commercial needs.
            </p>
          </div>

          <div className="what-we-do-grid">
            {whatWeDo.map((item, idx) => (
              <div key={idx} className="what-we-do-card">
                <div className="what-card-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="about-section about-process-section">
        <div className="container">
          <div className="about-section-header">
            <span className="about-section-eyebrow">OUR PROCESS</span>
            <h2 className="about-section-heading">How We Work</h2>
            <p className="about-section-subtext">
              From the initial idea to the final handover, we follow a disciplined, 5-step process.
            </p>
          </div>

          <div className="process-steps-grid">
            {howWeWorkSteps.map((item, idx) => (
              <div key={idx} className="process-step-card">
                <div className="step-badge">{item.step}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="about-section about-values-section">
        <div className="container">
          <div className="about-section-header">
            <span className="about-section-eyebrow">OUR PRINCIPLES</span>
            <h2 className="about-section-heading">Our Values</h2>
            <p className="about-section-subtext">
              The core principles that guide our work, our decisions, and our client relationships every day.
            </p>
          </div>

          <div className="values-cards-grid">
            {values.map((val, idx) => (
              <div key={idx} className="value-card">
                <div className="value-icon">{val.icon}</div>
                <h3>{val.name}</h3>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Nilan Infra Section */}
      <section className="about-section about-why-section">
        <div className="container">
          <div className="about-split-layout reverse-mobile">
            <div className="about-split-image">
              <div className="about-image-card">
                <img src={blueprintImg} alt="Planning and Architecture" />
              </div>
            </div>
            <div className="about-split-text">
              <span className="about-section-eyebrow">WHY US</span>
              <h2 className="about-section-heading">Why choose Nilan Infra</h2>
              <ul className="why-checklist">
                {whyChooseList.map((point, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={20} className="check-icon" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="relationship-callout">
                <h4>We build relationships, not only buildings</h4>
                <p>
                  A good project is a team effort between you, your advisers and our site team. Good building needs good talk. We want to stay in touch with you even after we hand over.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="about-section about-vision-mission-section">
        <div className="container">
          <div className="vision-mission-grid">
            <div className="vision-card">
              <div className="vision-icon">
                <Compass size={32} />
              </div>
              <span className="card-tagline">LOOKING AHEAD</span>
              <h2>Our Vision</h2>
              <p>
                To be one of the most trusted construction and property development companies in Coimbatore and Tamil Nadu. We want to be known for careful planning, skilled work and good service to customers.
              </p>
            </div>

            <div className="mission-card">
              <div className="mission-icon">
                <Target size={32} />
              </div>
              <span className="card-tagline">OUR COMMITMENT</span>
              <h2>Our Mission</h2>
              <ul className="mission-list">
                {missionPoints.map((point, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={18} className="mission-check-icon" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="container">
          <div className="about-cta-box">
            <span className="cta-tagline">LET US BUILD SOMETHING GOOD TOGETHER</span>
            <h2>Ready to talk about your plan?</h2>
            <p>
              Talk to our team about your home, shop, renovation or property development plan.
            </p>
            <div className="about-cta-buttons">
              <Link to="/contact" className="about-btn-primary">
                Contact Nilan Infra <ArrowRight size={18} />
              </Link>
              <a href="tel:+919443522285" className="about-btn-phone">
                <PhoneCall size={18} /> +91 94435 22285
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
