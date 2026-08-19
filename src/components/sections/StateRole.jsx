import React from 'react';
import { motion } from 'framer-motion';
import { presentationData } from '../../data/content';

const StateRole = () => {
  const {
    title,
    subtitle,
    context,
    foundationTitle,
    foundationLead,
    foundation,
    redistributionTitle,
    redistributionTheory,
    redistributionItems,
    preventive,
    resolution,
  } = presentationData.stateRole;

  const [, ...preventiveParagraphs] = preventive.desc.split('\n');

  return (
    <section className="min-h-screen py-32 px-8 lg:px-24 relative z-10 flex flex-col justify-center items-center text-center">
      <div className="flex flex-col lg:flex-row gap-12 mb-16 items-start max-w-7xl mx-auto w-full">
        <motion.div 
          className="flex-1 text-center"
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-[#2C1E16] mb-8 tracking-tight font-serif">{title}</h2>
          <div className="glass-panel-light p-8 rounded-2xl border-l-8 border-l-[#8B4513] max-w-4xl space-y-4 mx-auto">
            <p className="text-xl md:text-2xl text-[#2C1E16] font-medium leading-relaxed italic">{subtitle}</p>
            <p className="text-xl md:text-2xl text-[#5C4033] leading-relaxed">{context}</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0, scale: 0.95 }}
          whileInView={{ x: 0, opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="lg:w-80 h-64 lg:h-80 rounded-3xl overflow-hidden shadow-xl flex-shrink-0"
        >
          <img src="/assets/state.png" alt="State Intervention" className="w-full h-full object-cover" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-7xl w-full mb-12 glass-panel-light p-8 rounded-3xl text-center"
      >
        <h3 className="text-3xl font-bold text-[#2C1E16] mb-4">{foundationTitle}</h3>
        <p className="text-xl md:text-2xl text-[#5C4033] leading-relaxed mb-6">{foundationLead}</p>
        <div className="grid gap-6 md:grid-cols-2">
          {foundation.map((item, index) => (
            <div key={item} className="rounded-2xl bg-white/55 border border-white/50 p-6 md:p-8 h-full text-center">
              <div className="text-lg md:text-xl font-bold uppercase tracking-[0.2em] text-[#8B4513] mb-3">0{index + 1}</div>
              <p className="text-xl md:text-2xl text-[#4A3219] leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="max-w-7xl w-full mb-12 glass-panel-light p-8 rounded-3xl text-center"
      >
        <h3 className="text-3xl font-bold text-[#2C1E16] mb-4">{redistributionTitle}</h3>
        <p className="text-xl md:text-2xl text-[#5C4033] leading-relaxed mb-6">{redistributionTheory}</p>
        <div className="grid gap-6 md:grid-cols-2">
          {redistributionItems.map((item, index) => (
            <div key={item} className="rounded-2xl bg-white/55 border border-white/50 p-6 md:p-8 h-full text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="text-xl md:text-2xl font-bold uppercase tracking-[0.2em] text-[#8B4513] mb-4">0{index + 1}</div>
              <p className="text-xl md:text-2xl text-[#4A3219] leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="flex flex-col gap-12 max-w-7xl w-full">
        {/* Preventive Measures */}
        <div className="w-full space-y-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="glass-panel-light rounded-[2rem] px-10 py-8 md:px-14 md:py-10 lg:px-16 text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-[#4A5D23] leading-tight mb-5">
                {preventive.title}
              </h3>
              <div className="space-y-4">
                {preventiveParagraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-xl md:text-2xl text-[#5C4033] font-medium leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {preventive.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group flex flex-col glass-panel-light p-7 md:p-8 rounded-[1.75rem] border border-[#4A5D23]/10 hover:-translate-y-2 transition-transform duration-300 text-center"
              >
                <div className="flex flex-col items-center gap-4 mb-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#8B4513]/10 text-[#8B4513] text-xl font-bold">
                    0{index + 1}
                  </span>
                  <h4 className="text-2xl font-bold text-[#2C1E16] leading-snug">
                    {item.title}
                  </h4>
                </div>
                <div className="space-y-3">
                  {item.desc.split('\n').map((line) => (
                    <p
                      key={line}
                      className="text-lg md:text-xl text-[#5C4033] font-medium leading-relaxed"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resolution Measure */}
        <motion.div 
          className="w-full glass-panel-light p-8 md:p-12 rounded-3xl flex flex-col relative overflow-hidden text-center"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="border-b border-[#8B4513]/30 pb-6 mb-8 relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-[#8B4513] mb-4">{resolution.title}</h3>
            <p className="text-xl md:text-2xl text-[#2C1E16] font-medium leading-relaxed max-w-4xl mx-auto relative z-10">
              {resolution.desc}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {resolution.actions.map((action, index) => (
              <div key={action} className="flex flex-col items-center rounded-2xl border border-[#8B4513]/10 bg-white/40 p-8 text-center hover:-translate-y-2 transition-transform duration-300">
                <span className="text-[#8B4513] text-4xl font-bold mb-4">0{index + 1}</span>
                <p className="text-lg md:text-xl text-[#2C1E16] font-medium leading-relaxed">{action}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StateRole;
