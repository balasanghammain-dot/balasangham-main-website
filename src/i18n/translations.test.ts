import { describe, it, expect } from 'vitest';
import { translations } from './translations';

describe('Translations Store', () => {
  it('has both en and ml language entries with identical key structures', () => {
    expect(translations.en).toBeDefined();
    expect(translations.ml).toBeDefined();
    expect(translations.en.nav.about).toBe('What is Balasangham?');
    expect(translations.ml.nav.about).toBe('ആരാണ് ബാലസംഘം?');
  });

  it('contains verified historical facts and dates in both languages', () => {
    expect(translations.en.history.foundationDate).toContain('December 28, 1938');
    expect(translations.ml.history.foundationDate).toContain('1938 ഡിസംബർ 28');
    expect(translations.en.stats.membersCount).toBe('1,000,000+');
    expect(translations.en.stats.unitsCount).toBe('20,000+');
  });

  it('contains full official flag song lyrics in Malayalam and English poetic translation', () => {
    expect(translations.ml.anthem.lyrics.join(' ')).toContain('ഉണരുക ഉയരുക ശുഭ്രപതാകേ');
    expect(translations.en.anthem.lyrics.join(' ')).toContain('Awaken and arise, pure white banner');
  });
});
