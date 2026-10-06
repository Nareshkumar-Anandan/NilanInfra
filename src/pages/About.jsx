import React, { useEffect } from 'react';
import aboutHero from '../assets/nilan_hero.png';
import ownerImg from '../assets/Owner.png';
import { Award, CheckCircle } from 'lucide-react';
import './About.css';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      
      {/* About Hero Section */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <img src={aboutHero} alt="About Nilan Infra" />
          <div className="hero-overlay"></div>
        </div>
        <div className="about-hero-content">
          <h1 className="premium-title">About <span>Nilan Infra</span></h1>
          <p>Where engineering excellence meets modern architecture.</p>
        </div>
      </section>

      {/* Main About Content */}
      <section className="about-story section-padding">
        <div className="container">
          <div className="about-grid story-grid">
            <div className="about-text-header">
              <h4 className="subtitle">OUR STORY</h4>
              <h2 className="section-title story-heading">A Legacy of <span>Excellence</span></h2>
            </div>
            <div className="about-image">
              <div className="image-frame">
                <img src={aboutHero} alt="Nilan Infra Landmark Building" />
              </div>
            </div>
            <div className="about-text-body">
              <p>
                Founded with a vision to redefine urban spaces and structural engineering, Nilan Infra has grown into a premier construction and civil development firm. Located in Pollachi, we specialize in high-quality residential villas, commercial complexes, layout developments, and structural design consulting.
              </p>
              <p>
                Our commitment to excellence is reflected in every project we execute, from precision foundation works to high-end aesthetic interior finishes. We leverage modern construction technologies and high-quality raw materials to ensure that every structure we deliver stands the test of time.
              </p>
              <div className="about-stats">
                <div className="stat-item">
                  <h3>10+</h3>
                  <p>Years of Experience</p>
                </div>
                <div className="stat-item">
                  <h3>100+</h3>
                  <p>Completed Projects</p>
                </div>
                <div className="stat-item">
                  <h3>4.9/5</h3>
                  <p>Client Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="about-owner section-padding tertiary-bg">
        <div className="container">
          <div className="about-grid reverse founder-grid">
            <div className="about-text-header">
              <h4 className="subtitle">THE VISIONARY</h4>
              <h2 className="section-title founder-heading">Meet <span>Our Founder</span></h2>
              <h3 className="owner-name">Nareshkumar Anandan</h3>
            </div>
            <div className="about-image">
              <div className="owner-frame">
                <img src={ownerImg} alt="Nareshkumar Anandan - Founder of Nilan Infra" />
                <div className="experience-badge">
                  <Award size={24} />
                  <span>Founder & Managing Director</span>
                </div>
              </div>
            </div>
            <div className="about-text-body">
              <p>
                "My mission was simple: to create architectural structures where durability meets aesthetics and engineering excellence is paramount. Nilan Infra is the realization of that dream—a firm where clients find trust and projects find excellence."
              </p>
              <p>
                Under the leadership of Nareshkumar Anandan, Nilan Infra has evolved into a premier contractor and development partner in the region. His passion for engineering details, structural safety, and high-quality construction ensures that every project matches the highest standards.
              </p>
              <ul className="owner-values">
                <li><CheckCircle size={18} /> Committed to Structural Durability</li>
                <li><CheckCircle size={18} /> Dedicated to Uncompromising Safety Standards</li>
                <li><CheckCircle size={18} /> Transparent Estimations and Customer Trust</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
