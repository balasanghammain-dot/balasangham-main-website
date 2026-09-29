export interface Leader {
  name: string;
  nameMl: string;
  role: string;
  roleMl: string;
}

export interface Program {
  id: string;
  slug: string;
  title: string;
  titleMl: string;
  category: 'cultural' | 'educational' | 'literary' | 'social';
  schedule: string;
  scheduleMl: string;
  scope: string;
  scopeMl: string;
  description: string;
  descriptionMl: string;
  highlights: string[];
  highlightsMl: string[];
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  titleMl: string;
  date: string;
  category: string;
  categoryMl: string;
  summary: string;
  summaryMl: string;
  source: string;
}

export interface Publication {
  id: string;
  title: string;
  titleMl: string;
  type: string;
  typeMl: string;
  frequency: string;
  frequencyMl: string;
  publisher: string;
  publisherMl: string;
  description: string;
  descriptionMl: string;
}

export interface Alumni {
  name: string;
  nameMl: string;
  role: string;
  roleMl: string;
  description: string;
  descriptionMl: string;
}

export const organizationInfo = {
  name: 'Balasangham',
  nameMl: 'ബാലസംഘം',
  district: 'Kannur',
  districtMl: 'കണ്ണൂർ',
  tagline: 'Kerala\'s Largest Children\'s Organization',
  taglineMl: 'കേരളത്തിലെ ഏറ്റവും വലിയ കുട്ടികളുടെ പ്രസ്ഥാനം',
  motto: 'Study, Contemplate, Act',
  mottoMl: 'പഠനം, മനനം, ചലനം',
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
      url: 'https://www.instagram.com/balasanghamkeralam/',
      handle: '@balasanghamkeralam',
    },
    {
      platform: 'YouTube',
      url: 'https://www.youtube.com/@balasanghamkerala2817',
      handle: '@balasanghamkerala2817',
    },
  ],
};

export const kannurLeadership: Leader[] = [
  { name: 'K. Surya', nameMl: 'കെ. സൂര്യ', role: 'District President', roleMl: 'ജില്ലാ പ്രസിഡന്റ്' },
  { name: 'M.P. Gokul', nameMl: 'എം. പി. ഗോകുൽ', role: 'District Secretary', roleMl: 'ജില്ലാ സെക്രട്ടറി' },
  { name: 'P. Sumeshan', nameMl: 'പി. സുമേശൻ', role: 'District Convener', roleMl: 'ജില്ലാ കൺവീനർ' },
  { name: 'Vishnu Jayan', nameMl: 'വിഷ്ണുജയൻ', role: 'District Coordinator', roleMl: 'ജില്ലാ കോഓർഡിനേറ്റർ' },
  { name: 'Darshana Sanoj', nameMl: 'ദർശന സനോജ്', role: 'Vice President', roleMl: 'വൈസ് പ്രസിഡന്റ്' },
  { name: 'Amal Prem', nameMl: 'അമൽ പ്രേം', role: 'Vice President', roleMl: 'വൈസ് പ്രസിഡന്റ്' },
  { name: 'K.V. Aadith', nameMl: 'കെ. വി. ആദിത്ത്', role: 'Joint Secretary', roleMl: 'ജോയിന്റ് സെക്രട്ടറി' },
  { name: 'Devika S. Dev', nameMl: 'ദേവിക എസ്. ദേവ്', role: 'Joint Secretary', roleMl: 'ജോയിന്റ് സെക്രട്ടറി' },
  { name: 'T. Satheesh Kumar', nameMl: 'ടി. സതീഷ് കുമാർ', role: 'Joint Convener', roleMl: 'ജോയിന്റ് കൺവീനർ' },
  { name: 'P.K. Sheela', nameMl: 'പി. കെ. ഷീല', role: 'Joint Convener', roleMl: 'ജോയിന്റ് കൺവീനർ' },
];

