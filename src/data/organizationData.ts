export interface CloudinaryPhoto {
  publicId: string;
  secureUrl: string;
  width?: number;
  height?: number;
  format?: string;
}

export interface Leader {
  name: string;
  nameMl: string;
  role: string;
  roleMl: string;
  designation?: string;
  designationMl?: string;
  district?: string;
  districtMl?: string;
  photo?: CloudinaryPhoto;
}

export interface Alumni {
  name: string;
  nameMl: string;
  role: string;
  roleMl: string;
  description: string;
  descriptionMl: string;
}

export interface OfficialContact {
  organization: string;
  organizationMl: string;
  officeName: string;
  officeNameMl: string;
  building: string;
  buildingMl: string;
  locality: string;
  localityMl: string;
  addressLines: string[];
  addressLinesMl: string[];
  addressLinesEn: string[];
  phone: string;
  phoneTel: string;
}

export const organizationInfo = {
  name: 'Balasangham',
  nameMl: 'ബാലസംഘം',
  district: 'Kannur',
  districtMl: 'കണ്ണൂർ',
  tagline: 'Kerala\'s Largest Children\'s Organization',
  taglineMl: 'കേരളത്തിലെ ഏറ്റവും വലിയ കുട്ടികളുടെ പ്രസ്ഥാനം',
  slogan: 'Study, Struggle, Grow',
  sloganMl: 'പഠിക്കുക, പോരാടുക, വളരുക',
  foundingYear: 1938,
  foundingPlace: 'Kalliasseri, Kannur',
  foundingPlaceMl: 'കല്ല്യാശ്ശേരി, കണ്ണൂർ',
  stats: {
    members: '1,000,000+',
    membersMl: '10 ലക്ഷം+',
    units: '20,000+',
    unitsMl: '20,000+',
    districts: '14',
    districtsMl: '14',
    years: '88+',
    yearsMl: '88+',
  },
  symbols: {
    flag: 'White flag with red five-pointed star in top left canton',
    flagMl: 'മുകളിൽ ഇടതുവശത്ത് ചുവന്ന പഞ്ചകോണ നക്ഷത്രമുള്ള വെള്ളക്കൊടി',
    dove: 'White dove symbolizing peace and global childhood unity',
    doveMl: 'സമാധാനത്തിന്റെയും ലോക ബാല്യ ഐക്യത്തിന്റെയും പ്രതീകമായ വെള്ളപ്രാവ്',
  },
  socialLinks: [
    {
      platform: 'Facebook (Kannur)',
      url: 'https://www.facebook.com/balasangham.kannur/',
      handle: 'balasangham.kannur',
    },
    {
      platform: 'Facebook (Kerala)',
      url: 'https://www.facebook.com/balasangham.kerala/',
      handle: 'balasangham.kerala',
    },
    {
      platform: 'Instagram',
      url: 'https://www.instagram.com/balasanghamkannur_dc/',
      handle: '@balasanghamkannur_dc',
    },
    {
      platform: 'YouTube',
      url: 'https://www.youtube.com/@balasanghamkerala2817',
      handle: '@balasanghamkerala2817',
    },
  ],
  contact: {
    organization: 'Balasangham Kannur District Committee',
    organizationMl: 'ബാലസംഘം കണ്ണൂർ ജില്ലാ കമ്മിറ്റി',
    officeName: 'Balasangham Kannur District Committee Office',
    officeNameMl: 'ബാലസംഘം കണ്ണൂർ ജില്ലാ കമ്മിറ്റി ഓഫീസ്',
    building: 'Azhikodan Smaraka Mandiram',
    buildingMl: 'അഴീക്കോടൻ സ്മാരക മന്ദിരം',
    locality: 'Thalap, Kannur',
    localityMl: 'തളാപ്പ്, കണ്ണൂർ',
    addressLines: [
      'ബാലസംഘം കണ്ണൂർ ജില്ലാ കമ്മിറ്റി ഓഫീസ്',
      'അഴീക്കോടൻ സ്മാരക മന്ദിരം',
      'തളാപ്പ്, കണ്ണൂർ',
    ],
    addressLinesMl: [
      'ബാലസംഘം കണ്ണൂർ ജില്ലാ കമ്മിറ്റി ഓഫീസ്',
      'അഴീക്കോടൻ സ്മാരക മന്ദിരം',
      'തളാപ്പ്, കണ്ണൂർ',
    ],
    addressLinesEn: [
      'Balasangham Kannur District Committee Office',
      'Azhikodan Smaraka Mandiram',
      'Thalap, Kannur',
    ],
    phone: '9744164253',
    phoneTel: 'tel:9744164253',
  },
};

export const officialContact: OfficialContact = organizationInfo.contact;

