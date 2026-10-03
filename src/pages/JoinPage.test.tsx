import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../context/LanguageContext';
import { JoinPage } from './JoinPage';
import { LanguageToggle } from '../components/common/LanguageToggle';

function TestWrapper() {
  return (
    <LanguageProvider>
      <MemoryRouter>
        <div>
          <LanguageToggle />
          <JoinPage />
        </div>
      </MemoryRouter>
    </LanguageProvider>
  );
}

describe('JoinPage Membership Eligibility', () => {
  it('renders updated age eligibility 6 to 18 years in English', () => {
    render(<TestWrapper />);

    // Step 02 title check
    expect(screen.getByRole('heading', { level: 3, name: /Age Eligibility \(6 to 18 Years\)/i })).toBeInTheDocument();

    // Supporting hero text check
    expect(screen.getByText(/between ages 6 and 18 across Kerala/i)).toBeInTheDocument();

    // Negative assertions - must not contain 5 to 16
    expect(screen.queryByText(/Age Eligibility \(5 to 16 Years\)/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/5 to 16/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/5–16/i)).not.toBeInTheDocument();
  });

  it('renders updated age eligibility 6 to 18 years in Malayalam when toggled', () => {
    render(<TestWrapper />);

    const mlButton = screen.getByRole('button', { name: 'മലയാളം' });
    fireEvent.click(mlButton);

    // Step 02 title check in Malayalam
    expect(screen.getByRole('heading', { level: 3, name: /പ്രായപരിധി \(6 മുതൽ 18 വയസ്സ് വരെ\)/i })).toBeInTheDocument();

    // Supporting Malayalam text check
    expect(screen.getByText(/6 മുതൽ 18 വയസ്സുവരെയുള്ള എല്ലാ കുട്ടികൾക്കും/i)).toBeInTheDocument();
    expect(screen.getByText(/6 മുതൽ 18 വയസ്സുവരെയുള്ള ഏത് കുട്ടിക്കും ഇതിൽ പങ്കാളിയാകാം/i)).toBeInTheDocument();

    // Negative assertions
    expect(screen.queryByText(/5 മുതൽ 16/i)).not.toBeInTheDocument();
  });

  it('permanently removes "Safe & Transparent" and "What Children Experience" sections', () => {
    render(<TestWrapper />);

    // Section 1: Safe & Transparent: No Online Payment Fees
    expect(screen.queryByText(/Safe & Transparent: No Online Payment Fees/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/പ്രധാന അറിയിപ്പ്: ഓൺലൈൻ ഫീസുകളില്ല/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Balasangham does not collect online registration fees/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ഓൺലൈൻ പണമിടപാടുകളോ രജിസ്ട്രേഷൻ ഫീസോ ആവശ്യമില്ല/i)).not.toBeInTheDocument();

    // Section 2: What Children Experience in Balasangham
    expect(screen.queryByText(/What Children Experience in Balasangham/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ബാലസംഘം കുട്ടികൾക്ക് സമ്മാനിക്കുന്നത്/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Venalthumbikal Arts Caravan/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/വേനൽത്തുമ്പികൾ കലാജാഥ/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Venal Kalari Creative Camps/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/വേനൽ കളരി സർഗ്ഗ ക്യാമ്പുകൾ/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Shasthra Deepthi Astronomy/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ശാസ്ത്ര ദീപ്തി വാനനിരീക്ഷണം/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Kilikkoodu Children’s Magazine/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/കിളിക്കൂട് മാസിക വായന/i)).not.toBeInTheDocument();

    // Illustration & text on image
    expect(screen.queryByAltText(/Children dancing joyfully with hands in the air/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/The Joy of Children’s Fellowship/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/കുട്ടിക്കൂട്ടായ്മയുടെ സന്തോഷം/i)).not.toBeInTheDocument();
  });
});
