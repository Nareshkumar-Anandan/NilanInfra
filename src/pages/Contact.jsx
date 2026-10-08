import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import contactHero from '../assets/nilan_hero.png';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    query: ''
  });

  const [contactInfo] = useState({
    phone_primary: '+91 91596 66679',
    phone_secondary: '+91 91596 63339',
    email: 'info@nilaninfra.com',
    address: 'Nilan Infra, Pollachi to Dharapuram road, Vasavi mahal opposite, Pollachi - 642001',
    map_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3921.12345!2d77.012345!3d10.654321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDA3JzIyLjQiTiA3NsKwMDcnMjIuNCJF!5e0!3m2!1sen!2sin!4v1634567890123!5m2!1sen!2sin'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate successful frontend query submission
    alert('Thank you! Your construction enquiry has been submitted. Our engineering estimators will contact you shortly.');

    // Format mailto body for email redirection fallback
    const subject = `New Infrastructure Inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0APhone: ${formData.phone}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AQuery/Requirements:%0D%0A${formData.query}`;

    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;

    // Resetting form
    setFormData({ name: '', phone: '', email: '', query: '' });
  };

  return (
    <div className="contact-page">

      {/* Contact Hero */}
      <section className="contact-hero">
        <div className="contact-hero-bg">
          <img src={contactHero} alt="Contact Nilan Infra" />
          <div className="hero-overlay"></div>
        </div>
        <div className="contact-hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="premium-title"
          >
            Contact <span>Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Let's build your dream project together. Reach out for consultations and estimates.
          </motion.p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-section section-padding">
        <div className="container">
          <div className="contact-grid">

            {/* Left Info Column */}
            <motion.div
              className="contact-info-column"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title">Get In <span>Touch</span></h2>
              <p className="panel-desc">We are here to answer all your building and civil infrastructure queries.</p>

              <div className="info-cards">
                <div className="info-card">
                  <div className="icon">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3>Office Address</h3>
                    <p>{contactInfo.address}</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="icon">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3>Phone Numbers</h3>
                    <p>{contactInfo.phone_primary}</p>
                    {contactInfo.phone_secondary && <p>{contactInfo.phone_secondary}</p>}
                  </div>
                </div>

                <div className="info-card">
                  <div className="icon">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3>Email Contacts</h3>
                    <p>{contactInfo.email}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Form Panel */}
            <motion.div
              className="enquiry-form-panel glass-effect"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="form-container">
                <h3>Send An <span>Enquiry</span></h3>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Mobile Number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Query / Requirements</label>
                    <textarea
                      name="query"
                      rows="5"
                      placeholder="Tell us about your project requirements (e.g. villa construction, commercial estimate)..."
                      value={formData.query}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-submit">
                    SEND MESSAGE <Send size={18} />
                  </button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Embedded Location Map */}
      <section className="map-section container">
        <div className="map-container">
          <iframe
            src={contactInfo.map_url}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Nilan Infra Location Map"
          ></iframe>
        </div>
      </section>

    </div>
  );
};

export default Contact;