export const stateLeadership: Leader[] = [
  { name: 'Pravisha Pramod', nameMl: 'പ്രവിഷ പ്രമോദ്', role: 'State President', roleMl: 'സംസ്ഥാന പ്രസിഡന്റ്' },
  { name: 'N. Aadil', nameMl: 'എൻ. ആദിൽ', role: 'State Secretary', roleMl: 'സംസ്ഥാന സെക്രട്ടറി' },
  { name: 'M. Prakashan Master', nameMl: 'എം. പ്രകാശൻ മാസ്റ്റർ', role: 'State Convener', roleMl: 'സംസ്ഥാന കൺവീനർ' },
];

export const verifiedPrograms: Program[] = [
  {
    id: 'venalthumbikal',
    slug: 'venalthumbikal',
    title: 'Venalthumbikal',
    titleMl: 'വേനൽത്തുമ്പികൾ',
    category: 'cultural',
    schedule: 'April – May (Annual summer tour)',
    scheduleMl: 'ഏപ്രിൽ – മെയ് (വാർഷിക വേനൽക്കാല പര്യടനം)',
    scope: 'Statewide traveling children\'s theater troupes',
    scopeMl: 'സംസ്ഥാന വ്യാപക കുട്ടികളുടെ നാടക പര്യടനം',
    description: 'A celebrated traveling children\'s cultural movement founded in 1990. Children form traveling art troupes touring thousands of villages performing songs, street theatre, and creative expressions conveying secularism, peace, and environment protection.',
    descriptionMl: '1990-ൽ ആരംഭിച്ച കുട്ടികളുടെ നാടക-സാംസ്കാരിക പ്രസ്ഥാനം. ഗ്രാമഗ്രാമാന്തരങ്ങളിലൂടെ സഞ്ചരിച്ച് നാടകങ്ങളും പാട്ടുകളുമായി സാഹോദര്യത്തിന്റെയും പരിസ്ഥിതി സംരക്ഷണത്തിന്റെയും സന്ദേശം പ്രചരിപ്പിക്കുന്നു.',
    highlights: [
      'Children write, direct, and perform original street plays',
      'Village-to-village performance tours during vacation',
      'Focus on peace, secularism, science, and equality',
    ],
    highlightsMl: [
      'കുട്ടികൾ തന്നെ രചിച്ച് അവതരിപ്പിക്കുന്ന തെരുവ് നാടകങ്ങൾ',
      'വേനലവധിയിൽ ഗ്രാമങ്ങൾ തോറുമുള്ള പര്യടനം',
      'മതനിരപേക്ഷത, ശാസ്ത്രബോധം, സമത്വം എന്നിവയിലൂന്നിയുള്ള അവതരണങ്ങൾ',
    ],
  },
  {
    id: 'venal-kalari',
    slug: 'venal-kalari',
    title: 'Venal Kalari',
    titleMl: 'വേനൽ കളരി',
    category: 'educational',
    schedule: 'April – May',
    scheduleMl: 'ഏപ്രിൽ – മെയ്',
    scope: 'Unit and Area level camps',
    scopeMl: 'യൂണിറ്റ്, ഏരിയ തല ക്യാമ്പുകൾ',
    description: 'Inclusive summer creative workshops organized at thousands of local units providing children joyful learning in arts, crafts, science experiments, storytelling, and personality development during vacations.',
    descriptionMl: 'വേനലവധിയിൽ കുട്ടികൾക്കായി സംഘടിപ്പിക്കുന്ന സർഗാത്മക ശിൽപശാലകൾ. കല, സാഹിത്യം, ശാസ്ത്ര പരീക്ഷണങ്ങൾ, വ്യക്തിത്വ വികസനം എന്നിവയിൽ പരിശീലനം നൽകുന്നു.',
    highlights: [
      'Accessible in every neighborhood unit across Kannur',
      'Hands-on craft, drawing, and performance training',
      'Non-competitive, participatory learning model',
    ],
    highlightsMl: [
      'കണ്ണൂരിലെ മുഴുവൻ പ്രദേശങ്ങളിലും പ്രാദേശികമായി നടക്കുന്ന ക്യാമ്പുകൾ',
      'വര, കരകൗശലം, അഭിനയ പരിശീലനം',
      'മത്സരരഹിതമായ കൂട്ടായ പഠനാനുഭവം',
    ],
  },
  {
    id: 'bala-kalolsavam',
    slug: 'bala-kalolsavam',
    title: 'Bala Kalolsavam',
    titleMl: 'ബാല കലോത്സവം',
    category: 'cultural',
    schedule: 'October – December',
    scheduleMl: 'ഒക്ടോബർ – ഡിസംബർ',
    scope: 'Unit → Area → District → State',
    scopeMl: 'യൂണിറ്റ് → ഏരിയ → ജില്ലാ → സംസ്ഥാന തലം',
    description: 'Democratic art festivals bringing together tens of thousands of children. Designed to encourage artistic expression without the commercial pressures often found in competitive youth festivals.',
    descriptionMl: 'കുട്ടികളുടെ കലാവാസനകൾ പ്രോത്സാഹിപ്പിക്കുന്നതിനുള്ള ജനകീയ കലാമേളകൾ. വാണിജ്യവൽക്കരണമില്ലാതെ എല്ലാ കുട്ടികൾക്കും വേദി നൽകുന്നു.',
    highlights: [
      'Starts right at neighborhood units so every child gets a stage',
      'Celebration of folk arts, theater, literature, and music',
      'Inclusivity over commercial competition',
    ],
    highlightsMl: [
      'എല്ലാ കുട്ടികൾക്കും അവസരം നൽകുന്ന വിധം താഴെത്തട്ടിൽ നിന്നുള്ള തുടക്കം',
      'നാടൻ കലകൾ, നാടകം, സാഹിത്യം, സംഗീതം എന്നിവയുടെ സമന്വയം',
      'മത്സരത്തിന് പകരം പങ്കാളിത്തത്തിന് പ്രാധാന്യം',
    ],
  },
  {
    id: 'kilikkoodu-magazine',
    slug: 'kilikkoodu-magazine',
    title: 'Kilikkoodu Magazine',
    titleMl: 'കിളിക്കൂട് മാസിക',
    category: 'literary',
    schedule: 'Monthly publication',
    scheduleMl: 'പ്രതിമാസ പ്രസിദ്ധീകരണം',
    scope: 'Statewide circulation',
    scopeMl: 'സംസ്ഥാന വ്യാപക വിതരണം',
    description: 'The official children\'s monthly magazine of Balasangham featuring stories, poems, science articles, riddles, and artwork created by children across Kerala.',
    descriptionMl: 'ബാലസംഘത്തിന്റെ ഔദ്യോഗിക മാസിക. കുട്ടികളുടെ രചനകൾ, ചിത്രങ്ങൾ, ശാസ്ത്രലേഖനങ്ങൾ, കഥകൾ എന്നിവ പ്രസിദ്ധീകരിക്കുന്നു.',
    highlights: [
      'Platform for child writers, poets, and artists',
      'Promotes progressive reading culture and critical inquiry',
      'Widely circulated across schools and neighborhood libraries',
    ],
    highlightsMl: [
      'ബാല എഴുത്തുകാരുടെയും ചിത്രകാരന്മാരുടെയും സ്വതന്ത്ര വേദി',
      'വായനാശീലവും സ്വതന്ത്ര ചിന്തയും വളർത്തുന്നു',
      'സ്കൂളുകളിലും വായനശാലകളിലും സജീവ വിതരണം',
    ],
  },
  {
    id: 'shasthra-deepthi',
    slug: 'shasthra-deepthi',
    title: 'Shasthra Deepthi',
    titleMl: 'ശാസ്ത്ര ദീപ്തി',
    category: 'educational',
    schedule: 'Ongoing / National Science Day',
    scheduleMl: 'തുടർപ്രവർത്തനം / ദേശീയ ശാസ്ത്രദിനം',
    scope: 'District and Area level science clubs',
    scopeMl: 'ജില്ലാ, ഏരിയ തല ശാസ്ത്ര ക്ലബ്ബുകൾ',
    description: 'Science camps, sky observation sessions, and experimental demonstrations aimed at cultivating scientific temper, rational thinking, and ecological responsibility.',
    descriptionMl: 'ശാസ്ത്രബോധവും യുക്തിചിന്തയും വളർത്തുന്നതിനായി ശാസ്ത്ര പരീക്ഷണങ്ങൾ, വാനനിരീക്ഷണം, ശാസ്ത്ര ക്യാമ്പുകൾ എന്നിവ സംഘടിപ്പിക്കുന്നു.',
    highlights: [
      'Simple science experiments with everyday materials',
      'Sky-watching and astronomy exploration camps',
      'Combating unscientific beliefs and superstitions',
    ],
    highlightsMl: [
      'നിത്യജീവിതത്തിലെ ശാസ്ത്ര പരീക്ഷണങ്ങൾ',
      'വാനനിരീക്ഷണ ക്യാമ്പുകൾ',
      'അന്ധവിശ്വാസങ്ങൾക്കെതിരായ പ്രചാരണം',
    ],
  },
  {
    id: 'kutti-koottams',
    slug: 'kutti-koottams',
    title: 'Kutti Koottams',
    titleMl: 'കുട്ടിക്കൂട്ടങ്ങൾ',
    category: 'social',
    schedule: 'Weekly / Fortnightly',
    scheduleMl: 'പ്രതിവാര / രണ്ടാഴ്ചയിലൊരിക്കൽ',
    scope: 'Local neighborhood unit level',
    scopeMl: 'പ്രാദേശിക യൂണിറ്റ് തലം',
    description: 'Grassroots weekly gatherings where neighborhood children meet, conduct self-managed meetings, sing songs, play traditional games, and discuss community issues.',
    descriptionMl: 'അയൽപക്കങ്ങളിലെ കുട്ടികൾ ഒത്തുകൂടുന്ന പ്രതിവാര കൂട്ടായ്മകൾ. കുട്ടികൾ തന്നെ കാര്യങ്ങൾ ആസൂത്രണം ചെയ്യുകയും കളികളിലും പാട്ടുകളിലും ഏർപ്പെടുകയും ചെയ്യുന്നു.',
    highlights: [
      'Democratic child-led meeting culture',
      'Traditional outdoor and mental games',
      'Peer-to-peer solidarity and mutual support',
    ],
    highlightsMl: [
      'കുട്ടികൾ നയിക്കുന്ന ജനാധിപത്യ യോഗങ്ങൾ',
      'പരമ്പരാഗത കളികളും കായിക വിനോദങ്ങളും',
      'കുട്ടികൾ തമ്മിലുള്ള സൗഹൃദവും സഹകരണവും',
    ],
  },
  {
    id: 'anti-substance-campaigns',
    slug: 'anti-substance-campaigns',
    title: 'Anti-Substance Campaigns',
    titleMl: 'ലഹരിവിരുദ്ധ ജാഗ്രത',
    category: 'social',
    schedule: 'Continuous statewide campaign',
    scheduleMl: 'തുടർച്ചയായ ബോധവൽക്കരണം',
    scope: 'All units and school campuses',
    scopeMl: 'എല്ലാ യൂണിറ്റുകളും സ്കൂൾ പരിസരങ്ങളും',
    description: 'Student-led peer awareness networks and vigilance groups protecting youth from drugs and substance abuse, creating safe supportive school environments.',
    descriptionMl: 'കുട്ടികളെ ലഹരി ഉപയോഗത്തിൽ നിന്ന് സംരക്ഷിക്കുന്നതിനും ജാഗ്രത പുലർത്തുന്നതിനുമായി സംഘടിപ്പിക്കുന്ന ബോധവൽക്കരണ പരിപാടികൾ.',
    highlights: [
      'Child vigilance committees around schools',
      'Creative street art and anti-drug exhibitions',
      'Counseling support and healthy lifestyle advocacy',
    ],
    highlightsMl: [
      'സ്കൂളുകൾ കേന്ദ്രീകരിച്ചുള്ള ജാഗ്രതാ സമിതികൾ',
      'തെരുവ് നാടകങ്ങളും ചിത്രപ്രദർശനങ്ങളും',
      'ആരോഗ്യകരമായ ജീവിതശൈലി പ്രോത്സാഹിപ്പിക്കൽ',
    ],
  },
  {
    id: 'sodarathwena',
    slug: 'sodarathwena',
    title: 'Sodarathwena',
    titleMl: 'സോദരത്വേന',
    category: 'social',
    schedule: 'Specific commemorative observances',
    scheduleMl: 'പ്രത്യേക ദിനാചരണങ്ങൾ',
    scope: 'Statewide community gatherings',
    scopeMl: 'സംസ്ഥാന വ്യാപക സംഗമങ്ങൾ',
    description: 'Secular children\'s gatherings upholding the timeless message of universal fraternity ("Sodarathwena Vaazhuka"), bringing together children of all backgrounds in shared song and community dining.',
    descriptionMl: 'ശ്രീനാരായണ ഗുരുവിന്റെ സാഹോദര്യ സന്ദേശം ഉയർത്തിപ്പിടിച്ച് കുട്ടികളുടെ കൂട്ടായ്മകളും സൗഹൃദ വിരുന്നുകളും സംഘടിപ്പിക്കുന്ന പരിപാടി.',
    highlights: [
      'Secular fraternity gatherings across units',
      'Community dining celebrating harmony and unity',
      'Cultural programs emphasizing human brotherhood',
    ],
    highlightsMl: [
      'മതനിരപേക്ഷ സാഹോദര്യ സംഗമങ്ങൾ',
      'സ്നേഹവിരുന്നും ഒരുമിച്ചുള്ള ഭക്ഷണവും',
      'സാഹോദര്യം ഉയർത്തിപ്പിടിക്കുന്ന കലാപരിപാടികൾ',
    ],
  },
];

