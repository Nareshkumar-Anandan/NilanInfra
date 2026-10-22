import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import contactHero from '../assets/nilan_hero.png';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const contactDetails = {
    address: 'No.5,Mariyamman Kovil Street, Vadavalli, Coimbatore-641 046, Tamil Nadu.',
    gstin: '33AVHPN1794J2Z8',
    phone: '+91 94435 22285',
    phoneRaw: '+919443522285',
    email: 'nilan.infralimited@gmail.com',
    hours: 'Monday to Saturday, 9:00 AM to 6:00 PM',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Nilan+Infra+Ltd+No+62+Aringar+Anna+Cooperative+Society+Nagar+Vadavalli+Coimbatore+641046'
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // Dynamic SEO Title & Description matching specifications
    document.title = "Contact Nilan Infra | Construction Company in Coimbatore";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Call or email Nilan Infra to discuss your house, commercial, renovation or development project in Coimbatore. Open Monday to Saturday, 9 AM to 6 PM.'
    );
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Format mailto body for email redirection fallback
    const subject = encodeURIComponent(`New Project Inquiry from ${formData.name} - ${formData.projectType || 'General'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email}\n` +
      `Project Type: ${formData.projectType || 'Not specified'}\n\n` +
      `Message / Project Details:\n${formData.message}`
    );

    // Provide friendly submission notice and trigger mailto
    setTimeout(() => {
      window.location.href = `mailto:${contactDetails.email}?subject=${subject}&body=${body}`;
    }, 600);
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const scrollToForm = () => {
    const el = document.getElementById('enquiry-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      q: 'Do I need full plans before I contact you?',
      a: 'No. We are happy to talk even if you are still thinking about your options.'
    },
    {
      q: 'Do you give consultations?',
      a: 'Yes. We welcome talks about house, commercial, renovation, civil and development projects.'
    },
    {
      q: 'Which areas do you serve?',
      a: 'Mainly Coimbatore and nearby areas. Depending on the project, we may also work in other places in Tamil Nadu.'
    }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section - Following Services Hero Design */}
      <section className="contact-hero">
        <div className="contact-hero-bg">
          <img src={contactHero} alt="Contact Nilan Infra Coimbatore" />
          <div className="contact-hero-overlay"></div>
        </div>
        <div className="contact-hero-content">
          <span className="contact-hero-tag">GET IN TOUCH</span>
          <h1 className="contact-hero-title">Contact Nilan Infra</h1>
          <p className="contact-hero-subtitle">
            Every good project starts with a talk. You may want to build a house, develop a commercial property, renovate a building or look at a development chance. The first step is to talk to the right people.
          </p>
        </div>
      </section>

      {/* Intro Hook Banner */}
      <section className="contact-intro-banner">
        <div className="contact-container">
          <div className="intro-banner-card">
            <div className="intro-banner-text">
              <span className="intro-eyebrow">PRACTICAL ADVICE &amp; STRAIGHT ANSWERS</span>
              <h2>Our team will listen to what you need, answer your questions and show you your choices.</h2>
              <p>
                Your project may be big or small. You will get practical advice and a straight answer from experienced civil engineers and contractors in Coimbatore.
              </p>
            </div>
            <div className="intro-banner-action">
              <button onClick={scrollToForm} className="btn-contact-primary">
                START YOUR PROJECT TALK <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form & Details Section */}
      <section className="contact-main-section" id="enquiry-form-section">
        <div className="contact-container">
          <div className="contact-split-grid">

            {/* Left: Our Details Panel */}
            <motion.div
              className="contact-details-panel"
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="details-header">
                <span className="details-eyebrow">OFFICE &amp; REACH</span>
                <h2>Our Details</h2>
                <p>Reach out directly or visit our office in Vadavalli to discuss your construction requirements.</p>
              </div>

              <div className="details-list">
                {/* Office Address */}
                <div className="detail-item">
                  <div className="detail-icon">
                    <MapPin size={22} />
                  </div>
                  <div className="detail-content">
                    <h4>Office Address</h4>
                    <p>{contactDetails.address}</p>
                    <a
                      href={contactDetails.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="detail-action-link"
                    >
                      <span>Open in Google Maps</span> <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                {/* GSTIN */}
                <div className="detail-item">
                  <div className="detail-icon">
                    <ShieldCheck size={22} />
                  </div>
                  <div className="detail-content">
                    <h4>GSTIN</h4>
                    <p className="gstin-badge">{contactDetails.gstin}</p>
                    <span className="detail-subtext">Registered Corporate Construction Entity</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="detail-item">
                  <div className="detail-icon">
                    <Phone size={22} />
                  </div>
                  <div className="detail-content">
                    <h4>Phone</h4>
                    <a href={`tel:${contactDetails.phoneRaw}`} className="detail-link phone-link">
                      {contactDetails.phone}
                    </a>
                    <span className="detail-subtext">Direct line to our civil engineering desk</span>
                  </div>
                </div>

                {/* Email */}
                <div className="detail-item">
                  <div className="detail-icon">
                    <Mail size={22} />
                  </div>
                  <div className="detail-content">
                    <h4>Email</h4>
                    <a href={`mailto:${contactDetails.email}`} className="detail-link email-link">
                      {contactDetails.email}
                    </a>
                    <span className="detail-subtext">Send us your site plan, drawings, or enquiry</span>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="detail-item">
                  <div className="detail-icon">
                    <Clock size={22} />
                  </div>
                  <div className="detail-content">
                    <h4>Office Hours</h4>
                    <p className="hours-highlight">{contactDetails.hours}</p>
                    <span className="detail-subtext">Sunday: Closed / By Prior Appointment</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Enquiry Form */}
            <motion.div
              className="contact-form-panel"
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="form-card-inner">
                <div className="form-card-header">
                  <span className="form-eyebrow">ENQUIRY FORM</span>
                  <h3>Send An <span>Enquiry</span></h3>
                  <p>Tell us about your project. Some clients come with full plans, while some are still thinking. Both are fine.</p>
                </div>

                {submitted && (
                  <motion.div
                    className="form-success-banner"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CheckCircle2 size={22} />
                    <div>
                      <strong>Thank you for reaching out!</strong>
                      <p>Your message has been initiated. Our team will contact you shortly.</p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="contact-enquiry-form">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="e.g. Anand Kumar"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="e.g. +91 94435 22285"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="e.g. anand@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="projectType">Type of Project *</label>
                    <div className="select-wrapper">
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>Select the type of project...</option>
                        <option value="House and villa construction">House and villa construction</option>
                        <option value="Office, shop and showroom construction">Office, shop and showroom construction</option>
                        <option value="Property and land development">Property and land development</option>
                        <option value="Renovation and remodeling">Renovation and remodeling</option>
                        <option value="Civil work and infrastructure">Civil work and infrastructure</option>
                        <option value="General Consultation / Other">General Consultation / Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message / Project Details *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      placeholder="Describe your site place, plot size, budget, timeline or any questions you have..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-form-submit">
                    <span>SEND MESSAGE</span>
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Questions People Ask (FAQ) Section */}
      <section className="contact-faq-section">
        <div className="contact-container">
          <div className="section-head text-center">
            <span className="section-eyebrow">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="section-main-title">Questions People Ask</h2>
            <p className="section-sub-desc">
              Answers to common queries about starting a conversation and planning your project with Nilan Infra.
            </p>
          </div>

          <div className="faq-accordion-wrapper">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className={`contact-faq-item ${isOpen ? 'active' : ''}`}>
                  <button
                    className="contact-faq-question"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-q-indicator">Q.</span>
                    <span className="faq-q-text">{faq.q}</span>
                    <ChevronDown className={`faq-chevron ${isOpen ? 'rotate' : ''}`} size={20} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className="contact-faq-answer"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="faq-answer-inner">
                          <span className="faq-a-indicator">A.</span>
                          <p>{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
