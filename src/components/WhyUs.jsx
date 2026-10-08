import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MessageSquareQuote, Clock, Users, Gem, BadgeCheck } from 'lucide-react';
import './WhyUs.css';

const WhyUs = () => {
  const features = [
    {
      icon: <ShieldCheck size={36} />,
      title: 'Good Quality',
      description: 'We check the materials and the work at every stage, not only at the end.'
    },
    {
      icon: <MessageSquareQuote size={36} />,
      title: 'Honest Talk',
      description: 'You get clear plans and true updates. You will not have to guess about cost or progress.'
    },
    {
      icon: <Clock size={36} />,
      title: 'Work On Time',
      description: 'We plan carefully and give a realistic time.'
    },
    {
      icon: <Users size={36} />,
      title: 'Skilled Team',
      description: 'Our supervisors and workers follow the plan on every job.'
    },
    {
      icon: <Gem size={36} />,
      title: 'Lasting Value',
      description: 'We build for comfort, use and strength for many years.'
    },
    {
      icon: <BadgeCheck size={36} />,
      title: 'Clear Pricing',
      description: 'Accurate cost estimation with zero hidden charges or surprise overheads from day one.'
    }
  ];

  return (
    <section className="why-us" id="why-us">
      <div className="section-header">
        <motion.h4 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          OUR ADVANTAGE
        </motion.h4>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="premium-title"
        >
          Why People <span>Choose Us</span>
        </motion.h2>
        <p>Discover our commitment to quality, structural integrity, and long-lasting value.</p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            className="feature-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <div className="feature-icon">
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <div className="card-shine"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