export const verifiedNews: NewsItem[] = [
  {
    id: 'news-1',
    slug: 'sodarathwena-gatherings-2026',
    title: 'Sodarathwena: Children\'s Fraternity Gatherings Organized Across Kannur',
    titleMl: 'സോദരത്വേന: ജില്ലയിലുടനീളം കുട്ടികളുടെ സാഹോദര്യ സംഗമങ്ങൾ നടന്നു',
    date: '2026-09-22',
    category: 'Campaign',
    categoryMl: 'പ്രചാരണം',
    summary: 'Thousands of children took part in secular gatherings across Kannur district reiterating universal brotherhood and secular values.',
    summaryMl: 'മതനിരപേക്ഷതയും മാനവ സാഹോദര്യവും ഉയർത്തിപ്പിടിച്ച് കണ്ണൂർ ജില്ലയിലെ വിവിധ കേന്ദ്രങ്ങളിൽ ആയിരക്കണക്കിന് കുട്ടികൾ ഒത്തുചേർന്നു.',
    source: 'Deshabhimani',
  },
  {
    id: 'news-2',
    slug: 'pinarayi-area-conference-2026',
    title: 'Pinarayi Area Conference Concludes with Enthusiasm',
    titleMl: 'പിണറായി ഏരിയ സമ്മേളനം ആവേശത്തോടെ സമാപിച്ചു',
    date: '2026-09-06',
    category: 'Conference',
    categoryMl: 'സമ്മേളനം',
    summary: 'The Pinarayi Area conference elected new leadership and discussed resolutions for child-friendly village initiatives and education rights.',
    summaryMl: 'കുട്ടികളുടെ അവകാശങ്ങൾക്കും പുതിയ നേതൃത്വ തെരഞ്ഞെടുപ്പിനുമായി ചേർന്ന പിണറായി ഏരിയ സമ്മേളനം സമാപിച്ചു.',
    source: 'Official Announcement',
  },
  {
    id: 'news-3',
    slug: 'kannur-district-conference-historic-homecoming',
    title: 'District Conference 2026 Returns to Founding Soil at Kalliasseri',
    titleMl: 'ജില്ലാ സമ്മേളനം ജന്മനാടായ കല്ല്യാശ്ശേരിയിൽ',
    date: '2026-08-15',
    category: 'District Conference',
    categoryMl: 'ജില്ലാ സമ്മേളനം',
    summary: 'The 2026 Kannur District Conference will convene at PCR Bank Auditorium, Kalliasseri, on October 10–11 under the theme "Childhood of Struggle".',
    summaryMl: '2026 ഒക്ടോബർ 10, 11 തീയതികളിൽ കല്ല്യാശ്ശേരി പി.സി.ആർ ബാങ്ക് ഓഡിറ്റോറിയത്തിൽ ജില്ലാ സമ്മേളനം നടക്കും.',
    source: 'District Committee Advisory',
  },
  {
    id: 'news-4',
    slug: 'venalthumbikal-summer-tour-triumphant',
    title: 'Venalthumbikal Concludes Vibrant Summer Tour Across 100+ Centres',
    titleMl: 'വേനൽത്തുമ്പികൾ പര്യടനം വിജയകരമായി സമാപിച്ചു',
    date: '2026-05-30',
    category: 'Culture',
    categoryMl: 'കല & സംസ്കാരം',
    summary: 'The traveling children\'s theater troupes covered over 100 rural and coastal centres across Kannur spreading messages of peace and equality.',
    summaryMl: 'കണ്ണൂരിലെ നൂറിലധികം കേന്ദ്രങ്ങളിൽ കുട്ടികളുടെ നാടക പര്യടനം വിജയകരമായി പൂർത്തിയായി.',
    source: 'Program Report',
  },
];

