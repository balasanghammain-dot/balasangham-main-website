export const FestiveBunting = ({ className = '' }: { className?: string }) => {
  // Repeating colorful flags: Red, Yellow, Blue, Green, Orange, Purple
  const colors = ['#D71920', '#FFC928', '#168BD4', '#2E9E5B', '#FF9F00', '#7B2CBF'];

  return (
    <div className={`w-full overflow-hidden leading-none select-none pointer-events-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 24"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-4 sm:h-6"
      >
        <path
          d="M0,0 Q300,12 600,6 Q900,12 1200,0"
          stroke="#321A12"
          strokeWidth="1"
          strokeOpacity="0.25"
          fill="none"
        />
        {Array.from({ length: 36 }).map((_, i) => {
          const x = i * 33.3 + 8;
          const color = colors[i % colors.length];
          return (
            <polygon
              key={i}
              points={`${x},2 ${x + 18},2 ${x + 9},18`}
              fill={color}
              opacity="0.9"
            />
          );
        })}
      </svg>
    </div>
  );
};
