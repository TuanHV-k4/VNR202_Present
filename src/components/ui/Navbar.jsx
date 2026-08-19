import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Mở đầu' },
  { id: 'story', label: 'Câu chuyện' },
  { id: 'concept', label: 'Khái niệm' },
  { id: 'valuechain', label: 'Biểu hiện' },
  { id: 'causes', label: 'Quan hệ lợi ích' },
  { id: 'state', label: 'Nhà nước' },
  { id: 'conclusion', label: 'Kết luận' },
];

const Navbar = () => {
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0);

      const currentSection = sections.find(s => {
        const el = document.getElementById(s.id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 180 && rect.bottom >= 180;
      });
      if (currentSection) setActive(currentSection.id);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#f8f2e6]/78 backdrop-blur-2xl shadow-[0_18px_48px_rgba(60,42,24,0.14)]'
          : 'bg-transparent'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <button
            onClick={() => scrollTo('hero')}
            className="text-left"
          >
            <div className="text-[#2C1E16] font-serif font-bold text-xl md:text-[1.35rem] tracking-tight whitespace-nowrap hover:text-[#4A5D23] transition-colors">
              Chuỗi Cà Phê VN
            </div>
            <div className="text-[0.7rem] md:text-xs uppercase tracking-[0.35em] text-[#8B4513]/80 font-semibold whitespace-nowrap">
              Từ nông trại đến ly cà phê
            </div>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-1 rounded-full border border-white/50 bg-white/45 px-2 py-2 shadow-[0_10px_30px_rgba(60,42,24,0.08)]">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`relative px-4 py-2 text-[15px] md:text-base font-semibold rounded-full transition-all duration-300 ${
                active === s.id
                  ? 'text-white'
                  : 'text-[#2C1E16] hover:text-[#4A5D23]'
              }`}
            >
              {active === s.id && (
                <motion.span
                  layoutId="activeNav"
                  className="absolute inset-0 bg-[#4A5D23] rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 whitespace-nowrap">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-[2px] w-full bg-[#8B4513]/8">
        <motion.div
          className="h-full bg-gradient-to-r from-[#8B4513] via-[#4A5D23] to-[#8B4513]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
      </div>
    </motion.nav>
  );
};

export default Navbar;
