import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 40, filter: 'blur(8px)' },
  enter: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -40, filter: 'blur(8px)' }
};

const pageTransition = {
  type: 'tween',
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.8
};

const PageTransition = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <>
        <motion.div
          className="fixed inset-0 z-40 pointer-events-none origin-top bg-[linear-gradient(180deg,rgba(74,93,35,0.96),rgba(139,69,19,0.9),rgba(248,242,230,0.0))]"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
        >
          {children}
        </motion.div>
      </>
    </AnimatePresence>
  );
};

export default PageTransition;
