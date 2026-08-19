import React from 'react';
import { motion } from 'framer-motion';
import { presentationData } from '../../data/content';

const Causes = () => {
  const { deepDiveTitle, deepDiveSubtitle, deepDiveIntroTitle, deepDiveIntroTheory, deepDiveIntroApply, dimensions, relations } =
    presentationData.concept;
  const { title, subtitle, items } = presentationData.causes;
  const conflictParts = relations.conflict.split('\n\n');

  return (
    <section className="min-h-screen py-32 px-8 lg:px-24 relative z-10 flex flex-col justify-center items-center text-center">
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="glass-panel-light p-8 rounded-2xl max-w-7xl w-full mb-12 text-center"
      >
        <h2 className="text-5xl md:text-7xl font-bold text-[#2C1E16] mb-4 tracking-tight font-serif">{deepDiveTitle}</h2>
        <p className="text-2xl md:text-3xl text-[#4A5D23] font-semibold mb-6">{deepDiveSubtitle}</p>
        <p className="text-2xl font-bold text-[#8B4513] mb-4">{deepDiveIntroTitle}</p>
        <p className="text-xl md:text-2xl text-[#2C1E16] leading-relaxed mb-4">{deepDiveIntroTheory}</p>
        <p className="text-xl md:text-2xl text-[#5C4033] font-medium">{deepDiveIntroApply}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 max-w-7xl w-full mb-12 items-start">
        <div className="space-y-8">
          {dimensions.map((dim, idx) => (
            <motion.div
              key={dim.title}
              initial={{ x: -50, opacity: 0, scale: 0.95 }}
              whileInView={{ x: 0, opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1, delay: idx * 0.2 }}
              className="glass-panel-light p-8 rounded-2xl text-center"
            >
              <h3 className="text-3xl font-bold text-[#4A5D23] mb-4 border-b border-[#4A5D23]/20 pb-4">{dim.title}</h3>
              <p className="text-xl md:text-2xl text-[#2C1E16] font-medium leading-relaxed">{dim.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ x: 50, opacity: 0, scale: 0.95 }}
          whileInView={{ x: 0, opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="glass-panel-light p-6 md:p-7 rounded-2xl text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[#8B4513] mb-4 border-b border-[#8B4513]/20 pb-3">2. Sự thống nhất và mâu thuẫn</h3>
          <div className="space-y-4">
            <div className="rounded-2xl bg-white/35 border border-white/50 px-5 py-4">
              <span className="text-[#4A5D23] text-xl md:text-2xl font-bold block mb-2 font-serif">Tính thống nhất:</span>
              <p className="text-lg md:text-xl text-[#2C1E16] font-medium leading-relaxed">
              {relations.unity}
              </p>
            </div>
            <div className="rounded-2xl bg-white/35 border border-white/50 px-5 py-4">
              <span className="text-[#8B4513] text-xl md:text-2xl font-bold block mb-3 font-serif">Tính mâu thuẫn:</span>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 text-left">
                {conflictParts.map((part) => {
                  const [label, ...content] = part.split(': ');
                  return (
                    <p key={label} className="rounded-xl bg-white/55 border border-white/60 p-4 text-base md:text-lg text-[#2C1E16] font-medium leading-relaxed">
                      <span className="block text-[#8B4513] font-bold mb-1">{label}:</span>
                      {content.join(': ')}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 mb-16 items-start max-w-7xl mx-auto w-full">
        <motion.div 
          className="flex-1 max-w-3xl text-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-[#2C1E16] mb-8 tracking-tight font-serif">{title}</h2>
          <div className="glass-panel-light p-8 rounded-2xl border-l-8 border-l-[#4A5D23]">
            <p className="text-xl md:text-2xl text-[#2C1E16] font-medium leading-relaxed italic">{subtitle}</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0, scale: 0.95 }}
          whileInView={{ x: 0, opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex-1 h-72 rounded-3xl overflow-hidden shadow-xl"
        >
          <img src="/assets/farmer.png" alt="Dak Lak Coffee Farmer" className="w-full h-full object-cover" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl w-full">
        {items.map((item, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, delay: index * 0.15 }}
            className="p-10 group relative overflow-hidden glass-panel-light rounded-3xl hover:shadow-2xl transition-all duration-300 text-center"
          >
            <div className="absolute top-0 right-0 p-8 text-8xl font-serif font-bold text-[#4A5D23]/10 group-hover:text-[#8B4513]/10 transition-colors duration-500 pointer-events-none">
              0{index + 1}
            </div>
            <h3 className="text-3xl font-bold text-[#8B4513] mb-4 relative z-10">{item.title}</h3>
            <p className="text-xl md:text-2xl text-[#2C1E16] font-medium leading-relaxed relative z-10">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Causes;
