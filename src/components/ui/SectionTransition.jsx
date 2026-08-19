import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 72,
    scale: 0.985,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
};

const SectionTransition = ({ id, children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [54, 0, -42]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.985, 1, 0.992]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.8, 1], [0.42, 1, 1, 0.68]);

  return (
    <motion.section
      ref={ref}
      id={id}
      className="section-shell"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={sectionVariants}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div style={{ y, scale, opacity }} className="section-inner">
        {children}
      </motion.div>
    </motion.section>
  );
};

export default SectionTransition;
