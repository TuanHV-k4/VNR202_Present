import React, { useMemo } from 'react';

// A single coffee bean drawn in SVG inline
const BeanSVG = ({ size, opacity }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 60"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity }}
  >
    <defs>
      <radialGradient id={`bg-${size}`} cx="38%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#c47a4a" />
        <stop offset="45%" stopColor="#7b3a1e" />
        <stop offset="100%" stopColor="#3d1710" />
      </radialGradient>
    </defs>
    {/* Bean body */}
    <ellipse cx="20" cy="30" rx="16" ry="26" fill={`url(#bg-${size})`} />
    {/* Highlight */}
    <ellipse cx="14" cy="20" rx="7" ry="10" fill="#e8a06a" opacity="0.3" />
    {/* Center crease */}
    <path
      d="M 20 5 C 16 15, 24 25, 20 42 C 18 50, 20 55, 20 58"
      stroke="#2a0d06"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      opacity="0.85"
    />
  </svg>
);

// Generate deterministic random-ish values from index
const pseudo = (seed, offset = 0) => {
  const val = Math.sin(seed * 9301 + offset * 49297 + 233) * 10000;
  return val - Math.floor(val);
};

const FallingBeans = ({ count = 28 }) => {
  const beans = useMemo(() =>
    Array.from({ length: count }, (_, i) => {
      const leftPct   = pseudo(i, 1) * 100;           // 0-100% horizontal
      const duration  = 5 + pseudo(i, 2) * 9;         // 5-14s fall
      const delay     = pseudo(i, 3) * -15;            // staggered start (-15 to 0s)
      const size      = 16 + pseudo(i, 4) * 18;       // 16-34px
      const opacity   = 0.3 + pseudo(i, 5) * 0.4;    // 0.3-0.7
      const rotation  = pseudo(i, 6) * 360;            // 0-360deg initial
      const rotSpeed  = (pseudo(i, 7) - 0.5) * 720;  // -360 to 360 total rotation
      const swayAmp   = 24 + pseudo(i, 8) * 48;       // horizontal sway px
      const swayDir   = pseudo(i, 9) > 0.5 ? 1 : -1; // sway direction

      return { leftPct, duration, delay, size, opacity, rotation, rotSpeed, swayAmp, swayDir };
    }),
  [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-5" aria-hidden="true">
      {beans.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${b.leftPct}%`,
            top: '-60px',
            animation: `fall-bean-${i} ${b.duration}s ${b.delay}s linear infinite`,
          }}
        >
          <BeanSVG size={b.size} opacity={b.opacity} />
        </div>
      ))}

      {/* Inject keyframes dynamically */}
      <style>{
        beans.map((b, i) => `
          @keyframes fall-bean-${i} {
            0%   { transform: translateY(0px)   translateX(0px)          rotate(${b.rotation}deg); }
            25%  { transform: translateY(25vh)  translateX(${b.swayAmp * b.swayDir}px) rotate(${b.rotation + b.rotSpeed * 0.25}deg); }
            50%  { transform: translateY(50vh)  translateX(0px)          rotate(${b.rotation + b.rotSpeed * 0.5}deg); }
            75%  { transform: translateY(75vh)  translateX(${b.swayAmp * b.swayDir * -1}px) rotate(${b.rotation + b.rotSpeed * 0.75}deg); }
            100% { transform: translateY(110vh) translateX(0px)          rotate(${b.rotation + b.rotSpeed}deg); }
          }
        `).join('\n')
      }</style>
    </div>
  );
};

export default FallingBeans;
