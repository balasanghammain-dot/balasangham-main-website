export const BalasanghamFlag = ({
  className = 'w-10 h-6',
  title = 'Balasangham Official Flag',
}: {
  className?: string;
  title?: string;
}) => (
  <svg
    viewBox="0 0 60 36"
    className={`inline-block rounded-sm shadow-sm border border-slate-300 overflow-hidden ${className}`}
    aria-label={title}
    role="img"
  >
    {/* Pure White Background (ശുഭ്രപതാക) */}
    <rect width="60" height="36" fill="#FFFFFF" />
    {/* Central Blood Red 5-Pointed Star (രക്തതാരം) */}
    <polygon
      points="30,8 33.5,15.5 41.5,16.5 35.5,22 37,30 30,26 23,30 24.5,22 18.5,16.5 26.5,15.5"
      fill="#D32F2F"
    />
  </svg>
);
