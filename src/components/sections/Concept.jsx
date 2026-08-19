import React from 'react';
import { motion } from 'framer-motion';
import { presentationData } from '../../data/content';

const Concept = () => {
  const {
    title,
    subtitle,
    definition,
    overview,
    actorsIntro,
    actors,
    nature,
  } = presentationData.concept;

  return (
    <section className="min-h-screen py-32 px-8 lg:px-24 relative z-10 flex flex-col justify-center items-center text-center">
      <motion.div 
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="max-w-5xl mb-16 mx-auto text-center"
      >
        <h2 className="text-5xl md:text-7xl font-bold text-[#2C1E16] mb-4 tracking-tight font-serif">{title}</h2>
        {subtitle ? (
          <p className="text-2xl md:text-3xl text-[#4A5D23] font-bold mb-8 uppercase tracking-widest">{subtitle}</p>
        ) : null}
        <div className="glass-panel-light p-8 rounded-2xl border-l-8 border-l-[#8B4513] space-y-4">
          <p className="text-xl md:text-2xl text-[#2C1E16] font-medium leading-relaxed italic text-center">
            "{definition}"
          </p>
          <p className="text-xl md:text-2xl text-[#5C4033] leading-relaxed text-center">{overview}</p>
        </div>
      </motion.div>

      <div className="max-w-7xl w-full mb-8 text-center">
        <div className="inline-block bg-white/70 backdrop-blur-md px-6 py-2 rounded-full border border-white/50 shadow-sm">
          <p className="text-xl md:text-2xl lg:text-[1.7rem] text-[#8B4513] font-bold">{actorsIntro}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl w-full mb-12">
        {actors.map((actor, idx) => (
          <motion.div
            key={actor.subject}
            initial={{ y: 40, opacity: 0, scale: 0.95 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            className="glass-panel-light p-6 rounded-2xl text-center"
          >
            <h3 className="text-2xl font-bold text-[#2C1E16] mb-3">{actor.subject}</h3>
            <p className="text-lg md:text-xl uppercase tracking-[0.2em] text-[#8B4513] font-semibold mb-3">{actor.benefit}</p>
            <p className="text-xl md:text-2xl text-[#5C4033] leading-relaxed">{actor.expression}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="glass-panel-light p-8 md:p-10 rounded-[2rem] max-w-7xl w-full mb-12 text-center"
      >
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-[#8B4513] mb-6">{nature.title}</h3>
          <p className="text-2xl md:text-3xl italic text-[#2C1E16] mb-8 leading-relaxed">
            {nature.quote}
          </p>
          <div className="inline-flex items-center rounded-full border border-[#8B4513]/15 bg-white/60 px-6 py-3 text-[#8B4513] font-bold text-xl md:text-2xl shadow-sm mb-8">
            {nature.paragraphs[0].replace(/^1\.\s*/, '')}
          </div>
          <div className="space-y-4 mb-10">
            {nature.paragraphs.slice(1).map((paragraph) => (
              <p key={paragraph} className="text-xl md:text-2xl text-[#2C1E16] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {nature.items.map((item) => (
            <div
              key={item}
              className="rounded-[1.75rem] bg-white/65 border border-white/60 p-6 md:p-7 text-xl md:text-2xl text-[#4A3219] leading-relaxed text-center shadow-[0_18px_40px_rgba(60,42,24,0.08)]"
            >
              {item}
            </div>
          ))}
        </div>
      </motion.div>

    </section>
  );
};

export default Concept;
