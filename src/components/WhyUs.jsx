import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Heart, Star, Users, Award } from 'lucide-react';
import './WhyUs.css';

const WhyUs = () => {
  const features = [
    {
      icon: <ShieldCheck size={40} />,
      title: 'SAFETY FIRST',
      description: 'Strict adherence to national building safety codes and construction standards.'
    },
    {
      icon: <Zap size={40} />,
      title: 'EFFICIENT PLANNING',
      description: 'Smart layouts, cost optimization, and energy-efficient building strategies.'
    },
    {
      icon: <Users size={40} />,
      title: 'EXPERT ENGINEERS',
      description: 'Highly skilled architects, structural consultants, and project coordinators.'
    },
    {
      icon: <Heart size={40} />,
      title: 'CUSTOM DESIGNS',
      description: 'Translating your visions into custom-tailored residential and office designs.'
    },
    {
      icon: <Star size={40} />,
      title: 'PREMIUM QUALITY',
      description: 'Using high-grade structural steel, cement, and premium finishing materials.'
    },
    {
      icon: <Award size={40} />,
      title: 'TIMELY COMPLETION',
      description: 'Proven track record of completing projects on or before the committed date.'
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
          Why Choose <span>Nilan Infra?</span>
        </motion.h2>
        <p>Discover our commitment to quality, structural integrity, and architectural excellence.</p>
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
