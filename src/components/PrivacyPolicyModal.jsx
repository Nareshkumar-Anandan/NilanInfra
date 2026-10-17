import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/nilan.png';
import './PrivacyPolicyModal.css';

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="a4-modal-overlay" onClick={onClose}>
          {/* Modal Backdrop animation */}
          <motion.div
            className="a4-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Close Button */}
          <button
            type="button"
            className="a4-modal-close-btn"
            onClick={onClose}
            aria-label="Close"
            title="Close (Esc)"
          >
            <X size={22} />
          </button>

          {/* Scrollable Container holding the A4 Sheet */}
          <div className="a4-modal-scroll" onClick={onClose}>
            <motion.div
              className="a4-paper-sheet"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 35, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.97 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {/* Decorative Corner Watermark */}
              <div className="a4-watermark">NILAN INFRA</div>

              {/* A4 Document Letterhead */}
              <header className="a4-header">
                <div className="a4-header-top">
                  <div className="a4-brand">
                    <img src={logo} alt="Nilan Infra Logo" className="a4-logo" />
                    <div>
                      <h2 className="a4-company-name">NILAN INFRA LTD.</h2>
                      <p className="a4-company-tagline">Engineered Construction &amp; Infrastructure Development</p>
                    </div>
                  </div>
                  <div className="a4-reg-info">
                    <p><strong>GSTIN:</strong> 33AVHPN1794J2Z8</p>
                    <p><strong>Location:</strong> Coimbatore, Tamil Nadu, India</p>
                    <p><strong>Doc Ref:</strong> NILAN/POL/PRIVACY/2026</p>
                  </div>
                </div>

                <div className="a4-letterhead-rule"></div>
              </header>

              {/* Document Title Banner */}
              <div className="a4-title-block">
                <h1 className="a4-doc-title">Privacy Policy for Nilan Infra Ltd.</h1>
                <p className="a4-effective-date">Effective Date: October 2026 • Official Document</p>
              </div>

              {/* Opening Paragraph */}
              <div className="a4-intro-statement">
                <p>
                  At <strong>Nilan Infra Ltd.</strong>, we respect your privacy and are committed to protecting the information you share with us.
                </p>
              </div>

              {/* Document Content Sections */}
              <div className="a4-body-content">

                {/* Section 1 */}
                <section className="a4-policy-section">
                  <h3 className="a4-section-heading">
                    <span className="a4-sec-num">1.</span> Information We Collect
                  </h3>
                  <p>
                    When you contact us or submit an enquiry through our website, we may collect information such as your name, phone number, email address, location, and project requirements.
                  </p>
                </section>

                {/* Section 2 */}
                <section className="a4-policy-section">
                  <h3 className="a4-section-heading">
                    <span className="a4-sec-num">2.</span> How We Use Your Information
                  </h3>
                  <p>We use your information to:</p>
                  <ul className="a4-list">
                    <li>Respond to your enquiries and requests</li>
                    <li>Provide information about our construction and real estate services</li>
                    <li>Contact you regarding your project requirements</li>
                    <li>Improve our website and services</li>
                  </ul>
                </section>

                {/* Section 3 */}
                <section className="a4-policy-section">
                  <h3 className="a4-section-heading">
                    <span className="a4-sec-num">3.</span> Cookies
                  </h3>
                  <p>
                    Our website may use cookies and similar technologies to understand website usage and improve your browsing experience.
                  </p>
                </section>

                {/* Section 4 */}
                <section className="a4-policy-section">
                  <h3 className="a4-section-heading">
                    <span className="a4-sec-num">4.</span> Information Sharing
                  </h3>
                  <p>
                    We do not sell or rent your personal information. We may share information with trusted service providers when necessary to operate our website or provide our services, or when required by law.
                  </p>
                </section>

                {/* Section 5 */}
                <section className="a4-policy-section">
                  <h3 className="a4-section-heading">
                    <span className="a4-sec-num">5.</span> Data Security
                  </h3>
                  <p>
                    We take reasonable steps to protect your personal information from unauthorized access, misuse, or disclosure. However, no online system can be guaranteed to be completely secure.
                  </p>
                </section>

                {/* Section 6 */}
                <section className="a4-policy-section">
                  <h3 className="a4-section-heading">
                    <span className="a4-sec-num">6.</span> Third-Party Links
                  </h3>
                  <p>
                    Our website may contain links to third-party websites. Nilan Infra Ltd. is not responsible for the privacy practices or content of those websites.
                  </p>
                </section>

                {/* Section 7 */}
                <section className="a4-policy-section a4-contact-section">
                  <h3 className="a4-section-heading">
                    <span className="a4-sec-num">7.</span> Contact Us
                  </h3>
                  <p>
                    If you have any questions about this Privacy Policy, please don’t hesitate to contact us:
                  </p>

                  <div className="a4-contact-box">
                    <h4 className="a4-box-company">Nilan Infra Ltd.</h4>
                    <p className="a4-box-line">
                      <MapPin size={15} /> Coimbatore, Tamil Nadu, India
                    </p>
                    <p className="a4-box-line">
                      <Mail size={15} /> Email:{' '}
                      <a href="mailto:nilan.infralimited@gmail.com">nilan.infralimited@gmail.com</a>
                    </p>
                    <p className="a4-box-line">
                      <Phone size={15} /> Phone:{' '}
                      <a href="tel:+919443522285">94435 22285</a>
                    </p>
                  </div>
                </section>

              </div>

              {/* A4 Formal Footer */}
              <footer className="a4-footer">
                <div className="a4-footer-rule"></div>
                <div className="a4-footer-content">
                  <div>
                    <p className="a4-footer-company">NILAN INFRA LTD. • Registered Office</p>
                    <p className="a4-footer-sub">No. 62, Aringar Anna Co-operative Society Nagar, Vadavalli, Coimbatore – 641046</p>
                  </div>
                  <div className="a4-page-num">
                    <span>Page 1 of 1</span>
                    <span className="a4-security-badge">Authentic Policy</span>
                  </div>
                </div>
              </footer>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyPolicyModal;
