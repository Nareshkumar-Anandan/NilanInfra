import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaPhoneAlt, FaComments, FaTimes } from 'react-icons/fa';
import './FloatingContact.css';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = "919159666679"; // Nilan Infra primary contact

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="floating-contact-wrapper">
      <AnimatePresence>
        {isOpen && (
          <div className="contact-options">
            <motion.a
              href={`https://wa.me/${phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item whatsapp"
              initial={{ opacity: 0, y: 20, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.5 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
            >
              <FaWhatsapp />
              <span className="tooltip">WhatsApp</span>
            </motion.a>

            <motion.a
              href={`tel:+${phoneNumber}`}
              className="contact-item phone"
              initial={{ opacity: 0, y: 20, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.5 }}
              transition={{ delay: 0, type: "spring", stiffness: 200, damping: 15 }}
            >
              <FaPhoneAlt />
              <span className="tooltip">Call Us</span>
            </motion.a>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        className={`main-fab ${isOpen ? 'open' : ''}`}
        onClick={toggleOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <FaTimes /> : <FaComments />}
      </motion.button>
    </div>
  );
};

export default FloatingContact;
