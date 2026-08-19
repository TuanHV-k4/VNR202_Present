import React from 'react';
import { motion } from 'framer-motion';
import { presentationData } from '../../data/content';

const Role = () => {
  const { roleTitle, roles, roleQuote } = presentationData.concept;

  return (
    <section className="min-h-screen py-32 px-8 lg:px-24 relative z-10 flex flex-col justify-center">
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="glass-panel-light p-8 rounded-[2rem] max-w-7xl w-full mx-auto text-center"
      >
        <h2 className="text-5xl md:text-7xl font-bold text-[#2C1E16] mb-8 tracking-tight font-serif">{roleTitle}</h2>
        <div className="space-y-6">
          {roles.map((role) => (
            <p key={role.title} className="text-xl md:text-2xl text-[#2C1E16] font-medium leading-relaxed">
              <span className="text-[#8B4513] font-bold">{role.title}:</span> {role.desc}
            </p>
          ))}
          <div className="rounded-2xl border-l-4 border-[#4A5D23] bg-white/45 px-5 py-4">
            <p className="text-xl md:text-2xl text-[#2C1E16] font-medium italic leading-relaxed">{roleQuote}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Role;
