import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { kannurLeadership, Leader } from '../data/organizationData';

const LeaderProfile = ({ leader, ml, index }: { leader: Leader; ml: boolean; index: number }) => {
  const [imgError, setImgError] = useState(false);
  const displayName = ml ? leader.nameMl : leader.name;
  const displayRole = ml ? leader.roleMl : leader.role;
  const hasPhoto = Boolean(leader.photo?.secureUrl && !imgError);

  // Responsive center-balancing for 10 items across 3-col and 4-col grids
  let placementClass = '';
  if (index === 8) {
    placementClass = 'lg:col-start-2 xl:col-start-auto';
  } else if (index === 9) {
    placementClass = 'md:max-lg:col-start-2';
  }

  const altText = ml
    ? `${displayName}, ${displayRole}, ബാലസംഘം കണ്ണൂർ`
    : `${displayName}, ${displayRole}, Balasangham Kannur`;

  return (
    <article className={`flex flex-col items-center text-center group ${placementClass}`}>
      {/* Circular Portrait */}
      <div className="w-28 h-28 min-[390px]:w-32 min-[390px]:h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-40 lg:h-40 xl:w-44 xl:h-44 rounded-full overflow-hidden shrink-0 mx-auto shadow-xs bg-[#EDE7DB] flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.03]">
        {hasPhoto && leader.photo ? (
          <img
            src={leader.photo.secureUrl}
            alt={altText}
            className="w-full h-full object-cover object-top"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <svg
            className="w-full h-full text-stone-400/80 bg-[#EDE7DB] p-4 sm:p-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        )}
      </div>

      {/* Name */}
      <h3 className={`mt-4 sm:mt-5 text-base sm:text-lg font-bold text-charcoal tracking-tight leading-snug group-hover:text-deep-red transition-colors ${ml ? 'font-malayalam' : ''}`}>
        {displayName}
      </h3>

      {/* Designation */}
      <p className={`mt-1 text-xs sm:text-sm text-dark-brown/70 font-normal leading-normal ${ml ? 'font-malayalam-body' : ''}`}>
        {displayRole}
      </p>
    </article>
  );
};

export const LeadershipPage = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <div className="bg-soft-cream min-h-screen">
      <Breadcrumb
        items={[
          { label: 'About Us', labelMl: 'ഞങ്ങളെക്കുറിച്ച്', path: '/about' },
          { label: 'Leadership', labelMl: 'നേതൃത്വം' },
        ]}
      />

      <section className="pt-10 sm:pt-14 md:pt-16 lg:pt-20 pb-16 sm:pb-20 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Simple Centered Heading with Generous Whitespace */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-black text-charcoal tracking-tight ${ml ? 'font-malayalam' : ''}`}>
              {ml ? 'കണ്ണൂർ ജില്ലാ കമ്മിറ്റി' : 'Kannur District Committee'}
            </h1>
          </div>

          {/* Minimal Editorial Leadership Directory Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 sm:gap-x-10 md:gap-x-12 lg:gap-x-10 xl:gap-x-12 gap-y-12 sm:gap-y-14 md:gap-y-16 justify-center items-start">
            {kannurLeadership.map((leader, i) => (
              <LeaderProfile key={i} index={i} leader={leader} ml={ml} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
