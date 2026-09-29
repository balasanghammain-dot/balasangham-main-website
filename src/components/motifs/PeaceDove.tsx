export const PeaceDove = ({
  className = 'w-6 h-6',
  size,
}: {
  className?: string;
  size?: number;
}) => (
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