export const verifiedPublications: Publication[] = [
  {
    id: 'kilikkoodu',
    title: 'Kilikkoodu',
    titleMl: 'കിളിക്കൂട്',
    type: 'Monthly Magazine',
    typeMl: 'പ്രതിമാസ മാസിക',
    frequency: 'Monthly',
    frequencyMl: 'പ്രതിമാസം',
    publisher: 'Balasangham State Committee',
    publisherMl: 'ബാലസംഘം സംസ്ഥാന കമ്മിറ്റി',
    description: 'Official organ containing creative literature, scientific essays, poems, drawings, and knowledge material authored directly by children and educators.',
    descriptionMl: 'കുട്ടികളുടെ രചനകൾ, ശാസ്ത്രചിന്തകൾ, കഥകൾ, കവിതകൾ എന്നിവ ഉൾക്കൊള്ളുന്ന ബാലസംഘത്തിന്റെ ഔദ്യോഗിക പ്രതിമാസ പ്രസിദ്ധീകരണം.',
  },
  {
    id: 'spark',
    title: 'Spark',
    titleMl: 'സ്പാർക്ക്',
    type: 'Digital / Youth Bulletin',
    typeMl: 'ഡിജിറ്റൽ മാധ്യമം',
    frequency: 'Periodic',
    frequencyMl: 'ആനുകാലികം',
    publisher: 'Balasangham',
    publisherMl: 'ബാലസംഘം',
    description: 'Digital platform and youth updates exploring contemporary issues, creative media, environmental science, and social awareness.',
    descriptionMl: 'സമകാലിക വിഷയങ്ങൾ, ശാസ്ത്രം, പരിസ്ഥിതി എന്നിവ ചർച്ച ചെയ്യുന്ന ഡിജിറ്റൽ പ്രസിദ്ധീകരണം.',
  },
  {
    id: 'souvenirs',
    title: 'Conference Souvenirs',
    titleMl: 'സമ്മേളന സ്മരണികകൾ',
    type: 'Commemorative Books',
    typeMl: 'സ്മരണികകൾ',
    frequency: 'Per Conference',
    frequencyMl: 'ഓരോ സമ്മേളനത്തിലും',
    publisher: 'Conference Reception Committees',
    publisherMl: 'സ്വാഗതസംഘം കമ്മിറ്റികൾ',
    description: 'Documentary volumes detailing regional history, children\'s rights developments, and cultural contributions released at district and state conferences.',
    descriptionMl: 'പ്രാദേശിക ചരിത്രവും കുട്ടികളുടെ സാംസ്കാരിക സംഭാവനകളും അടങ്ങിയ ചരിത്ര സ്മരണികകൾ.',
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
