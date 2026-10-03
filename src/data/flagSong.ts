import { ContentSource, FlagSongStanza } from '../types/content';

export const flagSongSource: ContentSource = {
  type: 'official',
  verified: true,
  referenceDoc: 'docs/ORGANIZATION_KB.md',
  notes: 'Official Balasangham anthem sung at all assemblies and flag hoistings since 1980'
};

export const flagSongStanzas: FlagSongStanza[] = [
  {
    stanzaNumber: 1,
    malayalamLines: [
      'ഉണരുക ഉയരുക ശുഭ്രപതാകേ',
      'ഉജ്ജ്വല കർമ്മപതാകേ',
      'രക്തതാരകൾ മാറിൽ ചാർത്തിയ',
      'ബാലസംഘ പതാകേ',
      'ഉജ്ജ്വല കർമ്മപതാകേ മാനവസൗഹൃദ രത്നപതാകേ'
    ],
    poeticTranslationLines: [
      'Awaken, arise, O radiant white banner,',
      'Banner of radiant and purposeful deeds,',
      'Bearing the red star proudly upon your heart,',
      'O proud banner of Balasangham,',
      'Banner of noble action, jewel of human fraternity!'
    ]
  },
  {
    stanzaNumber: 2,
    malayalamLines: [
      'വിണ്ണിൻ നെഞ്ചിൻ കൂട്ടിൽ വളർത്തിയ',
      'വെള്ളിപ്രാവ കണക്കല്ലോ',
      'മാനവശാന്തിക്കുയിരിന്നുയിരായ്',
      'നീയുണരുന്നു നാടുകളിൽ'
    ],
    poeticTranslationLines: [
      'Like the gentle silver dove nurtured',
      'In the deep nest of the boundless sky,',
      'As the very breath and life of human peace,',
      'You awaken across every town and village.'
    ]
  },
  {
    stanzaNumber: 3,
    malayalamLines: [
      'പുലരിക്കതിരിനഴകിൽ തുന്നിയ',
      'തത്വത്തിൻ സന്ദേശവുമായി',
      'പഠനം മനനം ചലനമതിൻ മണി-',
      'മന്ത്രം ചാർത്തിയ കുറികളുമായി',
      'ഉയർന്നു പറന്നു കളിക്കുക നീളേ',
      'അനന്ത വിശാല വിഹായസ്സിൽ'
    ],
    poeticTranslationLines: [
      'Woven with the radiant grace of dawn’s first rays,',
      'Carrying the clarion message of our philosophy,',
      'Bearing the sacred message of noble ideals,',
      'Emblazoned upon your luminous identity,',
      'Soar high and flutter freely across',
      'The vast, infinite firmament!'
    ]
  },
  {
    stanzaNumber: 4,
    malayalamLines: [
      'പട്ടിണി തടവറ തൊഴിലില്ലായ്മ',
      'മർദ്ദനനീതികൾ നിയമങ്ങൾ',
      'ഇന്ത്യൻ ബാല്യത്തിന്റെ വിമോചന-',
      'വീഥിക്കെതിരെ ഉയരുമ്പോൾ',
      'അതിന്നുനേരെ പൊരുതും ഞങ്ങടെ',
      'അഭിമാനക്കൊടിയല്ലോ നീ'
    ],
    poeticTranslationLines: [
      'When hunger, dungeons, and joblessness,',
      'Oppressive laws and cruel decrees',
      'Arise against the liberating path',
      'Of the children of India,',
      'You are our banner of unyielding pride',
      'Fighting fearlessly against every injustice!'
    ]
  }
];
