import React, { useState } from 'react';
import Hero from '../components/Hero';
import WhyUs from '../components/WhyUs';
import { ArrowLeft, ArrowRight, Star, Quote } from 'lucide-react';
import residentialImg from '../assets/nilan_residential.png';
import commercialImg from '../assets/nilan_hero.png';
import infrastructureImg from '../assets/nilan_infrastructure.png';
import blueprintImg from '../assets/nilan_blueprint.png';
import './Home.css';

const testimonials = [
  {
    id: 1,
    name: "Aravind Kumar",
    rating: 5,
    text: "Exceptional design and quality construct. Nilan Infra completed our commercial complex in Pollachi on time. Excellent coordination."
  },
  {
    id: 2,
    name: "Sophia Chen",
    rating: 5,
    text: "Built our dream villa exactly as we planned. The structural finishing, design consulting, and premium layouts are top-notch."
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    rating: 5,
    text: "Very professional team. They handled structural planning, soil tests, and site development seamlessly. Highly recommended."
  },
  {
    id: 4,
    name: "Priya Raj",
    rating: 5,
    text: "Their estimation was spot on. No hidden charges and complete transparency regarding the cement and steel brands used."
  },
  {
    id: 5,
    name: "David Wilson",
    rating: 4,
    text: "The best civil contractors in this region. Extremely happy with their project management and timely site delivery."
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

  return (
    <div className="home-page">
      <main>
        <Hero />
        <WhyUs />

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
            <img src={residentialImg} alt="Quality Construction" className="resort-feature-image" />
          </div>
          <div className="resort-feature-content" data-aos="fade-left">
            <h2 className="resort-feature-title">Building Modern Landmarks</h2>
            <p className="resort-feature-description">
              At Nilan Infra, we combine years of civil engineering expertise with architectural design to deliver outstanding results.
              Whether you are planning a modern residential home, a commercial plaza, or looking for expert structural consultation,
              we manage your project from initial blueprints to the final coat of paint.
            </p>

            <h3 className="resort-highlights-title">Why Choose Nilan Infra?</h3>
            <ul className="resort-highlights-list">
              <li>Comprehensive project management ensuring timely completion.</li>
              <li>Strictest adherence to government structural safety and building guidelines.</li>
              <li>High-grade raw materials (cement, structural steel, aggregates) for durability.</li>
              <li>Transparent estimates with zero hidden overheads.</li>
              <li>Dedicated team of structural engineers, architects, and designers.</li>
            </ul>
          </div>
        </section>

        <section className="ae-section ae-research-section">
          <h2 className="ae-research-title">Core Services</h2>
          <div className="ae-research-container">
            <div className="ae-research-content">
              <p className="ae-research-subtitle">
                We deliver a wide array of civil, architectural, and project management services tailored to match your specific requirements.
              </p>

              <div className="ae-research-grid">
                <div className="ae-research-item">
                  <h3>Structural Design</h3>
                  <p>Accurate load calculations, framing plans, and foundation layouts ensuring safety and durability.</p>
                </div>
                <div className="ae-research-item">
                  <h3>Civil Works</h3>
                  <p>Quality construction of villas, residential complexes, layout formation, and office buildings.</p>
                </div>
                <div className="ae-research-item">
                  <h3>Project Management</h3>
                  <p>Complete supervision, material sourcing, labor management, and strict quality controls.</p>
                </div>
                <div className="ae-research-item">
                  <h3>Interior Design</h3>
                  <p>Aesthetic partition planning, custom woodworking, modular kitchens, and lighting design.</p>
                </div>
              </div>
            </div>
            <div className="ae-research-image-wrapper">
              <img src={blueprintImg} alt="Engineering Blueprints" className="ae-research-image" />
            </div>
          </div>
        </section>

        {/* Testimonials Marquee Section */}
        <section className="testimonials-section">
          <div className="section-header">
            <h2 className="premium-title">What Our Clients Say</h2>
          </div>
          <div className="marquee">
            <div className="marquee-content">
              {[...testimonials, ...testimonials].map((t, index) => (
                <div key={`${t.id}-${index}`} className="testimonial-card">
                  <div className="quote-icon">
                    <Quote size={24} fill="var(--primary)" />
                  </div>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < t.rating ? "var(--primary)" : "none"} stroke="var(--primary)" />
                    ))}
                  </div>
                  <p className="testimonial-text">{t.text}</p>
                  <div className="testimonial-author">
                    <span className="author-name">{t.name}</span>
                    <span className="verified-tag">Verified Client</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="ae-cta-section">
          <div className="ae-cta-background">
            <img src={blueprintImg} alt="Blueprint Background" className="ae-cta-bg-image" />
          </div>
          <div className="ae-cta-content">
            <h2>Ready to Start Your Construction Project?</h2>
            <p>
              Work with Nilan Infra for transparent estimations, reliable planning, and premium quality execution.
              Let's build a foundation for your future today.
            </p>
            <div className="ae-cta-buttons">
              <a href="/contact" className="ae-btn ae-btn-primary">Request a Quote</a>
              <a href="/gallery" className="ae-btn ae-btn-secondary">View Projects Gallery</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
