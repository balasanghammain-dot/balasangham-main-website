export const BackdropSunburst = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 1440 700"
    fill="none"
    preserveAspectRatio="none"
    className={`w-full h-full absolute inset-0 pointer-events-none ${className}`}
    aria-hidden="true"
  >
    <defs>
      {/* Central Golden Sun Glow */}
      <radialGradient id="festiveGlow" cx="50%" cy="20%" r="65%">
        <stop offset="0%" stopColor="#FFF9C4" stopOpacity="0.9" />
        <stop offset="25%" stopColor="#FBC02D" stopOpacity="0.6" />
        <stop offset="55%" stopColor="#F57F17" stopOpacity="0.3" />
        <stop offset="85%" stopColor="#D32F2F" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#B71C1C" stopOpacity="0" />
      </radialGradient>
      {/* Warm Golden Beam Gradient */}
      <linearGradient id="beamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF59D" stopOpacity="0.45" />
        <stop offset="60%" stopColor="#FBC02D" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#F57F17" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Radiant Backdrop Wash */}
    <rect width="1440" height="700" fill="url(#festiveGlow)" />

    {/* Festive Stage Sunburst Fan Rays radiating from central crest */}
    <g fill="url(#beamGrad)" opacity="0.65">
      {/* 16 symmetrical radiating fan wedges matching festival banner */}
      <polygon points="720,120 0,0 90,0" />
      <polygon points="720,120 180,0 270,0" />
      <polygon points="720,120 360,0 450,0" />
      <polygon points="720,120 540,0 630,0" />
      <polygon points="720,120 810,0 900,0" />
      <polygon points="720,120 990,0 1080,0" />
      <polygon points="720,120 1170,0 1260,0" />
      <polygon points="720,120 1350,0 1440,0" />
      <polygon points="720,120 1440,150 1440,250" />
      <polygon points="720,120 1440,350 1440,450" />
      <polygon points="720,120 0,150 0,250" />
      <polygon points="720,120 0,350 0,450" />
    </g>

    {/* Concentric Celebration Arcs */}
    <circle cx="720" cy="120" r="160" stroke="#FFF59D" strokeWidth="1.5" strokeDasharray="4 8" opacity="0.4" />
    <circle cx="720" cy="120" r="300" stroke="#FBC02D" strokeWidth="1" strokeDasharray="6 12" opacity="0.3" />
    <circle cx="720" cy="120" r="480" stroke="#F57F17" strokeWidth="1" opacity="0.2" />

    {/* Celebratory Stars floating in sky */}
    <g fill="#FFFFFF" opacity="0.75">
      {/* Left side stars */}
      <polygon points="200,80 203,88 212,88 205,93 208,101 200,96 192,101 195,93 188,88 197,88" transform="scale(0.8) translate(50, 40)" />
      <polygon points="320,140 323,148 332,148 325,153 328,161 320,156 312,161 315,153 308,148 317,148" transform="scale(0.6) translate(200, 60)" />
      <polygon points="120,240 122,246 128,246 123,250 125,256 120,252 115,256 117,250 112,246 118,246" />
      {/* Right side stars */}
      <polygon points="1240,90 1243,98 1252,98 1245,103 1248,111 1240,106 1232,111 1235,103 1228,98 1237,98" transform="scale(0.8) translate(300, 40)" />
      <polygon points="1120,160 1123,168 1132,168 1125,173 1128,181 1120,176 1112,181 1115,173 1108,168 1117,168" transform="scale(0.6) translate(650, 80)" />
      <polygon points="1320,220 1322,226 1328,226 1323,230 1325,236 1320,232 1315,236 1317,230 1312,226 1318,226" />
    </g>
  </svg>
);
