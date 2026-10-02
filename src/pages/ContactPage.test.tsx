import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../context/LanguageContext';
import { ContactPage } from './ContactPage';
import { Footer } from '../components/layout/Footer';
import { organizationInfo, officialContact } from '../data/organizationData';

describe('Contact Information & Data Architecture', () => {
  it('canonical organization data contains verified office details and phone', () => {
    expect(organizationInfo.contact).toBeDefined();
    expect(officialContact).toBe(organizationInfo.contact);
    expect(organizationInfo.contact.addressLines).toEqual([
      'ബാലസംഘം കണ്ണൂർ ജില്ലാ കമ്മിറ്റി ഓഫീസ്',
      'അഴീക്കോടൻ സ്മാരക മന്ദിരം',
      'തളാപ്പ്, കണ്ണൂർ',
    ]);
    expect(organizationInfo.contact.phone).toBe('9744164253');
    expect(organizationInfo.contact.phoneTel).toBe('tel:9744164253');
  });

  it('renders verified contact address and clickable phone on ContactPage', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <ContactPage />
        </LanguageProvider>
      </MemoryRouter>
    );

    // Official address lines
    expect(screen.getByText('ബാലസംഘം കണ്ണൂർ ജില്ലാ കമ്മിറ്റി ഓഫീസ്')).toBeInTheDocument();
    expect(screen.getByText('അഴീക്കോടൻ സ്മാരക മന്ദിരം')).toBeInTheDocument();
    expect(screen.getByText('തളാപ്പ്, കണ്ണൂർ')).toBeInTheDocument();

    // Phone display and tel: link
    expect(screen.getByText('9744164253')).toBeInTheDocument();
    const phoneLink = screen.getByRole('link', { name: /9744164253/i });
    expect(phoneLink).toHaveAttribute('href', 'tel:9744164253');

    // Asserts no placeholder/fake contact info exists
    expect(screen.queryByText(/AKG Bhavan/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/270 0000/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/balasanghamkannur@gmail\.com/i)).not.toBeInTheDocument();
  });

  it('renders verified contact address and clickable phone in Footer', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Footer />
        </LanguageProvider>
      </MemoryRouter>
    );

    // Official address lines in Footer
    expect(screen.getByText('ബാലസംഘം കണ്ണൂർ ജില്ലാ കമ്മിറ്റി ഓഫീസ്')).toBeInTheDocument();
    expect(screen.getByText('അഴീക്കോടൻ സ്മാരക മന്ദിരം')).toBeInTheDocument();
    expect(screen.getByText('തളാപ്പ്, കണ്ണൂർ')).toBeInTheDocument();

    // Phone link in Footer
    const phoneLinks = screen.getAllByRole('link', { name: /9744164253/i });
    expect(phoneLinks.length).toBeGreaterThan(0);
    expect(phoneLinks[0]).toHaveAttribute('href', 'tel:9744164253');

    // Asserts no placeholder/fake contact info exists
    expect(screen.queryByText(/AKG Bhavan/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/270 0000/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/balasanghamkannur@gmail\.com/i)).not.toBeInTheDocument();
  });
});
