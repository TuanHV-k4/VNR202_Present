import React from 'react';
import { motion } from 'framer-motion';
import { presentationData } from '../../data/content';

const Conclusion = () => {
  const { title, message, summary, bridge, quotes, finalWish } = presentationData.conclusion;
  const closingLines = Array.isArray(finalWish) ? finalWish : [finalWish];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const closingShell = {
    hidden: { opacity: 0, y: 44, scale: 0.96, filter: 'blur(10px)' },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.1,
        ease: [0.18, 1, 0.3, 1],
        staggerChildren: 0.18,
        delayChildren: 0.14,
      }
    }
  };

  const closingLine = {
    hidden: { opacity: 0, y: 32, rotateX: -14 },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.9, ease: [0.2, 1, 0.32, 1] }
    }
  };

  const dividerReveal = {
    hidden: { opacity: 0, scaleX: 0.35 },
    show: {
      opacity: 1,
      scaleX: 1,
      transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="min-h-screen py-24 px-4 md:px-8 relative z-10 flex flex-col items-center justify-center">
      <motion.div 
        className="max-w-5xl w-full mx-auto space-y-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        {/* Title */}
        <motion.div variants={item} className="text-center mb-8">
          <div className="inline-flex items-center rounded-full border border-[#8B4513]/15 bg-[#f7f0e2]/80 px-4 py-2 text-sm md:text-base font-semibold uppercase tracking-[0.28em] text-[#8B4513] mb-4">
            {title}
          </div>
        </motion.div>

        {/* Highlight Message */}
        <motion.div variants={item} className="glass-panel-light p-8 md:p-12 rounded-[2rem] text-center border-t-4 border-[#8B4513]">
          <h2 className="text-3xl md:text-5xl lg:text-[54px] font-bold text-[#8B4513] leading-tight tracking-tight font-serif italic">
            "{message}"
          </h2>
        </motion.div>

        {/* Summary & Bridge Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div variants={item} className="glass-panel-light p-8 rounded-[2rem] text-center">
            <p className="text-xl md:text-2xl text-[#2C1E16] leading-relaxed font-medium">
              {summary}
            </p>
          </motion.div>
          <motion.div variants={item} className="glass-panel-light p-8 rounded-[2rem] bg-white/40 text-center">
            <p className="text-xl md:text-2xl text-[#5C4033] leading-relaxed">
              {bridge}
            </p>
          </motion.div>
        </div>

        {/* Quotes */}
        <motion.div variants={item} className="glass-panel-light p-8 md:p-12 rounded-[2rem] text-center">
          <div className="space-y-6">
            {quotes.map((quote, idx) => (
              <p key={idx} className="text-xl md:text-2xl text-[#2C1E16] font-medium border-l-4 border-[#4A5D23] pl-6 py-2 text-center">
                {quote}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Final Wish */}
        <motion.div variants={item} className="pt-24 pb-12 text-center flex flex-col items-center">
          <motion.div
            className="relative max-w-6xl px-4 md:px-8 py-10 md:py-14"
            variants={closingShell}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.55 }}
            style={{ transformPerspective: 1200 }}
          >
            <motion.div
              className="absolute inset-0 -z-10 rounded-[2.5rem] bg-[radial-gradient(circle_at_center,rgba(248,241,228,0.92)_0%,rgba(244,235,219,0.82)_34%,rgba(110,76,45,0.36)_72%,rgba(110,76,45,0.08)_100%)] backdrop-blur-[3px]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.55 }}
              transition={{ duration: 1.05, ease: [0.18, 1, 0.3, 1] }}
            />
            <motion.div
              className="absolute inset-x-[8%] top-[14%] -z-10 h-[32%] rounded-full bg-white/18 blur-3xl"
              initial={{ opacity: 0, scale: 0.72 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.55 }}
              transition={{ duration: 1.2, delay: 0.08, ease: [0.18, 1, 0.3, 1] }}
            />
            <motion.div
              className="mx-auto mb-8 h-px w-32 origin-center bg-gradient-to-r from-transparent via-[#8b5128] to-transparent opacity-95"
              variants={dividerReveal}
            />
            <div className="space-y-4 md:space-y-5">
              {closingLines.map((line, idx) =>
                line ? (
                  <motion.p
                    key={idx}
                    variants={closingLine}
                    className={`italic ${
                      idx < 2
                        ? 'text-[2.1rem] md:text-[3.35rem] lg:text-[4.2rem] font-bold leading-[1.16] tracking-[0.015em]'
                        : 'text-[1.8rem] md:text-[2.8rem] lg:text-[3.5rem] font-semibold leading-[1.2] tracking-[0.02em]'
                    }`}
                    style={{
                      fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
                      color: idx < 2 ? '#3f2212' : '#4b2917',
                      textShadow:
                        idx < 2
                          ? '0 1px 0 rgba(255, 251, 244, 1), 0 0 20px rgba(255, 247, 233, 0.52), 0 10px 28px rgba(58, 33, 17, 0.32), 0 18px 40px rgba(58, 33, 17, 0.2)'
                          : '0 1px 0 rgba(255, 251, 244, 0.96), 0 0 16px rgba(255, 247, 233, 0.42), 0 8px 22px rgba(58, 33, 17, 0.28), 0 14px 34px rgba(58, 33, 17, 0.18)',
                    }}
                  >
                    {line}
                  </motion.p>
                ) : (
                  <div key={idx} className="h-4 md:h-7" aria-hidden="true" />
                )
              )}
            </div>
            <motion.div
              className="mx-auto mt-8 flex items-center justify-center gap-4 opacity-85"
              variants={dividerReveal}
            >
              <span className="h-px w-10 bg-[#a86d3d]/70"></span>
              <span className="text-[0.7rem] md:text-xs uppercase tracking-[0.45em] text-[#8f5b35]">
                Fair Value
              </span>
              <span className="h-px w-10 bg-[#a86d3d]/70"></span>
            </motion.div>
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Conclusion;