export const kannurLeadership: Leader[] = [
  {
    name: 'K. Surya',
    nameMl: 'കെ. സൂര്യ',
    role: 'District President',
    roleMl: 'ജില്ലാ പ്രസിഡന്റ്',
    designation: 'District President',
    designationMl: 'ജില്ലാ പ്രസിഡന്റ്',
    district: 'Kannur District',
    districtMl: 'കണ്ണൂർ ജില്ല',
    photo: {
      publicId: 'balasangham/leadership/kannur_k_surya',
      secureUrl: 'https://res.cloudinary.com/dj4apdzk/image/upload/v1790975752/balasangham/leadership/kannur_k_surya.jpg',
      width: 960,
      height: 1280,
      format: 'jpg',
    },
  },
  {
    name: 'M.P. Gokul',
    nameMl: 'എം. പി. ഗോകുൽ',
    role: 'District Secretary',
    roleMl: 'ജില്ലാ സെക്രട്ടറി',
    designation: 'District Secretary',
    designationMl: 'ജില്ലാ സെക്രട്ടറി',
    district: 'Kannur District',
    districtMl: 'കണ്ണൂർ ജില്ല',
    photo: {
      publicId: 'balasangham/leadership/kannur_gokul_mp',
      secureUrl: 'https://res.cloudinary.com/dj4apdzk/image/upload/v1790975745/balasangham/leadership/kannur_gokul_mp.jpg',
      width: 1200,
      height: 1600,
      format: 'jpg',
    },
  },
  {
    name: 'P. Sumeshan Master',
    nameMl: 'പി. സുമേശൻ മാസ്റ്റർ',
    role: 'District Convener',
    roleMl: 'ജില്ലാ കൺവീനർ',
    designation: 'District Convener',
    designationMl: 'ജില്ലാ കൺവീനർ',
    district: 'Kannur District',
    districtMl: 'കണ്ണൂർ ജില്ല',
    photo: {
      publicId: 'balasangham/leadership/kannur_p_sumeshan',
      secureUrl: 'https://res.cloudinary.com/dj4apdzk/image/upload/v1790975755/balasangham/leadership/kannur_p_sumeshan.jpg',
      width: 778,
      height: 1280,
      format: 'jpg',
    },
  },
  {
    name: 'Anuvind Ayithara',
    nameMl: 'അനുവിന്ദ് ആയിത്തര',
    role: 'District Coordinator',
    roleMl: 'ജില്ലാ കോഓർഡിനേറ്റർ',
    designation: 'District Coordinator',
    designationMl: 'ജില്ലാ കോഓർഡിനേറ്റർ',
    district: 'Kannur District',
    districtMl: 'കണ്ണൂർ ജില്ല',
    photo: {
      publicId: 'balasangham/leadership/kannur_anuvind_ayithara',
      secureUrl: 'https://res.cloudinary.com/dj4apdzk/image/upload/v1790975754/balasangham/leadership/kannur_anuvind_ayithara.jpg',
      width: 960,
      height: 1280,
      format: 'jpg',
    },
  },
  {
    name: 'Darshana Sanoj',
    nameMl: 'ദർശന സനോജ്',
    role: 'Vice President',
    roleMl: 'വൈസ് പ്രസിഡന്റ്',
    designation: 'Vice President',
    designationMl: 'വൈസ് പ്രസിഡന്റ്',
    district: 'Kannur District',
    districtMl: 'കണ്ണൂർ ജില്ല',
    photo: {
      publicId: 'balasangham/leadership/kannur_darshana_sanoj',
      secureUrl: 'https://res.cloudinary.com/dj4apdzk/image/upload/v1790975747/balasangham/leadership/kannur_darshana_sanoj.jpg',
      width: 1080,
      height: 1440,
      format: 'jpg',
    },
  },
  {
    name: 'Amal Prem',
    nameMl: 'അമൽ പ്രേം',
    role: 'Vice President',
    roleMl: 'വൈസ് പ്രസിഡന്റ്',
    designation: 'Vice President',
    designationMl: 'വൈസ് പ്രസിഡന്റ്',
    district: 'Kannur District',
    districtMl: 'കണ്ണൂർ ജില്ല',
    photo: {
      publicId: 'balasangham/leadership/kannur_amal_prem',
      secureUrl: 'https://res.cloudinary.com/dj4apdzk/image/upload/v1790975751/balasangham/leadership/kannur_amal_prem.jpg',
      width: 960,
      height: 1280,
      format: 'jpg',
    },
  },
  {
    name: 'K.V. Aadith',
    nameMl: 'കെ. വി. ആദിത്ത്',
    role: 'Joint Secretary',
    roleMl: 'ജോയിന്റ് സെക്രട്ടറി',
    designation: 'Joint Secretary',
    designationMl: 'ജോയിന്റ് സെക്രട്ടറി',
    district: 'Kannur District',
    districtMl: 'കണ്ണൂർ ജില്ല',
    photo: {
      publicId: 'balasangham/leadership/kannur_kv_aadith',
      secureUrl: 'https://res.cloudinary.com/dj4apdzk/image/upload/v1790975750/balasangham/leadership/kannur_kv_aadith.jpg',
      width: 1500,
      height: 1500,
      format: 'jpg',
    },
  },
  {
    name: 'Devika S. Dev',
    nameMl: 'ദേവിക എസ്. ദേവ്',
    role: 'Joint Secretary',
    roleMl: 'ജോയിന്റ് സെക്രട്ടറി',
    designation: 'Joint Secretary',
    designationMl: 'ജോയിന്റ് സെക്രട്ടറി',
    district: 'Kannur District',
    districtMl: 'കണ്ണൂർ ജില്ല',
    photo: {
      publicId: 'balasangham/leadership/kannur_devika_s_dev',
      secureUrl: 'https://res.cloudinary.com/dj4apdzk/image/upload/v1790975757/balasangham/leadership/kannur_devika_s_dev.jpg',
      width: 900,
      height: 1600,
      format: 'jpg',
    },
  },
  {
    name: 'T. Satheesh Kumar',
    nameMl: 'ടി. സതീഷ് കുമാർ',
    role: 'Joint Convener',
    roleMl: 'ജോയിന്റ് കൺവീനർ',
    designation: 'Joint Convener',
    designationMl: 'ജോയിന്റ് കൺവീനർ',
    district: 'Kannur District',
    districtMl: 'കണ്ണൂർ ജില്ല',
  },
  {
    name: 'P.K. Sheela',
    nameMl: 'പി. കെ. ഷീല',
    role: 'Joint Convener',
    roleMl: 'ജോയിന്റ് കൺവീനർ',
    designation: 'Joint Convener',
    designationMl: 'ജോയിന്റ് കൺവീനർ',
    district: 'Kannur District',
    districtMl: 'കണ്ണൂർ ജില്ല',
  },
];



