import React from 'react';
import { motion } from 'framer-motion';
import { presentationData } from '../../data/content';

const Story = () => {
  const { intro, farmer, retail } = presentationData.story;

  return (
    <motion.section
      className="min-h-screen relative z-10 max-w-7xl mx-auto py-20 px-4 md:px-8 space-y-10 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 1.5 }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
        className="glass-panel-clear rounded-[2rem] p-8 md:p-10 lg:p-12"
      >
        <div className="text-[#8B4513] text-lg md:text-xl uppercase tracking-[0.32em] mb-4 font-bold">{intro.title}</div>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr] items-start">
          <div className="space-y-5">
            <p className="text-xl md:text-2xl text-[#2C1E16] font-medium leading-relaxed">{intro.lead}</p>
            <p className="text-xl md:text-2xl text-[#5C4033] leading-relaxed">{intro.insight}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {intro.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/60 bg-white/55 px-5 py-6 shadow-sm text-center">
                <div className="text-base uppercase tracking-[0.24em] text-[#8B4513]/75 font-semibold mb-2">{stat.label}</div>
                <div className="text-3xl md:text-4xl font-bold text-[#4A5D23]">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 flex flex-col justify-center group">
        <motion.div 
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="glass-panel-clear p-8 md:p-12 rounded-3xl h-full flex flex-col text-center"
        >
          <div className="text-[#8B4513] text-lg md:text-xl uppercase tracking-[0.3em] mb-4 font-bold">Người Sản Xuất</div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#2C1E16] mb-6 font-serif leading-tight">{farmer.name}</h2>
          
          <div className="w-full h-64 rounded-2xl overflow-hidden mb-8">
            <img src={farmer.image} alt="Raw Coffee Beans" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
          
          <p className="text-xl md:text-2xl text-[#4A3219] font-medium leading-relaxed mt-auto">{farmer.description}</p>
        </motion.div>
      </div>

        <div className="flex-1 flex flex-col justify-center group">
        <motion.div 
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="glass-panel-clear p-8 md:p-12 rounded-3xl h-full flex flex-col text-center"
        >
          <div className="text-[#4A5D23] text-lg md:text-xl uppercase tracking-[0.3em] mb-4 font-bold">Chuỗi Bán Lẻ</div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#2C1E16] mb-6 font-serif leading-tight">{retail.name}</h2>
          
          <div className="w-full h-64 rounded-2xl overflow-hidden mb-8">
            <img src={retail.image} alt="Premium Coffee Cup" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
          
          <p className="text-xl md:text-2xl text-[#4A3219] font-medium leading-relaxed mt-auto">{retail.description}</p>
        </motion.div>
      </div>
      </div>
    </motion.section>
  );
};

export default Story;
