export const PeaceDove = ({
  className = 'w-6 h-6',
  size,
  filled = false,
}: {
  className?: string;
  size?: number;
  filled?: boolean;
}) => {
  if (filled) {
    return (
      <svg
        viewBox="0 0 64 48"
        width={size}
        height={size}
        fill="currentColor"
        className={`inline-block ${className}`}
        aria-hidden="true"
      >
        {/* Soaring peaceful white dove with spread wings and olive branch / leaf */}
        <path d="M4 28 C 8 26, 16 28, 22 24 C 24 16, 28 8, 38 4 C 42 2, 46 3, 44 8 C 42 14, 38 18, 34 22 C 40 20, 50 20, 58 24 C 62 26, 64 30, 60 32 C 54 34, 46 32, 40 34 C 36 38, 30 44, 22 46 C 18 47, 16 44, 18 40 C 20 36, 22 34, 18 34 C 12 34, 8 36, 4 34 C 2 33, 2 29, 4 28 Z" />
        {/* Eye */}
        <circle cx="56" cy="27" r="1.5" fill="#D32F2F" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block ${className}`}
      aria-hidden="true"
    >
      <path d="M10 13c-2.5 0-5 2-7 1 0-3 2-6 5-8 1-0.7 2.5-1 4-1 2 0 4 1 5 3l4-2c0 2-1 4-2 5l3 2c-1 1-3 1-5 0l-2 3c-1.5 2-3 3-5 3-1 0-2-1-2-2 0-2 2-3 4-3z" />
      <circle cx="15" cy="7" r="1" fill="currentColor" />
    </svg>
  );
};