export const notableAlumni: Alumni[] = [
  {
    name: 'E.K. Nayanar',
    nameMl: 'ഇ.കെ. നായനാർ',
    role: 'First President of Desheeya Balasangham (1938), Former Chief Minister of Kerala',
    roleMl: 'ദേശീയ ബാലസംഘം ആദ്യ പ്രസിഡന്റ് (1938), മുൻ കേരള മുഖ്യമന്ത്രി',
    description: 'Led the very first Balasangham unit at Kalliasseri as a student in 1938, later serving three historic terms as Chief Minister of Kerala.',
    descriptionMl: '1938-ൽ കല്ല്യാശ്ശേരിയിൽ ബാലസംഘത്തിന്റെ ആദ്യ പ്രസിഡന്റായി പ്രവർത്തിച്ചു. പിന്നീട് മൂന്ന് തവണ കേരളത്തിന്റെ മുഖ്യമന്ത്രിയായി.',
  },
  {
    name: 'Arya Rajendran',
    nameMl: 'ആര്യ രാജേന്ദ്രൻ',
    role: 'Former State President of Balasangham, Mayor of Thiruvananthapuram',
    roleMl: 'മുൻ സംസ്ഥാന പ്രസിഡന്റ്, തിരുവനന്തപുരം മേയർ',
    description: 'Elected State President of Balasangham while a student, later became India\'s youngest municipal corporation mayor.',
    descriptionMl: 'ബാലസംഘം സംസ്ഥാന പ്രസിഡന്റായി പ്രവർത്തിച്ചു. ഇന്ത്യയിലെ ഏറ്റവും പ്രായം കുറഞ്ഞ മേയറായി തിരുവനന്തപുരത്ത് ചുമതലയേറ്റു.',
  },
  {
    name: 'M. Vijin',
    nameMl: 'എം. വിജിൻ',
    role: 'Former Balasangham Leader, MLA (Kalliasseri)',
    roleMl: 'മുൻ ബാലസംഘം നേതാവ്, കല്ല്യാശ്ശേരി എം.എൽ.എ',
    description: 'Emerged from grassroots Balasangham leadership in Kannur, currently representing Kalliasseri constituency in the Kerala Legislative Assembly.',
    descriptionMl: 'കണ്ണൂരിലെ ബാലസംഘം പ്രവർത്തനങ്ങളിലൂടെ പൊതുരംഗത്തെത്തി, നിലവിൽ കല്ല്യാശ്ശേരി നിയമസഭാ മണ്ഡലം എം.എൽ.എയായി പ്രവർത്തിക്കുന്നു.',
  },
  {
    name: 'V.P. Sanu',
    nameMl: 'വി.പി. സാനു',
    role: 'Former Balasangham Activist, Youth & Student Leader',
    roleMl: 'മുൻ ബാലസംഘം പ്രവർത്തകൻ, യുവജന-വിദ്യാർത്ഥി നേതാവ്',
    description: 'Shaped by childhood participation in Balasangham units, advancing to lead major national student and democratic movements.',
    descriptionMl: 'ബാലസംഘം യൂണിറ്റുകളിലൂടെ പൊതുജീവിതം തുടങ്ങി ദേശീയ തലത്തിൽ വിദ്യാർത്ഥി-യുവജന പ്രസ്ഥാനങ്ങളെ നയിച്ചു.',
  },
];
