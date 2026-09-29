export const ChildrenSilhouettes = ({ className = '' }: { className?: string }) => (
  <div className={`flex justify-center items-end gap-3 text-white/90 ${className}`} aria-hidden="true">
    {/* Stylized joyful children figures with books, flags, and open arms */}
    <svg viewBox="0 0 400 120" className="w-full max-w-lg h-auto" fill="currentColor">
      {/* Child with flag */}
      <circle cx="60" cy="40" r="10" />
      <path d="M50,55 Q60,52 70,55 L75,90 L67,90 L65,115 L55,115 L53,90 L45,90 Z" />
      <line x1="72" y1="58" x2="95" y2="25" stroke="#FFFFFF" strokeWidth="3" />
      <polygon points="95,25 115,20 115,35 95,40" fill="#D32F2F" />
      {/* Child reading book */}
      <circle cx="140" cy="48" r="9" />
      <path d="M130,62 Q140,60 150,62 L152,95 L144,95 L143,115 L137,115 L136,95 L128,95 Z" />
      <path d="M125,70 L140,75 L155,70 L155,80 L140,85 L125,80 Z" fill="#FBC02D" />
      {/* Children holding hands in fraternity */}
      <circle cx="210" cy="42" r="10" />
      <path d="M200,56 Q210,54 220,56 L224,90 L216,90 L215,115 L205,115 L204,90 L196,90 Z" />
      <circle cx="270" cy="40" r="10" />
      <path d="M260,54 Q270,52 280,54 L284,90 L276,90 L275,115 L265,115 L264,90 L256,90 Z" />
      {/* Interlinked arms */}
      <path d="M218,65 Q245,78 262,63" stroke="currentColor" strokeWidth="4" fill="none" />
      {/* Child releasing dove */}
      <circle cx="340" cy="44" r="9" />
      <path d="M330,58 Q340,56 350,58 L353,92 L345,92 L344,115 L336,115 L335,92 L327,92 Z" />
      {/* Dove flying overhead */}
      <path d="M360,25 Q370,18 380,22 Q372,28 368,32 Q362,30 360,25 Z" fill="#FFFFFF" />
    </svg>
  </div>
);
