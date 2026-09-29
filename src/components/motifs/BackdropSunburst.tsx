export const BackdropSunburst = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 1440 600"
    fill="none"
    preserveAspectRatio="none"
    className={`w-full h-full absolute inset-0 pointer-events-none opacity-40 mix-blend-screen ${className}`}
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="sunGlow" cx="50%" cy="30%" r="60%">
        <stop offset="0%" stopColor="#FFF176" stopOpacity="0.8" />
        <stop offset="40%" stopColor="#FBC02D" stopOpacity="0.4" />
        <stop offset="70%" stopColor="#F57F17" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#D32F2F" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="1440" height="600" fill="url(#sunGlow)" />
    {/* Radiating solar celebration rays */}
    <g stroke="#FBC02D" strokeWidth="2" opacity="0.3">
      <line x1="720" y1="180" x2="0" y2="0" />
      <line x1="720" y1="180" x2="180" y2="0" />
      <line x1="720" y1="180" x2="360" y2="0" />
      <line x1="720" y1="180" x2="540" y2="0" />
      <line x1="720" y1="180" x2="900" y2="0" />
      <line x1="720" y1="180" x2="1080" y2="0" />
      <line x1="720" y1="180" x2="1260" y2="0" />
      <line x1="720" y1="180" x2="1440" y2="0" />
    </g>
  </svg>
);
