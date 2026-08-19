import React from 'react';
import { motion } from 'framer-motion';
import { presentationData } from '../../data/content';

const ValueChain = () => {
  const { title, subtitle, steps, commentary, update2024, ending } = presentationData.valueChain;
  const formatStepValue = (value) => {
    const [first, second] = value.split(' / ');
    return second ? { first: `${first} /`, second } : { first: value, second: '' };
  };

  return (
    <section className="min-h-screen py-32 px-8 lg:px-24 relative z-10 flex flex-col justify-center">
      <div className="flex flex-col lg:flex-row gap-12 mb-16 items-start max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1 }}
          className="flex-1 glass-panel-light p-10 rounded-3xl"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-[#2C1E16] mb-8 tracking-tight font-serif">{title}</h2>
          <p className="text-2xl md:text-3xl text-[#5C4033] font-medium leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0, scale: 0.95 }}
          whileInView={{ x: 0, opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex-1 h-72 rounded-3xl overflow-hidden shadow-xl"
        >
          <img src="/assets/value_chain.png" alt="Coffee Value Chain" className="w-full h-full object-cover" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {steps.map((step, index) => (
            <motion.div 
              key={step.id} 
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex flex-col relative glass-panel-light p-8 rounded-2xl group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <span className="text-4xl md:text-5xl font-bold text-[#4A5D23] mb-4 block leading-tight">
                    {(() => {
                      const formattedValue = formatStepValue(step.value);
                      if (!formattedValue.second) {
                        return step.value;
                      }

                      return (
                        <>
                          <span className="block whitespace-nowrap">{formattedValue.first}</span>
                          <span className="block">{formattedValue.second}</span>
                        </>
                      );
                    })()}
                  </span>
                  <h3 className="text-2xl font-bold text-[#2C1E16] mb-2">{step.name}</h3>
                  <p className="text-[#8B4513] text-lg uppercase tracking-widest mb-4 font-bold">{step.role}</p>
                </div>
                <div className="border-t border-[#8B4513]/20 pt-4 mt-4 space-y-3">
                  <p className="text-xl md:text-2xl text-[#5C4033] font-medium">{step.effort}</p>
                  <p className="text-xl md:text-2xl text-[#2C1E16] leading-relaxed">{step.note}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        className="max-w-5xl mt-12 glass-panel-light p-8 rounded-2xl"
      >
        <p className="text-xl md:text-2xl text-[#2C1E16] leading-relaxed font-medium text-justify">
          {commentary}
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="max-w-4xl mt-16 glass-panel-light p-8 rounded-2xl border-l-8 border-l-[#8B4513]"
      >
        <p className="text-xl md:text-2xl text-[#2C1E16] leading-relaxed font-medium text-justify">
          "{update2024}"
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.9, delay: 1 }}
        className="max-w-5xl mt-10 glass-panel-light p-8 rounded-2xl"
      >
        <p className="text-xl md:text-2xl text-[#5C4033] leading-relaxed font-medium text-justify">
          {ending}
        </p>
      </motion.div>
    </section>
  );
};

export default ValueChain;
