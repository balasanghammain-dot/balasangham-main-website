interface BalasanghamLogoProps {
  className?: string;
  alt?: string;
}

export const BalasanghamLogo = ({
  className = 'w-9 h-9 sm:w-10 sm:h-10',
  alt = 'Balasangham Official Logo',
}: BalasanghamLogoProps) => {
  return (
    <img
      src="/images/balasangham-logo.png"
      alt={alt}
      className={`object-contain inline-block ${className}`}
      loading="eager"
    />
  );
};
